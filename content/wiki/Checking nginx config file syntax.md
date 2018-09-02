---
tags: nginx wiki
cache_breaker: 1
---

Assuming an [nginx](/wiki/nginx) installation under `/usr/nginx`:

    /usr/nginx/sbin/nginx -t -c /usr/nginx/conf/nginx.conf

Note that the path to the config file must be an absolute one, or one relative to the `prefix` directory where nginx was installed (in this case, `/usr/nginx`), so this will also work:

    /usr/nginx/sbin/nginx -t -c conf/nginx.conf

To test the default discovered config run:

    /usr/nginx/sbin/nginx -t

# See also

-   [Applying new nginx configuration without restarting](/wiki/Applying_new_nginx_configuration_without_restarting)
