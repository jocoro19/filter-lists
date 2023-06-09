// ==UserScript==
// @name        Old Reddit Redirect
// @namespace   https://github.com/jocoro19
// @author      JoCoRo19
// @version     1.0
// @description Redirect all reddit links to Old Reddit
// @license     CCO
// @icon        https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-180x180.png
// @grant       none
// @match       *://reddit.com/*
// @match       *://www.reddit.com/*
// @homepageURL https://github.com/jocoro19/filter-lists
// ==/UserScript==

if(location.href.indexOf('www.reddit.com/poll/') != -1 || location.href.indexOf('www.reddit.com/gallery/') != -1) {
	void 0
} else {
	location.replace('https://old.reddit.com' + location.pathname + location.search)
}
