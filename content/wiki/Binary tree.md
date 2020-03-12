---
tags: data.structures wiki
cache_breaker: 1
---

# Accessing child elements

To access the children of an element _n_.

## For a 1-indexed tree

                  1                             n
           2             3                2n      2n + 1
       4      5       6       7
    8    9 10   11  12  13 14  15

## For a 0-indexed tree

                  0                                  n
           1             2                2(n + 1) - 1      2(n + 1)
       3      4       5       6
    7    8 9    10  11  12 13  14

# Accessing parent elements

To access the parent of an element _n_.

## For a 1-indexed tree

                  1
           2             3
       4      5       6       7           n / 2
    8    9 10   11  12  13 14  15         n

## For a 0-indexed tree

                  0
           1             2
       3      4       5       6           (n - 1) / 2
    7    8 9    10  11  12 13  14         n

# Rendering a binary tree

See:

-   _Tidier drawings of trees_: <http://emr.cs.iit.edu/~reingold/tidier-drawings.pdf>

# Variants of binary trees

-   [Rope](/wiki/Rope): <http://en.wikipedia.org/wiki/Rope_%28data_structure%29>
