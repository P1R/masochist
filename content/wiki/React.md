---
tags: javascript react facebook
cache_breaker: 1
---

[React](/wiki/React) is a [JavaScript](/wiki/JavaScript) library for building user interfaces from [Facebook](/wiki/Facebook). You can think of it as the "V" (or the "VC") in [MVC](/wiki/MVC). It can be used in concert with other libraries such as [Backbone](/wiki/Backbone).

# Core ideas

Many web apps pursue a separation of concerns by putting markup in templates, logic in JavaScript files, and presentational styling in CSS. There is a strong sense in which this is actually just "separation of technologies".

[React](/wiki/React), on the other hand, freely mixes markup and logic (and [even styling](https://github.com/hedgerwang/react-styles)) inside the JavaScript using a layer of syntactic sugar called [JSX](/wiki/JSX) that gets pre-processed away. This is reminiscent of the [Objective-C](/wiki/Objective-C) approach to [MVC](/wiki/MVC) in [Apple's](/wiki/Apple%27s) [APIs](/wiki/APIs), where views (`NSView` and `UIView` instances) comprise a lot of code and logic.

The key advantages of the approach stem from the fact that this code is used to generate a synthetic representation of the [DOM](/wiki/DOM) and the event system. This representation can be manipulated very quickly, with the result diffed against the real DOM and only the minimal set of changes necessary to synchronize are applied, making it very fast.

This speed-up also leads to a great reduction in complexity, because it means that you can write your views in a declarative style which states in simple terms how they should be rendered; updating just means calling the (basically idempotent) `render()` method again. Even complex hierarchies can be re-rendered frequently, because only the minimal underlying changes will be propagated to the DOM.

Additionally the synthetic events system obviates the need for maintaining bulky cross-browser events code. (Notably, some polyfills are required for supporting older browsers, but [React](/wiki/React) doesn't bundle any, enabling people to pick and choose their polyfill implementation.)

# Official links

-   Official site: <http://facebook.github.io/react/>
-   "Why did we build React?" (blog post by Pete Hunt): <http://facebook.github.io/react/blog/2013/06/05/why-react.html>
-   "React: Rethinking best practices" (conference presentation video by Pete Hunt): <http://2013.jsconf.eu/speakers/pete-hunt-react-rethinking-best-practices.html>

# Using React with Backbone

-   <https://blog.mayflower.de/3937-Backbone-React.html>
-   <http://joelburget.com/react/index.html>
-   <https://usepropeller.com/blog/posts/from-backbone-to-react/>
-   <http://eldar.djafarov.com/2013/11/reactjs-mixing-with-backbone/>
-   <https://rawgithub.com/calebcassel/react-demo/master/part1.html>

# Other

-   Testing React code: <http://myshareoftech.com/2013/12/unit-testing-react-dot-js-with-jasmine-and-karma.html>
-   On React's DOM diffing algorithm: <http://calendar.perfplanet.com/2013/diff/>
-   Comparison of Angular and React (Quora answer by Pete Hunt): <http://www.quora.com/Pete-Hunt/Posts/Facebooks-React-vs-AngularJS-A-Closer-Look?share=1>
