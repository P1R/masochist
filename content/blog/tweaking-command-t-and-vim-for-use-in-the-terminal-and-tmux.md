---
title: Tweaking Command-T and Vim for use in the terminal and tmux
tags: vim command.t tmux blog
cache_breaker: 1
---

For a long time I used [Command-T](/wiki/Command-T) principally only inside of [MacVim](/wiki/MacVim). Partly because the version of [Vim](/wiki/Vim) that comes with [Mac OS X](/wiki/Mac_OS_X) doesn't have the necessary [Ruby](/wiki/Ruby) support, and partly because MacVim has some niceties that make it pleasant to use compared to using [Apple's](/wiki/Apple%27s) `vim` inside [Terminal.app](/wiki/Terminal.app):

-   MacVim supports 256-color schemes out of the box
-   Key bindings simply work; you can even set up ones like "Command-T"
-   It has a nice full-screen mode
-   You can get fast-and-easy context switching between your editor and the terminal with "Command-Tab"

Starting in 2011, however, I've spent a fair bit of time beating the [command line](/wiki/command_line) version of Vim into shape and making it work the way I want, even over [SSH](/wiki/SSH) connections or inside [tmux](/wiki/tmux) sessions. It's now about basically the whole way there.

# The Terminal

[iTerm 2](/wiki/iTerm_2) is really the only way to go here. It is not as fast as [Terminal.app](/wiki/Terminal.app), the search highlighting is infuriatingly hard to read (and there appears to be no way to set a preference for the direction of the search), and it is _very_ occasionally unstable (but not often enough to really interfere with you getting your work done), but it has 256-color support (more importantly than this though, it has easily configurable and loadable color schemes, which means you can get color schemes like [Solarized](/wiki/Solarized) up and running and looking nice with ease) and does all the right things as far as things like mouse support are concerned.

I have iTerm 2 set up to report itself as `xterm-256color` and also do "Xterm mouse reporting".

# Key bindings

Terminals are tricky beasts, especially when it comes to key bindings. They do "crazy" things like sending your cursor key presses as escape sequences (eg. the "up" arrow might be transmitted to the terminal as `<ESC>OA` or something similarly contrived to make Vim execute an undesirable set of operations).

This is why I added the ability to configure custom mappings for [Command-T](/wiki/Command-T), so that users could workaround the idiosyncrasies of their terminal to get the desired mappings they wanted. With a handful of settings in my `~/.vimrc` I was able to get the `<ESC>` and cursor keys to do the right thing in the terminal:

    set ttimeoutlen=50

    if &term =~ "xterm" || &term =~ "screen"
      " as of March 2013, with current iTerm (1.0.0.20130319), tmux (1.8)
      " and Vim (7.3, with patches 1-843), this is all I need:
      let g:CommandTCancelMap     = ['<ESC>', '<C-c>']

      " when I originally started using Command-T inside a terminal,
      " I used to need these as well:
      let g:CommandTSelectNextMap = ['<C-j>', '<ESC>OB']
      let g:CommandTSelectPrevMap = ['<C-k>', '<ESC>OA']
    endif

In my `.zshrc` I have the following to prevent accidental presses of `<CTRL-s>` from taking over the terminal. This has the side-effect that I can use `<CTRL-s>` again in [Command-T](/wiki/Command-T) to open a selection in horizontal split. (I would use `<CTRL-Enter>`, but alas, the terminal sends exactly the same key code for that as it does for `<Enter>`, so the two are indistinguishable.)

    stty -ixon

\[This same command will work for [Bash](/wiki/Bash), in a `.bash_profile` as well.\]

iTerm is configurable enough that I believe I could get it to send a custom sequence for `<CTRL-Enter>`, but I haven't yet figured out what that should be.

# Mouse-a-bility

Getting the mouse to not only work in a local copy of [iTerm 2](/wiki/iTerm_2) running on my Mac, but also on remote machines accessed via [SSH](/wiki/SSH) and possibly running [tmux](/wiki/tmux) sessions was a little trickier.

First up, I needed something like this in my `~/.vimrc`:

    if has('mouse')
      set mouse=a
      if &term =~ "xterm" || &term =~ "screen"
        " as of March 2013, this works:
        set ttymouse=xterm2

        " previously, I found that ttymouse was getting reset, so had
        " to reapply it via an autocmd like this:
        autocmd VimEnter,FocusGained,BufEnter * set ttymouse=xterm2
      endif
    endif

And this in my `~/.tmux.conf`:

    # mouse can be used to select panes
    set-option -g mouse-select-pane on

    # mouse can be used to select windows (by clicking in the status bar)
    set-option -g mouse-select-window on

    # mouse can be used to resize panes (by dragging dividers)
    set-option -g mouse-resize-pane on

    # not really sure what this does, but with it, the scrollwheel works inside Vim
    set-option -g mouse-utf8 on

    # allow mouse to enter copy mode and initiate selection
    set-window-option -g mode-mouse on

    # I originally had this as screen-256color, but this works
    # out-of-the-box in more places
    set -g default-terminal "screen"

# Clipboard

With this I can do pretty much anything I need, including selecting text in Vim (for copying using tmux's copy buffer) and scrolling with the mouse scroll wheel. Depending on the exact need I have, I can either copy using tmux's copy mode (ie. with `<prefix>[` and friends), or make a selection while holding down the Option key that I can get into the [Mac OS X](/wiki/Mac_OS_X) clipboard with the usual Command-C. Note that even when dealing with vertical splits I can still select text pertaining to a particular split by holding down both Option and Command to force a rectangular selection. Things like Option and double-click work to select single works, which is usually faster than navigating using the keyboard and tmux's copy mode.

For those cases where this won't cut it, I ended up writing a tool called [Clipper](/wiki/Clipper) that provides me with transparent access to the local system clipboard inside [tmux](/wiki/tmux), [vim](/wiki/vim) and on the [command line](/wiki/command_line) in general, both locally and when on remote hosts via [SSH](/wiki/SSH).

# Xterm bracketed paste mode, focus events for tmux, custom insert-mode cursors

With some complicated shenanigans (see [my dotfiles repo](https://github.com/wincent/wincent) for the details) you can get Vim to recognize when something is being pasted in and automatically enable paste more. Likewise, you can get Vim and tmux to share focus gained/lost events, which means that you can unlock the full power of `:checktime` and `'autoread'` (see the corresponding entries in the Vim help). Finally, you can also get Vim to change the cursor on entering insert mode and revert to normal on leaving insert mode. All of this is possible locally, inside tmux, over an SSH session on a remote host, or a combination.

# Gotchas

-   on machines without a "screen-256color" terminfo entry, I had to copy one over (into `~/.terminfo/s/screen-256color`); I originally ran with "xterm-256color", despite the warnings in the tmux FAQ, as it tended to work pretty well anyway
-   after a while I settled on running "screen" as my `$TERM` inside tmux, regardless of whether the outer terminal was actually "xterm-256color"; Solarized still looks great; this requires setting `t_Co=16` in my `~/.vimrc`
-   changes to `default-terminal` in `~/.tmux.conf` don't take effect if you already have a tmux session running (ie. a tmux server is running), even for new sessions; you have to exit all sessions, or manually run the `set` command yourself

# Conclusion

As I said above, this gets me basically the whole way there. With this set-up I have high mobility and convenience with both keyboard and mouse, irrespective of whether I am working locally or remotely.

I also have cheap "context switches" in the form of keyboard shortcuts to move back and forth between tmux windows (eg. I have `C-a C-a` to toggle back to the last-used window) and panes (eg. the standard Vim-like movement keys `C-a h`, `C-a j`, `C-a k` and `C-a l`).

As a bonus all of this works with the mouse too, as I can use it to quickly select panes and even resize them in addition to being able to scroll, select text, and copy with great flexibility.

The downsides? As I mentioned earlier, I can't make a mapping for `<CTRL-Enter>`. Another bummer is that [Solarized](/wiki/Solarized) color support in the Ubuntu/Gnome terminal is not so great, on those occasions when I need to log in from a Linux machine \[which, since I originally wrote this article, has dwindled to basically never).

All in all, though, this gets me very close to where I need to be, and the ability to do all my stuff on a remote workstation and just log-in to it from a laptop or another machine from anywhere is a wonderful convenience.

# Note

I regularly make improvements to this set-up, but I likely won't remember to come back and update this blogpost; see [my dotfiles repo](https://github.com/wincent/wincent) for the latest hotness.
