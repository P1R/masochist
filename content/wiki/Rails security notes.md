---
tags: rails security wiki
cache_breaker: 1
---

[Rails](/wiki/Rails) is a relatively secure [web](/wiki/web) framework out of the box provided you follow some standard (basic) security practices such as sanitizing user input and the like. A good security strategy will pursue "[defense in depth](/wiki/defense_in_depth)", meaning that the application (and its deployment) will be design and executed with security in mind at many levels, not just at the outer "perimeter" level. In this way the fallout from a break-in can hopefully be mitigated by limiting just how far an intruder can penetrate and how much damage can be done.

This page contains some brief notes on a number of the specific techniques that can comprise a [defense in depth](/wiki/defense_in_depth) approach for [Rails](/wiki/Rails) applications.

## Use trusted deployment solutions

In picking a "trusted" deployment solution you want to evaluate your options using common-sense criteria like:

-   reputation
-   level of testedness
-   history (previous security issues, response times, handling of vulnerabilities)
-   widespread deployment (popularity and a wider installed base _may_ also bring with it more extensive testing and a more active developer community)

At the moment, by these criteria the most "trusted" and reliable tools are probably [nginx](/wiki/nginx) (front-end HTTP web server, load balancer and proxy), [Mongrel](/wiki/Mongrel) (application server) and [monit](/wiki/monit) (process monitoring). There _are_ upcoming contenders out there (especially in the application server arena) but if you're serious about stability you'll wait for these things to pan out and for the time-being will stick with the most tried-and-tested tools. These things _do_ occasionally change; [nginx](/wiki/nginx), for example, has only recently displaced [Apache](/wiki/Apache) as the front-end preferred by people "in the know".

## Prefer stable versions

Don't give in to the hype-machine-fueled excitement by "living on the [edge](/wiki/edge)" (the [Rails](/wiki/Rails) [trunk](/wiki/trunk)). Instead prefer stable released versions. By all means run pre-release software in staging and test environments, but do not turn your production server into a guinea pig.

## Run your migrations as a separate user

Your [Rails](/wiki/Rails) application should connect to the database as a relatively unprivileged user which can do things like create, read, update and delete records (the basic [CRUD](/wiki/CRUD) actions which are the staples of [REST](/wiki/REST)). This user should _not_ have the privileges necessary to do the kinds of things that you can do in migrations like creating and dropping tables, or even dropping the entire database.

Create a separate database user with the privileges required for migrations and run them using that user. In this way if someone ever manages to pull off an [SQL injection](/wiki/SQL_injection) attack on your server then at least they won't be able to drop entire tables.

## Run your applications as different users

This is basic compartmentalization which you should do if you can. For example, if you only have a couple of applications on your server then [nginx](/wiki/nginx) is lightweight enough that it's probably realistic to run two separate master processes, each running as a different user, one for each application.

In this way if one [app](/wiki/app) gets compromised then the scope for damage will be limited as the compromised user won't be able to meddle with the other application.

## Run your applications as an unprivileged user

Again, basic common sense: there is no need for your application servers to be running as root so you should be running them as normal, unprivileged users. In this way an attacker won't own the entire machine as soon as they break in to your [app](/wiki/app).

## Use sensible filesystem permissions

Bog standard security practice again. If you run multiple applications set your file permissions so that they can't write each other's files; better still, if you can, make it so that they can't _read_ each other's files.

Obviously sensitive files which contain passwords like your `config/database.yml` file should have the most restrictive permissions possible, but if you can you should make the entire home folder (or other folder that contains your application) readable only by the application user.

## Set up automated log-file rotation

Too many requests can swell your log files to the point where they amount to a [DOS](/wiki/DOS). Use an automated log-rotation system and don't run your server "close to the metal" in terms of free disk space to ensure that this kind of issue never becomes a problem.

## Design with efficiency in mind

Again, with a view to avoiding a [Denial of Service](/wiki/Denial_of_Service) your application should make use of caching and efficient query design to minimize the risk of a [DOS](/wiki/DOS) due to a malicious attack (or even a non-malicious one, such as being linked-to from [Slashdot](/wiki/Slashdot) or [Digg](/wiki/Digg)).

## Use public-key authentication

If you need to connect to your server via [SSH](/wiki/SSH) (and you probably do if you use [Capistrano](/wiki/Capistrano) or [Vlad](/wiki/Vlad)) then use [public-key authentication](/wiki/public-key_authentication) rather than passphrase-based authentication; if you adequately protect your private keys (by controlling access to your local machine and using appropriate file permissions) then this system is more secure.

## Use [sudo](/wiki/sudo) to limit deployment privileges

There are somethings that [Capistrano](/wiki/Capistrano) needs to do with superuser privileges and it uses [sudo](/wiki/sudo) to gain those privileges. Read up in the `sudo` and `sudoers` [man pages](/wiki/man_pages) on how to configure your `/etc/sudoers` file to make sure that only pre-approved commands are run using sudo and no others. In this way you limit the damage that could be done if somebody ever got hold of the private key needed to deploy your application.

## Keep sensitive information out of your repository

Even if you're the only person with access to your [version control system](/wiki/version_control_system) it's still good practice to keep sensitive information like passwords out of the repository, just in case it's ever breached or some other lapse allows others to gain access.

The `config/database.yml` file is an obvious example. Another is your [Capistrano](/wiki/Capistrano) `config/deploy.rb`; this is complex enough and evolves enough over time that you should track it in your repository, but obviously you shouldn't store any plaintext passwords in it. If you _really_ insist on not having to enter plaintext passwords (for example, at the [sudo](/wiki/sudo) prompt) then store them in a local, protected `~/.caprc` file rather than in the `deploy.rb`.

## Write [specs](/wiki/specs)

Test your code, and specifically write tests that try to circumvent the protections that you put in place in your application to control access. In other words, pay special attention to confirming that your login and logout methods work as you think they do, and that you can't access resources to which you shouldn't have access.

## Keep it simple

In the interest of keeping out the bugs you should always favor _simple_ designs wherever possible (luckily, the whole "[Web 2.0](/wiki/Web_2.0)" movement encourages this trend so you won't stand out if you do it). So, rather than implementing a full-blown user-and-groups permissions system with [Access Control Lists](/wiki/Access_Control_Lists) and all sorts of other sophisticated paraphernalia, think about whether a simpler system (perhaps just with the public/private distinction) might be just as usable.

## Don't leak information

Avoid leaking internal implementation details wherever possible. In general these sorts of details are of zero interest to your users anyway, so in doing so you'll actually be improving the interface for them. As an example, if you write a [weblog](/wiki/weblog) application use human-readable [permalinks](/wiki/permalinks) like `/blog/italy-photos` rather than `/blog/123`.

Obviously the word-based permalinks are nicer for users (and nicer for [Google](/wiki/Google) too), but they are also more secure than the id-based [URL](/wiki/URL). The latter exposes an internal implementation detail of your application, and an attacker can guess where your next post will be before you've even published it. This in itself is not a problem but if you've let your security lapse in other areas (for example, not restricting access to unpublished drafts) then your minor information leak (of an implementation detail) starts leaking _real_ information (unpublished content).

## Don't use predictable sequences

The classic example here is the "confirmation email": a user signs up, you send a confirmation email with a link in it that they must click to prove that they control the email account. Your confirmation link should be essentially random to prevent an attacker from guessing it. Cryptographic [digests](/wiki/digests) are the way to go here.

You can also make use of [Rails](/wiki/Rails) nested resources to provide another layer of security. Given a secret token `e44c7e1472adcd12bbc84108df48bdfd52f1257d` for confirmation `3214`, then you can make sure that the token is _only_ accepted within the context of the resource (<http://example.com/confirmations/3214/e44c7e1472adcd12bbc84108df48bdfd52f1257d>). In this way even if an attacker brute forces through the entire possible token space (unlikely), their efforts are useless unless they _also_ manage to guess the confirmation id.

## Salt your digests

The most cryptographically-strong [digest](/wiki/digest) in the world is worthless if it's not properly used. For example, if you want to produce a "secret" token and send it to a user (again, let's go with the "confirmation link" example mentioned above) you'll want to include an component that's unique to that user (their email address), a random or varying component (such as a timestamp and a random number; this ensures that tokens are always unique), and a secret salt (something that is never transmitted outside your application). In this way even if an attacker knows some of the information (for example, the victim's email address) and can guess some of the rest (for example, the time stamp), they won't know the random component or the salt, and so they have no remedy but to resort to a brute force attack.

## Code review and code auditing

If you can, work with a colleague to review one another's code. A pair of fresh eyes can often spot potential problems. If that's not an option for you, periodically go back and look at your own old code; the elapsed time can sometimes be enough to help you see things anew.

## Use `attr_accessible` in models

Get in the habit of using `attr_accessible` in all models. A whitelist (`attr_accessible`) is always going to be more secure than a blacklist (`attr_protected`).

Remember that even if you think you are protecting a model by passing `:is_superuser` to `attr_protected`, an attacker could still wreak havoc with your model because mass-assignment will allow them to call _any_ method in the model, not just attributes corresponding to table rows in the database; all methods, even methods in `protected` and `private` sections are vulnerable.

    class User < ActiveRecord::Base
      has_many :comments
      attr_protected :is_superuser
    end

Did you know that given a model like the above [Rails](/wiki/Rails) provides a `comment_ids` method thanks to the `has_many` association? This is vulnerable to mass-assignment because of the use of `attr_protected` rather than `attr_accessible`. An attacker can thus reassign comment ownership at will, and if they assign ownership of a comment to themselves then they are free to edit the rest of it as they please.

Even if you know about the existence of the `comment_ids` method (which isn't visible!), how can you be sure you know about all the methods that [Rails](/wiki/Rails) might be adding behind the scenes? How can you be sure you'll know about the methods that Rails 3.0 adds? Rails 4.0? And so on. Clearly, `attr_accessible` is the _only_ sane, secure choice (I personally think that `attr_protected` is a trap that gives a false sense of security and should never have been added to Rails).

And as I mentioned above, it's not only attributes that correspond to columns in the database that are vulnerable. Given a method like this in the `User` model:

    class User < ActiveRecord::Base
    private
      def really_delete_all_records= confirm
        delete_all if confirm
      end
    end

`attr_protected` won't stop an attacker here from assigning to the `really_delete_all_records` attribute, even though it is a private method. Witness:

    # goodbye records!
    User.find(:first).update_attributes(:really_delete_all_records => 1)

If the input is coming from a form, passing in `really_delete_all_records` is trivial.

## Others

There are many, many techniques that can be applied, so I'll update this page with those in the future. Some of the things I'd like to cover include:

-   Input sanitization
    -   SQL injection
-   Output sanitization (in views)
-   Using the [Rails](/wiki/Rails) provided countermeasures, like `protect_from_forgery`
-   Don't trust _any_ user input, even in [cookies](/wiki/cookies)
-   Don't put sensitive stuff in the session if you're using [cookie](/wiki/cookie)-based sessions
