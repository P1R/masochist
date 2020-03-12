---
tags: version.control wiki
cache_breaker: 1
---

This article provides a comparative overview of the major [version control systems](/wiki/version_control_systems) that I've worked with over the years. The following is a summary of my experience with each system:

-   [CVS](/wiki/CVS): used for internal version control (no public server) from 2002 to 2004
-   [Subversion](/wiki/Subversion): used since 2004, when Subversion hit version 1.0
-   [Perforce](/wiki/Perforce): never used, but it was one of the options I evaluated when looking for something that addressed the shortcomings of Subversion
-   [SVK](/wiki/SVK): user since early 2007, but retired soon after
-   [Git](/wiki/Git): user since mid-2007

**Spoiler:** The clear "winner" of this comparison is Git. I've now switched permanently to Git for all of the projects which I control, which basically means that I no longer use SVK (or CVS or Perforce either, obviously) and _only_ use Subversion when forced to because an upstream project uses it. I am happy to make Subversion checkouts and exports if I am basically just a "read-only" consumer of the code, but if I have to make changes to the code I prefer to get it into Git by some means. Fortunately for me, almost all the projects I care about have moved or are moving to Git.

# Price

All the systems are free with the exception of [Perforce](/wiki/Perforce) which is decidedly expensive (although if you plan to use Perforce for a qualifying [open source](/wiki/open_source) project then you can ask for a free license and you'll have to renew your request each year; ironically, however, Perforce is ill-suited to such projects because of its access control model -- see below -- which doesn't allow for anonymous, read-only access to the repository).

Here the clear loser is Perforce.

# Community

Once again, [Perforce](/wiki/Perforce) is the odd one out here, being the only one that is not [open source](/wiki/open_source). [CVS](/wiki/CVS) is effectively dead, however, having long since been trounced by [Subversion](/wiki/Subversion) which has one of the most active communities (as of April 2007 CollabNet [claims](http://www.collab.net/products/open_source_subversion/subversion-history.html) "over 100,000 publicly accessible production servers" and "more that 1.5 million users"). [SVK](/wiki/SVK) is used by a minority of Subversion users and is effectively developed by just one person, [Chia-Liang Kao](/wiki/Chia-Liang_Kao). [Git](/wiki/Git) is not yet as widely deployed as Subversion, probably due to its steep learning curve, but its developer community seems to be as active as that of Subversion, if not more.

Not only are Git's feature set and usability leaping forward at an impressive pace, it appears to be gaining traction and its adoption rate with many popular projects is on the increase, while Subversion is really struggling due to its inertia (slowness to introduce new features). Although Subversion is very entrenched and will take a long time to recede off into the background, it now (in March 2008) seems inevitable that Git will overtake it as _the_ premiere [open source](/wiki/open_source) [version control system](/wiki/version_control_system).

The clear winners in this section are Subversion and Git.

# Model

[CVS](/wiki/CVS), [Subversion](/wiki/Subversion) and [Perforce](/wiki/Perforce) all use a client-server model. Subversion stores additional metadata in checked out working copies which allows for some operations (such as `svn diff` and `svn st`) to be performed without network connectivity. Perforce occupies the other extreme of the spectrum, requiring access to the server for almost everything (even accessing the built-in help!).

[SVK](/wiki/SVK) is a distributed system designed to work with traditional client-server repositories. It creates local mirrors of remote repositories and allows all operations to be performed "offline", even commits. Local changes can later be pushed out to remote repositories. Because SVK works by way of private mirrors it is not easy for developers to directly share changes; they must either push them back to a central repository for other developers to see them, or send them as patches which other developers then apply to their local working copies.

[Git](/wiki/Git) is purely distributed and every checkout is a self-sufficient repository (including all history). It is possible to use Git in a way that mimics the traditional client-server model (for example, by designating a particular, published repository as "the" official repository) but this is purely nominal. From a technical standpoint any changes can be sent to and from any repository to and from any other according to the desires of the user.

The distributed systems have numerous advantages, including:

-   Offline operation (even commits, branches, merges)
-   Speed (because many operations can be done without network access)
-   Redundancy (because a copy of the repository's history is kept locally)
-   The ability to try out experimental development without cluttering the visible history in a public repository
-   Convenience of tracking upstream projects (and modifying them locally)

Here CVS, Subversion and Perforce all suffer from the limitations imposed by their model, with Perforce representing the extreme case. SVK overcomes many of the limitations of the client-server model, but doesn't go as far as Git, which is totally free of the limitations imposed by legacy model.

# Access control

I only ever used [CVS](/wiki/CVS) locally so I don't know anything about its access control possibilities.

[Subversion](/wiki/Subversion) allows for very fine-grained access control at all levels. My preferred method of setting up access was to provide anonymous, read-only access using the `svnserve` daemon, and perform write access over [SSH](/wiki/SSH). I always had unrestricted write access but [Subversion](/wiki/Subversion) makes it straightforward to set up per-repository and even per-directory access controls.

[Perforce](/wiki/Perforce) has no means of allowing anonymous, read-only access. The closest alternative is to set-up an unprivileged account which is shared by all anonymous users, but I was never satisfied with the security of this approach and it pretty much ruled Perforce out as an option for me.

Access control isn't really relevant to [SVK](/wiki/SVK); each developer has his or her own private mirror with full access to it. When accessing remote repositories you must live under the access controls imposed upstream.

[Git](/wiki/Git) also has no explicit notion of access control. You can provide read-only anonymous access using the `git-daemon` and write access via [SSH](/wiki/SSH); in this later case you use existing [OS](/wiki/OS) mechanisms (SSH public key authentication, file-system permissions) to determine access. Finer-grained access control requires special handling to be performed in the hook scripts, which can be used to determine whether or not an access should proceed.

The clear winner in this section is Subversion, for its power, flexibility and ease of use. For simple cases Git is also very good (its architectural simplicity makes it easy to understand and set-up) but for complex access control scenarios it loses out. At the bottom of the heap comes Perforce because of its inappropriate access model.

# Performance

[CVS](/wiki/CVS), [Git](/wiki/Git), [Subversion](/wiki/Subversion) are all largely written in [C](/wiki/C) and so are quite computationally efficient. I don't know what language [Perforce](/wiki/Perforce) is written in but it is evidently a fast compiled language and may be [C](/wiki/C).

[SVK](/wiki/SVK) is written in [Perl](/wiki/Perl) and so is very slow for some operations, although its distributed nature does compensate for this in some cases.

[Git](/wiki/Git) is the clear winner in this category because its simple architecture was designed with speed and large projects in mind. All of the lower-level "plumbing" which does the heavy lifting is written in [C](/wiki/C) _and_ its distributed nature removes network bottlenecks.

# Architectural complexity

# Learning curve

[CVS](/wiki/CVS) is well known and its basic workflow is quite simple; but it is difficult to do some things with CVS (renames, branches, merging). [Subversion](/wiki/Subversion) copies most of CVS's conventions and so is generally considered quite easy to learn; furthermore its ease-of-use is much improved over CVS because it makes some difficult things very easy to do. Likewise, [SVK](/wiki/SVK) is considered quite easy to learn for people who have used Subversion because of the close mapping between the commands of each; a small amount of additional learning is required to understand the concepts behind SVK's distributed model.

Many of [Perforce](/wiki/Perforce)'s concepts will be relatively familiar due to its client-serve base, but its command set naming conventions are quite different, requiring some learning; fortunately, it's documentation is quite good.

[Git](/wiki/Git) is the hardest to learn because it has the most radically different conceptual underpinnings _and_ a huge number of commands with many options. To get the most out of Git it is desirable to learn how it works "under the covers" too, so to get started with Git you are looking at a couple of weeks of study and experimentation.

It's hard to pick winners and losers in this section because it's not clear that "being familiar" is actually a merit that deserves highlighting. Subversion scores highly because it is familiar, well-documented, and largely easy to use. Git, on the other hand, is unfamiliar (but still well-documented) and only becomes easy to use after an initial apprenticeship has been completed. Having said that, once you've passed the "trial by fire" you'll be able to do things which you couldn't even contemplate doing with the other tools, and you'll be able to do them _extremely easily_.

# Documentation

# Working copies

# Metadata

# Revision IDs

[CVS](/wiki/CVS) uses hard-to-read, per-file [RCS](/wiki/RCS) revision numbers (for example, `4.271.4.3`, would indicate release 4, revision 271, branch 4, revision 3).

[Subversion](/wiki/Subversion) uses atomically increasing integers, per-repository (revision 1, revision 2).

I know nothing about [Perforce](/wiki/Perforce) revision numbers, although I believe they follow the same pattern as Subversion.

[SVK](/wiki/SVK) also uses atomically increasing integers, but can be more confusing than Subversion because all mirrored remote repositories are stored in a single local mirror repository and therefore share revision numbers. As such, the local SVK revision number is unlikely to match the remote Subversion revision number.

[Git](/wiki/Git) uses [SHA-1](/wiki/SHA-1) hashes to name all objects, of which revisions ("commits" in Git parlance) are only one type. The advantage to this approach is that revisions can be tagged and cryptographically signed, and the integrity of the repository history is verificable because the hashes are immutable.

It is true that Subversion-style revision numbers would be more readable and easier to use, but the hash approach is necessitated by the distributed nature of Git; without unique revision numbers distributed Git repositories could enter into conflict (where the same number would refer to different repository states). Concessions are made to ease-of-use by allowing minimal unique hash substrings, tags and _many_ other ways of identifying revisions (for examples and additional information see the manual page for `git-rev-parse`).

So as was the case in the "Learning curve" section above, Subversion might win on ease-of-use at first glance, but Git's harder-to-use alternative approach also enables things which wouldn't otherwise be possible.

# Branching

# Merging

# Tagging

# See also

-   [Wikipedia](/wiki/Wikipedia) article: <http://en.wikipedia.org/wiki/Comparison_of_revision_control_software>
