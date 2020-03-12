---
tags: nginx wiki
---

# Release notes

    Changes with nginx 0.6.36                                        02 Apr 2009

       *) Change: now the "Invalid argument" error returned by
          setsockopt(TCP_NODELAY) on Solaris, is ignored.

       *) Change: now POSTs without "Content-Length" header line are allowed.

       *) Feature: the "try_files" directive.

       *) Feature: the --with-pcre option in the configure.

       *) Feature: the "if_modified_since" directive.

       *) Feature: the "$cookie_..." variables.

       *) Feature: the "$arg_..." variables.

       *) Bugfix: compatibility with Tru64 UNIX.
          Thanks to Dustin Marquess.

       *) Bugfix: a "ssl_engine" directive did not use a SSL-accelerator for
          asymmetric ciphers.
          Thanks to Marcin Gozdalik.

       *) Bugfix: in a redirect rewrite directive original arguments were
          concatenated with new arguments by a "?" rather than an "&";
          the bug had appeared in 0.1.18.
          Thanks to Maxim Dounin.

       *) Bugfix: nginx could not be built on AIX.

       *) Bugfix: a double response might be returned if the epoll or rtsig
          methods are used and a redirect was returned to a request with
          body.
          Thanks to Eden Li.

       *) Bugfix: a segmentation fault might occur in worker process if
          "resolver" directive was used in SMTP proxy.

       *) Bugfix: fastcgi_store stored files not always.

       *) Bugfix: nginx did not process a FastCGI server response, if the
          server send too many messages to stderr before response.

# Updating

I am not sure whether I will bother with this update, seeing as none of the features really interest mere, nor do any of the bug fixes look relevant to my usage.

# See also

-   [try_files documentation](http://wiki.nginx.org/NginxHttpMainModule#try_files)
