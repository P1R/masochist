---
tags: git wiki
cache_breaker: 1
---

[Git](/wiki/Git) is an extremely powerful distributed [version control system](/wiki/version_control_system) which allows you to share work across multiple repos in a large number of different ways. In this article I want to highlight the three main ways in which I use Git when working with multiple repos.

## Central "authoritative" repo (remote), local working repo

"Distributed" doesn't mean that your work can't have a "center". Even though distributed [version control](/wiki/version_control) empowers all participants to fully control their own repos, it's still useful to have one "authoritative" source so that users know where to go to find "the" official code.

In this model you tend to use `git clone` to create a local copy of the remote repo. You do your work in the local repo and use `git push` to propagate changes back to the central repo. The remote repo is a "bare repo" while your local one has a working tree.

If you are the only person with access to the remote repo then all your merges should be simple fast forwards and you should never have any conflicts to resolve.

## Variation: cloning an "upstream" project

In this case the "upstream" project is actually controlled by someone else. You can `git clone` the repo but you don't have privileges to `git push` to it. Structurally things are pretty much the same — bare remote repository and local repo with working tree — but there are two differences:

-   One, you get your changes into the central repo by other means — submitting patches to mailing lists for example — and you depend on the integrator of the remote repository to accept and incorporate your submissions.
-   Two, the upstream project is presumably moving along independently, so you occasionally have to pull down its changes using `git pull`, `git fetch`, `git rebase` or some other variation.

## One repo on your desktop, another on your laptop

This is another fairly common pattern. The simplest way to do this is as follows:

    # on the laptop
    git clone /path/to/repo/on/desktop src

    # hack, hack, hack...
    git commit

    # back on the desktop
    git pull /path/to/repo/on/laptop

You _could_ do `git pull` on the laptop and then `git push` to send your changes back to the desktop, but pushing into a non-bare repository can have unpleasant consequences because you're effectively moving the HEAD and the modifying the index while leaving the working tree in its prior state. The simplest way to keep the two repos in sync is to always `git pull` between them rather than `git push`. `git pull` is nicer because you have a working tree and so have a space in which to resolve any merge conflicts that might arise; but if you tend to pull regularly whenever you switch machines you probably won't have any conflicts because all your merges will be fast-forward merges.
