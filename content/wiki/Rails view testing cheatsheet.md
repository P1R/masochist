---
tags: rspec rails testing rr cheatsheet views wiki
cache_breaker: 1
---

# Tools

-   [RSpec 2](/wiki/RSpec_2) (spec framework)
-   [RR](/wiki/RR) ([mocking](/wiki/mocking) library)
-   [Factory Girl](/wiki/Factory_Girl) ([object mother](/wiki/object_mother) library)
-   [Rails 3](/wiki/Rails_3) (application framework)

# Context and example naming

The `describe` block should be given the relative path of the template, as described under "Rendering" below.

For brevity, phrase `it` examples without "should":

```ruby
it 'assigns found issues'       # concise, unlike:
it 'should assign found issues' # verbose
```

# Passing instance variables

Instance variables set up in examples are transparently made available inside the template, similar to how controller instance variables are also propagated to templates. It is no longer necessary to explicitly use `assigns()`, although such a method does exist.

# Rendering

Use the relative path of the template — for example, `posts/show` for a standard `action#controller` template — and the right template will be chosen automatically when you call `render` with no parameters:

```ruby
describe 'posts/show' do
  it 'renders' do
    render
  end
end
```

For partials with locals, the render call should resemble:

```ruby
render 'shared/errors', :model => model
```

This is equivalent to the more verbose:

```ruby
render :partial => 'shared/errors', :locals => { :model => model }
```

Note that we must specify the partial name path without the underscore (ie. `shared/errors`, not `shared/_errors`), or Rails will not be able to find it.

# Checking for content

Matching against the HTML source:

```ruby
render
rendered.should match('<em>foo</em>')
```

Matching against user-visible text (not HTML tags):

```ruby
render
rendered.should contain('foo')
```

Matching using CSS selectors (based on [Webrat](/wiki/Webrat)):

```ruby
render
rendered.should have_selector('a[href="/issues/new"]', :content => 'link text')
```

Options:

-   `:content` is optional and may be either a string or a regular expression
-   `:count` may also be supplied and accepts a number

Arbitrary attributes can be specified via the options hash:

```ruby
rendered.should have_selector('a', :href => '/issues/new')
```

(Note that I believe that URL design is very important and your URLs should be stable; this is why I specify the URL literally rather than using a Rails URL helper method in the examples above.)

Arbitrarily complex selectors may be used (for example, 'div.links ul &gt; li a') or calls may be nested within blocks:

```ruby
rendered.should have_selector('#header') do |div|
  div.should have_selector(...) # or
  div.should match(...)         # or
  div.should contain(...)       # etc
end
```

# Message expectations

Mock the `view` instance:

```ruby
mock(view).breadcrumbs
```

# Isolating partials

When speccing a parent template, we don't want errors in the partial to "bubble up" into the parent's spec (the partial should have its own specs anyway). We therefore stub out calls to templates in the `before` block and explicitly proxy through the `render` call for the main template:

```ruby
before do
  stub(view).render 'partial/1'
  stub(view).render 'partial/2' # etc, one stub for each partial
  stub.proxy(view).render       # let the main "render" call through
end
```

Note that the `render` call that we stub out here must _exactly_ match the call as it is made in the view. For example, if the view passes in its `:locals` implicitly, the stub should also:

```ruby
# in view
render 'foo/bar', :thing => '2', :other_thing => 'bar'

# in spec
stub(view).render 'foo/bar', :thing => '2', :other_thing => 'bar'
```

Likewise, if the view uses a literal underscore (eg. `issues/_summary`), the stub should also; if the view does _not_ use a literal underscore (eg. `issues/summary`, trusting Rails to find the actual template on disk which has an underscore in the name), the stub should not either.

We also include an example block for each partial with a mock to confirm that the partial is actually called as we expect:

```ruby
it 'renders the errors partial' do
  mock(view).render 'errors'
  render
end
```

It is advisable to have at least one higher-level test that combines the rendering of both the parent and any partial templates. This can either be down at the level of acceptance tests with a tool like [Steak](/wiki/Steak), or in a separate `describe` block inside the view specs where we don't stub out the calls that render the partial(s).

As an aside, RSpec itself provides a means of asserting that a particular partial was rendered:

```ruby
render
view.should render_template(:partial => 'foo', :local1 => 'bar', :local2 => 'baz')
```

# Interaction-based or state-based testing?

## Uses for interaction-based testing

### Verifying helper use

The view should be free of complex logic. Really it should only retrieve attributes from passed in instance variables, employ simple iteration and looping, and perhaps conditionally display content based on simple boolean tests. Anything more complex should be extracted into a helper method.

We test helper methods separately, so we can often avoid repeating ourselves by instead using a mock to confirm that a helper method was called; for example:

```ruby
it 'shows the post timeinfo' do
  mock(view).timeinfo(@post)
  render
end
```

### Verifying partial use

Described earlier.

### Allowing view-first development

Within the [Behavior-Driven Development](/wiki/Behavior-Driven_Development) approach, some people argue for "outside-in" development, starting with high-level acceptance tests, then drilling down to view specs (and their corresponding views), and finally completing the picture with controllers and models (specs first, of course).

This type of development often _requires_ mocks and stubs to used seeing as the other parts of the system don't necessarily exist yet. Within this development style, use of test doubles may be viewed as a temporary design tool to be used while fleshing out the initial form of the application, with the option of later switching over to real models once they are implemented.

There is also a milder variant of "outside-in" BDD, which doesn't require you to get the specs for the outer levels passing with test doubles before moving to the inner levels. In this style, the failing outer-level tests merely prompt you to write a lower-level failing test (which may itself prompt you to write an even lower level test). You effectively end up moving back and forth among the various levels as part of getting any single top-level spec to pass.

## Uses for state-based testing

State-based testing can avoid some problems with using [test doubles](/wiki/test_doubles), such as:

-   Overhead: a potentially large amount of additional set-up must be performed to configure all the required mocks and stubs
-   Repetition: between implementation and spec, because the test doubles end up replicating the work done by the implementation but using a different "language"
-   Brittleness: due to the close ties to the implementation details, changes to the implementation may break the spec even if the externally-observable behavior of the template hasn't changed
-   Disconnection from actual API changes: because the test doubles stand between the view and the actual objects to be displayed, they can cause specs to spuriously continue passing in the face of API changes

The state-based approach instead relies on an easy-to-use [object mother](/wiki/object_mother) to provide objects for the spec.

Downsides of using object mothers here are:

-   They couple view specs to real model instances, so model failures can cascade and cause view spec failures
-   Involving real model instances may be noticeably slower for extremely large test suites

In general I prefer the state-based testing approach for views because of the speed and ease of writing specs. I also like the fact that the specs are "pure" in the sense that they are _only_ interested in the externally-observable behavior of the application, which is, by definition, the reason why we write code; this can actually be a useful design tool (if you find yourself writing code that has no externally-observable behavior, then it's quite possible that you shouldn't be writing the code). If and when performance starts to become a problem, emphasis can be shifted away from state-based testing.

The basic pattern is:

1.  Set up state beforehand (either in `before` block for state which is common to all examples, or inside the `it` block for example-specific state)
2.  Call `render`
3.  Check state afterwards

# Behavior-Driven Development of views

Strict BDD doctrine states that no code should be written without there first existing a failing spec for it. Given that so much of view code is mere presentational detail and not actual logic, the need to write failing specs before adding a given line to a template is less convincing.

In fact, many developers choose not to write view specs at all.

I personally do write view specs, but I most definitely do not follow the rule that says that I can't add anything to the view without first having a failing spec for it.

Instead, I add specs for all "significant" aspects of the template's behavior. "Significant" does not mean things like markup choices (ie. ordered or unordered lists), but it does mean things like:

-   which partials get rendered
-   what helper methods get called
-   what models, and what attributes on them, are shown
-   conditional display (ie. if the template should look significantly different depending on some variable criterion)
-   edge cases: things that might behave differently given extreme inputs

Merely aesthetic or presentational aspects of the template _are_ eligible for speccing if they can be considered actual bugs in the application.

# Related

-   [Rails model testing cheatsheet](/wiki/Rails_model_testing_cheatsheet)
-   [Rails controller testing cheatsheet](/wiki/Rails_controller_testing_cheatsheet)
-   [Rails helper testing cheatsheet](/wiki/Rails_helper_testing_cheatsheet)
-   [Rails mailer testing cheatsheet](/wiki/Rails_mailer_testing_cheatsheet)
-   [RR cheatsheet](/wiki/RR_cheatsheet)
-   [Steak cheatsheet](/wiki/Steak_cheatsheet)
