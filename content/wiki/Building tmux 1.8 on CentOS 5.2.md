---
tags: tmux
---

I previously had to do this on an old CentOS box (see "[Building tmux 1.7 on CentOS 5.8](/wiki/Building_tmux_1.7_on_CentOS_5.8)"), but now find myself having to do it on an even old box. Since then, however, a newer version of [tmux](/wiki/tmux) is out; the basic steps work just the same:

```shell
$ wget https://github.com/downloads/libevent/libevent/libevent-2.0.21-stable.tar.gz
$ tar xzf libevent-2.0.21-stable.tar.gz
$ cd libevent-2.0.21-stable
$ ./configure --disable-shared --enable-static --prefix=$HOME
$ make && make install
$ cd ..
$ wget http://ftp.gnu.org/pub/gnu/ncurses/ncurses-5.9.tar.gz
$ tar xzf ncurses-5.9.tar.gz
$ cd ncurses-5.9
$ ./configure --disable-shared --enable-static --prefix=$HOME
$ make && make install
$ cd ..
$ wget http://softlayer-dal.dl.sourceforge.net/project/tmux/tmux/tmux-1.8/tmux-1.8.tar.gz
$ tar xzf tmux-1.8.tar.gz
$ cd tmux-1.8
$ PKG_CONFIG_PATH=$HOME/lib/pkgconfig CFLAGS="-I$HOME/include -I$HOME/include/ncurses" LDFLAGS="-L$HOME/lib" ./configure --enable-static --prefix=$HOME
$ make && make install
```