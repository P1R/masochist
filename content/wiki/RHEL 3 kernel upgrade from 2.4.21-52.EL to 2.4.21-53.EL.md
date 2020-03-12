---
tags: red.hat wiki
---

# use a screen session in case we lose our connection

    screen

    # for posterity
    uptime

    # for comparison with after the upgrade
    uname -a
    cat /etc/redhat-release

    # from here on basically everything has to be done as root
    sudo -s

    # see what's available
    up2date --list

    # see what's installed
    rpm -qa | grep kernel

    # actually install
    up2date -uf kernel kernel-doc kernel-source

    # confirm that the kernel got installed
    ls -laF /boot

    # confirm that new kernel is first entry in grub.conf
    cat /boot/grub/grub.conf

    # check disk usage on /boot partition
    df -h

    # hold breath and reboot
    reboot

    # 73 seconds later, after logging in again
    uname -a
    cat /etc/redhat-release

    # check that all desired services are running or active
    sudo -s
    service --status-all
    chkconfig --list

    # see if anything else available
    up2date --list

    # check installed versions of kernel
    rpm -qa | grep kernel

    # delete oldest versions (but keep previous version as fallback)
    rpm -e kernel-2.4.21-51.EL

    # review what's still installed
    rpm -qa | grep kernel
