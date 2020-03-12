---
tags: aws wiki
cache_breaker: 1
---

**Note:** _On 2 December 2011 Amazon introduced [new pricing](http://aws.amazon.com/ec2/reserved-instances/), which can drop the rate as low as 2c/hr, for even greater savings. On 6 March 2012 they lowered the prices [even further](http://aws.amazon.com/ec2/pricing/), bringing the hourly rate as low as 1.3c. Then on 1 February 2013 the prices were again dropped. I haven't yet updated the following analysis to reflect this. As of June 2014 [Amazon's pricing page](http://aws.amazon.com/ec2/pricing/) has nice tables which clearly show the savings you can earn by using reserved instances (ie. up to 60% over a three-year term for "Heavy Utilization" instances)._

How much do you stand to save by using reserved instance pricing for AWS EC2 instances?

Let's take an example based on two small instances, based on prices current as of February 2011.

These examples only look at the cost of the instance-hours. Additional charges for EBS and traffic etc are not shown here because they represent a fixed portion of the price which does not vary according to whether instances are reserved or on-demand.

# Standard Pricing

-   2 instances at: 8.5c/hr
-   Running: 24 x 7 x 52 hours per year
-   **Total:**
    -   **\$1,485.12/year**
    -   **\$123.76/month**

This corresponds to a per-instance price of 8.5c/hr

# 1-year reserved pricing

-   2 instances at: 3c/hr
-   Running: 24 x 7 x 52 hours per year
-   Cost before adjustment: \$524.16/year
-   Cost of 1-year reservation: \$227.50
    -   Total cost for reservation of 2 instances: \$455
-   **Total:**
    -   **\$979.16/year**
    -   **\$81.60/month**

This corresponds to a per-instance price of 6c/hr

# 3-year reserved pricing

-   2 instances at: 3.1c/hr
-   Running: 24 x 7 x 52 hours per year
-   Cost before adjustment: \$541.63/year
-   Cost of 3-year reservation: \$106.30
    -   Total cost for reservation of 2 instances for 3 years: \$1731.19
-   **Total:**
    -   **\$577.06/year**
    -   **\$48.09/month**

This corresponds to a per-instance price of 3.3c/hr.
