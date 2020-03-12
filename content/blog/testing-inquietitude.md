---
title: Testing inquietitude
tags: rspec rails blog
---

There's one thing in programming that provokes a sense of inquietitude in me more often than any other: testing. There's just something about it that makes you feel like there's something subtly wrong, and leaves you worrying about whether you might be imagining that smell or whether you really did leave the gas turned on. It's not so much that it makes you wonder whether you're coding things the right way; more often than not you're just plagued by the nagging doubt that you're somehow doing the entire testing thing the wrong way without realizing it.

I'm going to start with a [Rails](/wiki/Rails) controller method as an example.

Now, if you're finding that testing your controller method is too painful then it could be a sign that your controller is too "fat". You might benefit from moving some of that code down into the model layer where it can be more easily tested.

But on the other hand, sometimes even "skinny" controllers can be cumbersome to test. The problems we tend to run into when testing controllers stem from the fact that they, by definition, are "glue" for meshing together models and views. So we see all sorts of dependencies and coupling creeping in which might make us feel uneasy: either we end up involving a lot of other classes in our tests, or we end up doing lots of unnatural acrobatics in order to avoid that coupling.

As such, controllers are a pretty interesting starting point for discussing issues in testing, as they tend to concentrate in one small area some wider issues that can be seen when testing all other types of code.

# Our controller example

So let's get started:

    def index
      respond_to do |format|
        format.html {
          @paginator = RestfulPaginator.new params, Tweet.count, tweets_url, 20
          @tweets = Tweet.find_recent @paginator
        }
        format.atom {
          @tweets = Tweet.find_recent
        }
      end
    end

Not particularly "fat" as far as controllers go, but neither is it totally skinny. This is the typical index action which offers a paginated HTML version as well as a non-paginated Atom feed. To keep things simple here I'm only going to talk about testing the HTML format; evidently to fully test the action we'd need to test the Atom feed as well.

We could try to make it "skinnier" by moving the `find` call out into a `before_filter`, but that wouldn't actually be reducing the complexity of the method; it would just be hiding the logic somewhere else. We could also jettison the pagination but that would be throwing the baby out with the bathwater, so to speak. So we'll take it as a given that this method is about as "skinny" as we can reasonably expect it to be.

So what possible perspectives do we have when looking at how to test this method?

## Perspective number 1: the "black box" approach

From this perspective we care _only_ about the _externally visible_ behaviour of the method; the method itself is treated as a black box and we don't allow ourself to make decisions based on our knowledge of the actual internals of the method.

## Perspective number 2: the "internals" approach

Here instead of treating the method as a "black box", we actively look inside the method with a view to explicitly testing not only every line, but every possible code path and message send as well.

## Consequences of using the "black box" approach

-   We have to populate our database with real model instances so that the black box has something to work with; this will slow down the execution of our tests (which may or may not be a problem, depending on the size of your test suite), and it will certainly slow down our _coding_ (writing) of the tests unless we have some kind of nice-to-use factory for creating the needed records (here we're talking about a fixture replacement; the one I use is called, funnily enough, FixtureReplacement).
-   We'll want to confirm that the `@paginator` instance variable was set.
    -   Relatedly, we'll want to confirm that it is "correctly" configured; while this might look like we're starting to think about the "internals" of the method, there's really no other place that we can check this out. In the view layer, for example, our testing will involve a paginator (or a paginator mock) but it won't help us to know whether our controller set up the paginator correctly. It's basically here or nowhere...
-   Likewise, we'll want to confirm that the `@tweets` instance variable was set, and furthermore that it contains what we expect.
    -   This is where we handle some "edgy" cases like, what happens when there are no tweets at all in the database? 1? Enough for 1 page? Enough for 2 pages?
-   In doing all this we are most definitely not just testing the method; we're also testing the implementations of `RestfulPaginator` and `Tweet.find_recent` as well. Whether this is a bad thing depends on your perspective, I guess: if you hate coupling with a passion then you'll view this as inappropriate duplication (testing the same thing multiple times) and coupling (not testing things in isolation); on the other hand you might consider this as harmless and no impediment to finding the real cause of a bug when code that's exercised in multiple specs ends up causing multiple specs to fail.
-   This is basically "state-based" testing: we start from a known state, trigger an action, and then check to see that the final state is as expected.

## Consequences of using the "internals" approach

-   We're going to go through the method line by line mocking and stubbing method calls.
-   If the `RestfulPaginator` or `Tweet.find_recent` APIs ever change, then there is a risk that our specs might continue to pass because they could shield us from those API changes, even if the controller is broken in reality.
-   We need not necessarily create real model instances, so the specs could potentially run quite a bit faster; on the other hand, the manual set-up of mocks, stubs and message expectations might be a quite time-consuming (when it comes to _writing_ the specs).
-   On a positive note, we won't be re-testing `RestfulPaginator` and `Tweet.find_recent`.
-   On a negative note, the specs look awfully like the original method, just reworded into "test-speak"; there's a definite "smell" of duplication, high-maintenance and brittleness here.
-   There's not really much sense in testing "edgy" cases here (such as 0 records, 1 record, enough records for 1 page, enough for 2 pages) because we'd only be testing our ability to tell our mocks and stubs what messages to return, not testing the actual code. In other words, for each "edgy" case we'd tell the mocks/stubs to expect a different set of parameters, and we'd also instruct them to return different results, so this would really just be a test of our test-writing ability, not of the actual code that we want to test.
-   This is basically "interaction-based" testing: we say what interactions between classes we expect to see, trigger an action, and then check to see if the expected interactions took place.

## Common concerns

Regardless of the perspective we choose, there are a couple of common requirements that we'll want to test regardless. Both of these fall under the "externally visible behaviour" category, and there's no way in which we could or would want to use knowledge of internal implementation details to inform how we write the specs:

-   We want to confirm that we rendered the expected template, `index`
-   We want to confrim that the response was successful (HTTP 200)

## Show me the code

### Internals perspective

Let's start from the "internals" perspective first, and get the easy stuff out the way:

    def do_get
      get :index, :protocol => 'https'
    end

    it 'should be successful' do
      do_get
      response.should be_success
    end

    it 'should render the "index" template' do
      do_get
      response.should render_template('index')
    end

Ok, simple enough. Now we proceed to go line-by-line through the method and make sure that we verify the behaviour of each line. The first line we have to worry about is:

    @paginator = RestfulPaginator.new params, Tweet.count, tweets_url, 20

This is what the corresponding spec code looks like:

    before do
      @params = { 'action' => 'index', 'controller' => 'tweets', 'protocol' => 'https' }
    end

    it 'should use the restful paginator' do
      paginator = RestfulPaginator.new(@params, Tweet.count, tweets_url, 20)
      RestfulPaginator.stub!(:new).with(@params, Tweet.count, tweets_url, 20).and_return(paginator)
      do_get
      assigns[:paginator].should == paginator
    end

    it 'should correctly configure the restful paginator' do
      RestfulPaginator.should_receive(:new).with(@params, Tweet.count, tweets_url, 20)
      do_get
    end

That second example is there because what we care about is that `RestfulPaginator` gets fed the right parameters. This is interaction-based testing. I could have rolled the two specs into one by using `should_receive` instead of `stub!` in the first spec. But by leaving it as a separate spec, you can look at it in isolation and it is extremely clear exactly what's being tested.

The trouble is we've come extremely close to duplicating the line of code from our implementation in our spec.

Look how similar:

    # from the controller:
    RestfulPaginator.new params, Tweet.count, tweets_url, 20

Is to:

    # from the spec:
    RestfulPaginator.should_receive(:new).with(@params, Tweet.count, tweets_url, 20)

Each change to one will have to be matched by a change to the other. Given that we're constantly looking for ways to minimize inefficiency and increase robustness, this duplication might make you feel uncomfortable.

Of course, this pair of specs is not _entirely_ robust in the face of pathological attempts to demonstrate that the specs don't _prove_ that the code behaves correctly. I'm not explicitly confirming, for example, that the paginator which was initialized with the expected values is actually the paginator which is used in the `find_recent` call and assigned to the `@paginator` instance variable:

    # pathological sabatoge; still passes specs:
    @paginator  = RestfulPaginator.new params, Tweet.count, tweets_url, 20
    paginator = Paginator.new params, 9000, 'http://example.com/broken', 1000
    @tweets     = Tweet.find_recent paginator

In reality I don't think it's worth investing the effort to check for this kind of pathological breakage.

Now let's test the next line:

    it 'should find recent tweets' do
      Tweet.should_receive(:find_recent)
      do_get
    end

    it 'should assign the recent tweets to the @tweets instance variable' do
      Tweet.stub!(:find_recent).and_return([:recent])
      do_get
      assigns[:tweets].should == [:recent]
    end

So, we're not actually testing to see that the paginator variable got passed in there; we're just confirming that, firstly, the `find_recent` message was sent, and secondly, the result was assigned to the `@tweets` instance variable.

To actually make sure that the paginator was passed in we'd have to modify that first spec to look like this:

    it 'should find recent tweets' do
      paginator = RestfulPaginator.new(@params, Tweet.count, tweets_url, 20)
      RestfulPaginator.stub!(:new).with(@params, Tweet.count, tweets_url, 20).and_return(paginator)
      Tweet.should_receive(:find_recent).with(paginator)
      do_get
    end

And we're done. We have a bit of nasty duplication in there, repeating a couple of the steps that we'd already done in one of the other specs. We could either stick some of that common setup in the `before` block, perhaps:

    before do
      @params = { 'action' => 'index', 'controller' => 'tweets', 'protocol' => 'https' }
      @paginator = RestfulPaginator.new(@params, Tweet.count, tweets_url, 20)
    end

But the problem there is that this robs us of the chance to do any "pre-setup" of the tweet records before hand. We'll always start with an empty table.

Our other option is to replace our multiple specs with a single one which basically reconstructs the entire method and describes everything that it should do in a single example:

    it 'should, um, just work!' do
      paginator = RestfulPaginator.new(@params, Tweet.count, tweets_url, 20)
      RestfulPaginator.should_receive(:new).with(@params, Tweet.count, tweets_url, 20).and_return(paginator)
      assigns[:paginator].should == [:paginator]
      Tweet.should_receive(:find_recent).with(paginator).and_return([:recent])
      assigns[:tweets].should == [:recent]
    end

But this looks pretty much just like an ugly rewrite of the original implementation in a different language. It could be made a little prettier by using the "[proxy](/wiki/proxy)" pattern (as employed in [RR](/wiki/RR)) instead of a straight mock, but I haven't been able to get that to work in [RSpec](/wiki/RSpec).

### "Black box" perspective

    def do_get
      get :index, :protocol => 'https'
    end

    it 'should be successfu' do
      do_get
      response.should be_success
    end

    it 'should render the "index" template' do
      do_get
      response.should render_template('index')
    end

Up to here everything is the same.

Now let's start thinking about externally visible behaviour. We'll test some basic "edge" and normal cases:

    it 'should function when there are no tweets in the database' do
      do_get
      assigns[:tweets].should == []
    end

    it 'should function when there is one tweet in the database' do
      tweet = create_tweet
      do_get
      assigns[:tweets].should == [tweet]
    end

    it 'should fetch no more than 20 tweets at a time' do
      25.times { create_tweet }
      do_get
      assigns[:tweets].length.should == 20
    end

    it 'should fetch tweets in reverse creation order' do
      past = 3.days.ago
      old = create_tweet
      Tweet.update_all ['created_at = ?, updated_at = ?', past, past], ['id = ?', old.id]
      new = create_tweet
      do_get
      assigns[:tweets].should == [new, old]
    end

So far so good. These specs are very fast and easy to write, very clear to read and understand, and don't use those maligned mocks and stubs at all.

The down side: creating all those record instances is going to slow down the test suite. By the time your code base grows large enough that this is a problem, it will probably be stable and established enough that you _could_ actually start using more mocks in your specs without any of the drawbacks (if the codebase isn't evolving too rapidly anymore, the maintenance overhead of keeping your mocks in sync with your APIs won't be too much). Alternatively, you might decide to try a faster, alternative database backend when running your specs (an in-memory database, for example) but the problem there is that with a large codebase you're more likely to have some kind of MySQL-specific constraints in there that will make this difficult.

But still, despite this, the upside is very positive. Your specs are entirely implementation independent because they are state based. If you later replace the `find_recent` method with `super_find_recent` which runs 20 times faster, your specs will continue to work and they'll confirm that the behaviour of the controller is still correct.

So let's continue:

    it 'should assign to the @paginator instance variable' do
      do_get
       assigns[:paginator].should be_kind_of(RestfulPaginator)
    end

Nothing contentious there. But now we come to the tricky part.

We know that the paginator is doing its job at least in part, because our other specs show that no more than 20 records are being returned at a time. But how do we know _for sure_ that the paginator really is configured right? How do we know that it will return the right pagination links when it's used in the view?

Here we have two options.

-   Swap or "black box" hat for our "internals" one, just for one spec and use a mock and a `should_receive` expectation to confirm that the right parameters are being passed into the paginator.
-   Alternatively, we can stay in "state-based" mode and inspect our paginator instance variable to make sure that it's in the expected state.

That might look something like this:

    it 'should inform the paginator of the total number of records' do
      do_get
      assigns[:paginator].count.should == Tweet.count
    end

    it 'should tell the paginator to use the /twitter URL for link generation' do
      do_get
      assigns[:paginator].path_or_url.should == tweets_url
    end

    it 'should configure the paginator to paginate in groups of 20' do
      do_get
      assigns[:paginator].limit.should == 20
    end

    it 'should show the first page by default' do
      do_get
      assigns[:paginator].offset.should == 0
    end

Even though we are in "black box" mode, we're still using our knowledge of how the paginator actually works to inform us about _what_ attributes of the paginator we need to inspect. We know that `limit` and `offset` are used when performing the [SQL](/wiki/SQL) `SELECT`, so that's an important piece of state that will impact behaviour if it is wrong. We also know that the `count` attribute will determine the total number of pages, and `path_or_url` will determine what host is used to construct the URLS in the page links.

Note that there is one input parameter to `RestfulPaginator.new` that we don't bother looking at: `params`. That's effectively an implementation detail, and the only thing we care about is the final state of the paginator. Presumably if the wrong `params` were passed in (for example, a hash with a value like `params[:page] = "Your momma"`) then that would manifest itself in the form of a bad `offset` attribute, which we would detect anyway.

## Evaluating the alternatives

Perhaps by the time you get this far you'll have realised that I tend to come down fairly heavily in the "state-based" or "black box" camp.

I _do_ use mocks and stubs in my specs, but I find that if there's a state-based alternative it often provokes less feelings of inquietitude.

Just to prove that I am not totally against mocking and stubbing, here are the specs that I wrote for the `find_recent` method itself. First of all, the method:

    def self.find_recent paginator = nil
      options = { :order => 'created_at DESC', :limit => 20 }
      options.merge!({ :offset => paginator.offset, :limit => paginator.limit }) if paginator
      find :all, options
    end

And now for the specs:

    describe Tweet, 'find_recent (class) method' do
      it 'should find no more than 20 tweets' do
        Tweet.should_receive(:find).with(:all, hash_including(:limit => 20))
        Tweet.find_recent
      end

      it 'should sort tweets in reverse creation order' do
        Tweet.should_receive(:find).with(:all, hash_including(:order => 'created_at DESC'))
        Tweet.find_recent
      end

      it 'should use offset from paginator if supplied' do
        paginator = mock('paginator')
        paginator.should_receive(:offset).and_return(35)
        paginator.stub!(:limit).and_return(10)
        Tweet.should_receive(:find).with(:all, hash_including(:offset => 35))
        Tweet.find_recent paginator
      end

      it 'should use limit from paginator if supplied' do
        paginator = mock('paginator')
        paginator.should_receive(:limit).and_return(100)
        paginator.stub!(:offset).and_return(20)
        Tweet.should_receive(:find).with(:all, hash_including(:limit => 100))
        Tweet.find_recent paginator
      end
    end

Somehow, using mocks and stubs here just felt like the "natural" thing to do in this case.

Let's compare that with the state-based approach...

    describe Tweet, 'find_recent (class) method' do
      def old_tweet days_count
        past = days_count.days.ago
        tweet = create_tweet
        Tweet.update_all ['created_at = ?, updated_at = ?', past, past], ['id = ?', tweet.id]
        tweet
      end

      it 'should find no more than 20 tweets' do
        25.times { create_tweet }
        Tweet.find_recent.length.should <= 20
      end

      it 'should sort tweets in reverse creation order' do
        old = old_tweet(3)
        new = create_tweet
        Tweet.find_recent.should == [new, old]
      end

      it 'should use offset from paginator if supplied' do
        first = old_tweet(10)
        second = old_tweet(8)
        third = old_tweet(6)
        fourth = create_tweet
        paginator = RestfulPaginator.new({ :page => 2 }, 4, 'foo', 2)
        Tweet.find_recent(paginator).should == [second, first]
      end

      it 'should use limit from paginator if supplied' do
        20.times { create_tweet }
        paginator = RestfulPaginator.new({}, 20, 'foo', 10)
        Tweet.find_recent(paginator).length.should == 10
      end
    end

I don't find the state-based approach so appealing in this case for a couple of reasons:

-   It required us to implement an `old_tweet` helper function in order to reduce repetitive set-up; helper functions can have bugs and they make it harder to understand the specs because they have to be parsed before you can understand what the specs do.
-   In order to test the offset and limit behaviours we end up setting up paginator objects in an artificial way with parameters very unlike those that we'd see when they are used in practice (from controllers).
-   Those artificial parameters are easy to get wrong, and hard to parse for somebody not familiar with the parameter order of the `RestfulPaginator.new` method.

So, while I generally like the "black box", state-based approach, I think there are cases where using mocks and stubs is the better choice (not to mention those situations where mocks and stubs are literally the _only_ way you can test something). The really important thing is to always judge things on a case-by-case basis. It would be an error to say "mocks are evil" and never use them. Likewise, it would be a mistake to say "coupling is the enemy, we should always isolate". In the end, readability, writability and maintainability, are sometimes best obtained through mocks, and sometimes best obtained through state-based patterns.
