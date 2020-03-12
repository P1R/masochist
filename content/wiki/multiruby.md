---
tags: ruby multiruby wiki
cache_breaker: 1
---

# Overview

```shell
$ sudo gem install ZenTest # install multiruby
```

Now you would expect the following to work:

```shell
$ multiruby_setup the_usual # install 1.8.6, 1.8.7, 1.9.1 and 1.9.2, and RubyGems
```

But this bails trying to install RubyGems into the 1.8.6 environment because some time ago RubyGems [dropped 1.8.6 compatibility](http://blog.segment7.net/2010/04/23/ruby-1-8-6-policy).

Rather than trying to manually install an older version of RubyGems inside that environment, I'll just blow it away and explicitly select only 1.8.7, 1.9.1 and 1.9.2:

```shell
$ multiruby_setup rm:1.8.6-p420
$ multiruby_setup mri:tar:1.8.7
$ multiruby_setup mri:tar:1.9.1
$ multiruby_setup mri:tar:1.9.2
$ multiruby_setup update:rubygems
$ multigem install bundler   # install Bundler in each version's sandbox
```

For some reason, it appears that `update:rubygems` didn't actually update all the RubyGems. 1.8.7 was updated to 1.6.2, but 1.9.1 was sitting on 1.3.1 and 1.9.2 was on 1.3.7, which prevented Bundler from installing.

```shell
$ multigem update --system
$ multigem install bundler   # install Bundler in each version's sandbox
```

# Older instructions

This is how I initially stumbled through the setup a couple of years ago when I first tried using multiruby:

```shell
$ sudo gem install ZenTest # install multiruby
$ multiruby                # triggers initial build
$ multigem install rspec   # install rspec in each version's sandbox
```

# Initial setup

If you don't have [ZenTest](/wiki/ZenTest) already, install it:

    sudo gem install ZenTest

Then just call `multiruby`; in my ignorance, I actually triggered it with

    multiruby --help

Which yielded:

    creating /Users/wincent/.multiruby
    creating build
    creating install
    creating versions
      Downloading initial ruby tarballs to ~/.multiruby/versions:
        Determining latest version for 1.8
        Fetching ruby-1.8.7-p72.tar.gz via HTTP... this might take a while.
        Determining latest version for 1.9
        Fetching ruby-1.9.1-rc2.tar.gz via HTTP... this might take a while.
      ...done
      Put other ruby tarballs in ~/.multiruby/versions to use them.
    creating tmp
    creating /Users/wincent/.multiruby/install/1.8.7-p72
    Running command: tar zxf ../versions/ruby-1.8.7-p72.tar.gz
    building and installing 1.8.7-p72
    Running command: ./configure --prefix /Users/wincent/.multiruby/install/1.8.7-p72 &> log.configure
    Running command: nice make -j4 &> log.build
    Running command: make install &> log.install
    creating /Users/wincent/.multiruby/install/1.9.1-rc2
    Running command: tar zxf ../versions/ruby-1.9.1-rc2.tar.gz
    building and installing 1.9.1-rc2
    Running command: ./configure --prefix /Users/wincent/.multiruby/install/1.9.1-rc2 &> log.configure
    Running command: nice make -j4 &> log.build
    Running command: make install &> log.install

    VERSION = 1.8.7-p72
    CMD     = ~/.multiruby/install/1.8.7-p72/bin/ruby --help

    Usage: /Users/wincent/.multiruby/install/1.8.7-p72/bin/ruby [switches] [--] [programfile] [arguments]
      -0[octal]       specify record separator (\0, if no argument)
      -a              autosplit mode with -n or -p (splits $_ into $F)
      -c              check syntax only
      -Cdirectory     cd to directory, before executing your script
      -d              set debugging flags (set $DEBUG to true)
      -e 'command'    one line of script. Several -e's allowed. Omit [programfile]
      -Fpattern       split() pattern for autosplit (-a)
      -i[extension]   edit ARGV files in place (make backup if extension supplied)
      -Idirectory     specify $LOAD_PATH directory (may be used more than once)
      -Kkcode         specifies KANJI (Japanese) code-set
      -l              enable line ending processing
      -n              assume 'while gets(); ... end' loop around your script
      -p              assume loop like -n but print line also like sed
      -rlibrary       require the library, before executing your script
      -s              enable some switch parsing for switches after script name
      -S              look for the script using PATH environment variable
      -T[level]       turn on tainting checks
      -v              print version number, then turn on verbose mode
      -w              turn warnings on for your script
      -W[level]       set warning level; 0=silence, 1=medium, 2=verbose (default)
      -x[directory]   strip off text before #!ruby line and perhaps cd to directory
      --copyright     print the copyright
      --version       print the version

    RESULT = 0

    VERSION = 1.9.1-rc2
    CMD     = ~/.multiruby/install/1.9.1-rc2/bin/ruby --help

    Usage: /Users/wincent/.multiruby/install/1.9.1-rc2/bin/ruby [switches] [--] [programfile] [arguments]
      -0[octal]       specify record separator (\0, if no argument)
      -a              autosplit mode with -n or -p (splits $_ into $F)
      -c              check syntax only
      -Cdirectory     cd to directory, before executing your script
      -d              set debugging flags (set $DEBUG to true)
      -e 'command'    one line of script. Several -e's allowed. Omit [programfile]
      -Eex[:in]       specify the default external and internal character encodings
      -Fpattern       split() pattern for autosplit (-a)
      -i[extension]   edit ARGV files in place (make backup if extension supplied)
      -Idirectory     specify $LOAD_PATH directory (may be used more than once)
      -l              enable line ending processing
      -n              assume 'while gets(); ... end' loop around your script
      -p              assume loop like -n but print line also like sed
      -rlibrary       require the library, before executing your script
      -s              enable some switch parsing for switches after script name
      -S              look for the script using PATH environment variable
      -T[level]       turn on tainting checks
      -v              print version number, then turn on verbose mode
      -w              turn warnings on for your script
      -W[level]       set warning level; 0=silence, 1=medium, 2=verbose (default for level)
      -x[directory]   strip off text before #!ruby line and perhaps cd to directory
      --copyright     print the copyright
      --version       print the version

    RESULT = 0

    TOTAL RESULT = 0 failures out of 2

    Passed: 1.9.1-rc2, 1.8.7-p72
    Failed:

So you can see here how it installed two versions of Ruby and then tried to execute `ruby --help` for each one.

As noted [here](http://blog.robseaman.com/2008/12/20/switching-between-ruby-1-8-1-9-with-multiruby) and [here](http://drnicwilliams.com/2008/12/11/future-proofing-your-ruby-code/) you can test against any other versions you please as well.

So to test against the 1.9.1 release:

    multiruby_setup mri:svn:tag:v1_9_1_0

Unfortunately I can't get much further than this, because I can't run specs without RSpec or RubyGems installed in the test environments:

    $ multiruby_setup update:rubygems
    /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/lib/ruby/1.8/net/http.rb:564:in `initialize': getaddrinfo: nodename nor servname provided, or not known (SocketError)
    	from /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/lib/ruby/1.8/net/http.rb:564:in `open'
    	from /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/lib/ruby/1.8/net/http.rb:564:in `connect'
    	from /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/lib/ruby/1.8/timeout.rb:48:in `timeout'
    	from /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/lib/ruby/1.8/timeout.rb:76:in `timeout'
    	from /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/lib/ruby/1.8/net/http.rb:564:in `connect'
    	from /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/lib/ruby/1.8/net/http.rb:557:in `do_start'
    	from /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/lib/ruby/1.8/net/http.rb:546:in `start'
    	from /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/lib/ruby/1.8/open-uri.rb:243:in `open_http'
    	 ... 9 levels...
    	from /Library/Ruby/Gems/1.8/gems/ZenTest-3.11.1/bin/multiruby_setup:10:in `each'
    	from /Library/Ruby/Gems/1.8/gems/ZenTest-3.11.1/bin/multiruby_setup:10
    	from /usr/bin/multiruby_setup:19:in `load'
    	from /usr/bin/multiruby_setup:19

So here I install RubyGems manually in one of the environments:

    OLD_PATH=$PATH
    export PATH=~/.multiruby/install/v1_9_1_0/bin:$PATH
    ruby -v
    wget http://rubyforge.org/frs/download.php/45905/rubygems-1.3.1.tgz
    tar xzvf rubygems-1.3.1.tgz
    cd rubygems-1.3.1
    ruby setup.rb

Looks like I was able to install RSpec despite the mysterious permissions errors:

    $ gem install rspec
    Successfully installed rspec-1.1.12
    1 gem installed
    Installing ri documentation for rspec-1.1.12...
    ERROR:  While executing gem ... (Errno::EACCES)
        Permission denied - /Users/wincent/.ri/cache/.doc_dirs

I then tried running the spec suite from my [wikitext](/wiki/wikitext) project, but it caused the Ruby interpreter to crash. This was because I need to do a `rake clean; rake make` (the old version of the extension, built against Ruby 1.8.6, was still lying around).

The spec suite itself won't run:

    $ spec spec
    /Users/wincent/.multiruby/install/v1_9_1_0/lib/ruby/gems/1.9.1/gems/rspec-1.1.12/lib/spec/runner/example_group_runner.rb:15:in `load': /Users/wincent/trabajo/unversioned/wikitext/src/spec/external_link_spec.rb:178: invalid multibyte char (US-ASCII) (SyntaxError)
    /Users/wincent/trabajo/unversioned/wikitext/src/spec/external_link_spec.rb:178: invalid multibyte char (US-ASCII)
    /Users/wincent/trabajo/unversioned/wikitext/src/spec/external_link_spec.rb:178: syntax error, unexpected $end, expecting ')'
    ...Q{[http://google.com/ Google €]}).should == expected
    ...                               ^
    	from /Users/wincent/.multiruby/install/v1_9_1_0/lib/ruby/gems/1.9.1/gems/rspec-1.1.12/lib/spec/runner/example_group_runner.rb:15:in `block in load_files'
    	from /Users/wincent/.multiruby/install/v1_9_1_0/lib/ruby/gems/1.9.1/gems/rspec-1.1.12/lib/spec/runner/example_group_runner.rb:14:in `each'
    	from /Users/wincent/.multiruby/install/v1_9_1_0/lib/ruby/gems/1.9.1/gems/rspec-1.1.12/lib/spec/runner/example_group_runner.rb:14:in `load_files'
    	from /Users/wincent/.multiruby/install/v1_9_1_0/lib/ruby/gems/1.9.1/gems/rspec-1.1.12/lib/spec/runner/options.rb:94:in `run_examples'
    	from /Users/wincent/.multiruby/install/v1_9_1_0/lib/ruby/gems/1.9.1/gems/rspec-1.1.12/lib/spec/runner/command_line.rb:9:in `run'
    	from /Users/wincent/.multiruby/install/v1_9_1_0/lib/ruby/gems/1.9.1/gems/rspec-1.1.12/bin/spec:4:in `<top (required)>'
    	from /Users/wincent/.multiruby/install/v1_9_1_0/bin/spec:19:in `load'
    	from /Users/wincent/.multiruby/install/v1_9_1_0/bin/spec:19:in `<main>'

Looks like it expects my source files to be in ASCII, and chokes on the UTF-8 spec files that 1.8.6 used to accept.

Nevertheless, a cursory manual test of the extension indicates that it basically works:

    $ rake make
    (in /Users/wincent/trabajo/unversioned/wikitext/src)
    checking for ruby.h... yes
    creating Makefile
    gcc -I. -I/Users/wincent/.multiruby/install/v1_9_1_0/include/ruby-1.9.1/i386-darwin9.6.0 -I/Users/wincent/.multiruby/install/v1_9_1_0/include/ruby-1.9.1/ruby/backward -I/Users/wincent/.multiruby/install/v1_9_1_0/include/ruby-1.9.1 -I. -DHAVE_RUBY_H  -D_XOPEN_SOURCE -D_DARWIN_C_SOURCE   -fno-common  -O2 -g -Wall -Wno-parentheses -pipe -fno-common  -std=gnu99 -Wall -Wextra -Wno-unused-parameter -o ary.o -c ary.c
    gcc -I. -I/Users/wincent/.multiruby/install/v1_9_1_0/include/ruby-1.9.1/i386-darwin9.6.0 -I/Users/wincent/.multiruby/install/v1_9_1_0/include/ruby-1.9.1/ruby/backward -I/Users/wincent/.multiruby/install/v1_9_1_0/include/ruby-1.9.1 -I. -DHAVE_RUBY_H  -D_XOPEN_SOURCE -D_DARWIN_C_SOURCE   -fno-common  -O2 -g -Wall -Wno-parentheses -pipe -fno-common  -std=gnu99 -Wall -Wextra -Wno-unused-parameter -o parser.o -c parser.c
    gcc -I. -I/Users/wincent/.multiruby/install/v1_9_1_0/include/ruby-1.9.1/i386-darwin9.6.0 -I/Users/wincent/.multiruby/install/v1_9_1_0/include/ruby-1.9.1/ruby/backward -I/Users/wincent/.multiruby/install/v1_9_1_0/include/ruby-1.9.1 -I. -DHAVE_RUBY_H  -D_XOPEN_SOURCE -D_DARWIN_C_SOURCE   -fno-common  -O2 -g -Wall -Wno-parentheses -pipe -fno-common  -std=gnu99 -Wall -Wextra -Wno-unused-parameter -o str.o -c str.c
    gcc -I. -I/Users/wincent/.multiruby/install/v1_9_1_0/include/ruby-1.9.1/i386-darwin9.6.0 -I/Users/wincent/.multiruby/install/v1_9_1_0/include/ruby-1.9.1/ruby/backward -I/Users/wincent/.multiruby/install/v1_9_1_0/include/ruby-1.9.1 -I. -DHAVE_RUBY_H  -D_XOPEN_SOURCE -D_DARWIN_C_SOURCE   -fno-common  -O2 -g -Wall -Wno-parentheses -pipe -fno-common  -std=gnu99 -Wall -Wextra -Wno-unused-parameter -o token.o -c token.c
    gcc -I. -I/Users/wincent/.multiruby/install/v1_9_1_0/include/ruby-1.9.1/i386-darwin9.6.0 -I/Users/wincent/.multiruby/install/v1_9_1_0/include/ruby-1.9.1/ruby/backward -I/Users/wincent/.multiruby/install/v1_9_1_0/include/ruby-1.9.1 -I. -DHAVE_RUBY_H  -D_XOPEN_SOURCE -D_DARWIN_C_SOURCE   -fno-common  -O2 -g -Wall -Wno-parentheses -pipe -fno-common  -std=gnu99 -Wall -Wextra -Wno-unused-parameter -o wikitext.o -c wikitext.c
    gcc -I. -I/Users/wincent/.multiruby/install/v1_9_1_0/include/ruby-1.9.1/i386-darwin9.6.0 -I/Users/wincent/.multiruby/install/v1_9_1_0/include/ruby-1.9.1/ruby/backward -I/Users/wincent/.multiruby/install/v1_9_1_0/include/ruby-1.9.1 -I. -DHAVE_RUBY_H  -D_XOPEN_SOURCE -D_DARWIN_C_SOURCE   -fno-common  -O2 -g -Wall -Wno-parentheses -pipe -fno-common  -std=gnu99 -Wall -Wextra -Wno-unused-parameter -o wikitext_ragel.o -c wikitext_ragel.c
    cc -dynamic -bundle -undefined suppress -flat_namespace -o wikitext.bundle ary.o parser.o str.o token.o wikitext.o wikitext_ragel.o -L. -L/Users/wincent/.multiruby/install/v1_9_1_0/lib -L. -L/usr/local/lib    -lpthread -ldl -lobjc
    $ irb -r ext/wikitext
    irb(main):001:0> Wikitext::Parser
    => Wikitext::Parser
    irb(main):002:0> Wikitext::Parser.new
    => #<Wikitext::Parser:0x41e114 @autolink=true, @line_ending="\n", @external_link_class="external", @mailto_class="mailto", @internal_link_prefix="/wiki/", @img_prefix="/images/", @space_to_underscore=true, @minimum_fulltext_token_length=3>
    irb(main):003:0> Wikitext::Parser.new.parse "foo"
    => "<p>foo</p>\n"
    irb(main):004:0> exit

## Links

-   <http://blog.zenspider.com/2007/12/testing-for-ruby-18-and-19-usi.html>
