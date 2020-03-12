---
tags: vim wiki
cache_breaker: 1
---

# "Progammatic" technique

I use this technique for "programmatically" rebalancing the three columns in the "AUTHORS" section of the [Command-T](/wiki/Command-T) documentation.

First, select the lines containing the author listing, then split it on the whitespace between the author names, producing a single-column list:

    :'<,'>s/\v  +/\r/g

Get rid of empty lines:

    gv
    :'<,'>g/^$/d

Sort the selection:

    gv
    :'<,'>sort

Use the `column` tool to form columns:

    gv
    :'<,'>!column -c 72

Convert tabs to spaces:

    :set tabstop=8
    gv
    :'<,'>retab

Indent the whole thing:

     gv
     >>

Put the tabstop back the way it was before:

    :set tabstop=2

_Note:_ the exact selection obtained by `gv` in these examples sometimes needs to be nudged up or down a line, but it is general close enough to what you want.

# As a macro

Here's the above, recording as a macro, then assigned to a mapping, with some refinements:

    vnoremap <leader>zc
      \:s/\v^ +//g<CR>
      \gv:s/\v  +/\r/g<CR>
      \gvj:sort<CR>
      \V}k:!column -c 78<CR>
      \:set tabstop=8<CR>
      \V}:retab<CR>
      \gv>:noh<CR>

# Manual technique

The manual technique just has me making selections in visual block mode (`CTRL-V`) and manually deleting and moving sections.
