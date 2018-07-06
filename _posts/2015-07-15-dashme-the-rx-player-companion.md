---
title: "DASHme - The rx-player companion"
tags: [DASH, RxJS, Go]
---

As you've probably seen, we released a few weeks ago an HTML5 player based on reactive programming : [RX Player](https://github.com/canalplus/rx-player).
This is quite nice if you want to play your own content on your website, if you have some, but if you don't, well, it's kind of useless.

This is where DashMe come in handy.

The idea behind DashMe is to convert any video encoded with H264 into DASH content. It generates a DASH manifest and MP4 chunks from any type of video format (AVI, MOV, MKV, Smooth Streaming, ...) and expose them through a simple REST interface. Therefore, combined with RX player, you can stream and play your own content converted and served by DashMe directly on your website with practically no hassle.

This project started when we needed to test our player, we needed to generate some content to use with RX Player without having to use GPAC and install a new HTTP server to serve it to the player. It then evolved as an experimentation platform to play around with DASH.

Behing the curtain, DashMe works using [FFMPEG](https://www.ffmpeg.org/) or [LIBAV](https://libav.org/) with [Golang](https://golang.org/).
Golang is a new and interresting language especially for its concurrency primitives and its complete standard library. For example, all the HTTP serving is done using only the standard library. The built-in concurrency primitive helps a lot to spawn concurrents tasks and retrieve their results easily. Also, because it's a compiled language its performances are quite better than nodejs or python (generally) but also it enables to link easily to C code and shared libraries. Therefore, thanks to this language we could integrate FFMPEG/LIBAV and benefit from their video formats parsing and extract easily the H264 samples before rapacking it to fragmented MP4.
Nevertheless, it has a few drawbacks, some you can go around, some you can't. For example its standard library can be considered as heavy and there's nothing you can do about that. Also it has a really simple (dumb ?) garbage collector. In our case where we parse potentially heavy video it can be disastrous. Hopefully, with some tweeking in the code you can reduce this issue.

So why would you be interrested in DashMe ? Well, I can think of a few reasons :

 - To test or use RX Player but you don't have any content.
 - To discover Golang and what can be done with this new language
 - To better understand the DASH format

Whatever is your reason, don't hesitate to [take a look](https://github.com/canalplus/DashMe).
