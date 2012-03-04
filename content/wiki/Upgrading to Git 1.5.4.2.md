---
tags: git updates
cache_breaker: 1
---

These notes were made while upgrading to [Git 1.5.4.2](/wiki/Git_1.5.4.2).

# Local upgrade

These notes were made performing the upgrade on [Mac OS X](/wiki/Mac_OS_X) 10.5.1 [Leopard](/wiki/Leopard), using a local clone of the central [Git](/wiki/Git) repository.

    # get new stuff from upstream
    git fetch

    # check the signature on the tag
    git tag -v v1.5.4.2

    # switching working tree to v1.5.4.2
    git checkout v1.5.4.2

    # clean up any cruft that might be lying around
    make clean

    # build, run tests, and generate docs
    make prefix=/usr/local test doc

    # install
    sudo make prefix=/usr/local install install-doc

In order to build the docs you need the documentation toolchain in place; see "[Setting up the Git documentation build chain on Mac OS X Leopard](/wiki/Setting_up_the_Git_documentation_build_chain_on_Mac_OS_X_Leopard)".

# Remote upgrade

## Building

    cd git.git
    git fetch
    git checkout v1.5.4.2

    # build and test
    nice make prefix=/usr/local test

    # install
    sudo make prefix=/usr/local install

    # get man pages
    cd ..
    wget http://www.kernel.org/pub/software/scm/git/git-manpages-1.5.4.2.tar.bz2 \
         http://www.kernel.org/pub/software/scm/git/git-manpages-1.5.4.2.tar.bz2.sign

    # verify
    gpg --verify git-manpages-1.5.4.2.tar.bz2.sign git-manpages-1.5.4.2.tar.bz2

    # install
    sudo tar xjv -C /usr/local/man -f git-manpages-1.5.4.2.tar.bz2

## Updating [gitweb](/wiki/gitweb)

    # from top-level of Git source tree
    make clean
    make prefix=/usr/local \
         GITWEB_PROJECTROOT=/pub/git/path_to_public_repos \
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