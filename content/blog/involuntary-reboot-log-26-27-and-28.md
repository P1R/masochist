---
title: Involuntary Reboot Log #26, #27 and #28
tags: involuntary.reboot.log blog
---

I had a couple of these saved up, but now that I've just had another [kernel panic](/wiki/kernel_panic) I think it's time to catch up on the backlog of the [Involuntary Reboot Log](/wiki/Involuntary_Reboot_Log).

## \#26: Hard reset

-   Operating system version: 10.5.2
-   Uptime at moment of failure(s): not sure

Ever since upgrading to [Leopard](/wiki/Leopard) my [SuperDrive](/wiki/SuperDrive) hasn't been the same. In 10.5.0 inserting a disc was enough to guarantee an eventual lock-up of some sort, things seemed a little better in 10.5.1, and recently I decided to try out my luck with 10.5.2, but it seems things are no better.

I had been watching a [DVD](/wiki/DVD) for about half an hour when I had to pause it and leave the room. On returning I couldn't resume playback, the player said it was "skipping damaged parts", none of the controls worked, and when I tried to quit I got the dreaded [beachball](/wiki/beachball).

Then the keyboard stopped responding and the clock froze for about three-and-a-half minutes. When it finally came back to life I tried to reboot. From 14:18 to 14:30 I was watching a blank desktop with a spinning progress indicator. At 14:30 the progress indicator stopped and just over an hour later I decided to give up and pull the plug.

Upon rebooting [Mail.app](/wiki/Mail.app) wouldn't launch but luckily I was able to repair the corruption as described in "[Fixing corrupt SQLite database files in Mail.app](/wiki/Fixing_corrupt_SQLite_database_files_in_Mail.app)".

## \#27: Kernel panic

-   Operating system version: 10.5.2
-   Uptime at moment of failure(s): not sure

This [kernel panic](/wiki/kernel_panic) happened several hours into an export from [Final Cut Pro](/wiki/Final_Cut_Pro), and similar to last time [Mail.app](/wiki/Mail.app) wouldn't launch after rebooting (but unlike last time simply retrying a few times was enough to "cure" it).

## \#28: Kernel panic

-   Operating system version: 10.5.2
-   Uptime at moment of failure(s): several days

Another kernel panic when the machine was under heavy load. A zillion apps open and lots of work in progress (luckily almost all of it saved to disk, I just hope nothing got corrupted but it is too early to say). Curiously, whenever my machine panics I _never_ get a panic log with any diagnostic information.

I'll definitely be continuing with my daily whole-disk backups to an external volume (done with [SuperDuper!](/wiki/SuperDuper%21)) and my two-hourly [home dir](/wiki/home_dir) backups (done with `tar` and `bzip` from [cron](/wiki/cron), also to an external volume).

## Stats to date

-   Kernel panics: 9
-   Hard resets: 19
-   Total failures: 28
-   Start of recording keeping: 21 May 2006
-   Total days to date: 647 days
-   Average time between failures: 24.07 days

This [iMac](/wiki/iMac) is definitely the most unreliable [Apple](/wiki/Apple) machine I've ever owned. The average time between failures has been trending slowly downwards for months now, and is already considerably worse than the average I had on my last machine (about 30 days between failures).
