---
title: Unobtrusive inline administration
tags: rails javascript blog
---

Nearly a couple years ago [Ryan Bates](http://railscasts.com) did [a screencast](http://railscasts.com/episodes/19) titled, "Where Administration Goes". In it he makes a case for integrating administation UI within the standard templates that unprivileged users see.

-   **Advantages:** elegant; convenient, direct access to administration; cuts down the number of templates and controllers needed.
-   **Disdvantages:** templates are more complex and therefore harder to write and test; can't page-cache because different visitors see different versions of page.

The alternative approach is to store away all admin [UI](/wiki/UI) in a separate, "admin" namespace. So instead of accessing inline controls at a [URL](/wiki/URL) like `/posts`, the administrator would visit `/admin/posts`.

-   **Advantages:** simpler templates which are easier to write and test; simpler security model; pages can be cached because they look the same for all visitors.
-   **Disdvantages:** more templates and controllers required; no direct access to administration functions from public views; admins effectively playing in separate "ghetto" from rest of users, and so may get "out of touch" about what bugs and UI problems normal users may be experiencing.

Neither approach is a clear winner, but weighing all this up I've always preferred inline administration interfaces where possible, falling back to namespaced interfaces when necessary or more appropriate.

But when you add [AJAX](/wiki/AJAX) to the mix the inline approach gets a little more ugly (well, any time you add AJAX using the standard [Rails](/wiki/Rails) helpers things are going to get a bit ugly; it's just that doing so in the case of inline administration UI makes a complicated thing even more complicated).

We no longer have just the following (pseudo-code):

    if admin?
      show edit button

We instead now we have a whole heap of conditionals like the following, one for each attribute we want to be editable via AJAX:

    if admin?
      show AJAX control
    else
      show immutable (non-editable) representation

Sure, we can sometimes avoid repetition and hide away some of this complexity using helpers or partials, but it's still pretty ugly. Not only is there a lot of logic in the code (even if it is just simple boolean logic), but for the admin viewing the page, the source is now littered with ugly spaghetti-like [JavaScript](/wiki/JavaScript) intermingled and entangled with the rest of the HTML.

So lately I've been thinking about [Unobtrusive JavaScript](/wiki/Unobtrusive_JavaScript) and asking myself if we could try a different approach that would deliver the following benefits:

-   Clean, JavaScript-free HTML source
-   A convenient inline UI for administrative actions
-   Page-cacheability
-   Easier testing

# The basic idea

Nothing radical. I expect that others out there must be doing this as it seems obvious once you ask yourself the question, "What would an inline administrative UI built using Unobtrusive JavaScript look like?".

Once we've proposed to do our inline admin UI this way, a couple of conclusions naturally fall out:

-   Our HTML will be clean and JavaScript-free.
-   The page will be truly static, will look the same for all users, and so can be cached.
-   If the page is static then the JavaScript must be dynamic; by definition, it must be different for admin users:
    -   For admin users, we'll be generating a bunch of inline AJAX controls.
    -   For normal users, there will be much fewer controls and less JavaScript (perhaps none at all).
-   For 99% of visitors, then, we'll expect:
    -   A really fast static page load.
    -   A dynamic JavaScript request which doesn't do much work (just does one database query to check whether the user is an admin or not).
-   For 1% of visitors (the admins), we'll expect the same, except:
    -   Our dynamic JavaScript request will do a _little_ more work (still only one database query though); because there will be more JavaScript to generate, we'll be spending a little more time evaluating our templates.
-   Our HTML templates, free of JavaScript and helpers, will be much easier to test.
-   On the other hand, we'll now have a separate set of JavaScript templates to test.
-   Luckily, the overall amount of testing to be done is roughly the same; but there is now a very clean separation now between HTML view content and JavaScript view logic, so this testing should be easier.

So we know we need to generate the JavaScript dynamically. The question is _where_ should we do it?

Add it to each controller? _Meh_.

The obvious answer is to stick all this in a custom "JavaScript" controller. We could set up the routing for this controller to serve our dynamic JavaScript from under `/javascripts/`, but I prefer to keep a clean separation between the static JavaScript files stored in `public/javascripts` and dynamically generated JavaScript accessed via `/js/`.

Our custom controller really needs only one method, a "show" method, which will basically do this (pseudo-code):

    def show
      render ERB template for 'controller' and 'action'
    end

So let's say we have an issues controller with a show action which we normally access from `/issues/1200`, we'll expect to find a corresponding dynamic JavaScript template at `app/views/js/issues/show.js.erb`.

We'll add a quick helper that generates the appropriate `<script>` tag to the `<head>` in our application layout:

    <script src="/js/issues/show.js" type="text/javascript"></script>

Notice that we can't really include a timestamp here like Rails normally does on its JavaScript links. By definition, our objective is to generate _dynamic_ JavaScript which could change from request to request, for example, when the user logs in or logs out.

And why not make things a little sweeter with some syntactic sugar for use in our controllers?

     uses_custom_javascript :only => [ :show, :index ]

All in all, a pretty nice system, I think. I'm hoping to roll it out in my next major deployment.
