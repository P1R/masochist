---
tags: algorithms dynamic.programming wiki
cache_breaker: 1
---

This is a simple example of a [dynamic programming](/wiki/dynamic_programming) algorithm.

# Problem statement

Given a set of vertexes **_V_** describing a path in a graph, with each vertex assigned a weight, the _Maximum Weighted Independent Set_ is the subset of vertices whose weights sum to the maximum possible value without any two vertices being adjacent to one another (hence "independent" set).

# Runtime

-   A brute force algorithm would work but would require exponential running time
-   A greedy algorithm could have us making an incorrect "myopic" decision that would produce an invalid overall answer
-   A divide and conquer algorithm could work, but would require non-trivial and expensive work to resolve conflicts (adjacency) upon merging subproblems together
-   A dynamic programming approach can solve the problem in linear time

# Basis

-   An optimal solution can have one of two properties:
    1.  Either the last element in the path _is not_ part of the maximum weighted independent set (in which case we know that the solution is equally valid for the subgraph **_V'_** formed by popping the last vertex off the path)
    2.  Or the last element _is_ part of the set (in which case we know that the predecessor cannot be part of the set, and the solution minus the last vertex is equally valid for the subgraph **_V''_** formed by popping off the last two vertices of the path)
-   If we could presciently know which of these properties applied we could walk backwards down the path in linear time and compute the solution
-   We don't have that prescience, however; if we could test both alternatives and recurse then we could arrive at a solution but it would be exponential
-   The expense of the recursion comes from the fact that we end up re-solving the same subproblems over and over again; if we memoize, then we can amortize that cost and produce a linear runtime

# Algorithm

We'll walk through the path from left to right, using memoized knowledge of the maximum weight so far to decide which property must apply (either the last vertex is part of the set or not).

-   Base case:
    -   For the empty set, the weight is zero
    -   For the one-element set, the element is in the set and its weight is the maximum weight; store this in the array at `A[0]`
-   When looking at element `A[i]`, the memoized maximum weight must be:
    -   `A[i - 1]` (this corresponds to the case when the last vertex, `i`, _is not_ in the set)
    -   `A[i - 2]` + `weight of i` (this correspond to the case when the last vertex, `i`, _is_ in the set)
    -   We pick whichever is biggest and store it in `A[i]`

# Reconstruction

The algorithm as stated only tells us the weight of the maximum weighted independent set. If we want to actually report the members of the set as well we need to employ a reconstruction approach, which is also linear. This could be done while walking through the path from left to right, or we could do it as a separate pass walking backwards over the array:

    # pseudo-code
    set = {}
    i = A.length - 1 # last element in A
    while i >= 1
      if A[i] == A[i - 1] # last vertex not in set
        i--
      else # last vertex is in set
        set << vertex i
        i -= 2
      end
    end
    return set
