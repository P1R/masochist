---
title: Lack of stability in the Rails/Ruby ecosystem (rant)
tags: rspec ruby rails capistrano blog
cache_breaker: 1
---

Please bear with me. This is going to be a rant. I'm suspending the usual rationality, objectivity, and verifiability standards and giving full vent to my most visceral impulses. Stand back a few paces; I wouldn't want to see anybody get flecked with the speckles of foam soon to start describing outwards arcs from my mouth.

For some time now I've been feeling frustrated at the lack of stability in the [Rails](/wiki/Rails) ecosystem. Here I'm using "ecosystem" to refer not only to Rails itself and a bunch of related tools (like [RSpec](/wiki/RSpec)), but the wider community of Rails/[Ruby](/wiki/Ruby) programmers, and even the Ruby language itself. Seeing as this is a rant and its primary purpose is to vent, I'm not going to get into a minute analysis of the "whos", "hows" and "whys" of the problem; I'm just going to remark on the principal trends as I see them.

-   Newness, trendiness, fashionability, fads and bandwagons are all overly valued, to the exclusion of other useful attributes like stability, solidity, continuity. While this might be fun for a hobbyist, for someone trying to build a business on top of solid infrastructure it's a nightmare.
-   Rails, the framework, is at the forefront of this culture of hyping the new and the trendy. Witness "Edge Rails" and the glorification of "living on the edge"; in other words, a marketing exercise designed to make running _experimental_, volatile, potentially unstable software seem glamorous. This is crazy. As a _framework_, Rails should be exhibiting entirely different tendencies (promoting stability, dependability, and a solid foundation).
-   RSpec suffers a similar ailment, but as a testing framework it should be running in the opposite direction. It should be stable, consistent, unchanging, reliable, dependable. Instead, it is constantly churning, metamorphosing, introducing new features and syntax, deprecating and ripping out others, swapping in one (rapidly churning) story framework (version 0.16, of course) for another (isn't one of the cardenal laws of development to work via incremental changes rather than doing "let's throw out everything and start from scratch" rewrites?).
-   [Capistrano](/wiki/Capistrano): another piece of mission critical infrastructure (what could be more important than the ability to actually, er, deploy your software?) which is again churning so rapidly for no discernible reason other than to entertain the contributors, that if you dare update it you are almost guaranteed to break your deployment ability. (This is why I'm forever frozen at Capistrano 2.2.0.)
-   The entire community is utterly sick with this insane craze for the "latest and greatest" (first Rails itself, then countless other examples ranging from [Git](/wiki/Git) and GitHub through to [nginx](/wiki/nginx) and later Phusion Passenger), but that would be tolerable if the key vendors (those behind Rails itself, for example) showed a little more responsibility instead of epitomizing the problem.

Basically, the reckless "innovation" and experimentation is occurring at the wrong level: this kind of play should be happening in _applications_, not inside frameworks that people are trying to use as _foundations_ upon which to build stuff. We want to walk on concrete, not on frickin' quicksand.

Sadly this fever has even started to take root in the Ruby language itself of late. A lot of people, some of them very prominent within the community, are [unhappy](http://groups.google.com/group/comp.lang.ruby/browse_thread/thread/21a18eb26fb2d055) about how breaking changes are being _backported_ into the "stable" Ruby 1.8.x branch. It's just crazy stuff.

Can you remember the last time a Rails update did _not_ break something in your apps? For me _every single_ update requires multiple patches, modifications and workarounds to "fix" formerly-working code suffering from update-induced breakage. For this reason I stopped referring to the updates as "upgrades" a long time ago. The word "upgrade" carries with it psychological baggage, the connotation of desirability or goodness, but all too often said "upgrades" really just bring pain and suffering. Let's call a spade a spade then; these are _updates_ and that's all.

The amount of breakage I see is all the more shocking because I am an extremely conservative consumer of the code: I don't do weird things with the framework, I stay well within the delimited boundaries, I don't "fight" the framework, and I am supposedly only tracking "stable" releases.

Now I'm just waiting for the day when the update-lust of the Rails ecosystem drives me to update to Ruby 1.9 in order to be able to run Rails at all, and regrettably running the latest will always be the only way to keep on top of the latest security vulnerabilities.
