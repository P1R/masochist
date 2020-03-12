---
tags: leopard ruby rails mysql wiki
---

As noted in my [Leopard set-up notes](/wiki/Leopard_set-up_notes), I couldn't get [MySQL](/wiki/MySQL) to build on [Leopard](/wiki/Leopard) 10.5.0, but I could with 10.5.1.

On upgrading to Rails 2.0RC2 (see "[Upgrading to Rails 2.0RC2 on Mac OS X Leopard](/wiki/Upgrading_to_Rails_2.0RC2_on_Mac_OS_X_Leopard)") I noticed that they'd added some instructions to the `config/database.yml` file for installing the mysql [gem](/wiki/gem) on Leopard:

    sudo env ARCHFLAGS="-arch i386" gem install mysql -- --with-mysql-config=/usr/local/mysql/bin/mysql_config

Looks like this advice probably originated from [here](http://trac.macosforge.org/projects/ruby/wiki/Troubleshooting).

But note, when I just did a plain `./configure && make` for MySQL, the `mysql_config` tool was _not_ installed at that path, but at `/usr/local/bin/mysql_config` instead.

So, in my case, I had to do this (note the different value for `--with-mysql-config`):

    $ sudo env ARCHFLAGS="-arch i386" gem install mysql -- --with-mysql-config=/usr/local/bin/mysql_config
    Bulk updating Gem source index for: http://gems.rubyforge.org
    Select which gem to install for your platform (universal-darwin9.0)
     1. mysql 2.7.3 (mswin32)
     2. mysql 2.7.1 (mswin32)
     3. mysql 2.7 (ruby)
     4. mysql 2.6 (ruby)
     5. Skip this gem
     6. Cancel installation
    > 3
    Building native extensions.  This could take a while...
    Successfully installed mysql-2.7

# Update

Some time later I started seeing entries like this in my [Rails](/wiki/Rails) logs:

    WARNING: You're using the Ruby-based MySQL library that ships with Rails.
    This library is not suited for production. Please install the C-based MySQL
    library instead (gem install mysql).

Yet it does seem that it is installed:

    $ gem list | grep mysql
    mysql (2.7)

Given that a later version is available:

    $ gem list --remote|grep mysql
    activerecord-jdbcmysql-adapter (0.7.1, 0.7, 0.6)
    do_mysql (0.2.3, 0.2.2, 0.2.1, 0.2.0)
    jdbc-mysql (5.0.4)
    mysql (2.7.3, 2.7.1, 2.7, 2.6, 2.5.1)
    mysql_replication_adapter (0.4.0, 0.2.0, 0.1.1, 0.1.0)
    mysql_retry_lost_connection (0.0.1)

I decided to proceeded with a reinstallation. My initial attempt naturally didn't work, as I had already forgotten about the workaround necessary to install the [gem](/wiki/gem) on [Leopard](/wiki/Leopard):

    $ sudo gem install mysql
    Password:
    Updating metadata for 57 gems from http://gems.rubyforge.org
    .........................................................
    complete
    Building native extensions.  This could take a while...
    ERROR:  Error installing mysql:
    	ERROR: Failed to build gem native extension.

    /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/bin/ruby extconf.rb install mysql
    checking for mysql_query() in -lmysqlclient... no
    checking for main() in -lm... yes
    checking for mysql_query() in -lmysqlclient... no
    checking for main() in -lz... yes
    checking for mysql_query() in -lmysqlclient... no
    checking for main() in -lsocket... no
    checking for mysql_query() in -lmysqlclient... no
    checking for main() in -lnsl... no
    checking for mysql_query() in -lmysqlclient... no


    Gem files will remain installed in /Library/Ruby/Gems/1.8/gems/mysql-2.7 for inspection.
    Results logged to /Library/Ruby/Gems/1.8/gems/mysql-2.7/gem_make.out

A quick [Google](/wiki/Google) (too quick, seeing as I didn't find this page again reminding me that I'd already been through this once before!) suggested that I need to do the following, which also didn't work:

    $ sudo gem install mysql -- --with-mysql-config=/usr/local/mysql/bin/mysql_config
    Password:
    Building native extensions.  This could take a while...
    ERROR:  Error installing mysql:
    	ERROR: Failed to build gem native extension.

    /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/bin/ruby extconf.rb install mysql -- --with-mysql-config=/usr/local/mysql/bin/mysql_config
    checking for mysql_ssl_set()... no
    checking for mysql.h... yes
    creating Makefile

    make
    gcc -I. -I. -I/System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/lib/ruby/1.8/universal-darwin9.0 -I. -DHAVE_MYSQL_H  -I/usr/local/mysql/include/mysql -fno-common -arch ppc -arch i386 -Os -pipe -fno-common  -c mysql.c
    cc -arch ppc -arch i386 -pipe -bundle -o mysql.bundle mysql.o -L"." -L"/System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/lib" -L. -arch ppc -arch i386    -lruby -L/usr/local/mysql/lib/mysql -lmysqlclient -lz -lm  -lpthread -ldl -lm
    ld: warning in /usr/local/mysql/lib/mysql/libmysqlclient.dylib, file is not of required architecture
    Undefined symbols for architecture ppc:
      "_mysql_store_result", referenced from:
          _store_result in mysql.o
          _query in mysql.o
      "_mysql_stmt_errno", referenced from:
          _mysql_stmt_raise in mysql.o
          _stmt_prepare in mysql.o
          _stmt_result_metadata in mysql.o
      "_mysql_stmt_error", referenced from:
          _mysql_stmt_raise in mysql.o
      "_mysql_options", referenced from:
          _options in mysql.o
      "_mysql_refresh", referenced from:
          _refresh in mysql.o
          _reload in mysql.o
      "_mysql_get_client_version", referenced from:
          _client_version in mysql.o
      "_mysql_stmt_bind_result", referenced from:
          _stmt_bind_result in mysql.o
          _stmt_execute in mysql.o
      "_mysql_fetch_lengths", referenced from:
          _fetch_hash2 in mysql.o
          _fetch_lengths in mysql.o
          _fetch_row in mysql.o
      "_mysql_character_set_name", referenced from:
          _character_set_name in mysql.o
      "_mysql_set_server_option", referenced from:
          _query in mysql.o
          _set_server_option in mysql.o
      "_mysql_real_query", referenced from:
          _query in mysql.o
          _query in mysql.o
      "_mysql_num_fields", referenced from:
          _fetch_hash2 in mysql.o
          _fetch_fields in mysql.o
          _fetch_field_direct in mysql.o
          _fetch_lengths in mysql.o
          _fetch_row in mysql.o
          _num_fields in mysql.o
          _stmt_prepare in mysql.o
      "_mysql_ping", referenced from:
          _ping in mysql.o
      "_mysql_free_result", referenced from:
          _free_mysqlres in mysql.o
          _free_mysqlstmt_memory in mysql.o
          _free_mysqlstmt in mysql.o
          _list_dbs in mysql.o
          _list_tables in mysql.o
          _res_free in mysql.o
          _stmt_free_result in mysql.o
      "_mysql_rollback", referenced from:
          _rollback in mysql.o
      "_mysql_next_result", referenced from:
          _query in mysql.o
          _next_result in mysql.o
      "_mysql_data_seek", referenced from:
          _data_seek in mysql.o
      "_mysql_autocommit", referenced from:
          _autocommit in mysql.o
      "_mysql_debug", referenced from:
          _my_debug in mysql.o
      "_mysql_stmt_affected_rows", referenced from:
          _stmt_affected_rows in mysql.o
      "_mysql_stmt_insert_id", referenced from:
          _stmt_insert_id in mysql.o
      "_mysql_use_result", referenced from:
          _use_result in mysql.o
      "_mysql_stmt_fetch", referenced from:
          _stmt_fetch in mysql.o
      "_mysql_stmt_free_result", referenced from:
          _stmt_free_result in mysql.o
      "_mysql_field_seek", referenced from:
          _field_seek in mysql.o
      "_mysql_stmt_param_count", referenced from:
          _stmt_param_count in mysql.o
          _stmt_prepare in mysql.o
      "_mysql_fetch_row", referenced from:
          _list_dbs in mysql.o
          _list_tables in mysql.o
          _fetch_hash2 in mysql.o
          _fetch_row in mysql.o
      "_mysql_sqlstate", referenced from:
          _mysql_raise in mysql.o
          _sqlstate in mysql.o
      "_mysql_stmt_sqlstate", referenced from:
          _mysql_stmt_raise in mysql.o
          _stmt_sqlstate in mysql.o
      "_mysql_list_processes", referenced from:
          _list_processes in mysql.o
      "_mysql_real_escape_string", referenced from:
          _real_escape_string in mysql.o
      "_mysql_stmt_bind_param", referenced from:
          _stmt_execute in mysql.o
      "_mysql_field_count", referenced from:
          _field_count in mysql.o
          _query in mysql.o
          _query in mysql.o
      "_mysql_field_tell", referenced from:
          _field_tell in mysql.o
      "_mysql_stmt_result_metadata", referenced from:
          _stmt_prepare in mysql.o
          _stmt_result_metadata in mysql.o
      "_mysql_list_tables", referenced from:
          _list_tables in mysql.o
      "_mysql_stmt_prepare", referenced from:
          _stmt_prepare in mysql.o
      "_mysql_get_client_info", referenced from:
          _client_info in mysql.o
      "_mysql_thread_id", referenced from:
          _thread_id in mysql.o
      "_mysql_stmt_execute", referenced from:
          _stmt_execute in mysql.o
      "_mysql_stmt_init", referenced from:
          _stmt_init in mysql.o
      "_mysql_stat", referenced from:
          _my_stat in mysql.o
      "_mysql_stmt_field_count", referenced from:
          _stmt_field_count in mysql.o
      "_mysql_close", referenced from:
          _free_mysql in mysql.o
          _my_close in mysql.o
      "_mysql_stmt_data_seek", referenced from:
          _stmt_data_seek in mysql.o
      "_mysql_fetch_fields", referenced from:
          _fetch_hash2 in mysql.o
          _fetch_fields in mysql.o
          _stmt_bind_result in mysql.o
          _stmt_execute in mysql.o
          _stmt_prepare in mysql.o
      "_mysql_list_fields", referenced from:
          _list_fields in mysql.o
      "_mysql_row_seek", referenced from:
          _row_seek in mysql.o
      "_mysql_change_user", referenced from:
          _change_user in mysql.o
      "_mysql_stmt_row_seek", referenced from:
          _stmt_row_seek in mysql.o
      "_mysql_stmt_close", referenced from:
          _free_mysqlstmt in mysql.o
          _stmt_close in mysql.o
      "_mysql_info", referenced from:
          _info in mysql.o
      "_mysql_init", referenced from:
          _init in mysql.o
          _real_connect in mysql.o
      "_mysql_get_server_info", referenced from:
          _server_info in mysql.o
      "_mysql_fetch_field_direct", referenced from:
          _fetch_field_direct in mysql.o
      "_mysql_dump_debug_info", referenced from:
          _dump_debug_info in mysql.o
      "_mysql_row_tell", referenced from:
          _row_tell in mysql.o
      "_mysql_real_connect", referenced from:
          _real_connect in mysql.o
          _real_connect2 in mysql.o
      "_mysql_stmt_row_tell", referenced from:
          _stmt_row_tell in mysql.o
      "_mysql_kill", referenced from:
          _my_kill in mysql.o
      "_mysql_num_rows", referenced from:
          _list_dbs in mysql.o
          _list_tables in mysql.o
          _num_rows in mysql.o
      "_mysql_warning_count", referenced from:
          _warning_count in mysql.o
      "_mysql_stmt_num_rows", referenced from:
          _stmt_num_rows in mysql.o
      "_mysql_stmt_attr_set", referenced from:
          _stmt_init in mysql.o
      "_mysql_get_server_version", referenced from:
          _query in mysql.o
          _server_version in mysql.o
      "_mysql_more_results", referenced from:
          _more_results in mysql.o
      "_mysql_select_db", referenced from:
          _select_db in mysql.o
      "_mysql_stmt_store_result", referenced from:
          _stmt_execute in mysql.o
      "_mysql_get_host_info", referenced from:
          _host_info in mysql.o
      "_mysql_commit", referenced from:
          _commit in mysql.o
      "_mysql_shutdown", referenced from:
          _my_shutdown in mysql.o
      "_mysql_list_dbs", referenced from:
          _list_dbs in mysql.o
      "_mysql_affected_rows", referenced from:
          _affected_rows in mysql.o
      "_mysql_insert_id", referenced from:
          _insert_id in mysql.o
      "_mysql_fetch_field", referenced from:
          _fetch_field in mysql.o
      "_mysql_get_proto_info", referenced from:
          _proto_info in mysql.o
      "_mysql_errno", referenced from:
          _mysql_raise in mysql.o
          _my_close in mysql.o
          _my_errno in mysql.o
      "_mysql_error", referenced from:
          _mysql_raise in mysql.o
          _my_error in mysql.o
      "_mysql_escape_string", referenced from:
          _escape_string in mysql.o
    ld: symbol(s) not found for architecture ppc
    collect2: ld returned 1 exit status
    lipo: can't open input file: /var/tmp//cceVkwKg.out (No such file or directory)
    make: *** [mysql.bundle] Error 1


    Gem files will remain installed in /Library/Ruby/Gems/1.8/gems/mysql-2.7 for inspection.
    Results logged to /Library/Ruby/Gems/1.8/gems/mysql-2.7/gem_make.out

Finally I found a bunch of other results which indicated what the real solution to the problem would be:

-   <http://trac.macosforge.org/projects/ruby/wiki/Troubleshooting>
-   <http://www.zonageek.com/blog/archivos/2007/10/25-162515.php>
-   <http://www.notsostupid.com/blog/2007/10/25/ruby-leopard-and-gems/>
-   <http://nullcreations.net/entry/installing-ruby-mysql-gem-in-osx-10-5-leopard>
-   <http://reinh.com/2007/11/19/leopard-s-rubygem-macports-mysql-and-installing-the-mysql-gem>

<!-- -->

    $ sudo -s
    Password:
    bash-3.2# ARCHFLAGS="-arch i386" gem install mysql -- --with-mysql-config=/usr/local/mysql/bin/mysql_config
    Updating metadata for 49 gems from http://gems.rubyforge.org
    .................................................
    complete
    Building native extensions.  This could take a while...
    Successfully installed mysql-2.7
    1 gem installed

The `install_name_tool` trick doesn't seem to be necessary with this version of the [gem](/wiki/gem) because the reference to the `libmysqlclient.15.dylib` is already pointing to the right place:

    bash-3.2# otool -L /usr/local/mysql/lib/mysql/libmysqlclient.15.0.0.dylib
    /usr/local/mysql/lib/mysql/libmysqlclient.15.0.0.dylib:
    	/usr/local/mysql/lib/mysql/libmysqlclient.15.dylib (compatibility version 16.0.0, current version 16.0.0)
    	/usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 111.0.0)
    	/usr/lib/libz.1.dylib (compatibility version 1.0.0, current version 1.2.3)
    	/usr/lib/libgcc_s.1.dylib (compatibility version 1.0.0, current version 1.0.0)
    bash-3.2# ls -l /usr/local/mysql/lib/mysql/libmysqlclient.15.dylib
    lrwxr-xr-x  1 root  wheel  27 Nov 30 10:45 /usr/local/mysql/lib/mysql/libmysqlclient.15.dylib -> libmysqlclient.15.0.0.dylib

Points of interest:

-   The warnings in the [Rails](/wiki/Rails) log have gone away
-   But notice that the reported version of the [gem](/wiki/gem) is still 2.7, just like the one that was already installed, and not 2.7.3 as is reported as being available by `gem list --remote`
