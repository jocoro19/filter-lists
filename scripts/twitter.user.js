// ==UserScript==
// @name        JHS X-iter
// @namespace   https://github.com/jocoro19
// @author      JoCoRo19
// @version     1.0
// @run-at      document-start
// @description Redirects all Twitter/"X" links to nitter.net and adds a wey to switch to nitter.privacydev.net
// @grant       none
// @match       https://twitter.com/*
// @match       https://x.com/*
// @match       https://nitter.net/*
// @match       https://nitter.privacydev.net/*
// ==/UserScript==

const nitter = "nitter.net" // Official, primary instance
const privacydev = "nitter.privacydev.net" // Secondary instance which shows NSFW tweets
  
// Redirect Twitter/"X" to nitter.net
const twitterUrls = /^(?:www\.|mobile\.)?(?:twitter|x)\.com$/
if (location.hostname.match(twitterUrls)) {
	location.hostname = nitter
}

// Change the link to Twitter to a link to switch between instances
window.onload = () => {
	const link = document.querySelector(".icon-bird")
	if (link !== null && location.hostname === nitter) {
		document.head.insertAdjacentHTML("beforeend", '<style>.icon-bird::before { content: "P"; font-weight: bold; }</style>')
		link.title = "Open in nitter.privacydev.net"
		link.href = location.href.replace(/^https:\/\/nitter\.net\//, "https://nitter.privacydev.net/")
	}
	if (link !== null && location.hostname === privacydev) {
		document.head.insertAdjacentHTML("beforeend", '<style>.icon-bird::before { content: "N"; font-weight: bold; }</style>')
		link.title = "Open in nitter.net"
		link.href = location.href.replace(/^https:\/\/nitter\.privacydev\.net\//, "https://nitter.net/")
	}
}
