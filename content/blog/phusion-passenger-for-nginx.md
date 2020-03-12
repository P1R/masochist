---
title: Phusion Passenger for nginx
tags: rails nginx passenger blog
cache_breaker: 1
---

Geez. [This news](http://blog.phusion.nl/2009/04/16/phusions-one-year-anniversary-gift-phusion-passenger-220/) surprised the hell out of me.

I have (and have had for over a year) a very nicely working [nginx](/wiki/nginx)/[mongrel](/wiki/mongrel) setup, so when Passenger made its initial splash I wasn't really interested at all. Neither nginx nor mongrel have ever given me any trouble at all (and I really mean _any_ trouble at all), and if it ain't broke, don't fix it, right? On top of that, I _love_ the solidity and miniscule resource consumption of nginx. So there was really no way I would swap out my existing, proven setup for a first-time Apache module written by a couple of youngsters with a knack for hype-saturated marketing.

But this new announcement is very interesting indeed. Passenger was already enjoying good uptake by the Rails community, ever keen as it is to embrace the latest and, er, the latest. But this unexpected move by Phusion will doubtlessly bring even more converts, especially in the face of the fact that Mongrel is basically a finished product ("finished" in the sense of "completed", not in the sense of "ruined") which hasn't seen any updates in a long, long time.

I still don't see myself switching away from [nginx](/wiki/nginx)/[mongrel](/wiki/mongrel) any time soon, but now that Phusion actually has a year's track record under its belt and using it would no longer require me to dump my beloved nginx, it's graduated from the "[no way, never!](/blog/kool-aid-drinking-rails-fanbois-flocking-to-phusion-passenger-in-inebriated-droves)" list to the "things to keep an eye on in the future" list.

# Update: 25 minutes later

[Ezra Zygmuntowicz](http://brainspl.at/), the man who probably knows more about Rails deployment than anyone else, had this to say in the comments on the [announcement](http://blog.phusion.nl/2009/04/16/phusions-one-year-anniversary-gift-phusion-passenger-220/):

> I’ve been working with Hongli to get passenger for nginx tuned and tested in production and I must say I am very impressed. This release melts away any concerns I had and makes passenger pretty much the best way to run your ruby apps. There are still a few things that mongrel or thin are better for(amqp ahem) but if your app works on nginx+passenger then it is what you shoudl use. Performance is great, management is \*way\* easier then mongrel + monit.
