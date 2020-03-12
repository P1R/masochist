---
tags: rubygems updates wiki
---

The standard update procedure yielded an error and didn't actually install the new version:

    $ sudo gem update --system
    Password:
    Updating RubyGems
    Updating rubygems-update
    Successfully installed rubygems-update-1.3.0
    ERROR:  While executing gem ... (NameError)
        undefined local variable or method `remote_gemspecs' for #<Gem::Commands::UpdateCommand:0x116e15c>
    $ gem --version
    1.2.0

So let's check the release notes:

    NOTE:  RubyGems 1.1 and 1.2 have problems upgrading when there is no
    rubygems-update installed.  You will need to follow the second set of update
    instructions if you see "Nothing to update".

    NOTE: You may have to run the command twice if you have any previosly
    installed rubygems-update gems.

So I hadn't seen the "Nothing to update" message but when I tried running `sudo gem update --system` again I did see it:

    $ sudo gem update --system
    Updating RubyGems
    Nothing to update
    cuzco:src$ gem --version
    1.2.0

Next tactic was to try the aforementioned "second set of update instructions":

    $ sudo gem install rubygems-update
    Successfully installed rubygems-update-1.3.0
    1 gem installed
    $ sudo update_rubygems
    Installing RubyGems 1.3.0
    mkdir -p /Library/Ruby/Site/1.8
    mkdir -p /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/bin
    install -c -m 0644 rbconfig/datadir.rb /Library/Ruby/Site/1.8/rbconfig/datadir.rb
    install -c -m 0644 rubygems/builder.rb /Library/Ruby/Site/1.8/rubygems/builder.rb
    install -c -m 0644 rubygems/command.rb /Library/Ruby/Site/1.8/rubygems/command.rb
    install -c -m 0644 rubygems/command_manager.rb /Library/Ruby/Site/1.8/rubygems/command_manager.rb
    install -c -m 0644 rubygems/commands/build_command.rb /Library/Ruby/Site/1.8/rubygems/commands/build_command.rb
    install -c -m 0644 rubygems/commands/cert_command.rb /Library/Ruby/Site/1.8/rubygems/commands/cert_command.rb
    install -c -m 0644 rubygems/commands/check_command.rb /Library/Ruby/Site/1.8/rubygems/commands/check_command.rb
    install -c -m 0644 rubygems/commands/cleanup_command.rb /Library/Ruby/Site/1.8/rubygems/commands/cleanup_command.rb
    install -c -m 0644 rubygems/commands/contents_command.rb /Library/Ruby/Site/1.8/rubygems/commands/contents_command.rb
    install -c -m 0644 rubygems/commands/dependency_command.rb /Library/Ruby/Site/1.8/rubygems/commands/dependency_command.rb
    install -c -m 0644 rubygems/commands/environment_command.rb /Library/Ruby/Site/1.8/rubygems/commands/environment_command.rb
    install -c -m 0644 rubygems/commands/fetch_command.rb /Library/Ruby/Site/1.8/rubygems/commands/fetch_command.rb
    install -c -m 0644 rubygems/commands/generate_index_command.rb /Library/Ruby/Site/1.8/rubygems/commands/generate_index_command.rb
    install -c -m 0644 rubygems/commands/help_command.rb /Library/Ruby/Site/1.8/rubygems/commands/help_command.rb
    install -c -m 0644 rubygems/commands/install_command.rb /Library/Ruby/Site/1.8/rubygems/commands/install_command.rb
    install -c -m 0644 rubygems/commands/list_command.rb /Library/Ruby/Site/1.8/rubygems/commands/list_command.rb
    install -c -m 0644 rubygems/commands/lock_command.rb /Library/Ruby/Site/1.8/rubygems/commands/lock_command.rb
    install -c -m 0644 rubygems/commands/mirror_command.rb /Library/Ruby/Site/1.8/rubygems/commands/mirror_command.rb
    install -c -m 0644 rubygems/commands/outdated_command.rb /Library/Ruby/Site/1.8/rubygems/commands/outdated_command.rb
    install -c -m 0644 rubygems/commands/pristine_command.rb /Library/Ruby/Site/1.8/rubygems/commands/pristine_command.rb
    install -c -m 0644 rubygems/commands/query_command.rb /Library/Ruby/Site/1.8/rubygems/commands/query_command.rb
    install -c -m 0644 rubygems/commands/rdoc_command.rb /Library/Ruby/Site/1.8/rubygems/commands/rdoc_command.rb
    install -c -m 0644 rubygems/commands/search_command.rb /Library/Ruby/Site/1.8/rubygems/commands/search_command.rb
    install -c -m 0644 rubygems/commands/server_command.rb /Library/Ruby/Site/1.8/rubygems/commands/server_command.rb
    install -c -m 0644 rubygems/commands/sources_command.rb /Library/Ruby/Site/1.8/rubygems/commands/sources_command.rb
    install -c -m 0644 rubygems/commands/specification_command.rb /Library/Ruby/Site/1.8/rubygems/commands/specification_command.rb
    install -c -m 0644 rubygems/commands/stale_command.rb /Library/Ruby/Site/1.8/rubygems/commands/stale_command.rb
    install -c -m 0644 rubygems/commands/uninstall_command.rb /Library/Ruby/Site/1.8/rubygems/commands/uninstall_command.rb
    install -c -m 0644 rubygems/commands/unpack_command.rb /Library/Ruby/Site/1.8/rubygems/commands/unpack_command.rb
    install -c -m 0644 rubygems/commands/update_command.rb /Library/Ruby/Site/1.8/rubygems/commands/update_command.rb
    install -c -m 0644 rubygems/commands/which_command.rb /Library/Ruby/Site/1.8/rubygems/commands/which_command.rb
    install -c -m 0644 rubygems/config_file.rb /Library/Ruby/Site/1.8/rubygems/config_file.rb
    install -c -m 0644 rubygems/custom_require.rb /Library/Ruby/Site/1.8/rubygems/custom_require.rb
    install -c -m 0644 rubygems/defaults.rb /Library/Ruby/Site/1.8/rubygems/defaults.rb
    install -c -m 0644 rubygems/dependency.rb /Library/Ruby/Site/1.8/rubygems/dependency.rb
    install -c -m 0644 rubygems/dependency_installer.rb /Library/Ruby/Site/1.8/rubygems/dependency_installer.rb
    install -c -m 0644 rubygems/dependency_list.rb /Library/Ruby/Site/1.8/rubygems/dependency_list.rb
    install -c -m 0644 rubygems/digest/digest_adapter.rb /Library/Ruby/Site/1.8/rubygems/digest/digest_adapter.rb
    install -c -m 0644 rubygems/digest/md5.rb /Library/Ruby/Site/1.8/rubygems/digest/md5.rb
    install -c -m 0644 rubygems/digest/sha1.rb /Library/Ruby/Site/1.8/rubygems/digest/sha1.rb
    install -c -m 0644 rubygems/digest/sha2.rb /Library/Ruby/Site/1.8/rubygems/digest/sha2.rb
    install -c -m 0644 rubygems/doc_manager.rb /Library/Ruby/Site/1.8/rubygems/doc_manager.rb
    install -c -m 0644 rubygems/exceptions.rb /Library/Ruby/Site/1.8/rubygems/exceptions.rb
    install -c -m 0644 rubygems/ext/builder.rb /Library/Ruby/Site/1.8/rubygems/ext/builder.rb
    install -c -m 0644 rubygems/ext/configure_builder.rb /Library/Ruby/Site/1.8/rubygems/ext/configure_builder.rb
    install -c -m 0644 rubygems/ext/ext_conf_builder.rb /Library/Ruby/Site/1.8/rubygems/ext/ext_conf_builder.rb
    install -c -m 0644 rubygems/ext/rake_builder.rb /Library/Ruby/Site/1.8/rubygems/ext/rake_builder.rb
    install -c -m 0644 rubygems/ext.rb /Library/Ruby/Site/1.8/rubygems/ext.rb
    install -c -m 0644 rubygems/format.rb /Library/Ruby/Site/1.8/rubygems/format.rb
    install -c -m 0644 rubygems/gem_openssl.rb /Library/Ruby/Site/1.8/rubygems/gem_openssl.rb
    install -c -m 0644 rubygems/gem_path_searcher.rb /Library/Ruby/Site/1.8/rubygems/gem_path_searcher.rb
    install -c -m 0644 rubygems/gem_runner.rb /Library/Ruby/Site/1.8/rubygems/gem_runner.rb
    install -c -m 0644 rubygems/indexer.rb /Library/Ruby/Site/1.8/rubygems/indexer.rb
    install -c -m 0644 rubygems/install_update_options.rb /Library/Ruby/Site/1.8/rubygems/install_update_options.rb
    install -c -m 0644 rubygems/installer.rb /Library/Ruby/Site/1.8/rubygems/installer.rb
    install -c -m 0644 rubygems/local_remote_options.rb /Library/Ruby/Site/1.8/rubygems/local_remote_options.rb
    install -c -m 0644 rubygems/old_format.rb /Library/Ruby/Site/1.8/rubygems/old_format.rb
    install -c -m 0644 rubygems/package/f_sync_dir.rb /Library/Ruby/Site/1.8/rubygems/package/f_sync_dir.rb
    install -c -m 0644 rubygems/package/tar_header.rb /Library/Ruby/Site/1.8/rubygems/package/tar_header.rb
    install -c -m 0644 rubygems/package/tar_input.rb /Library/Ruby/Site/1.8/rubygems/package/tar_input.rb
    install -c -m 0644 rubygems/package/tar_output.rb /Library/Ruby/Site/1.8/rubygems/package/tar_output.rb
    install -c -m 0644 rubygems/package/tar_reader/entry.rb /Library/Ruby/Site/1.8/rubygems/package/tar_reader/entry.rb
    install -c -m 0644 rubygems/package/tar_reader.rb /Library/Ruby/Site/1.8/rubygems/package/tar_reader.rb
    install -c -m 0644 rubygems/package/tar_writer.rb /Library/Ruby/Site/1.8/rubygems/package/tar_writer.rb
    install -c -m 0644 rubygems/package.rb /Library/Ruby/Site/1.8/rubygems/package.rb
    install -c -m 0644 rubygems/platform.rb /Library/Ruby/Site/1.8/rubygems/platform.rb
    install -c -m 0644 rubygems/remote_fetcher.rb /Library/Ruby/Site/1.8/rubygems/remote_fetcher.rb
    install -c -m 0644 rubygems/require_paths_builder.rb /Library/Ruby/Site/1.8/rubygems/require_paths_builder.rb
    install -c -m 0644 rubygems/requirement.rb /Library/Ruby/Site/1.8/rubygems/requirement.rb
    install -c -m 0644 rubygems/rubygems_version.rb /Library/Ruby/Site/1.8/rubygems/rubygems_version.rb
    install -c -m 0644 rubygems/security.rb /Library/Ruby/Site/1.8/rubygems/security.rb
    install -c -m 0644 rubygems/server.rb /Library/Ruby/Site/1.8/rubygems/server.rb
    install -c -m 0644 rubygems/source_index.rb /Library/Ruby/Site/1.8/rubygems/source_index.rb
    install -c -m 0644 rubygems/source_info_cache.rb /Library/Ruby/Site/1.8/rubygems/source_info_cache.rb
    install -c -m 0644 rubygems/source_info_cache_entry.rb /Library/Ruby/Site/1.8/rubygems/source_info_cache_entry.rb
    install -c -m 0644 rubygems/spec_fetcher.rb /Library/Ruby/Site/1.8/rubygems/spec_fetcher.rb
    install -c -m 0644 rubygems/specification.rb /Library/Ruby/Site/1.8/rubygems/specification.rb
    install -c -m 0644 rubygems/test_utilities.rb /Library/Ruby/Site/1.8/rubygems/test_utilities.rb
    install -c -m 0644 rubygems/timer.rb /Library/Ruby/Site/1.8/rubygems/timer.rb
    install -c -m 0644 rubygems/uninstaller.rb /Library/Ruby/Site/1.8/rubygems/uninstaller.rb
    install -c -m 0644 rubygems/user_interaction.rb /Library/Ruby/Site/1.8/rubygems/user_interaction.rb
    install -c -m 0644 rubygems/validator.rb /Library/Ruby/Site/1.8/rubygems/validator.rb
    install -c -m 0644 rubygems/version.rb /Library/Ruby/Site/1.8/rubygems/version.rb
    install -c -m 0644 rubygems/version_option.rb /Library/Ruby/Site/1.8/rubygems/version_option.rb
    install -c -m 0644 rubygems.rb /Library/Ruby/Site/1.8/rubygems.rb
    install -c -m 0644 ubygems.rb /Library/Ruby/Site/1.8/ubygems.rb
    cp gem /tmp/gem
    install -c -m 0755 /tmp/gem /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/bin/gem
    rm /tmp/gem
    rm -f /Users/wincent/.gem/source_cache
    rm -f /Library/Ruby/Gems/1.8/source_cache
    Removing old RubyGems RDoc and ri
    rm -rf /Library/Ruby/Gems/1.8/doc/rubygems-1.2.0
    Installing rubygems-1.3.0 ri into /Library/Ruby/Gems/1.8/doc/rubygems-1.3.0/ri
    Installing rubygems-1.3.0 rdoc into /Library/Ruby/Gems/1.8/doc/rubygems-1.3.0/rdoc

    ------------------------------------------------------------------------------

    = Announce: RubyGems Release 1.3.0

    Release 1.3.0 adds new features and fixes some bugs.

    New features:

    * RubyGems doesn't print LOCAL/REMOTE titles for `gem query` and friends if
      stdout is not a TTY, except with --both.
    * Added Gem.find_files, allows a gem to discover features provided by other
      gems.
    * Added pre/post (un)install hooks for packagers of RubyGems.  (Not for gems
      themselves).
    * RubyGems now installs gems into ~/.gem if GEM_HOME is not writable.  Use
      --no-user-install command-line switch to disable this behavior.
    * Fetching specs for update now uses If-Modified-Since requests.
    * RubyGems now updates the ri cache when the rdoc gem is installed and
      documentation is generated.

    Deprecation Notices:

    * Gem::manage_gems now warns when called.  It will be removed on or after March
      2009.

    Bugs Fixed:

    * RubyGems 1.3.0+ now updates when no previous rubygems-update is installed.
      [/issues/20775 Bug #20775] by Hemant Kumar.
    * RubyGems now uses the regexp we already have for `gem list --installed`.  Bug
      #20876 by Nick Hoffman.
    * Platform is now forced to Gem::Platform::RUBY when nil or blank in the
      indexer.  Fixes various uninstallable gems.
    * Handle EINVAL on seek.  Based on patch in [/issues/20791 bug #20791] by Neil Wilson.
    * Fix HTTPS support.  Patch #21072 by Alex Arnell.
    * RubyGems now loads all cache files even if latest has been loaded.  Bug
      #20776 by Uwe Kubosch.
    * RubyGems checks for support of development dependencies for #to_ruby.  Bug
      #20778 by Evan Weaver.
    * Now specifications from the future can be loaded.
    * Binary script uninstallation fixed.  [/issues/21234 Bug #21234] by Neil Wilson.
    * Uninstallation with -i fixed.  [/issues/20812 Bug #20812] by John Clayton.
    * Gem::Uninstaller#remove_all now calls Gem::Uninstaller#uninstall_gem so hooks
      get called.  [/issues/21242 Bug #21242] by Neil Wilson.
    * Gem.ruby now properly escaped on windows.  Fixes problem with extension
      compilation.
    * `gem lock --strict` works again.  Patch #21814 by Sven Engelhardt.
    * Platform detection for Solaris was improved.  Patch #21911 by Bob Remeika.

    Other Changes Include:

    * `gem help install` now describes _version_ argument to executable stubs
    * `gem help environment` describes environment variables and ~/.gemrc and
      /etc/gemrc
    * On-disk gemspecs are now read in UTF-8 and written with a UTF-8 magic comment
    * Rakefile
      * If the SETUP_OPTIONS environment variable is set, pass its contents as
        arguments to setup.rb
    * lib/rubygems/platform.rb
      * Remove deprecated constant warnings and really deprecate them.  (WIN32,
        etc).
    * lib/rubygems/remote_fetcher.rb
      * Now uses ~/.gem/cache if the cache dir in GEM_HOME is not writable.
    * lib/rubygems/source_index.rb
      * Deprecate options to 'search' other than Gem::Dependency instances and
        issue warning until November 2008.
    * setup.rb
      * --destdir folder structure now built using Pathname, so it works for
        Windows platforms.
    * test/*
      * Fixes to run tests when under test/rubygems/.  Patch by Yusuke ENDOH
        [ruby-core:17353].
    * test/test_ext_configure_builder.rb
      * Locale-free patch by Yusuke Endoh [ruby-core:17444].

    For a full list of changes to RubyGems and the contributor for each change, see
    the ChangeLog file.

    Special thanks to Chad Wooley for backwards compatibility testing and Luis
    Lavena for continuing windows support.

    == How can I get RubyGems?

    NOTE:  If you have installed RubyGems using a package system you may want to
    install a new RubyGems through the same packaging system.

    If you have a recent version of RubyGems (0.8.5 or later), then all
    you need to do is:

      $ gem update --system   (you might need to be admin/root)

    NOTE:  RubyGems 1.1 and 1.2 have problems upgrading when there is no
    rubygems-update installed.  You will need to follow the second set of update
    instructions if you see "Nothing to update".

    NOTE: You may have to run the command twice if you have any previosly
    installed rubygems-update gems.

    If you have an older version of RubyGems installed, then you can still
    do it in two steps:

      $ gem install rubygems-update  (again, might need to be admin/root)
      $ update_rubygems              (... here too)

    If you don't have any gems install, there is still the pre-gem
    approach to getting software ... doing it manually:

    1. DOWNLOAD FROM: http://rubyforge.org/frs/?group_id=126
    2. UNPACK INTO A DIRECTORY AND CD THERE
    3. INSTALL WITH:  ruby setup.rb  (you may need admin/root privilege)

    == To File Bugs

    The RubyGems bug tracker can be found on RubyForge at:
    http://rubyforge.org/tracker/?func=add&group_id=126&atid=575

    When filing a bug, `gem env` output will be helpful in diagnosing the issue.

    If you find a bug where RubyGems crashes, please provide debug output. You can
    do that with `gem --debug the_command`.

    == Thanks

    Keep those gems coming!

    -- Jim & Chad & Eric (for the RubyGems team)


    ------------------------------------------------------------------------------

    RubyGems installed the following executables:
    	/System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/bin/gem

    If `gem` was installed by a previous RubyGems installation, you may need
    to remove it by hand.
    $ gem --version
    1.3.0
