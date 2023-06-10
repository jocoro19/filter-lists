# JHS Web Improvements (filter-lists)

This repository contains adblocker filter lists, custom userstyles, and userscripts to improve your experience on the web.

Feel free to use, modify, and share the files in this repository, but I won't be accepting any contributions at this time.

## Filter Lists

- [ios-filters.txt](ios-filters.txt)
  - A mobile-oriented filter list initially designed for Brave iOS.
  - Blocks TikTok, Twitter, Meta (Instagram, Facebook, etc.), and some other websites
  - Removes unwanted stuff from YouTube (`m.youtube.com`), including YouTube Shorts.
  - Removes bloat and unwanted stuff from Old Reddit, Pixiv, Fandom, Wikipedia, and some other websites
  - Prevents the mobile Reddit website from loading (use `old.reddit.com` instead)
  - Currently, strict blocking and `$removeparam` rules do not work on Brave iOS at the moment.

### Installation

1. Install an adblocker for your platform and browser
    - Windows/Linux/MacOS: 
      - Firefox, Chrome, Edge: [uBlock Origin](https://github.com/gorhill/uBlock)
      - Some browsers such as Brave, Vivladi, and Opera GX have their own built-in adblockers
    - iOS:
      - [Brave iOS](https://brave.com/ios/) is free and has a decent built-in adblocker
    - Android:
      - uBlock Origin is avaliable for Firefox on Android
2. Import the filter list into your adblocker of choice

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
2. Click on the extension icon, then the "Manage" button, then click on "Write New Style" (Leave "as Usercss" unchecked)
3. Paste the contents of the userstyle into the editor

### Installation via `userContent.css` (Firefox only)
1. Go to `about:config` and set `toolkit.legacyUserProfileCustomizations.stylesheets` to `true`
2. Go to `about:support` and click on the "Open Folder" button in the "Profile Folder" row
3. Create a subfolder named `chrome` and create a file named `userContent.css` in that folder
4. Paste the contents of the userstyle into `userContent.css` and restart Firefox

## Userscripts
- [nitter-redirect.js](scripts/nitter-redirect.js)
  -  Redirects all Twitter URLs to [Nitter](https://github.com/zedeus/nitter), an alternative frontend to Twitter
