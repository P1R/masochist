---
tags: nginx log.rotation wiki
cache_breaker: 1
---

# Overview

So what do you need to know to handle log rotation for [nginx](/wiki/nginx)? The official answer from [Igor Sysoev](/wiki/Igor_Sysoev) (the nginx lead developer) can be found [here](http://www.ruby-forum.com/topic/134115). In short, the sequence you must follow is:

1.  Move (or otherwise process) the old log file
2.  Send the [nginx](/wiki/nginx) master process a [USR1](/wiki/USR1) signal

# [logrotate](/wiki/logrotate) setup

There are many ways that this kind of processing can be automated but I use [logrotate](/wiki/logrotate). On [RHEL 5.1](/wiki/RHEL_5.1) its configuration files can be found in `/etc/logrotate.d/`. For example, consider the file, `/etc/logrotate.d/httpd`, which handles the rotation of [Apache](/wiki/Apache) log files:

    /var/log/httpd/*log {
        missingok
        notifempty
        sharedscripts
        postrotate
            /bin/kill -HUP `cat /var/run/httpd.pid 2>/dev/null` 2> /dev/null || true
        endscript
    }

    /home/*/log/*log {
        missingok
        notifempty
        sharedscripts
        postrotate
            /bin/kill -HUP `cat /var/run/httpd.pid 2>/dev/null` 2> /dev/null || true
        endscript
    }

Using this as a model, and consulting the `logrotate` [man page](/wiki/man_page), we come up with a file like this for [nginx](/wiki/nginx), `/etc/logrotate.d/nginx`. Obviously the paths on your local system will most likely vary. Here I specify log rotation for two separate [Rails](/wiki/Rails) applications, each of which has its own nginx master process (note the different [PID](/wiki/PID) files).

    /home/path_to_rails_app_1/deploy/shared/log/*_log {
        missingok
        notifempty
        sharedscripts
        postrotate
            test ! -f /var/run/nginx.pid || kill -USR1 `cat /var/run/nginx.pid`
        endscript
    }

    /home/path_to_rails_app_2/deploy/shared/log/*_log {
        missingok
        notifempty
        sharedscripts
        postrotate
            test ! -f /var/run/nginx-staging.pid || kill -USR1 `cat /var/run/nginx-staging.pid`
        endscript
    }

I'm actually quite glad that I looked into this because in doing so I noticed that having [nginx](/wiki/nginx) write its log files to the same location as [Apache](/wiki/Apache) wouldn't be a good thing (this is the way I initially had it set up). As you can see, these log files would be rotated according to the rules in the `/etc/logrotate.d/httpd` file and nginx would never receive the required[USR1](/wiki/USR1) signal.

## Testing

    # -d turns on debug mode: output is verbose, no actual changes are made to the log files
    sudo logrotate -d /etc/logrotate.conf /etc/logrotate.d/nginx

    # if the debug output looks good, proceed with a real rotation (-v turns on verbose output)
    sudo logrotate -v /etc/logrotate.conf /etc/logrotate.d/nginx

In my initial testing this log rotation did _not_ work as expected; the verbose output ended with lines like the following:

    renaming /home/path_to_app/deploy/shared/log/access_log to /home/path_to_app/deploy/shared/log/access_log.1
    disposeName will be /home/path_to_app/deploy/shared/log/access_log.1
    running postrotate script
    removing old log /home/path_to_app/deploy/shared/log/access_log.1

In other words:

1.  Rename `access_log` to `access_log.1` (correct)
2.  Run the `postrotate` script (correct)
3.  Remove oldest log file, `access_log.1` (incorrect!)

That last action is the unexpected one, because in my `/etc/logrotate.conf` file (where global settings are stored) I have:

    # keep 4 weeks worth of backlogs
    rotate 4

Troubleshooting permutations attempted:

-   Remove `nocreate` line from `/etc/logrotate.d/nginx` (no visible effect)
-   Add explicit `rotate 4` to `/etc/logrotate.d/nginx` (works)

For each permutation is is necessary to hit the website (to make sure the log is non-empty) and also pass the `-f` (force) flag to `logrotate`, otherwise it will most likely refuse to rotate the log file because of its size. I finally realized that my initial runs did not behave as expected because I wasn't passing in `/etc/logwatch.conf` as the first parameter (it is not pulled in automatically); in other words, to test out a custom file in `/etc/logwatch.d` as it would really be executed in normal use you must precede it with `/etc/logwatch.conf` on the command line. Once I realized this I removed the explicit `rotate 4` from the `/etc/logwatch.d/nginx` configuration file.

# Rotating other [Rails](/wiki/Rails) log files

The [nginx](/wiki/nginx) log files are only part of the situation. When you run [mongrel_cluster](/wiki/mongrel_cluster) you'll get another log file `mongrel.12345.log` (where `12345` is the port number the [mongrel](/wiki/mongrel) instance is listening on) for each mongrel instance in the cluster, as well as the traditional `production.log`, `development.log`, `test.log` and any others that your application might produce.

See:

-   [Rotating mongrel_cluster log files](/wiki/Rotating_mongrel_cluster_log_files)
-   [Rotating Rails application log files](/wiki/Rotating_Rails_application_log_files)
