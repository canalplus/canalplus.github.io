# CANAL+ Developers Hub

IN CODE WE TRUST.

## Contributing to the blog

Follow these steps to contribute to our engineering blog :

1. Create a new workin branch for your contribution.

2. Add yourself to the list of authors in `_data/authors.yml`:

```YAML
Your Name:
  name: "Your Name"
  uri: "http://thewhip.com"
  email: "billy@rick.com"
  bio: "What do you want, jewels? I am a very extravagant man."
  avatar: "avatar_yname.jpg"
  twitter: "yourtwitterhandle"
```

Note : Optionally, you can add a photo in the `assets` folder.

3. Write your article using in plain text or **Markdown** and be sure to include this YAML Front Matter at the top of your file:

```markdown
---
title: "Your blog post title"
author: Your Name
tags: [List, Of, Tags]
header: # Optional : display an image above your article content.
  image: default_image.jpg # Note: The image must be in the "images" folder.
---

## Your awesome title

Lorem ipsum dolor sit amet, consectetur adipisicing elit.
Sunt saepe ipsum nulla laboriosam et quis veniam repellat ipsam,
voluptates harum facilis veritatis minima eos at inventore obcaecati
aliquam, mollitia reprehenderit.

```

4. Send us a PR ! We'll review your changes (mainly for typos and YAML Front Matter validation) and merge it as soon as possible.

## Documentation

The developer's hub uses [Jekyll](https://jekyllrb.com) (a static site generator) and a customised version of the [Minimal Mistake](https://mmistakes.github.io/minimal-mistakes/) theme.

To upgrade the base theme, just follow [this doc](https://mmistakes.github.io/minimal-mistakes/docs/upgrading/).

## Installation notes

To use this site on your development environment, you will need a working Ruby version and the `bundler` gem :

```
# First, Ruby
(sudo) apt-get install ruby ruby-dev  # Linux (Debian/Ubuntu)
(sudo) brew install ruby              # OSX

# Then, Bundler
(sudo) gem install bundler

# Bootstrap your environment and start a dev server
make serve
```
