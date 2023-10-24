 // ==UserScript==
// @name          JHS Reddit Fixes
// @namespace     https://github.com/jocoro19
// @author        JoCoRo19
// @version       1.4.1
// @run-at        document-start
// @description   Redirects all Reddit links to Old Reddit and fixes image links by using a custom image viewer
// @grant         none
// @match         https://www.reddit.com/*
// @match         https://old.reddit.com/*
// @match         https://new.reddit.com/*
// @match         https://sh.reddit.com/*
// @exclude-match https://www.reddit.com/poll/*
// @exclude-match https://www.reddit.com/gallery/*
// ==/UserScript==

// Config
const redirect = true // Redirect Reddit links to old.reddit.com
const autoNsfw = false // Automatically show NSFW posts (Works best for browsing in private tabs)
const autoExpandImg = false // Automatically expand images and videos in posts

// Redirect Reddit links to old.reddit.com
if (redirect && location.hostname !== "old.reddit.com" && location.pathname !== "/media") {
	document.title = "reddit: the front page of the internet" // Set title to old default title until redirect is finished
	window.stop() // Stop current page from loading until redirect is finished
	const url = new URL(location.href)
	url.hostname = "old.reddit.com"
	location.replace(url.href) // Redirect to Old Reddit if URL is not for a media page
}

// Automatically show NSFW posts (Works best for browsing in private tabs)
if (autoNsfw && !(document.cookie.includes("over18"))) {
	document.cookie = "over18=1;domain=.reddit.com"
	location.reload()
}

// Automatically expand images and videos in posts
if (autoExpandImg && location.hostname === "old.reddit.com") {
	window.onload = () => {
		document.querySelectorAll(".expando-button.video.collapsed").forEach(element => element.click())
	}
}

// Replace Reddit image viewer with something more akin to the browser image viewer
if (location.hostname !== "old.reddit.com" && location.pathname === "/media") {
	document.title = ""
	window.stop() // Stop Reddit page from loading any further
	const rootElement = document.documentElement
	if (document.head === null) {
		rootElement.appendChild(document.createElement("head")) // Add head if there isn't a head element
	}
	if (document.body === null) {
		rootElement.appendChild(document.createElement("body")) // Add body if there isn't a body element
	}
	rootElement.removeAttribute("class") // Remove classes from <HTML element to prevent breakage
	rootElement.querySelectorAll('head > :not(title)').forEach(element => element.remove())
	document.body.innerHTML = "" // Delete everything in the body for now
	const urlParams = new URLSearchParams(window.location.search)
	const url = urlParams.get("url")
	const filename = url.match(/[^/]+$/)[0]
	if (/^https:?\/\/preview\.redd\.it/.test(url)) {
		// Check if image URL is preview.redd.it and if so, replace with i.redd.it
		const realFilename = /^[^\?]+/.exec(filename)[0]
		const realUrl = encodeURIComponent(`https://i.redd.it/${realFilename}`)
		location.replace(`https://www.reddit.com/media?url=${realUrl}`)
		return
	}
	document.head.insertAdjacentHTML("beforeend", `<style>
		body { margin: 0 }
		.overlay { position: fixed; inset: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; margin: 0; overflow: auto; }
		img.no-zoom { max-height: 100vh; max-width: 100vw; object-fit: contain; margin: 0 auto; }
		img.zoomed-out { max-height: 100vh; max-width: 100vw; object-fit: contain; margin: 0 auto; cursor: zoom-in; }
		img.zoomed-in { margin: auto !important; position: absolute; cursor: zoom-out; }
		img.zoomed-in.overflow-x { left: 0; }
		img.zoomed-in.overflow-y { top: 0; }
	</style><meta name="viewport" content="width=device-width, initial-scale=1.0">`)
	if (url !== null) {
		const loadImage = new Image()
		loadImage.src = url
		if (!loadImage.complete) {
			loadImage.onload = imgViewer // Wait for image to load if not loaded yet
		} else {
			imgViewer()
		}
	}
	if (document.querySelector("head:empty") !== null) {
		document.querySelector("head:empty").remove() // Remove an extra empty head element if there is one
	}
	function imgViewer() {
		document.body.outerHTML = `<body><div class="overlay"><img src="${url}"></div></body>`
		const overlay = document.querySelector(".overlay")
		const img = document.querySelector(".overlay > img")
		document.title = `${filename} (${img.clientWidth}×${img.clientHeight})`
		const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)
		if (!isMobile) {
			// Check if image is larger than the viewport if not on a mobile device
			let overflowX = img.clientWidth > overlay.clientWidth
			let overflowY = img.clientHeight > overlay.clientHeight
			if (overflowX || overflowY) {
				img.className = "zoomed-out"
				img.addEventListener("click", zoomIn)
			} else {
				img.className = "no-zoom"
			}
			function zoomIn(event) {
				// Get the location of the mouse click as a percentage of the height/width of the image before it's zoomed in
				const rect = img.getBoundingClientRect()
				let offsetX = (event.clientX - rect.left) / img.clientWidth
				let offsetY = (event.clientY - rect.top) / img.clientHeight
				img.className = "zoomed-in"
				if (overflowX) { img.classList.add("overflow-x") }
				if (overflowY) { img.classList.add("overflow-y") }
				// Calculate the location to scroll to using the location of the mouse click
				let scrollX = img.clientWidth * offsetX - overlay.clientWidth / 2
				let scrollY = img.clientHeight * offsetY - overlay.clientHeight / 2
				img.parentNode.scroll(scrollX, scrollY)
				img.removeEventListener("click", zoomIn)
				img.addEventListener("click", zoomOut)
			}
			function zoomOut() {
				img.className = "zoomed-out"
				img.removeEventListener("click", zoomOut)
				img.addEventListener("click", zoomIn)
			}
		} else {
			img.className = "no-zoom"
		}
	}
}
