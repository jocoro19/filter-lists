# JHS Web Improvements (filter-lists)

This repository contains adblocker filter lists, custom userstyles, and userscripts for an improved experience on the web.

Feel free to use, modify, and share the contents of this repository, but I won't be accepting any contributions at this time.

## Contents
* [Filter Lists](#filter-lists)
* [Userstyles](#userstyles)

## Filter Lists

* JHS Basic YouTube Filters (yt-filters.txt)
  * [Install](https://subscribe.adblockplus.org/?location=https%3A%2F%2Fraw.githubusercontent.com%2Fjocoro19%2Ffilter-lists%2Fmain%2Ffilters%2Fyt-filters.txt&title=JHS%20Basic%20FYouTube%20Filters) or [view raw](https://raw.githubusercontent.com/jocoro19/filter-lists/main/filters/yt-filters.txt)
  * Cleans up the YouTube website by hiding unnecessary things
  * Hides YouTube shorts outside of the subscriptions page
  * Hides everything which isn't related to search results in the search page
  * Works best with the [JHS YouTube Fixes](https://raw.githubusercontent.com/jocoro19/filter-lists/main/styles/youtube.user.css) userstyle
 
* JHS Wikipedia Filters (wp-filters.txt)
  * [Install](https://subscribe.adblockplus.org/?location=https%3A%2F%2Fraw.githubusercontent.com%2Fjocoro19%2Ffilter-lists%2Fmain%2Ffilters%2Fwp-filters.txt&title=JHS%20Wikipedia%20Filters) or [view raw](https://raw.githubusercontent.com/jocoro19/filter-lists/main/filters/wp-filters.txt)
  * Hides things on Wikipedia (both on desktop and on mobile) which aren't useful to non-editors
  * Makes Wikipedia full width by default
 
* JHS iOS Filters (ios-filters.txt)
  * [Install](https://subscribe.adblockplus.org/?location=https%3A%2F%2Fraw.githubusercontent.com%2Fjocoro19%2Ffilter-lists%2Fmain%2Ffilters%2Fios-filters.txt&title=JHS%20iOS%20Filters) or [view raw](https://raw.githubusercontent.com/jocoro19/filter-lists/main/filters/ios-filters.txt)
  * A mobile-oriented filter list initially designed for Brave iOS.
  * Blocks TikTok, Twitter, Meta (Instagram, Facebook, etc.), and some other websites
  * Removes unwanted stuff from the YouTube mobile website (`m.youtube.com`), including YouTube Shorts.
  * Prevents the mobile Reddit website from loading (use `old.reddit.com` instead)
  * Disables custom themes on Old Reddit, hides the sidebar and other unwanted stuff
  * Hides features from Wikipedia that aren't useful for non-editors
  * Removes bloat and unwanted stuff from Pixiv, Fandom, and some other websites
  * Currently, strict blocking and `$removeparam` rules don't work on Brave iOS at the moment
 
### Installation

1. Install an adblocker for your platform and browser
    * Windows/Linux/MacOS: 
      * Firefox, Chrome, Edge: [uBlock Origin](https://github.com/gorhill/uBlock)
      * Some browsers such as Brave, Vivladi, and Opera GX have their own built-in adblockers
    * iOS:
      * [Brave iOS](https://brave.com/ios/) is free and has a decent built-in adblocker
    * Android:
      * uBlock Origin is avaliable for Firefox on Android
3. Click the install link for the filter list to import it (or click the "View raw" link if it doesn't work)

## Userstyles

* JHS YouTube Fixes (youtube.user.css)
  * [Install (UserCSS)](https://raw.githubusercontent.com/jocoro19/filter-lists/main/styles/youtube.user.css), [install (filter list)](https://subscribe.adblockplus.org/?location=https%3A%2F%2Fraw.githubusercontent.com%2Fjocoro19%2Ffilter-lists%2Fmain%2Ffilters%2Fyt-css-filters.txt&title=JHS%20Basic%20YouTube%20Fixes%20%28filter%20list%29) or [view raw (filter list)](https://raw.githubusercontent.com/jocoro19/filter-lists/main/filters/yt-css-filters.txt)
  * Adds an exta video per row on the homepage and subscription page
  * Removes the empty space when an ad or video is hidden on the homepage and subscription page
  * Makes the font size smaller for the video title and info on the homepage and subscription page
  * Makes the channel info section more compact
  * Works best in conjunction with the JHS Basic YouTube Filters mentioned above
  * Filter list version includes the JHS Basic YouTube Filters (uBlock only)
* JHS Reddit Fixes
  * [Install (UserCSS)](https://raw.githubusercontent.com/jocoro19/filter-lists/main/styles/reddit.user.css)
  * Includes fixes for a few subreddits on Old Reddit
  * Fixes i.redd.it


### Installation via Stylus
1. Install the [Stylus](https://github.com/openstyles/stylus) extension on your browser
2. Click on the link of the userstyle to import it into Stylus

### Installation via `userContent.css` (Firefox only)
1. Go to `about:config` and set `toolkit.legacyUserProfileCustomizations.stylesheets` to `true`
2. Go to `about:support` and click on the "Open Folder" button in the "Profile Folder" row
3. Create a subfolder named `chrome` and create a file named `userContent.css` in that folder
4. Paste the contents of the userstyle into `userContent.css` and restart Firefox
