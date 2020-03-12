---
tags: nginx updates wiki
cache_breaker: 1
---

Notes made while updating my local [Mac OS X](/wiki/Mac_OS_X) [Leopard](/wiki/Leopard) 10.5.6 install to [nginx 0.6.35](/wiki/nginx_0.6.35):

    wget http://sysoev.ru/nginx/nginx-0.6.35.tar.gz
    tar xzvf nginx-0.6.35.tar.gz
    cd nginx-0.6.35
    ./configure --prefix=/usr/local/nginx --with-http_ssl_module
    make
    sudo make install
    /usr/local/nginx/sbin/nginx -v

And corresponding notes made while updating remote [Red Hat Enterprise Linux](/wiki/Red_Hat_Enterprise_Linux) machine (see "[Updating to nginx 0.6.34 on Red Hat Enterprise Linux 5.1](/wiki/Updating_to_nginx_0.6.34_on_Red_Hat_Enterprise_Linux_5.1)" for a more detailed example):

    # build as normal user
    wget wget http://sysoev.ru/nginx/nginx-0.6.35.tar.gz
    tar xzvf nginx-0.6.35.tar.gz
    cd nginx-0.6.35
    ./configure --prefix=/usr/local/nginx --with-http_ssl_module
    make

    # install with root privileges
    sudo -s

    # check what's running
    /usr/local/bin/monit summary

    # stop everything
    /usr/local/bin/monit stop all

    # make sure everything really stopped
    /usr/local/bin/monit summary

    # move old config out of the way
    mv /usr/local/nginx /usr/local/nginx-0.6.34

    # actually install
    make install

    # copy over conf files
    cd /usr/local
    cp nginx-0.6.34/conf/nginx-staging.conf  nginx/conf/
    mv nginx/conf/nginx.conf nginx/conf/nginx.conf.vendor
    cp nginx-0.6.34/conf/nginx.conf nginx/conf/
    cd nginx

    # check config file syntax
    sbin/nginx -t -c conf/nginx.conf

    # oops! forgot to copy over keys and certs
    mv ../nginx-0.6.34/conf/certs conf/
    mv ../nginx-0.6.34/conf/keys conf/

    # check config file syntax again
    sbin/nginx -t -c conf/nginx.conf
    sbin/nginx -t -c conf/nginx-staging.conf

    # start it all up
    /usr/local/bin/monit start all

    # make sure it's working
    /usr/local/bin/monit summary
