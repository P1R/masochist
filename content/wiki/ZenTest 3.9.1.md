---
tags: zentest wiki
---

# Release notes

-   <http://rubyforge.org/frs/shownotes.php?release_id=18734>

# See also

-   [Upgrading to ZenTest 3.9.1 on Mac OS X 10.5.1](/wiki/Upgrading_to_ZenTest_3.9.1_on_Mac_OS_X_10.5.1)

# My notes

Apparently this release fixes a "memory leak". Hopefully this fixes an issue I saw last night; when I finished work for the day I left my machine running with autotest in a background window. So autotest was running the whole night even though no changes were being made to the files and no tests were being run. When I came back this morning the machine was thrashing and autotest was using almost 1.5 gig of resident memory (2 gig virtual). Perhaps there was a leak in the polling loop at the heart of autotest.

Currently running the following to see if the problem has gone away:

     while true; do
      touch project_file_which_triggers_all_specs_to_run
      sleep 1
    done

Can't find a live repository to look at what changed between 3.9.0 and 3.9.1 (the [RubyForge](/wiki/RubyForge) [Subversion](/wiki/Subversion) repo seems to be a mere mirror and it's lagging behind, still at 3.8.0), but I have downloaded the two tarballs to do a straight diff on them:

    diff -r -u ZenTest-3.9.0/History.txt ZenTest-3.9.1/History.txt
    --- ZenTest-3.9.0/History.txt	2008-01-31 10:50:16.000000000 +0100
    +++ ZenTest-3.9.1/History.txt	2008-02-01 04:26:40.000000000 +0100
    @@ -1,3 +1,9 @@
    +=== 3.9.1 / 2008-01-31
    +
    +* 1 bug fix:
    +
    +  * OMG I'm so dumb... fixed memory leak.
    +
     === 3.9.0 / 2008-01-30

     * 15 minor enhancements:
    diff -r -u ZenTest-3.9.0/lib/autotest.rb ZenTest-3.9.1/lib/autotest.rb
    --- ZenTest-3.9.0/lib/autotest.rb	2008-01-31 10:50:16.000000000 +0100
    +++ ZenTest-3.9.1/lib/autotest.rb	2008-02-01 04:26:40.000000000 +0100
    @@ -211,11 +211,8 @@
             end
             wait_for_changes
           rescue Interrupt
    -        if self.wants_to_quit then
    -          break
    -        else
    -          reset
    -        end
    +        break if self.wants_to_quit
    +        reset
           end
         end
         hook :quit
    @@ -343,6 +340,7 @@
       def find_files
         result = {}
         targets = self.find_directories + self.extra_files
    +    self.find_order.clear

         targets.each do |target|
           order = []
    @@ -508,9 +506,7 @@

       def wait_for_changes
         hook :waiting
    -    begin
    -      Kernel.sleep self.sleep
    -    end until find_files_to_test
    +    Kernel.sleep self.sleep until find_files_to_test
       end

       ############################################################
    diff -r -u ZenTest-3.9.0/lib/zentest.rb ZenTest-3.9.1/lib/zentest.rb
    --- ZenTest-3.9.0/lib/zentest.rb	2008-01-31 10:50:16.000000000 +0100
    +++ ZenTest-3.9.1/lib/zentest.rb	2008-02-01 04:26:41.000000000 +0100
    @@ -56,7 +56,7 @@

     class ZenTest

    -  VERSION = '3.9.0'
    +  VERSION = '3.9.1'

       include ZenTestMapping

So that missing `self.find_order.clear` could indeed explain the memory leak that I saw. Doesn't look like the code being tested is responsible for the leak (thank goodness, I hate trying to find memory leaks in Garbage Collected code). I've been running the test suite every second now for a few minutes and the memory usage is constant.
