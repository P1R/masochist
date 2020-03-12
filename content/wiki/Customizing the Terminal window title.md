---
tags: bash wiki
cache_breaker: 1
---

For years now I've used my `~/.bash_profile` to give me a custom, colorized [Bash](/wiki/Bash) prompt and show the current working directory in the title bar of the [Terminal](/wiki/Terminal).

# 2003 solution

    # colours for use in prompts
    RED="\[\e[0;31m\]"
    GREEN="\[\e[0;32m\]"
    BLUE="\[\e[0;34m\]"
    NOCOLOR="\[\e[0m\]"

    #
    # Prompt
    #

    OPENTITLEBAR="\[\033]0;"
    CLOSETITLEBAR="\007\]"

    TITLEBAR="${OPENTITLEBAR}\w${CLOSETITLEBAR}"

    PROMPT="${GREEN}\h:${BLUE}\W${RED}\$ ${NOCOLOR}"

    export PS1="${TITLEBAR}${PROMPT}"

    function set_title ()
    {
      echo -n -e "\033]0;$*\007"
    }

# 2007 solution

On seeing [this hint](http://www.macosxhints.com/article.php?story=20070628002730528) I learned that my old hack (customizing the title from within the prompt) was no longer necessary:

    #
    # Prompt
    #

    PROMPT="${GREEN}\h:${BLUE}\W${RED}\$ ${NOCOLOR}"
    export PS1="${PROMPT}"

    #
    # Title bar
    #

    OPENTITLEBAR="\033]0;"
    CLOSETITLEBAR="\007"

    trap 'printf "${OPENTITLEBAR} `history 1 | cut -b8-` - `pwd` ${CLOSETITLEBAR}"' DEBUG

So as before I show the current working directory in the title bar, but now I also add the last/current job. This makes the window titles much more informative. Note that this is better than the option provided by the [Terminal](/wiki/Terminal) itself to show the current process in the title bar. A quick example will illustrate why:

Using the customization as defined above I will see a string like "less example.txt" in the title bar if I am currently using `less` to view a document, `example.txt`. Using the built-in support in the [Terminal](/wiki/Terminal) I will only see "less", which isn't as informative.

Likewise, with the customization if I type a command which exits immediately, like `ls -laF`, then I'll see the corresponding string in the title bar ("ls -laF") even after the command has exited, but with the built-in support I will only see "ls" instantaneously and then the title bar will revert to displaying "bash" which is not very helpful for distinguishing multiple windows.

Upon logging into a remote site via [SSH](/wiki/SSH) my title changes to a string such as "username@host", because on the remote host I have a `$PROMPT_COMMAND` variable which overrides the local trap. This is a good thing as the primary characteristic I am interested in for such remote sessions is knowing which host they belong to.
