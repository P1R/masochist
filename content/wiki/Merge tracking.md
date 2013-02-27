---
tags: subversion version.control svk perforce
---

[Merge tracking](/wiki/Merge_tracking) is a facility offered by some [version control systems](/wiki/version_control_systems). It is the ability of a [version control system](/wiki/version_control_system) to "remember" which changes have been [merged](/wiki/merged) from one line ([branch](/wiki/branch)) of development to another and act accordingly. Without [merge tracking](/wiki/merge_tracking) it is the responsibility of the user of the system to manually record which changes have been previously merged and act appropriately (for example, by not attempting to merge the same change twice).

In all but the simplest cases of [merging](/wiki/merging) [merge tracking](/wiki/merge_tracking) is a significant time saver and a real convenience which encourages developers to use [branches](/wiki/branches) in ways that improve their productivity and the quality of their work. A lack of [merge tracking](/wiki/merge_tracking) can actually be a disincentive to [branch](/wiki/branch) at all, and for those that choose to [branch](/wiki/branch) anyway it can be a significant drain on their time.

Examples of systems which offer automatic [merge tracking](/wiki/merge_tracking) are [SVK](/wiki/SVK) (free) and [Perforce](/wiki/Perforce) (commercial); compare this with [Subversion](/wiki/Subversion) which does not offer [merge tracking](/wiki/merge_tracking) at this point in time (March 2007, [Subversion 1.43](/wiki/Subversion_1.43) is the current version). [Subversion 1.5](/wiki/Subversion_1.5) will offer initial support for merge tracking and the `merge-tracking` branch was [merged into the trunk](http://svn.collab.net/viewvc/svn?view=rev&revision=24027) on 22 March 2007. More information can be read [here](http://svn.collab.net/viewvc/svn/trunk/notes/merge-tracking.txt?revision=HEAD&view=markup).