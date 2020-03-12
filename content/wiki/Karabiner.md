---
tags: macos karabiner wiki
cache_breaker: 1
---

# Official site

-   <https://pqrs.org/osx/karabiner/>

Note that I am not using [Seil](https://pqrs.org/osx/karabiner/seil.html.en), from the same author, because that can apparently only be used to swap the Caps Lock key for something else, and I haven't felt the need to do that. (I just set Caps Lock and Control using the standard OS X preferences panel.)

# Settings

-   "Change Key" tab:
    -   "Change Shift_L Key (Left Shift)
        -   "Shift_R+Shift_L to CapsLock (+ Shift_L to turn CapsLock off)"
    -   "Change Shift_R Key (Right Shift)
        -   "Shift_R+Shift_L to CapsLock (+ Shift_L to turn CapsLock off)"

This is great. No more accidental Caps Lock, and I don't miss the sticky feature (mentioned below under "Old settings") at all.

After switching to [Colemak](/wiki/Colemak), I wanted to try life with a variant on the so-called killer feature of turning CapsLock into a Backspace key:

-   "Change Key" tab:
    -   "Change Control_L key (Left Control)"
        -   "Control_L to Control_L (+ When you type Control_L only, send Delete) + \[KeyRepeat\]" (this is a slightly custom setting defined [in my dotfiles](https://github.com/wincent/wincent/blob/1770b6c55075e1bb2c333a78fc2811def001e93a/roles/keyboard/files/modifiers.xml))

So, we're giving up that faster access to the `<Escape>` key (super useful for [Vim](/wiki/Vim)) for the famed "Caps Lock as Delete" behavior which so many Colemak users rave about. You still have a Delete key on the right side of the keyboard, so you can use whichever one makes most sense (ie. dependent on the next character you have to type after the correction). For `<Escape>` in Vim, just use `<C-[>` or the actual `<Escape>` key.

Note that when I first tried this setting, I did so with key repeat enabled (ie. pressing and holding would produce Delete with key repeat, after a delay, but I found that the repeat would kick in at undesired moments, because I sometimes have the habit of holding down "Control" while I think about what other key I am going to chord it with), but I later turned that off.

Finally, we have:

-   "Change Key" tab:
    -   "Change Return key"
        -   "Return to Control_L (+When you type Return only, send Return) + \[KeyRepeat\]" (this is a slightly custom setting defined [in my dotfiles](https://github.com/wincent/wincent/blob/1770b6c55075e1bb2c333a78fc2811def001e93a/roles/keyboard/files/modifiers.xml))

This gives us nice symmetry on the right side, mirroring the easy access to the Control key that we have on the left. Note that this is particularly useful on the laptop keyboard, which normally doesn't even have a Control key anywhere on the right side at all.

Also useful:

-   "Key Repeat" tab
    -   "Basic Configurations"
        -   "Key Repeat"
            -   "Delay Until Repeat" -&gt; 300ms (down from 500ms)
            -   "Key Repeat" -&gt; 30ms (down from 83ms)
    -   "Advanced Configurations"
        -   "Key Overlaid Modifier"
            -   "Delay Until Repeat": 300ms (down from 500ms, to match other "Delay Until Repeat" setting above).

Custom "Yubikey: Colemak": [config](https://github.com/wincent/wincent/blob/master/roles/keyboard/files/yubikey.xml)

Custom "SpaceFN" layout: [config](https://github.com/wincent/wincent/blob/master/roles/keyboard/files/spacefn.xml)

# Old settings

This is the killer setting I ran with for a long time:

-   "Change Key" tab:
    -   "Change Control_L key (Left Control)"
        -   "Control_L to Control_L (+ When you type Control_L only, send Escape)"

It was usefully combined with (so that you can keep Control as Control, so that menu modifiers work as before, while still having Caps Lock functionality available somewhere else, and "sticky" shift functionality as a bonus):

-   "Change Key" tab:
    -   "Change Shift_L Key (Left Shift)"
        -   "Shift_L to Shift_L (+ When you type Shift_L only, Sticky Shift_L) (+ When you type Shift_L twice, Capslock)"

I ended up getting rid of the sticky shift because I found that I'd end up activating it without meaning to, and sometimes I'd end up activating Capslock by mistake and then triggering an unwanted sticky shift when trying to deactivate it.

# See also

-   [Mac OS X "must haves"](/wiki/Mac_OS_X_%22must_haves%22)
