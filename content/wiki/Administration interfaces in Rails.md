---
tags: rails administration interface wiki
cache_breaker: 1
---

## Integrated administration interfaces

Up until very recently I had unquestioningly always thought that "integrated" administration interfaces were the best and most elegant design. By "integrated" I mean that unprivileged and privileged users would both access the same [URLs](/wiki/URLs) but the content would differ; that is, the admin users would see "edit" and "destroy" links alongside the content while the general public would just see the content.

This approach described in [Railscast](/wiki/Railscast) episode 19, "[Where Administration Goes](http://railscasts.com/episodes/19)".

## "Old school" administrative interfaces

The contrasting approach is to put administration controls in a completely separate part of the site. For example, given [URLs](/wiki/URLs) like:

-   <http://example.com/posts/>
-   <http://example.com/products/>

The administration interfaces might be found at:

-   <http://example.com/posts/admin/>
-   <http://example.com/products/admin/>

Or:

-   <http://example.com/admin/posts/>
-   <http://example.com/admin/products/>

This approach has fallen out of favour in many circles because it's not "[DRY](/wiki/DRY)"; for example, you have to provide a page for the "show" action in two places, one for unprivileged and one for privileged users.

## The hybrid approach

Having worked on and off during a period of several months on a project that uses the "integrated" approach I've come to a position in which I think the best solution is actually a hybrid one that uses integrated administrative interfaces when appropriate, and "old school" separate ones when required.

As the application has evolved I've gradually trimmed down and refined the list of places where administration controls are integrated, and at the same time added specific administration interfaces in a separate namespace when it brings me an optimized administrative workflow that would be hard to achieve in an integrated interface.

### Example: a weblog with "index" and "show" actions

The weblog index page might be very expensive to generate and so [page caching](/wiki/page_caching) it might be attractive. But if you've got an integrated interface then you _can't_ page cache it because it has variable (per-user) content.

In this case you should consider creating a separate administrative name space and keep the index free of admin-only special cases so that the page can be the same for all visitors and you can page cache it.

The page where you actually display a single post, however, might be much lighter. On that page you _can_ integrate admin-only bells and whistles if the page is lightweight enough that you don't have to worry about page caching it.

Does this violate "[DRY](/wiki/DRY)"? Yes, in a sense, but you can actually turn this into a value-added proposition by providing _different_ administrative interfaces (that is, interfaces that meet different administrative needs) in each context.

For example, the admin-only "index" view might offer an extremely concise tabular representation of the posts with in-place editor fields for things like title, permalink and so on, checkboxes for "is_public" and "accepts_comments", and sortable table headers which allow you to view the data in many different ways.

Your per-page "show" view, on the other hand, will meet different administrative needs, like moderating individual comments, or editing and deleting content.
