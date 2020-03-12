---
tags: git asciidoc docs xmlto wiki
cache_breaker: 1
---

Installing the documentation build chain on [Mac OS X](/wiki/Mac_OS_X) is quite tedious, as it involves a lengthy dependency chain. For an alternative that does not involve installing the tools, see "[Installing pre-built Git documentation from the Git repo](/wiki/Installing_pre-built_Git_documentation_from_the_Git_repo)".

These notes are an updated version of "[Installing Git 1.5.2.3 on Mac OS X Tiger](/wiki/Installing_Git_1.5.2.3_on_Mac_OS_X_Tiger)".

# Out of the box

"Out of the box", [Leopard](/wiki/Leopard), like [Tiger](/wiki/Tiger), doesn't have the dependencies required to build the [Git](/wiki/Git) documentation. If you try:

    make prefix=/usr/local doc

You'll fail with a message like this:

    asciidoc -b xhtml11 -d manpage -f asciidoc.conf \
    		 -agit_version=1.5.3.6.728.gea559 -o git-add.html+ git-add.txt
    make[1]: asciidoc: Command not found
    make[1]: *** [git-add.html] Error 127
    make: *** [doc] Error 2

# Installing [AsciiDoc](/wiki/AsciiDoc)

Since my last experience with [AsciiDoc](/wiki/AsciiDoc) it has been updated from version 8.2.1 to 8.2.5.

    wget http://www.methods.co.nz/asciidoc/asciidoc-8.2.5.tar.gz
    tar xzvf asciidoc-8.2.5.tar.gz
    cd asciidoc-8.2.5
    sudo ./install.sh

    # test
    rm doc/asciidoc.html
    asciidoc doc/asciidoc.txt
    open doc/asciidoc.html

Note that the Git documentation expects AsciiDoc 7, not 8, so when building the Git documentation you need to pass an additional flag:

    make prefix=/usr/local/ ASCIIDOC8=YesPlease doc

I later found that at least with the current version of AsciiDoc the produced documentation is flawed. The most significant problem is that all internal links are broken, but there may be others. I spent an hour trying to work around this, without success. In the end the only solution was to uninstall 8 and overwrite it with 7:

    sudo rm -r /etc/asciidoc

    # note that AsciiDoc 7 doesn't come with an install script or Makefile
    sudo mkdir /etc/asciidoc
    sudo cp -R filters *.conf /etc/asciidoc/
    sudo cp -R stylesheets /etc/asciidoc/

    # finally, overwrite the previously installed asciidoc tool itself:
    sudo cp asciidoc.py /usr/local/bin/asciidoc

Since I originally wrote this article I understand that [Git](/wiki/Git) itself has been patched to workaround the regression in AsciiDoc 8. See [5162e69](http://repo.or.cz/w/git.git?a=commitdiff;h=5162e69732d13dd079919a389a6ace8878aad716) in the main Git repository. I haven't bothered to change my AsciiDoc install again, however.

# Installing `xmlto`

If you now retry building the [Git](/wiki/Git) `doc` target:

    make prefix=/usr/local doc

You'll get somewhat farther; now the [HTML](/wiki/HTML) version of the documentation will build but it may still choke on the user manual because of what I presume are network connectivity issues:

    xsltproc --xinclude --stringparam html.stylesheet docbook-xsl.css -o user-manual.html docbook.xsl user-manual.xml
    error : Operation in progress
    warning: failed to load external entity "http://docbook.sourceforge.net/release/xsl/current/common/targets.xsl"
    compilation error: file http://docbook.sourceforge.net/release/xsl/current/html/docbook.xsl line 35 element include
    xsl:include : unable to load http://docbook.sourceforge.net/release/xsl/current/common/targets.xsl
    make[1]: *** [user-manual.html] Error 5
    make: *** [doc] Error 2

Trying again yielded a slightly different error:

    xsltproc --xinclude --stringparam html.stylesheet docbook-xsl.css -o user-manual.html docbook.xsl user-manual.xml
    error : Operation in progress
    warning: failed to load external entity "http://docbook.sourceforge.net/release/xsl/current/common/he.xml"
    http://docbook.sourceforge.net/release/xsl/current/common/l10n.xml:89: error: Failure to process entity he
    &he;
        ^
    http://docbook.sourceforge.net/release/xsl/current/common/l10n.xml:89: parser error : Entity 'he' not defined
    &he;
        ^

But the build continued, yielding many warnings (screenfuls) like these:

    No localization exists for "en" or "". Using default "en".
    No localization exists for "en" or "". Using default "en".
    No localization exists for "en" or "". Using default "en".
    No localization exists for "en" or "". Using default "en".
    No "en" localization exists.
    No context named "title-numbered" exists in the "en" localization.
    No "en" localization exists.
    No context named "title-numbered" exists in the "en" localization.
    No "en" localization exists.
    No context named "title-numbered" exists in the "en" localization.

And finally failing here:

    xmlto -m callouts.xsl man git-add.xml
    make[1]: xmlto: Command not found
    make[1]: *** [git-add.1] Error 127
    rm git-add.xml
    make: *** [doc] Error 2

So, we attempt installing `xmlto`:

    # get latest version from http://cyberelk.net/tim/data/xmlto/stable/
    wget http://cyberelk.net/tim/data/xmlto/stable/xmlto-0.0.18.tar.bz2
    tar xjvf xmlto-0.0.18.tar.bz2
    cd xmlto-0.0.18
    ./configure

Configuring reveals the following prerequisite:

    checking whether getopt handles long options... configure: error: no

    You need getopt from <http://huizen.dds.nl/~frodol/getopt.html>, or
    else some other implementation that supports --longoptions.

So:

    cd ..
    wget http://software.frodo.looijaard.name/getopt/files/getopt-1.1.4.tar.gz
    tar xzvf getopt-1.1.4.tar.gz
    cd getopt-1.1.4
    less README
    make

Dies as follows:

    nls.h:35:21: error: libintl.h: No such file or directory
    getopt.c: In function ‘our_malloc’:
    getopt.c:91: warning: implicit declaration of function ‘gettext’
    getopt.c:91: warning: incompatible implicit declaration of built-in function ‘gettext’
    getopt.c: In function ‘our_realloc’:
    getopt.c:101: warning: incompatible implicit declaration of built-in function ‘gettext’
    getopt.c: In function ‘parse_error’:
    getopt.c:235: warning: incompatible implicit declaration of built-in function ‘gettext’
    getopt.c: In function ‘add_long_options’:
    getopt.c:301: warning: incompatible implicit declaration of built-in function ‘gettext’
    getopt.c: In function ‘set_shell’:
    getopt.c:321: warning: incompatible implicit declaration of built-in function ‘gettext’
    getopt.c: In function ‘print_help’:
    getopt.c:326: warning: incompatible implicit declaration of built-in function ‘gettext’
    getopt.c: In function ‘main’:
    getopt.c:378: warning: implicit declaration of function ‘setlocale’
    getopt.c:378: warning: nested extern declaration of ‘setlocale’
    getopt.c:378: error: ‘LC_ALL’ undeclared (first use in this function)
    getopt.c:378: error: (Each undeclared identifier is reported only once
    getopt.c:378: error: for each function it appears in.)
    getopt.c:379: warning: implicit declaration of function ‘bindtextdomain’
    getopt.c:379: warning: nested extern declaration of ‘bindtextdomain’
    getopt.c:380: warning: implicit declaration of function ‘textdomain’
    getopt.c:380: warning: nested extern declaration of ‘textdomain’
    getopt.c:397: warning: incompatible implicit declaration of built-in function ‘gettext’
    getopt.c:446: warning: incompatible implicit declaration of built-in function ‘gettext’
    getopt.c:458: warning: incompatible implicit declaration of built-in function ‘gettext’
    make: *** [getopt.o] Error 1

So off to install another prerequisite:

    cd ..
    wget http://mirrors.kernel.org/gnu/gettext/gettext-0.17.tar.gz
    tar xzvf gettext-0.17.tar.gz
    cd gettext-0.17
    ./configure
    make
    make check

This failed dismally; here is a small excerpt:

    FAIL: lang-librep
    tr: Illegal byte sequence
    FAIL: lang-guile
    tr: Illegal byte sequence
    FAIL: lang-smalltalk
    tr: Illegal byte sequence
    FAIL: lang-java
    Skipping test: C# compiler not found
    SKIP: lang-csharp
    tr: Illegal byte sequence
    FAIL: lang-gawk
    Skipping test: ppc386 compiler not found
    SKIP: lang-pascal
    tr: Illegal byte sequence
    FAIL: lang-ycp
    tr: Illegal byte sequence
    FAIL: lang-tcl
    tr: Illegal byte sequence
    FAIL: lang-perl-1
    tr: Illegal byte sequence
    FAIL: lang-perl-2
    tr: Illegal byte sequence
    FAIL: lang-php
    tr: Illegal byte sequence
    FAIL: lang-po
    PASS: lang-rst
    =======================
    56 of 316 tests failed
    (11 tests were not run)
    =======================
    make[3]: *** [check-TESTS] Error 1
    make[2]: *** [check-am] Error 2
    make[1]: *** [check-recursive] Error 1
    make: *** [check-recursive] Error 1

Given that the previous version of gettext had built successfully on [Tiger](/wiki/Tiger) (see "[Installing Git 1.5.2.3 on Mac OS X Tiger](/wiki/Installing_Git_1.5.2.3_on_Mac_OS_X_Tiger)") I decided to try it out on [Leopard](/wiki/Leopard):

    cd ..
    wget http://mirrors.kernel.org/gnu/gettext/gettext-0.16.1.tar.gz
    tar xzvf gettext-0.16.1.tar.gz
    cd gettext-0.16.1
    ./configure
    make
    make check

There was one failure, but it looked harmless:

    1c1
    < «Votre commande, s'il vous plait», dit le garçon.
    ---
    > ?Votre commande, s'il vous plait?, dit le gar?on.
    FAIL: lang-bash

So I proceeded with the install:

    sudo make install

Now back to building getopt:

    cd ../getopt-1.1.4
    make

Errors out as follows:

    gcc -c -DLIBCGETOPT=1 -DWITH_GETTEXT= -DLOCALEDIR=\"/usr/local/share/locale\" -DNOT_UTIL_LINUX -Wall -W -Wshadow -Wpointer-arith -Wbad-function-cast -Wcast-qual -Wcast-align -Wmissing-declarations -Wwrite-strings -Wstrict-prototypes -Wmissing-prototypes -Wnested-externs -Winline -O3 -fno-strength-reduce getopt.c -o getopt.o
    gcc  -o getopt getopt.o
    Undefined symbols:
      "_libintl_textdomain", referenced from:
          _main in getopt.o
      "_libintl_bindtextdomain", referenced from:
          _main in getopt.o
      "_libintl_gettext", referenced from:
          _our_malloc in getopt.o
          _our_realloc in getopt.o
          _parse_error in getopt.o
          _print_help in getopt.o
          _print_help in getopt.o
          _print_help in getopt.o
          _print_help in getopt.o
          _print_help in getopt.o
          _print_help in getopt.o
          _print_help in getopt.o
          _print_help in getopt.o
          _print_help in getopt.o
          _print_help in getopt.o
          _print_help in getopt.o
          _print_help in getopt.o
          _print_help in getopt.o
          _print_help in getopt.o
          _print_help in getopt.o
          _set_shell in getopt.o
          _set_shell in getopt.o
          _normalize in getopt.o
          _add_longopt in getopt.o
          _add_long_options in getopt.o
          _add_long_options in getopt.o
          _main in getopt.o
          _main in getopt.o
          _main in getopt.o
          _main in getopt.o
          _main in getopt.o
    ld: symbol(s) not found
    collect2: ld returned 1 exit status
    make: *** [getopt] Error 1

This is similar to what happened in [Tiger](/wiki/Tiger); the solution is to modify the `Makefile`, changing

    LDFLAGS=

To:

    LDFLAGS=-lintl

And now the `make` will work:

    make
    sudo make install

Now back to xmlto:

    cd ../xmlto-0.0.18
    ./configure
    make
    make check
    sudo make install

As was the case with Tiger, installation also fails on Leopard, although the message is slightly different:

    I/O error : Attempt to load network entity http://docbook.sourceforge.net/release/xsl/current/manpages/docbook.xsl
    warning: failed to load external entity "http://docbook.sourceforge.net/release/xsl/current/manpages/docbook.xsl"
    cannot parse http://docbook.sourceforge.net/release/xsl/current/manpages/docbook.xsl
    xmlto: input does not validate (status 1)
    http://www.oasis-open.org/docbook/xml/4.2/dbcentx.mod:369: parser error : Entity value required
    ]]>
    ^
    http://www.oasis-open.org/docbook/xml/4.2/dbcentx.mod:369: parser error : Space required before 'NDATA'
    ]]>
    ^
    http://www.oasis-open.org/docbook/xml/4.2/dbcentx.mod:369: parser error : xmlParseEntityDecl: entity lcar not terminated
    ]]>
    ^
    http://www.oasis-open.org/docbook/xml/4.2/docbookx.dtd:127: parser warning : PEReference: %dbpool.module; not found
    <![ %dbpool.module; [
                       ^
    http://www.oasis-open.org/docbook/xml/4.2/docbookx.dtd:127: parser error : conditional section INCLUDE or IGNORE keyword expected
    <![ %dbpool.module; [
                        ^
    http://www.oasis-open.org/docbook/xml/4.2/docbookx.dtd:127: parser error : Content error in the external subset
    <!ENTITY % dbpool PUBLIC
     ^

    Q: I'm trying to build xmlto on my Debian box, but it doesn't work.

    A: If you get `Attempt to load network entity' errors when building
       xmlto, your system does not have the required support for XML
       Catalogs
       (http://www.oasis-open.org/committees/entity/spec-2001-08-06.html).
       In particular, Debian has no support for these.  Try the Fedora
       Project <http://fedora.redhat.com>.
    make[1]: *** [man/man1/xmlif.1] Error 1
    make: *** [install-am] Error 2

So:

    sudo mkdir -p /usr/local/etc/xml
    sudo xmlcatalog --noout --create /usr/local/etc/xml/catalog
    sudo mkdir -p /usr/local/share/docbook/xsl
    cd /usr/local/share/docbook/xsl
    sudo wget http://surfnet.dl.sourceforge.net/sourceforge/docbook/docbook-xsl-1.73.2.tar.bz2
    sudo tar xjvf docbook-xsl-1.73.2.tar.bz2

    # would have liked to install this in /usr/local/etc, but only /etc works
    sudo xmlcatalog --noout --add 'nextCatalog' '' 'file:///usr/local/share/docbook/docbook-xsl-1.73.2/catalog.xml' --create /etc/xml/catalog

With these changes we now see errors like the following in the `make` of xmlto:

    Resolve: sysID http://docbook.sourceforge.net/release/xsl/current/manpages/docbook.xsl
    -1602326688 Parsing catalog file:///etc/xml/catalog
    file:///etc/xml/catalog added to file hash
    file:///usr/local/share/docbook/docbook-xsl-1.73.2/catalog.xml not found in file hash
    -1602326688 Parsing catalog file:///usr/local/share/docbook/docbook-xsl-1.73.2/catalog.xml
    file:///usr/local/share/docbook/docbook-xsl-1.73.2/catalog.xml added to file hash
    Using rewriting rule http://docbook.sourceforge.net/release/xsl/current/
    Resolve: pubID -//OASIS//DTD DocBook XML V4.2//EN sysID http://www.oasis-open.org/docbook/xml/4.2/docbookx.dtd
    Resolve URI http://www.oasis-open.org/docbook/xml/4.2/docbookx.dtd
    I/O error : Attempt to load network entity http://www.oasis-open.org/docbook/xml/4.2/docbookx.dtd
    /Users/wincent/trabajo/vendor/git/xmlto-0.0.18/./doc/xmlif.xml:4: warning: failed to load external entity "http://www.oasis-open.org/docbook/xml/4.2/docbookx.dtd"
       "http://www.oasis-open.org/docbook/xml/4.2/docbookx.dtd">
                                                                ^
    Note: meta source : no *info/productname or alternative            xmlif
    Note: meta source : see http://docbook.sf.net/el/productname       xmlif
    Note: meta source : no refentry/refmeta/refmiscinfo@class=source   xmlif
    Note: meta source : see http://docbook.sf.net/el/refmiscinfo       xmlif
    Note: meta version: no *info/productnumber or alternative          xmlif
    Note: meta version: see http://docbook.sf.net/el/productnumber     xmlif
    Note: meta version: no refentry/refmeta/refmiscinfo@class=version  xmlif
    Note: meta version: see http://docbook.sf.net/el/refmiscinfo       xmlif
    Note: meta manual : no titled ancestor of refentry                 xmlif
    Note: meta manual : no refentry/refmeta/refmiscinfo@class=manual   xmlif
    Note: meta manual : see http://docbook.sf.net/el/refmiscinfo       xmlif
    Note: Writing xmlif.1
    Catalogs cleanup
    Free catalog entry file:///usr/local/share/docbook/docbook-xsl-1.73.2/catalog.xml
    Free catalog entry file:///etc/xml/catalog
    Free catalog entry http://docbook.sourceforge.net/release/xsl/current/
    Free catalog entry http://docbook.sourceforge.net/release/xsl/current/
    Free catalog entry http://docbook.sourceforge.net/release/xsl/1.73.2/
    Free catalog entry http://docbook.sourceforge.net/release/xsl/1.73.2/
    Free catalog entry file:///usr/local/share/docbook/docbook-xsl-1.73.2/catalog.xml
    Free catalog entry

So, now to install the DocBook DTDs:

    cd /usr/local/share/docbook
    sudo wget http://www.oasis-open.org/docbook/xml/4.2/docbook-xml-4.2.zip
    sudo unzip docbook-xml-4.2.zip -d docbook-xml-4.2
    sudo xmlcatalog --noout --add nextCatalog '' file:///usr/local/share/docbook/docbook-xml-4.2/catalog.xml --create /etc/xml/catalog

Now the xmlto install finally works:

    cd path_to_xmlto
    make clean
    ./configure
    make
    make check
    sudo make install

And we can try building the Git documentation again:

    cd path_to_git
    make prefix=/usr/local doc
    sudo make prefix=/usr/local install-doc

# Alternatives to building the documentation manually

-   [Installing pre-built Git documentation from the Git repo](/wiki/Installing_pre-built_Git_documentation_from_the_Git_repo)
