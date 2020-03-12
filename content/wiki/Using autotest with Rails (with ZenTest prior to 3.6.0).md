---
tags: rails wiki
---

Newer versions of these notes (for use with versions of [ZenTest](/wiki/ZenTest) greater than or equal to [ZenTest 3.6.0](/wiki/ZenTest_3.6.0)) can be found at "[Using autotest with Rails](/wiki/Using_autotest_with_Rails)".

An older version of these notes (for use with versions of [ZenTest](/wiki/ZenTest) prior to 3.5.0) can be found at "[Using autotest with Rails (with ZenTest prior to 3.5.0)](/wiki/Using_autotest_with_Rails_%28with_ZenTest_prior_to_3.5.0%29)".

# Prerequisites

-   [ZenTest](/wiki/ZenTest) (see "[Setting up autotest](/wiki/Setting_up_autotest)")
-   [diff-lcs](/wiki/diff-lcs) (already installed in my case)
-   [RSpec](/wiki/RSpec) (again, already installed in my case)

# Installing the [RSpec](/wiki/RSpec) [Rails](/wiki/Rails) plugin

You have to use the version of the plug-in corresponding with your installed version of [RSpec](/wiki/RSpec) so in my case at the time of writing this corresponds to the `REL_0_9_0_BETA_1` tag (see "[Trying out the rspec version 0.9 preview](/wiki/Trying_out_the_rspec_version_0.9_preview)"). From the top of the application directory:

    script/plugin install svn://rubyforge.org/var/svn/rspec/tags/REL_0_9_0_BETA_1/rspec_on_rails

After installing you must "bootstrap" [RSpec](/wiki/RSpec) as follows:

    script/generate rspec

Output:

          create  spec
          create  spec/spec_helper.rb
          create  spec/spec.opts
          create  previous_spec_failures.txt
          create  script/spec_server
          create  script/spec

For more information see <http://rspec.rubyforge.org/documentation/rails/install.html>

I later installed [RSpec](/wiki/RSpec) itself as a plug-in alongside of `rspec_on_rails`:

    script/plugin install svn://rubyforge.org/var/svn/rspec/tags/REL_0_9_0_BETA_2/rspec
    script/plugin install --force svn://rubyforge.org/var/svn/rspec/tags/REL_0_9_0_BETA_2/rspec_on_rails

This was necessary in order to get [autotest](/wiki/autotest) from the new version of [ZenTest](/wiki/ZenTest) (3.5.0 at the time of writing) working. Note that I took the opportunity to upgrade to the latest beta. I had to supply the `--force` switch in order to force the upgrade to overwrite the existing copy of the plug-in.

## Configuration

Add the following to your `~/.autotest` file:

    require 'rspec_rails_autotest'

    Autotest.add_hook :initialize do |autotest|
      if autotest.is_a? RspecRailsAutotest
        autotest.spec_command = 'script/spec --options spec/spec.opts' if File.exist? 'script/spec'
      end
    end

# Starting [autotest](/wiki/autotest)

    autotest

# Tweaks

I was seeing a lot of warnings, `invalid option: -s (OptionParser::InvalidOption)`, due to the fact that the plug-in is passing a switch that [RSpec](/wiki/RSpec) no longer supports in 0.9.0 beta 1 (and in fact I can't find any information on what it used to do); I assume it was for specifying an individual specification. I was able to silence these by changing the `-s` to an `-e` because specifications are now called examples in [RSpec](/wiki/RSpec) 0.9:

    methods.each { |meth| cmds << "#{spec_command} -s #{meth.inspect} #{klass}" }

To:

    methods.each { |meth| cmds << "#{spec_command} -e #{meth.inspect} #{klass}" }

At line 91 of `rspec_autotest.rb`.

Here's a ticket for the issue with a basic patch: <http://trac.caldersphere.net/projects/main/ticket/125>

# Additional [Rails](/wiki/Rails) configuration

[David Chelimsky](/wiki/David_Chelimsky) points out in [this](http://rubyforge.org/pipermail/rspec-users/2007-May/001650.html) [rspec-users](/wiki/rspec-users) mailing list post that you should remove the following lines from the `spec/spec.opts` file:

    --format
    failing_examples:previous_failures.txt
    --example
    previous_failures.txt

This prevents the tests from failing continuously when an example fails; [autotest](/wiki/autotest) will run the specs again automatically once changes have been made.

# See also

-   [Setting up autotest](/wiki/Setting_up_autotest)
-   [Behaviour-Driven Development with Rails](/wiki/Behaviour-Driven_Development_with_Rails)
-   Official plug-in announcement: <http://blog.nicksieger.com/articles/2006/11/15/rspec-autotest-now-a-rails-plugin>
-   "Developing a Rails model using BDD and RSpec": <http://www.lukeredpath.co.uk/2006/8/29/developing-a-rails-model-using-bdd-and-rspec-part-1>
