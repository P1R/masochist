---
tags: git updates
---

## Local upgrade

These notes were made while doing the upgrade on the local machine running [Mac OS X](/wiki/Mac_OS_X) [Leopard](/wiki/Leopard) 10.5.2.

    git fetch
    git tag -v v1.5.4.5
    git co v1.5.4.5
    make clean
    make prefix=/usr/local test doc
    sudo make prefix=/usr/local install install-doc

As always, if you want to build the documentation like that you'll need to have the tool chain set up (see "[Setting up the Git documentation build chain on Mac OS X Leopard](/wiki/Setting_up_the_Git_documentation_build_chain_on_Mac_OS_X_Leopard)").

## Remote upgrade

I was particularly looking forward to this version for the server because it includes a fix for a [Gitweb](/wiki/Gitweb) broken link issue that I had previously had to patch on each new release.

    wget http://kernel.org/pub/software/scm/git/git-1.5.4.5.tar.bz2 \
         http://kernel.org/pub/software/scm/git/git-1.5.4.5.tar.bz2.sign \
         http://kernel.org/pub/software/scm/git/git-manpages-1.5.4.5.tar.bz2 \
         http://kernel.org/pub/software/scm/git/git-manpages-1.5.4.5.tar.bz2.sign
    gpg --verify git-1.5.4.5.tar.bz2.sign git-1.5.4.5.tar.bz2
    gpg --verify git-manpages-1.5.4.5.tar.bz2.sign git-manpages-1.5.4.5.tar.bz2
    tar xjvf git-1.5.4.5.tar.bz2
    cd git-1.5.4.5
    make configure
    ./configure --without-tcltk
    make test
    sudo make install
    make clean
    make configure
    ./configure
    make GITWEB_PROJECTROOT=/pub/git/path_to_public_repos \
         GITWEB_LIST=/pub/git/conf/gitweb-projects \
         GITWEB_STRICT_EXPORT=1 \
         GITWEB_CSS="/gitweb.css" \
         GITWEB_LOGO="/git-logo.png" \
         GITWEB_FAVICON="/git-favicon.png" \
         GITWEB_CONFIG="/pub/git/conf/gitweb.conf" \
         gitweb/gitweb.cgi
    sudo -u git cp gitweb/gitweb.{cgi,css} \
                   gitweb/git-*.png \
                   /pub/git/public_html
    cd ..
    sudo tar xjv -C /usr/local/man -f git-manpages-1.5.4.5.tar.bz2