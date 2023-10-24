// ==UserScript==
// @name          JHS X-iter
// @namespace     https://github.com/jocoro19
// @author        JoCoRo19
// @version       1.2
// @run-at        document-start
// @description   X-it Twitter
// @grant         none
// @match         https://twitter.com/*
// @match         https://x.com/*
// @match         https://nitter.*/*
// ==/UserScript==

const nitter1 = "nitter.net" // Primary instance (default is nitter.net, the official instance)
const nitter2 = "nitter.privacydev.net" // Secondary instance (default is nitter.privacydev.net, which has support for NSFW tweets)
const redirectLink = true // Replace Twitter link in upper right corner with a link to switch between instances
const code1 = "N" // Code for the primary instance
const code2 = "P" // Code for the secondary instance

// Redirect Twitter/"X" to nitter instance 1
const twitterUrls = /^(?:www\.|mobile\.)?(?:twitter|x)\.com$/
if (location.hostname.match(twitterUrls)) {
	const url = new URL(location.href)
	url.hostname = nitter1
	location.replace(url.href)
}

// Change the link to Twitter to a link to switch between instances
if (redirectLink) {
	window.onload = () => {
		const link = document.querySelector(".icon-bird")
		if (link !== null && location.hostname === nitter1) {
			document.head.insertAdjacentHTML("beforeend", `<style>.icon-bird::before { content: "${code2}"; font-weight: bold; }</style>`)
			link.title = "Open in nitter.privacydev.net"
			link.href = location.href.replace(nitter1, nitter2)
		}
		if (link !== null && location.hostname === nitter2) {
			document.head.insertAdjacentHTML("beforeend", `<style>.icon-bird::before { content: "${code1}"; font-weight: bold; }</style>`)
			link.title = "Open in nitter.net"
			link.href = location.href.replace(nitter2, nitter1)
		}
	}
}
