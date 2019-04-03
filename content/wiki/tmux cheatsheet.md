---
tags: tmux wiki
cache_breaker: 1
---

Not a comprehensive cheatsheet, but stuff that I keep forgetting and want to remember:

# Mappings

-   `[prefix] C-o`: rotate windows within the current pane
-   `[prefix] {`: swap pane (to the left)
-   `[prefix] }`: swap pane (to the right)
-   `[prefix] "`: vertical split (I have this remapped to `[prefix] |` and `[prefix] \` for convenience)
-   `[prefix] %`: horizontal split (I have this mapped to `[prefix] -` for convenience)

# Commands

-   `:clear-history`: clear scrollback buffer of currently selected pane
-   `:break-pane`: break current pane into a new window
-   `:join-pane -t [window]`: inverse of `:break-pane`

# Recipes

## Go back to previous layout

-   `:select-layout -o` ([source](https://github.com/tmux/tmux/issues/859))

## Move current window to the left/right =

-   `:swap-window -t +1`: move to the right
-   `:swap-window -t -1`: move to the left

## Swap the current window with another

-   `:swap-window -t N`: swaps current window with window at N
-   `:swap-window -s N -t M`: swaps window at M with window at N

## Jump to previous/next window =

-   `:previous-window` or `[prefix] p`
-   `:next-window` or `[prefix] n`

I wanted to be super clever here and make use of, say `[prefix] [` and `[prefix] ]` to echo the familiar shortcuts for jumping between tabs, but that would class with the standard bindings for entering copy mode and pasting.

I considered instead binding to `[prefix] C-[` and `[prefix] C-]`, but is too subtle and close to the copy mode bindings, making it easy to do the wrong thing. Oh well.

# Miscellaneous

- `:set -w synchronize-panes on`: send same input to all visible panes (except panes in a separate mode).
