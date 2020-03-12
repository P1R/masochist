---
title: 10 minutes with Vim
tags: emacs vim blog
cache_breaker: 1
---

As [promised](/blog/0-minutes-with-vim), here's an update with some first impressions of [Vim](/wiki/Vim):

-   Incremental search is a must: turn it on with `:set incsearch` (or `set incsearch` in your `~/.vimrc`); this gives you the "find as you type" functionality that you get in Firefox and Safari, and which Emacs gives you with `C-s`.
-   Search highlighting rocks: to incremental search add `:set hlsearch` and you'll find _all_ instances of the search string highlighted in the editor view (like Firefox and Safari); very helpful.
-   Tabs have a very nice "look and feel" but will take some getting used to because they are _not_ like tabs in Safari or TextMate. In the latter, each tab represents a document, and switching between tabs is equivalent to switching between documents. In [MacVim](/wiki/MacVim), a tab is merely a way of grouping together in a single window what would otherwise be a collection of separate windows. There is no concept of "identity" in each tab; a tab doesn't correspond to a particular document, it merely shows the buffer that you tell it to show (you can, for example, be looking at a document and then start looking at another in the same tab, and then switch back and forth between them). This is because Vim shares Emacs' notions of "buffers"; you can have any number of buffers, any number of windows, and there is no one-to-one correspondence between the two entities. Basically, a window is just a viewport into a document. You can use one viewport to look into many documents, and you can also use multiple viewports to look into a single document. Not sure if I explained that very well, but it all means that the semantic notion of what we are consider to be a "tab" might need some adaptation in this context where `tab != document`.
-   A bunch of color schemes are included (no need to download them as you have to with Emacs), but I'll need to find one with my preferred "legal pad yellow" background.

This, of course, isn't my first experience with the [Vim](/wiki/Vim) world.

Like most UNIX users, I've had to use both `vi` and [Emacs](/wiki/Emacs) at various times just because one or the other happened to be the default editor on the particular machine I was working on at the time. In both I knew how to edit text and how to save files, but I didn't know any advanced tricks and most certainly wouldn't feel comfortable working in either as my full-time coding editor.

My experience with `vi` was such that I considered it the more "alien" of the two editors, because of its modal interface. In my entire 25-year history as a computer user `vi` was the _only_ modal editor I'd ever used, next to countless modeless ones.

We look on modal editors as strange beasts now, but the funny thing is that there was a time when they were completely normal. If anything, the first modeless editors were the ones which were strange beasts in their day.

It would be a mistake to consider the modal editor as a primitive paradigm which was eventually replaced by a superior one. We don't have one primitive and one superior paradigm; what we have are just two _different_ paradigms. In reality, modal editing just represents another, equally-valid philosophy about how a human should interact with a computer. It turns out that the modeless philosophy won the popularity contest, and now almost all editors in use today are modeless, but both approaches really do have their benefits.

Having been dabbling with Emacs for a couple weeks now, I was in a way prepared to try Vim again with fresh eyes. One of the ways in which I'm "prepared" is that I'm already pretty sick of holding down modifier keys and typing in chains of combinations in order to get things done.

Let me illustrate with an example; but before I get into that, a disclaimer. I _know_ you can set up whatever key bindings you like if you're not happy with the stock standard combinations; but if you do that you'll need to carry around an `.emacs` file with you wherever you go or you'll turn into a slow, clumsy hunt-and-pecker as soon as you have to use somebody else's computer. So my criticism here is of the Emacs defaults, not of Emacs itself, and it's really just me complaining about how those defaults don't suit _me_. Please don't interpret this as an attack on your favorite editor.

In any case, on with the example.

In Emacs you save a file using `C-x C-s`. In Vim you do `:w`. For me, Vim's mnemonic ("w" for "Write") is easier and more natural than Emacs' ("s" for "Save") even though the Emacs one corresponds with the "Save" terminology that I've used on the Mac and Windows for over a decade now.

The reason the Emacs one doesn't strike me as "natural" is because it's trapped inside the dratted `C-x` "namespace". I say `C-x` is like a namespace because it's a container, a prefix that you prepend to all commands of a certain class; even though the command you really want is "save", you first have to think about the "wrapper" which in this case is "x". So you need a mnemonic for the wrapper too; here I'm thinking "eXecute", for "do something". (And unfortunately, "eXecute" is overloaded anyway because it's also what I use for `M-x`, the binding used to pull up a prompt for entering an arbitrary command.)

To open a file you're in the same namespace, and your command sequence is `C-x C-f`. Here my mnemonic is "eXecute/do 'Find file'", when really I'd prefer it to be just "Find". Heck, "Open" would be better still, of course. (Did I mention that the "find" command also happens to be what you use to create a new file for editing, as well?) Vim here uses `:e`, for "edit", which is nice I guess seeing as, just as is the case with Emacs, you use the same command for opening an existing file as for editing a new, unsaved file.

But in Emacs you're almost always in a namespace. Getting help, for example is always in the `C-h` namespace (logical enough, isn't it?).

This has a great appeal to the programmer, doesn't it?, with our love of organization and logic. Namespaces rock. The problem is that they only rock for code. They don't rock too hard for user interfaces.

With Emacs key bindings, you're always having to "drill down". This all becomes muscle memory after a while, I'm sure, but the initial stages are slow. All of this led me to feel a near constant sense of frustration with Emacs, that I was being made to do things the hard way, and the knowledge that it would eventually become automatic didn't do anything to soothe my immediate irritation.

You don't see this namespacing so much in Vim. If you do see it, you see it for the obscure corners of the command set, the stuff you don't necessarily need to use all that frequently, and certainly not for things so utterly basic and fundamental as saving and opening files.

Vim mnemonics might _look_ like namespaces sometimes at first glance, but in reality they're not. Let's take an example.

Just say you have a line like this in your code:

    int fooBarText = 0;

Let's imagine the cursor is on the `f` and you want to replace `fooBar` with `source`. There are many ways you might achieve this. For example, you might do:

1.  Delete the text from the cursor up to, but not including, the `T`
2.  Insert `source`

The command for deleting up to but not including the `T` in Vim is `dtT`, or "delete til T". The "d" isn't really a "namespace" at all in the way that `C-x` is in Emacs; its literally just the verb that you'd like to perform: "delete". And logically, we follow our verb "delete" with a specification of _what_ we want to delete ("til the T"). So basically the mnemonic reads just like spoken English. It's not like `C-x` where the "x" really has nothing to do with the verb that you're really interested in performing.

These Vim mnemonics are really easy to pick up. After you've done the example you realize that perhaps there is a quicker way than the one you chose, because although the deletion was very quick and easy, you _then_ had to explicitly drop into insert mode in order to type `source`.

Sure enough, Vim has a command that behaves much like `d` ("delete"): `c` ("change"). This will delete the text you specify, but drop you in insert mode automatically so that you can start typing the replacement text immediately instead of hitting `i` first.

So the command here is, you guessed it, `ctT`, or "change til T". Once you've learnt a small handful of Vim commands you'll find that you're able to guess a large number of others by intuition alone. You can guess Emacs key bindings too, but it will usually rely on your logic rather than your intuition.

Perhaps you're thinking that you would have done a "find and replace" instead. Perhaps that would be quicker. In Vim you could do this with `:s/fooBar/source/`, and I'm sure you can do the same kind of thing in Emacs too. But I don't think that's the way humans really want to make this kind of one-off local change.

For one thing, when you see a word and want to change it, your brain doesn't think "I am going to search for that word and replace it with another". Of course not! Your brain actually thinks exactly what has already been stated, "I want to replace that word with this one". You can see how the "change til" command maps extremely closely to what your brain is actually thinking about doing.

There _is_ a time and a place for find-and-replace, but this is not that time. You're making your mind jump through a little mental hoop in rephrasing "change this word" as "search for this word and replace what you find with this". Why "search" for something that you can see right in front of you, with the cursor already at the point?

And why type `:s/fooBar/source/` when you could get away with `ctTsource`?

Now let's talk about movement keys.

Emacs makes a big deal of providing you with bindings on or near the home row for the four basic movement directions (up, down, left and right). The rationale is that having to move your hand, even if only far enough so that you can reach the cursor keys with your pinkie, is an inefficient waste of your time.

Vim agrees, of course, because it shares Emacs' obsession with efficiency, and to that end uses `h`, `j`, `k`, `l` for movement.

There is no effort to justify this choice in terms of mnemonics. `h` is on the left, so that's the key that moves you left; `l` is on the right, so that's the key that moves you right. You're not supposed to think about the keys at all; you're just supposed to train yourself to rest your right hand where it belongs on the home row and use those keys for movement without thinking. Because of their positioning, what `h` and `l` do is _extremely_ easy to learn; you'll pick it up in about 60 seconds even if you have decades of muscle memory urging you to move your hand towards the cursor keys.

The 'j' and 'k' keys, however, may require some effort to train up. `j` takes you down; perhaps you can visualize it as a down-pointing arrow. Perhaps the fact that your dominant index finger rests on the `j` will help, whereas your weaker middle finger rests on the `k`, seeing as the direction we most often move in text files is downwards (at least with our eyes! English is a top-to-bottom language so we tend to have a downwards orientation when we scan it).

In practice, these keys work _great_, not just on the home row but actually right on the home keys themselves.

Let's look at the Emacs bindings now. Emacs continues its pattern of privileging logic and order here. The bindings are not chosen because of their spatial arrangement on the keyboard, other than the already stated goal that they be "on or near" the home row.

So we have Control-B ("back") for left, Control-F ("forward") for right, Control-N ("next") for down, and Control-P ("previous") for up.

Each of these pairs is a lovely, logical dichotomy in itself: forward/back is perfect, symmetrical pairing of opposites, as is next/previous. But between the two pairs there is no logical relationship: forward/back evokes space, but next/previous evokes ordering. There is certainly nothing about the terms which suggests a perpendicular relationship.

I don't know how other people think about movement in a text document, but at least the way _my_ brain is wired, I think of "up, down, left and right". That is, I think, "I'm going to move this _up_ a few lines", or, "I want this further over to the _right_".

I most definitely _don't_ think in terms of, "I'm going to move this a few line _previous_", nor, "I want this to be further _forward_".

Training my fingers to learn the Emacs movement keys was en exercise in mental gymnastics and concentration because I had to constantly maintain in my mind's eye an image showing how the Emacs terms of "forward/back/next/previous" mapped on to my "native" internal representations of "right/left/down/up". These mapping can definitely be learned and made entirely automatic, but the question is, _why_?

Now look at your keyboard and observe where the keys actually are. Emacs' love of logic leads to the keys being distributed in a skewed fashion half-way across the keyboard. Only one of the keys is actually on the home row. Two are below the row and one is above it. The two keys which _are_ next to each other, `b` and `n` ("back" and "next") each belong to a different dichotomy or axis.

And of course, to actually use these keys you need to hold down a modifier key, Control. Try it. Now try moving up, down, left, right, right, down, up, right, left, down, up, up, as quickly as you can. How did that feel?

Even if you've followed the popular recommendation of remapping your Control key to one of the more comfortably-reached modifier keys like Caps Lock (again sabotaging your muscle memory and setting yourself up for pain whenever you have to use somebody else's machine), I am highly doubtful that anybody reading this will have felt, er, agile while trying those key combinations. If you're an Emacs expert who has put in the hard yards, then of course you will have attained agility: but how much hard work did it take? Was it worth it to be able to say that you belong to the select few that have passed the test?

So I think Vim definitely got the movement keys _right_. Emacs is a modeless editor, so the modifier is a necessary evil; but the choice of the keys themselves was very unfortunate...

The "price" that Vim pays for having such great movement keys is that you can only use unmodified key presses like that for movement in a modal editor. I could offer literally dozens, perhaps even hundreds of examples, where Vim offers absolutely _awesome_, intuitive, fast ways of doing things, precisely because it is a modal editor and can use simple, unadorned key presses. The "price" is that whenever you want to "just enter text", you have to switch to the appropriate mode.

Do the efficiency gains outweigh the "overhead" of switching between modes?

Well, after 10 minutes of using Vim, I suspect that they do, at least for me. There are _already_ things that I can do faster in Vim than I could after two weeks of practising in Emacs. And Vim is full of nice little shortcuts that specifically seek to eliminate that "mode switching overhead" I just mentioned (as one example, the "change" family of commands I referred to earlier, which does something and immediately dumps you in insert mode so you can start typing).

For years whenever I used Vim I could never imagine myself using a modal editor in any serious way; I thought it was a historical curiosity more than anything else, something that veterans continued using because they'd already done the hard work of attaining mastery, and something that newbies dabbled in because they enjoyed the "challenge" of learning a new paradigm just for fun.

But after two weeks of using Emacs, and not just using it, but trying to be faithful to the Emacs "way", I really do think that Emacs prepared me for the switch to Vim. After two weeks with Emacs, learning how to get in and out of modes, and learning key strokes to get things down efficiently actually seems _easy_. I can assure you this never would have seemed _easy_ without that Emacs experience to contrast. Here I'm talking about both physical _and_ mental ease; the key strokes themselves are ergonomically distributed, and the gap between concepts in my mind and how they're mapped out in the software is much smaller. Neither physical nor mental contorsion is required.

It also prepared me with respect to extensions. I had really only just scratched the surface with Emacs, but I had installed a few things.

Let's take line numbers, for example. In Emacs, I had to find the appropriate extension on the Internet, download and install it, and then add some configuration directives to my `~/.emacs` file. In Vim I just had to type `:set number`, and stick it in my `~/.vimrc` if I wanted it to be permanent.

The Emacs `linum.el` extension itself? Well, it's a double-edged sword. On the one hand I don't have much hope of fully understanding, let alone modifying and enhancing, without investing considerable time learning Emacs Lisp. On the other hand, at least I know that I _can_ learn Emacs Lisp if I need to and alter almost _any_ aspect of the editor's behaviour.

I know Vim is highly customizable too, but without even having opened the covers I am pretty confident that it simply _can't_ compete with Emacs in terms of customizability. As such, there's a little gnawing worry at the back of my mind that I'll love Vim but will eventually run into some kind of deal-breaking glitch that I won't be able to fix.
