---
tags: red.hat perl wiki
---

I decided to install this manually as I have a bit of an aversion to [CPAN](/wiki/CPAN):

    wget http://search.cpan.org/CPAN/authors/id/J/JE/JENDA/Mail-Sender-0.8.13.tar.gz
    tar xzvf Mail-Sender-0.8.13.tar.gz
    cd Mail-Sender-0.8.13
    perl Makefile.PL
    make
    make test
    sudo make install
