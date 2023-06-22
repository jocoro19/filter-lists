# JHS Web Improvements (filter-lists)

This repository contains adblocker filter lists, custom userstyles, and userscripts for an improved experience on the web.

Feel free to use, modify, and share the contents of this repository, but I won't be accepting any contributions at this time.

## Filter Lists

- JHS iOS Filter List ([ios-filters.txt](https://raw.githubusercontent.com/jocoro19/filter-lists/main/filters/ios-filters.txt))
  - A mobile-oriented filter list initially designed for Brave iOS.
  - Blocks TikTok, Twitter, Meta (Instagram, Facebook, etc.), and some other websites
  - Removes unwanted stuff from the YouTube mobile website (`m.youtube.com`), including YouTube Shorts.
  - ~~Prevents the mobile Reddit website from loading (use `old.reddit.com` instead)~~
  - ~~Disables custom themes on Old Reddit, hides the sidebar and other unwanted stuff~~
  - **Reddit is currently blocked in support of the ongoing protests against Reddit's planned API changes**
  - Hides features from Wikipedia that aren't useful for non-editors
  - Removes bloat and unwanted stuff from Pixiv, Fandom, and some other websites
  - Currently, strict blocking and `$removeparam` rules don't work on Brave iOS at the moment

- JHS Basic YouTube Filter List ([yt-filters.txt](https://raw.githubusercontent.com/jocoro19/filter-lists/main/filters/yt-filters.txt))
  - Cleans up the YouTube website by hiding unnecessary things
  - Hides YouTube shorts outside of the subscriptions page
  - Hides everything which isn't related to search results in the search page

### Installation

1. Install an adblocker for your platform and browser
    - Windows/Linux/MacOS: 
      - Firefox, Chrome, Edge: [uBlock Origin](https://github.com/gorhill/uBlock)
      - Some browsers such as Brave, Vivladi, and Opera GX have their own built-in adblockers
    - iOS:
      - [Brave iOS](https://brave.com/ios/) is free and has a decent built-in adblocker
    - Android:
      - uBlock Origin is avaliable for Firefox on Android
3. Import the filter list into your adblocker of choice (instructions vary between extensions)

## Userstyles

- JHS YouTube Fixes ([youtube.user.css](https://raw.githubusercontent.com/jocoro19/filter-lists/main/styles/youtube.user.css))
  - Adds an exta video per row on the homepage and subscription page
  - Removes the empty space when an ad or video is hidden on the homepage and subscription page
  - Makes the font size smaller for the video title and info on the homepage and subscription page
  - Makes the channel info section more compact
  - Works best in conjunction with the JHS Basic YouTube Filter List mentioned above
- JHS Reddit Fixes ([reddit.user.css](https://raw.githubusercontent.com/jocoro19/filter-lists/main/styles/reddit.user.css))
  - Includes fixes for a few subreddits on Old Reddit
  - Fixes i.redd.it


### Installation via Stylus
1. Install the [Stylus](https://github.com/openstyles/stylus) extension on your browser
2. Click on the link for the style and Stylus should open
3. Click "Install Style"

### Installation via `userContent.css` (Firefox only)
1. Go to `about:config` and set `toolkit.legacyUserProfileCustomizations.stylesheets` to `true`
2. Go to `about:support` and click on the "Open Folder" button in the "Profile Folder" row
3. Create a subfolder named `chrome` and create a file named `userContent.css` in that folder
4. Paste the contents of the userstyle into `userContent.css` and restart Firefox

## Userscripts
- [nitter-redirect.js](https://raw.githubusercontent.com/jocoro19/filter-lists/main/scripts/nitter-redirect.js)
  - Redirects all Twitter URLs to [Nitter](https://github.com/zedeus/nitter), an alternative frontend for Twitter
- [old-reddit-redirect.js](https://raw.githubusercontent.com/jocoro19/filter-lists/main/scripts/old-reddit-redirect.js)
  - Redirects all Reddit URLs to Old Reddit, even when logged out

### Installation
1. Install a userscript manager extension such as [Violentmonkey](https://violentmonkey.github.io/) for Firefox/Chrome or [Userscripts](https://github.com/quoid/userscripts) for Safari
2. Import the userscript in your extension of choice (instructions vary between extensions)
