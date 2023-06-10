# JHS Web Improvements (filter-lists)

This repository contains adblocker filter lists, custom userstyles, and userscripts for an improved experience on the web.

Feel free to use, modify, and share the contents of this repository, but I won't be accepting any contributions at this time.

## Filter Lists

- [ios-filters.txt](ios-filters.txt)
  - A mobile-oriented filter list initially designed for Brave iOS.
  - Blocks TikTok, Twitter, Meta (Instagram, Facebook, etc.), and some other websites
  - Removes unwanted stuff from YouTube (`m.youtube.com`), including YouTube Shorts.
  - Prevents the mobile Reddit website from loading (use `old.reddit.com` instead)
  - Disables custom themes on Old Reddit, hides the sidebar and other unwanted stuff
  - Removes bloat and unwanted stuff from Pixiv, Fandom, Wikipedia, and some other websites
  - Currently, strict blocking and `$removeparam` rules do not work on Brave iOS at the moment

### Installation

1. Install an adblocker for your platform and browser
    - Windows/Linux/MacOS: 
      - Firefox, Chrome, Edge: [uBlock Origin](https://github.com/gorhill/uBlock)
      - Some browsers such as Brave, Vivladi, and Opera GX have their own built-in adblockers
    - iOS:
      - [Brave iOS](https://brave.com/ios/) is free and has a decent built-in adblocker
    - Android:
      - uBlock Origin is avaliable for Firefox on Android
2. Import the filter list into your adblocker of choice (instructions vary between extensions)

## Userstyles

- [reddit.css](styles/reddit.css)
  - Includes fixes for a few subreddits on Old Reddit
  - Fixes i.redd.it

- [youtube.css](styles/youtube.css)
  - Adds an video per row on the homepage and subscription page
  - Removes the empty space when an ad or video is hidden on the homepage and subscription page
  - Makes the font size smaller for the video title and info on the homepage and subscription page
  - Makes the channel info section more compact

### Installation via Stylus
1. Install the [Stylus](https://github.com/openstyles/stylus) extension on your browser
2. Click on the extension icon, then the "Manage" button, then click on "Write New Style" (leave "as Usercss" unchecked)
3. Paste the contents of the userstyle into the editor and save it

### Installation via `userContent.css` (Firefox only)
1. Go to `about:config` and set `toolkit.legacyUserProfileCustomizations.stylesheets` to `true`
2. Go to `about:support` and click on the "Open Folder" button in the "Profile Folder" row
3. Create a subfolder named `chrome` and create a file named `userContent.css` in that folder
4. Paste the contents of the userstyle into `userContent.css` and restart Firefox

## Userscripts
- [nitter-redirect.js](scripts/nitter-redirect.js)
  - Redirects all Twitter URLs to [Nitter](https://github.com/zedeus/nitter), an alternative frontend for Twitter
- [old-reddit-redirect.js](scripts/old-reddit-redirect.js)
  - Redirects all Reddit URLs to Old Reddit, even when logged out

### Installation
1. Install a userscript manager extension such as [Violentmonkey](https://violentmonkey.github.io/) for Firefox/Chrome or [Userscripts](https://github.com/quoid/userscripts) for Safari
2. Import the userscript in your extension of choice (instructions vary between extensions)
