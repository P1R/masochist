---
tags: bash wiki
cache_breaker: 1
---

This is my attempt to phrase the "INVOCATION" section of the [Bash](/wiki/Bash) [man page](/wiki/man_page) in the clearest possible terms.

# Definitions

A "login" shell is:

-   a shell whose argument zero starts with `-`; or
-   a shell invoked with the `--login` or `-l` (equivalent) option

Examples of login shells:

-   the shell you get when you:
    -   open a new terminal window
    -   open a new tab in a terminal window
    -   open a new pane in a [tmux](/wiki/tmux) session

_Note:_ This behavior may vary according to your terminal program; it is true for [Mac OS X](/wiki/Mac_OS_X), but [this article claims](http://www.joshstaiger.org/archives/2005/07/bash_profile_vs.html) the behavior is the opposite in some Linux distros.

An "interactive" shell may be:

-   a login shell as described above; or
-   any other shell whose standard input and output are connected to a real terminal (ie. the kind of shell you get if you type `bash` or `sh`)
-   a shell started with `-i`

A "non-interactive" shell may be:

-   a shell started to run a shell script
-   a shell started to run a command (eg. `sh -c ls`)

# Startup behavior

-   `sh`:
    -   run as an interactive login shell (unless inhibited with the `--no-profile` option):
        1.  runs `/etc/profile`
        2.  runs `~/.profile`, if it exists
    -   run as an interactive non-login shell (eg. if you just type `sh`)
        1.  runs nothing
    -   run as a non-interactive shell with the `--login` or `-l` options:
        1.  runs `/etc/profile`
        2.  runs `~/.profile`, if it exists
-   `bash`:
    -   run as an interactive login shell (unless inhibited with the `--no-profile` option):
        1.  runs `/etc/profile`
        2.  runs first found, readable file among `~/.bash_profile`, `~/.bash_login` and `~/.profile`
        3.  runs `~/.bash_logout`, if present, on logout
    -   run as an interactive non-login shell (eg. if you just type `bash`):
        1.  runs `~/.bashrc` (unless inhibited with the `--no-rc` option)
    -   run as a non-interactive shell with the `--login` or `-k` options:
        1.  runs `/etc/profile`
        2.  runs first found, readable file among `~/.bash_profile`, `~/.bash_login` and `~/.profile`
        3.  runs `~/.bash_logout`, if present, on logout
    -   run as a non-interactive shell (eg. `bash -c ls`):
        1.  runs nothing

# Consequences

-   For most intents and purposes, you can count on `~/.bash_profile` (or similar) running for pretty much any shell you open.
-   It's recommended that you put base config (things like `PATH` exports) in your `~/.bashrc` and fancy stuff (prompt set-up etc) in your `~/.bash_profile`; you can source you `~/.bashrc` from your `~/.bash_profile` to that you don't have to duplicate the basic config

# See also

-   [Zsh startup](/wiki/Zsh_startup)
-   <http://en.wikipedia.org/wiki/Bash_(Unix_shell)#Startup_scripts>
-   <http://en.wikipedia.org/wiki/Unix_shell>
-   <http://www.solipsys.co.uk/new/BashInitialisationFiles.html> (flowchart)
