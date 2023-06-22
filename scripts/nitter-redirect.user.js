// ==UserScript==
// @name        Nitter Redirect
// @namespace   https://github.com/jocoro19
// @author      JoCoRo19
// @version     1.0
// @description Redirect Twitter links to a Nitter instance
// @license     CCO
// @icon        https://nitter.net/apple-touch-icon.png
// @grant       none
// @match       *://twitter.com/*
// @match       *://www.twitter.com/*
// @match       *://mobile.twitter.com/*
// @homepageURL https://github.com/jocoro19/filter-lists
// @downloadURL https://raw.githubusercontent.com/jocoro19/filter-lists/main/scripts/nitter-redirect.user.js
// @updateURL   https://raw.githubusercontent.com/jocoro19/filter-lists/main/scripts/nitter-redirect.user.js
// ==/UserScript==

let nitterInstance = "nitter.net";
location.replace('https://' + nitterInstance + location.pathname + location.search)
