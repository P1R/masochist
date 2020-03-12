---
title: Kool-aid-drinking Rails "fanbois" flocking to Phusion Passenger in inebriated droves
tags: nginx passenger blog
cache_breaker: 1
---

Ok, the post title was just to grab your attention.

I just saw the [latest Netcraft survey](http://news.netcraft.com/archives/2009/02/18/february_2009_web_server_survey.html), and with a pang of nostalgia noted that my beloved [nginx](/wiki/nginx)'s market share fell by 0.27% in the month since the previous survey.

No doubt most, if not all of the 14,955 sites which abandoned nginx where Rails ones defecting to Phusion Passenger, just like political dissidents escaping across the Iron Curtain during the Cold War, into the open arms of the capitalist free market. Erm. On second thoughts that's probably not the best analogy; I don't know how much the average Rails developer has in common with a Soviet political dissident (although on the other hand, Passenger is definitely a textbook example of marketing).

I'm told Passenger is pretty easy to set up and manage. I hope for the sake of the nginx developers that this is not a permanent downwards trend, and that they start making modest market share gains again in the future.

Me, I'm sticking with nginx. Although setting it up _does_ require some research for the uninitiated, there's simply nothing out there that can touch it for performance or memory efficiency. The memory usage in particular, is just _insanely_ low (680KB resident, 10MB virtual, and leak free so it can run for months without bloating).
