---
tags: nginx wiki
cache_breaker: 1
---

## Official release notes

    Changes with nginx 0.6.34                                        27 Nov 2008

       *) Change: now the EAGAIN error returned by connect() is not considered
          as temporary error.

       *) Change: now the "gzip_vary" directive turned on issues a
          "Vary: Accept-Encoding" header line for uncompressed responses too.

       *) Feature: the "expires" directive supports daily time.

       *) Feature: the "Expect" request header line support.

       *) Feature: now the "rewrite" directive does a redirect automatically
          if the "https://" protocol is used.

       *) Bugfix: the "listen" directive parameters such as "backlog",
          "rcvbuf", etc. were not set, if a default server was not the first
          one.

       *) Bugfix: the "log_not_found" directive did not work for index files
          tests.

       *) Bugfix: now if FastCGI server sends a "Location" header line without
          status line, then nginx uses 302 status code.
          Thanks to Maxim Dounin.

       *) Bugfix: the ngx_http_flv_module did not support several values in a
          query string.

       *) Bugfix: when a request to a directory was redirected with the slash
          added, nginx dropped a query string from the original request.

## See also

-   [Updating to nginx 0.6.34 on Red Hat Enterprise Linux 5.1](/wiki/Updating_to_nginx_0.6.34_on_Red_Hat_Enterprise_Linux_5.1)
