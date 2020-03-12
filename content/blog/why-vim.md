---
title: Why Vim
tags: vim blog
cache_breaker: 1
---

One of the most common arguments for why [Vim](/wiki/Vim) is worth learning is that, once mastered, it will improve your editing speed. This is normally met with the counter-argument that editing speed is not usually the bottleneck during software development.

While that may be true, I don't think it applies always.

# Editing speed _is_ important

Maintaining "flow" is important. Staying "in the zone" makes you more productive. The more you can minimize the delay between conceiving an idea and executing it, the better you'll be able to maintain flow.

The impact of small inefficiencies is multiplied when you need to make many small, repetitive changes across a region of a file, an entire file, or a whole codebase. The more time you spend doing these rote, mechanical, menial chores, the more likely you are to get distracted, zone out, or just make mistakes.

This is especially true for a language/framework combination like [Ruby](/wiki/Ruby) and [Rails](/wiki/Rails), where the lack of static typing severely limits how "intelligent" our IDEs can be when it comes to things like automated refactoring. While it's true that we can customize editors like Vim with plug-ins for things like tag navigation, snippet injection, automatic formatting and such, and tools like RubyMine do their best to provide as close as possible to the "real" IDE experience possible with languages like Java and Objective-C, as Rails programmers we can expect to have to do a fair bit of manual text massaging as part of our day-to-day work. Speed is important.

But this is not the only argument in favor of Vim-style editing.

# Semantic editing

When editing text in Vim you're much more likely to be thinking about manipulating text in semantic terms. You think "change this variable name up to that underscore; switch those surrounding single quotes to doubles; highlight all occurrences of the word under the cursor to see if I missed any in this file; let's add a comment above this line" etc.

Those high-level intentions generally map directly onto extremely concise, richly semantic commands. For example, "change this variable name up to that underscore" would map to "ct\_" ("change to/til underscore").

In contrast, in most other editors your end up interleaving those intentions with strings of completely mechanical, meaningless commands. "Change this variable name up to that underscore" becomes "Let's change this variable name up to that underscore; shift-right, right, right, right, right, right, right, enter new name".

This constant stream of background, mechanical, drone-style editing makes you much more likely to drift off into automatic pilot. In Vim, on the other hand, your mind is constantly engaged thinking in an extremely focussed fashion on the changes you wish to make to the text, and translating them directly into editing actions that map precisely onto your intentions.

Not only does this make you more switched on, it's also fun.

# Health

I've been coding since I was a little kid. 28 years and counting. I hope to continue doing so for a long time.

Vim's more efficient editing model (doing the same amount of work with fewer keystrokes) means that I'm less likely to suffer from RSI or other typical health problems that stem from constant use of a computer keyboard.

# Conclusion

So, for me, Vim makes the right trade-offs. It's optimized for raw editing speed and power. I find the underlying model incredibly elegant.

On the other hand, I recognize that there are other great editors out there, even though I personally don't find them compelling. I know great coders who have made different choices, and I don't think them any less brilliant for it.

I generally think that many people are too quick to dismiss Vim before they've really taken the time to grok it. Based on observation of people around me, I'd say that many people learn only enough to get them up to relative parity with how fast they used to be on their old editor. I think people who stop there can't say they've "grokked" Vim.

Then there are another class of individuals who tirelessly explore every nook and cranny of Vim's potential and keep progressing to ever higher levels of "editor Zen-ness". These people "get" it. The great thing about Vim is that even if you do this for literally years, there is likely still much to learn and even higher levels of editing bliss that you can attain.
