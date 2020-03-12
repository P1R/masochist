---
title: Cucumber's plain text stories
tags: cucumber blog
cache_breaker: 1
---

There's something that I've always been skeptical about with regard to [Cucumber](/wiki/Cucumber) and it's plain text stories.

This is what I wrote in a comment on [David Chelimsky's blog](http://blog.davidchelimsky.net/) when he [first announced](http://blog.davidchelimsky.net/2007/10/21/story-runner-in-plain-english/) the plain-text story runner in what was then the [RSpec](/wiki/RSpec) "Story Runner":

> I will be extremely interested to see how this plays out when put into practice with real customers (ie. ones who don’t know Ruby but can edit a plain text file). For them there may be an illusion of free-form simplicity there (ie. the appearance that they can write just about anything), when in reality if they’re going to add new scenarios they still need to make sure that their plain text fits within the constraints defined by the matchers (which for them will be unintelligible).
>
> Only when put into practice will we know exactly how this interplay is going to work out. Evidently some of the time the customer’s scenarios will have to be tweaked, and some of the time the matchers themselves will need to be tweaked or augmented. At the moment exactly how this workflow is going to feel is up in the air, so I’m very curious to see if this turns out to be the Holy Grail of customer-authored acceptance tests.

Since I wrote that comment (back in October 2007) I've continued to hear to Cucumber referred to as this wonderful tool for customer-authored acceptance tests. But if you go beyond the enthusiastic weblog posts and undertake a quick perusal of the mailing lists and the Cucumber documentation itself you have to realise that properly writing these plain-text "stories" (now called "features"), is no less complex than writing good [Ruby](/wiki/Ruby), [C](/wiki/C) or other programming language code. The simplicity of "plain-text" is an illusion.

If you doubt this, just start with these pages on the Cucumber wiki and explore around for a little while:

-   [Feature-Coupled Steps (Antipattern)](http://wiki.github.com/aslakhellesoy/cucumber/feature-coupled-steps-antipattern)
-   [Conjunction Steps (Antipattern)](http://wiki.github.com/aslakhellesoy/cucumber/conjunction-steps-antipattern)
-   [Step Organisation](http://wiki.github.com/aslakhellesoy/cucumber/step-organisation)

Writing stories/features, even the plain-text portion, is a non-trivial task. Non-programmers can certainly do it, but to actually produce _good_ features is another matter entirely: to do so you need to understand the entire stack from top to bottom (the plain-text features, the underlying [Ruby](/wiki/Ruby) steps, and the mechanics of the application under test as well).

The [official Cucumber site](http://cukes.info/) certainly isn't telling any lies about how easy it is to use Cucumber, so I am not sure how this "customer-authored" mythology has spread so far and been so resistant. The site describes the plain-text format as a "_business-readable_ domain-specific language" (note the emphasis on _readable_ and not writeable) and indeed the whole site is very clearly targeted at programmers, written in a language that programmers can understand.
