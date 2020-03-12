---
title: On the 80-column limit
tags: development blog
cache_breaker: 1
---

How many times over the years have I agonized over the question of source code line lengths?

Too many, I think.

# The 80-column limit

When I first started programming I didn't really have any limit at all, but after a while adopted the "classic" 80-column limit. My reasons were probably a bit muddy back then; probably just vague ideas about "discipline" and conventions being a good thing because they encouraged consistent style and therefore better readability.

# The 132-column limit

But I was programming in [Objective-C](/wiki/Objective-C) with its prolix method signatures (like `initForURL:withContentsOfURL:ofType:error` and `performCustomValidationForEntityMapping:manager:error:`) and it was often quite difficult to keep under the 80-column limit, even when splitting the method calls across lines following the convention of aligned colons:

    - (BOOL)foo:(id)receiver error:(NSError **)error
    {
        return [receiver performCustomValidationForEntityMapping:mapping
                                                         manager:manager
                                                           error:error];
    }

That's 70 columns without even trying, and awfully long for such a simple method invocation. Add a level of nesting and some more descriptive variable names and you're already over 80 columns.

Not only were the method signatures long, but in Objective-C it's quite common to "chain" multiple message sends together using nested brackets (eg. `[[[NSMutableDictionary alloc] initWithCapacity:10] autorelease]`), so this only made the problem worse.

Keeping things under the 80-column limit often involved inserting line-breaks in uncomfortable places (harming readability) and wreaking havoc with my editor's auto-indentation feature (requiring constant manual tweaking and fighting against the editor).

But I didn't want to give up the discipline entirely and abandon myself to the unrestricted freedom practised in some Objective-C codebases, where some lines can stretch to be 200 characters, or more, long.

So I settled on a new limit, 132 columns, the next standard terminal size up from 80 columns. This was a pretty nice compromise; it allowed me to produce fairly readable Objective-C code that fit nicely in just about any terminal or editor window on my screen.

# The 80..132-column limit

In recent years I've been doing a fair bit of coding in [C](/wiki/C) and [Ruby](/wiki/Ruby) in addition to [Objective-C](/wiki/Objective-C). These languages aren't afflicted by Long Method Signature Syndrome and even though it _is_ fairly common to "chain" message sends in Ruby the method names are usually short enough that most code can fit under the 80-column limit fairly easily.

C, of course, is the easiest because by convention it uses fairly short function and variable names, and "chaining" in the form of nested function calls isn't such a common pattern.

Even [Rails](/wiki/Rails) code, which is often riddled with `find` calls burdened with lengthy, optional hash arguments, is fairly easily split up over multiple lines.

As a result of this I've been gravitating back towards the 80-column limit. That, and the fact that I've been participating on some mailing lists where code is swapped back and forth in the form of patches included inside plain-text emails, where keeping under 80 columns is much more important to ensure correct transmission and readability in all mail clients.

# It's all about readability

So of late I've found myself bouncing back and forth between the 80 and 132-column limits, depending on what language I'm coding in, and what my "target audience" is.

But it's still not a simple case of "80 columns for C and Ruby, 132 for Objective-C". I still run into situations from time to time, even in C, where I find that making things fit in less than 80 columns actually harms readability. For example, what's more readable? This (97 columns):

            if (rb_funcall(options, rb_intern("has_key?"), 1, ID2SYM(rb_intern("minimum"))) == Qtrue)
                min = rb_hash_aref(options, ID2SYM(rb_intern("minimum")));

Or this (70 columns):

            if (rb_funcall(options, rb_intern("has_key?"), 1,
                ID2SYM(rb_intern("minimum"))) == Qtrue)
                min = rb_hash_aref(options, ID2SYM(rb_intern("minimum")));

Evidently the first one is easier for a human to parse because it has a line-break in the logical place (_after_ the `if` condition) rather than in the awkward place (inside a list of function arguments inside the `if`).

To avoid that awkward line-break we could introduce a temporary variable:

            VALUE has_key = rb_funcall(options, rb_intern("has_key?"), 1, ID2SYM(rb_intern("minimum")));
            if (has_key == Qtrue)
                min = rb_hash_aref(options, ID2SYM(rb_intern("minimum")));

But that still doesn't get us under the line-length limit. We either have to introduce another awkward line-break:

            VALUE has_key = rb_funcall(options, rb_intern("has_key?"), 1,
                ID2SYM(rb_intern("minimum")));
            if (has_key == Qtrue)
                min = rb_hash_aref(options, ID2SYM(rb_intern("minimum")));

Or perhaps, depending on your style preferences:

            VALUE has_key = rb_funcall(options, rb_intern("has_key?"), 1,
                                       ID2SYM(rb_intern("minimum")));
            if (has_key == Qtrue)
                min = rb_hash_aref(options, ID2SYM(rb_intern("minimum")));

If we don't want any of those less-than-ideal line-breaks we could introduce even more temporary variables:

            ID method = rb_intern("has_key?");
            VALUE key = ID2SYM(rb_intern("minimum"));
            VALUE has_key = rb_funcall(options, method, 1, key);
            if (has_key == Qtrue)
                min = rb_hash_aref(options, ID2SYM(rb_intern("minimum")));

Now we're under the length limit, but we've cluttered things up with three temporary variables and it's now necessary to read 5 lines instead of 2 in order to figure out what's happening.

It _is_ true that narrow lines are generally easier to read for the human eye (which is why newspaper's publish their stories in multiple columns instead of a single wide slab), but for me the most readable of all these alternatives is actually the original, 97-column version.

So, for me, my current thinking is that we shouldn't be talking about "column limits" but rather "column guidelines". That is, I think an "80-column guideline" is great for C and Ruby, and a "132-column guideline" is great for Objective-C.

It's a _guideline_, a recommendation and not a hard limit, and before inserting line-breaks, introducing temporary variables, or otherwise refactoring the code, you should look at any line which exceeds the guideline and ask yourself "is this the most readable way of formatting this particular line?". If the answer is "yes", then you should keep the "long" line even though it exceeds the "limit". By all means, play around splitting the line and juggling things around, but in the end you should always choose the most _readable_ alternative. Nothing else matters.

Since I discovered [how to highlight overlength lines in Vim](/blog/highlighting-overlength-lines-in-vim) a few weeks ago, it's been quite pleasant to play with these guidelines because rather than having a single limit/guideline, Vim allows me to highlight the text in arbitrarily complex ways.

Right now I have it set up to switch to a subtle gray background as I approach the 80-column guideline; this serves as a "warning" that I am getting close. Beyond column 80 the background switches to a dark gray to advise me that I've actually crossed the limit. And if I am so bold as to blast past the 132-column "limit" then the background switches to a strident, "this time you've gone too far" red.
