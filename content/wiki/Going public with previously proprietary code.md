---
tags: git wiki
cache_breaker: 1
---

[This mailing list post](http://marc.info/?l=git&m=126847146521839&w=2) by [Git](/wiki/Git) maintainer, Junio Hamano, on "unparenting" branches, talks about the scenario wherein you have a closed-source codebase and after a certain point you create a new parentless branch within that repository that you can then publish as open source by pushing only that branch to a remote/public repository while keeping the historic proprietary data in the existing/local repository only.

Quoting Junio's message:

    Imagine you have a hitherto proprietary software project and want to go
    open source.  Perhaps your intention is to have an open source version and
    an enhanced commercial version.  The project contains some third-party
    vendor software outside your control, and you have replaced them with open
    source equivalents or disabled features that depend on them.

    Your history may look like this:

          o---o---A oss-base
         /
     ---o---o---o---o master

    where master is the primary version you will continue shipping to your
    paying customers, with proprietary third-party components and features
    that depend on them.  Commits on oss-base were your work to prepare the
    tree into a releasable shape, removing these proprietary stuff along with
    some features.

    But you cannot publish oss-base (commit A) to the public.  "git log" will
    show all the history that leads to it, with all the third-party stuff you
    do not have license to distribute in the source form.  The older parts of
    the history may even have site password at customer installation you have
    committed by mistake and eradicated long time ago.

    If you run this three command sequence (in this message, I am assuming
    that you keep the index and the working tree files intact in an updated
    implementation of --orphan, which is different from the suggestion to
    support "no common paths" case I mentioned in the previous message):

        $ git checkout --orphan oss oss-base
        $ git checkout oss-base
        $ git merge -s ours oss

    you will get a history of this shape:

                    X oss
                     \
          o---o---A---B oss-base
         /
     ---o---o---o---o master

    with commits X, A and B all recording an identical tree.  The oss branch
    (commit X) is now safe to publish.

    Once you have done this, further you can:

        $ git checkout master
        $ git merge oss-base

    which gives you a history of this shape:

                    X oss
                     \
          o---o---A---B oss-base
         /             \
     ---o---o---o---o---Y master

    This merge Y has to be done carefully.  It inherently has to be an evil
    merge because oss-base wants to replace some proprietary stuff with open
    source counterparts while you may want to keep using the proprietary ones
    you have support contract for in your paying customer release you will
    make from the master branch.  So at Y, you will most likely be reverting
    some work you did on oss-base branch since it forked from master.

    After setting it up, this arrangement allows you to:

     - accept changes from public, and/or build changes for public, to advance
       "community version" on the oss branch on top of X;

     - from time to time, merge oss to oss-base;

     - from time to time, merge oss-base to master.

    and the histories will continue like this:

                    X---C---C---C---C oss
                     \           \
          o---o---A---B-----------* oss-base
         /             \           \
     ---o---o---o---o---Y---P---P---*---P---P master

    with community commits C (either contributed from the public or you
    developed yourself and gave to the community) on oss branch, with
    proprietary commits P that record your own proprietary work on master
    branch.  Note that oss-base branch is not used to produce nor record any
    commit on its own---it is merely to ease the merging from oss and master
    by providing X-B link to serve as a convenient common ancestor to make
    later merges easier.

# Example

Let's look at what this looks like in practice:

```shell
$ git commit -m "proprietary code"
$ git commit -m "more proprietary code"
... time passes
$ git checkout -b opensource-prep
$ git commit -m "preparing for move to open source"
$ git commit -m "more open source prep"
... time passes
$ git checkout --orphan opensource opensource-prep
$ git commit -m "Open source release"
```

At this point you have a single repository that looks like this:

                         Y (opensource)
                          \
               o--o--o--o--X (opensource-prep)
              /
    o--o--o--M (master, proprietary code)

ie. you have a single repository that contains both proprietary and open source code. You want to be sure that when you publish the `opensource` branch you don't accidentally publish any of the proprietary history.

The safest way to do this seems to be to have two separate remotes:

-   the main "origin" remote is your original proprietary repo
-   a new "public" remote is created pointing at an entirely different repo, and with a default push refspec configured to only ever publish the `opensource` branch

```shell
$ git remote add public git.example.com:/path/to/public/repo.git
$ git config remote.public.push opensource
$ git config branch.opensource.remote public
$ git config branch.opensource.merge refs/heads/opensource
```

Evidently this won't stop you from accidentally doing something like:

```shell
$ git push public master
```

but it will at least make `git push public` have sane and safe default behavior.
