---
tags: red.hat updates wiki
---

Check what's available:

    $ sudo yum --disableexcludes=all check-update
    Password:
    Loaded plugins: rhnplugin

    kernel.i686                              2.6.18-128.1.1.el5     rhel-i386-server-5
    kernel-headers.i386                      2.6.18-128.1.1.el5     rhel-i386-server-5

Actually install:

    $ sudo yum --disableexcludes=all update 'kernel*'
    Loaded plugins: rhnplugin
    Setting up Update Process
    Resolving Dependencies
    --> Running transaction check
    ---> Package kernel-headers.i386 0:2.6.18-128.1.1.el5 set to be updated
    ---> Package kernel.i686 0:2.6.18-128.1.1.el5 set to be installed
    --> Finished Dependency Resolution
    --> Running transaction check
    ---> Package kernel.i686 0:2.6.18-92.1.13.el5 set to be erased
    --> Finished Dependency Resolution

    Dependencies Resolved

    ====================================================================================================================================
     Package                        Arch                 Version                               Repository                          Size
    ====================================================================================================================================
    Installing:
     kernel                         i686                 2.6.18-128.1.1.el5                    rhel-i386-server-5                  15 M
    Updating:
     kernel-headers                 i386                 2.6.18-128.1.1.el5                    rhel-i386-server-5                 913 k
    Removing:
     kernel                         i686                 2.6.18-92.1.13.el5                    installed                           37 M

    Transaction Summary
    ====================================================================================================================================
    Install      1 Package(s)
    Update       1 Package(s)
    Remove       1 Package(s)

    Total download size: 16 M
    Is this ok [y/N]: y
    Downloading Packages:
    (1/2): kernel-headers-2.6.18-128.1.1.el5.i386.rpm                                                            | 913 kB     00:01
    (2/2): kernel-2.6.18-128.1.1.el5.i686.rpm                                                                    |  15 MB     00:22
    ------------------------------------------------------------------------------------------------------------------------------------
    Total                                                                                               682 kB/s |  16 MB     00:23
    Running rpm_check_debug
    Running Transaction Test
    Finished Transaction Test
    Transaction Test Succeeded
    Running Transaction
      Installing     : kernel                                            [1/4]
      Updating       : kernel-headers                                    [2/4]
      Cleanup        : kernel-headers                                    [3/4]
      Cleanup        : kernel                                            [4/4]

    Removed: kernel.i686 0:2.6.18-92.1.13.el5
    Installed: kernel.i686 0:2.6.18-128.1.1.el5
    Updated: kernel-headers.i386 0:2.6.18-128.1.1.el5
    Complete!

Cross fingers, take a deep breath, and reboot:

    $ sudo reboot

    Broadcast message from root (pts/0) (Sun Feb 22 04:27:13 2009):

    The system is going down for reboot NOW!
