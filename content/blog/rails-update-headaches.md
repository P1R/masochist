---
title: Rails update headaches
tags: rails blog
---

In [my rant](/blog/lack-of-stability-in-the-rails-ruby-ecosystem-rant) from the other day I was complaining about how trying to build an application on top of Rails and friends is like building on quicksand.

Let me provide a little bit of illustration from my current battle in moving from 2.2.2 to 2.3.0 RC1.

I don't have the time or the patience to go back and data-mine my development history charting the pain and suffering that each Rails update brings with it, but here is just a quick sampling obtained with `git oneline --grep='[Rr]ails'` (`oneline` is an alias for `log --pretty=oneline --abbrev-commit`).

Unfortunately these one-line commit subjects can't really hope to communicate the misspent time, frustration, and annoyance at doing mindless "busy work" rather than working on useful features and _application_ (not _framework_) bug fixes.

_Rails 2.3.0 RC1:_

    ee7f441... Rails 2.3.0: work around Sweeper autoloading bug
    51c949f... Rails 2.3.0: silence deprecation warnings
    f183ca8... Update to Rails 2.3.0 RC1

_Rails 2.2.2:_

    1b8ca39... Rails 2.2 fix: repair Haml "ugly" mode breakage
    c032fb1... Fix recent Rails breakage of template engines
    3f8ad3f... Better fix for Rails 2.2.0 model preloading breakage
    6985cb3... Update to Rails 2.2.2 (final release)

_Rails 2.2.1:_

    316221e... Update to Rails 2.2.1

_Rails 2.2.0:_

    35ded72... Fix Rails 2.2.0 breakage: route generation behaviour changed
    5ab0c87... Rails 2.2.0: remove now-redundant body_html method from Articles helper
    c992cda... Fix Rails 2.2.0 breakage: newly created Articles no longer have nil bodies
    c3d4a47... Rails 2.2.0: silence deprecation warnings for "default_error_messages"
    5191b28... Rails 2.2.0: silence deprecation warnings for "truncate"
    8a5a83c... Fix Rails 2.2.0 breakage (cache_template_loading has been removed)
    a5d0bdc... Kludge fix for Rails 2.2.0 breakage (broken extensions to ActiveRecord::Base)
    d93062f... Fix Rails 2.2.0 breakage (ActionView::TemplateHandler)
    12a6788... Fix Rails 2.2.0 breakage (cache_template_extensions removal)
    bfd9b00... Update to Rails 2.2.0 (first release candidate, broken)

_Rails 2.1.2:_

    4d49bca... Another fix for Rails bug #324
    bfa1d20... Re-apply private fix for Rails bug #324
    627d796... Update to Rails 2.1.2 (broken)

_Rails 2.1.1:_

    ca7578e... Fix Rails 2.1 breakage of wikitext templates
    3f793f2... Private fix for Rails bug #324
    c2509ed... Fix for Rails bug #1003 (rake gems:unpack breakage)
    77c346f... Update comments about Rails ticket #324
    a8a04e3... Update to Rails 2.1.1

_Rails 2.1:_

    d51249c... Back out the REXML vulnerability fix
    f6d7779... Silence deprecation warning triggered by RSpec 1.1.4
    3808f57... Update to Haml 2.0.2
    889fc07... Remove workaround or Rails ticket #275
    ae79cd6... Update to Rails 2.1

_Rails 2.1.0 RC1:_

    49e4217... Update application controller specs for Rails 2.1
    c2ac696... Fix Rails load ordering of frozen gems
    e1fe380... Fixes for Rails gems dependencies
    a73e850... Update to Rails 2.1.0_RC1

I was quite surprised when updating to 2.3.0 RC1 that all the specs continued to pass. One should never count one's chickens before they've hatched, however, as I have run into a couple of issues despite the fact that the spec suite passed. I _do_ have a lot of specs ("1019 examples, 0 failures, 23 pending"), but evidently you can never have enough...

The three unresolved issues that are currently robbing me of time that I would rather be spending on something else are:

1.  My cache sweepers stopped getting auto-loaded in 2.3.0: <http://groups.google.com/group/rubyonrails-talk/browse_thread/thread/323ff7ec2d95ee32/ab33ad8c16b300e5>
2.  Haml started complaining (not sure whether this is a bug in Haml, or provoked by a change in Rails): <http://groups.google.com/group/haml/browse_thread/thread/d4902a4d4d5de5aa>
3.  Atom feeds rendered using Builder templates are busted (they're being rendered inside the application HTML template): <http://groups.google.com/group/rubyonrails-talk/browse_thread/thread/d2d150c8219e5814>

Now, none of these issues are show-stoppers. They're either harmless or have known workarounds. But that doesn't make them any less annoying. They're time wasters. And every kludgey little fix that you use to wallpaper over the cracks is another layer of crud that accumulates in your app. Another blemish in the code base, brittle and fragile, waiting to be re-broken in a future update.
