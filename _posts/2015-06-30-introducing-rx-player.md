---
title: "Introducing rx-player"
tags: [Player, ReactJS, RxJS]
---

A few months ago, as Google announced the tearing down of Silverlight support in Chrome, CANAL+ started working on a new player, using the new HTML5 API (MSE, EME, ...) to play video.

This player is now used by the CANAL+ users within [myCANAL website](http://live.mycanal.fr/tv/).

Today, we are excited to open source it and hope that it will help the community to play video contents on the web.

Building a streaming video player in javascript is a complex task due to the numerous interactions with the outside world it has to deal with. Whether they come from the user seeking at a particular moment of its movie, changing the current channel or the network congestion. The video player being the centerpiece of our applications, it needs to adapt very quickly to any of these inputs and stay resilient to various errors.

Many current video player implementations rely on classical object-oriented hierarchy and imperative event callbacks with shared mutable objects to manage all these asynchronous tasks and states. We found this approach to be the wrong abstraction to handle the complexity of a video player.

Rx on the contrary provides gracious interfaces and operators to compose asynchronous tasks together by representating changing states as observable stream of values. It also comes with a **cancelation** contract so that every asynchronous side-effect can be properly disposed when discarded by the system (this is still [a controversial issue in the JS community](https://github.com/whatwg/fetch/issues/27)).

This allowed us to implement some nice features quite easily. For instance, because in the rx-player all asynchronous tasks are encapsulated in observable data-structures, we were able to add a transparent [retry system](https://github.com/canalplus/canal-js-utils/blob/master/rx-ext.js#L73-L100) with a simple observable operator to declaratively handle any failure and replay the whole process.

Another example is the way we abstracted our transport layer into an observable pipeline, allowing us to support different type of streaming systems with its own asynchronous specifities. And because Rx is message-driven, this encapsulation allows us isolate the transport I/O into a WebWorker without any effort, or add an offline support for any pipeline implementation.

We will write more about it in the next weeks. For now, just have a look on [github](https://github.com/canalplus/rx-player).