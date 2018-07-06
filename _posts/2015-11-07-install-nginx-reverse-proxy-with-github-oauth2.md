---
title: "Install NGINX reverse proxy with GitHub's OAuth2"
author: Jean-Thierry Bonhomme
tags: [NGINX, GitHub, OAuth]
---

We at CANAL PLUS have many applications hosted on Amazon EC2. It is easy to set up and you can easily test and trash your instances as many times you want.

But, it also can be a bit more complicated if you want these services to be only used by people in your organisation. I was looking for an elegant way to restrict access to some internal dashboards and services, which would not imply to handle a new login/password dictionnary.

As we use Github for our public and private repositories, we decided to set up a reverse proxy with nginx and Github oauth2 authentication service.

![](http://dandelion.github.io/slides/dandelion-0.10.0/assets/images/logo_github_small.gif)

As I spent some times to (finaly) set a working configuration, I hope this article may help some of you.

I found a Go library: [Oauth2_proxy](https://github.com/bitly/oauth2_proxy) that integrates with nginx and deals with all the oauth protocol for you. Tadaaa !

The principle is fairly simple. You set a nginx reverse proxy that receives incomming requests. It internaly sends these request to oauth2_proxy, who checks your Github credentials, and then "redirects" the trafic to your internal servers (upstream servers).

![](https://cloud.githubusercontent.com/assets/45028/8027702/bd040b7a-0d6a-11e5-85b9-f8d953d04f39.png)

As a result, you will have to log in with your Github credentials before you will access to the services that are protected with Oauth2_proxy.

![](https://cloud.githubusercontent.com/assets/45028/4970624/7feb7dd8-6886-11e4-93e0-c9904af44ea8.png)

> OAuth2 is a protocol that lets external apps request authorization to private details in a user’s GitHub account without getting their password. This is preferred over Basic Authentication because tokens can be limited to specific types of data, and can be revoked by users at any time.

Source: [Github Oauth API](https://developer.github.com/v3/oauth/).

## Register a github Application

A registered OAuth application is assigned a unique Client ID and Client Secret. The Client Secret should not be shared. You may create a personal access token for your own use or implement the web flow below to allow other users to authorize your application.

Go to the [Register a new OAuth application](https://github.com/settings/applications/new) page and fill all needed fields.

You will be given a unique Client Id and Client Secret that will be used by Oauth2_proxy service.

> People who may want to have more details can check the [Github Oauth API](https://developer.github.com/v3/oauth/).

## Install and configure nginx

![](http://www.myiconfinder.com/uploads/iconsets/256-256-cf2ed3956a3a1484f83ed20d7e987f21.png)

```shell
sudo apt-get install nginx
```

Then edit the configuration file <code>/etc/nginx/sites-enabled/default</code> to set up proxy pass to oauth2_proxy.

<pre>
server {
  listen      80;
  server_name your.company.com;

  location / {
    proxy_pass http://127.0.0.1:4180;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Scheme $scheme;
    proxy_connect_timeout 1;
    proxy_send_timeout 30;
    proxy_read_timeout 30;
  }
}
</pre>

This part send incoming requests on port 80 to 127.0.0.1:4180 (which is the default listening port of oauth2_proxy)

When Oauth2_proxy has authenticated your connection, it will redirect users on an 'upstream server'

In this config, my upstream server is a simple http static file server. I make it listen on localhost:8090.
Files are served from <code>/var/www directory</code>.

<pre>
server {
  listen      8090;
  root        /var/www;

  location / {
  	try_files $uri $uri/ index.html index.php =404;
  }
}
</pre>

Then restart nginx:

<code>
sudo service nginx restart
</code>

## Install and configure oauth2_proxy

Download [Prebuilt Binary](Prebuilt Binary) (current release is v2.0.1) or build with <code>$ go get github.com/bitly/oauth2_proxy</code> which will put the binary in <code>$GOROOT/bin</code>

Untar the archive, check the hash and copy the oauth2_proxy executable to <code>/usr/bin</code>

<pre>
tar xzvf oauth2_proxy-2.0.1.linux-amd64.go1.4.2.tar.gz
md5sum oauth2_proxy
	6be4b7734898081ed30558fff38b80cb  oauth2_proxy
sudo cp oauth2_proxy-2.0.1.linux-amd64.go1.4.2/oauth2_proxy /usr/bin/
</pre>

I use this configuration to set github as Oauth2 provider, and to restrict access to CANALPLUS's github organisation members only. See [Oauth_proxy README](https://github.com/bitly/oauth2_proxy/blob/master/README.md) for more options:

<pre>
oauth2_proxy  -client-id=CLIENT_ID_PROVIDED_BY_GITHUB \
							-client-secret=SECRET_KEY_PROVIDED_BY_GITHUB \
							-provider=github \
							-email-domain=* \
							-upstream=http://127.0.0.1:8090 \
							-cookie-secret=secretsecret \
							-login-url=https://github.com/login/oauth/authorize \
							-github-org=yourcompany \
							-cookie-domain=your.company.com \
							-cookie-secure=false
</pre>

> Note: you can also restrict access to a specific Github team under your organisation.

## Configure oauth2_proxy as a Linux service

Create a new script in <code>/etc/init.d/oauth2_proxy</code>

<pre>
#!/bin/sh
### BEGIN INIT INFO
# Provides:
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Start daemon at boot time
# Description:       Enable service provided by daemon.
### END INIT INFO

cmd="oauth2_proxy -client-id=CLIENT_ID_PROVIDED_BY_GITHUB \
-client-secret=SECRET_KEY_PROVIDED_BY_GITHUB \
-provider=github \
-email-domain=* \
-upstream=http://127.0.0.1:8090 \
-cookie-secret=secretsecret \
-login-url=https://github.com/login/oauth/authorize \
-github-org=yourcompany \
-cookie-domain=your.company.com \
-cookie-secure=false"

dir=""

name=`basename $0`
pid_file="/var/run/$name.pid"
stdout_log="/var/log/$name.log"
stderr_log="/var/log/$name.err"

get_pid() {
    cat "$pid_file"
}

is_running() {
    [ -f "$pid_file" ] && ps `get_pid` > /dev/null 2>&1
}

case "$1" in
    start)
    if is_running; then
        echo "Already started"
    else
        echo "Starting $name"
        cd "$dir"
echo $cmd
        if [ -z "$user" ]; then
            sudo $cmd >> "$stdout_log" 2>> "$stderr_log" &
        else
            sudo -u "$user" $cmd >> "$stdout_log" 2>> "$stderr_log" &
        fi
        echo $! > "$pid_file"
        if ! is_running; then
            echo "Unable to start, see $stdout_log and $stderr_log"
            exit 1
        fi
    fi
    ;;
    stop)
    if is_running; then
        echo -n "Stopping $name.."
        kill `get_pid`
        for i in {1..10}
        do
            if ! is_running; then
                break
            fi

            echo -n "."
            sleep 1
        done
        echo

        if is_running; then
            echo "Not stopped; may still be shutting down or shutdown may have failed"
            exit 1
        else
            echo "Stopped"
            if [ -f "$pid_file" ]; then
                rm "$pid_file"
            fi
        fi
    else
        echo "Not running"
    fi
    ;;
    restart)
    $0 stop
    if is_running; then
        echo "Unable to stop, will not attempt to start"
        exit 1
    fi
    $0 start
    ;;
    status)
    if is_running; then
        echo "Running"
    else
        echo "Stopped"
        exit 1
    fi
    ;;
    *)
    echo "Usage: $0 {start|stop|restart|status}"
    exit 1
    ;;
esac

exit 0
</pre>

Then make it start with Linux, and start the program:

<pre>
sudo update-rc.d oauth2_proxy defaults 95 10
sudo service oauth2_proxy start
</pre>

## Et voila !

Files served under <code>/var/www</code> now require to enter your github credentials. Only your company team will be allowed to access to the server.

