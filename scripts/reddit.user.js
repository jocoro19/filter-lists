 // ==UserScript==
// @name          JHS Reddit Fixes
// @namespace     https://github.com/jocoro19
// @author        JoCoRo19
// @version       1.3
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
const autoNsfw = false // Automatically show NSFW posts (Works best for browsing in private tabs)
const autoOpenImg = true // Automatically expand images and videos in posts

if (autoNsfw && !(document.cookie.includes("over18"))) {
	document.cookie = "over18=1;domain=.reddit.com"
	location.reload()
}

if (autoOpenImg && location.hostname === "old.reddit.com") {
	window.onload = () => {
		document.querySelectorAll(".expando-button.video.collapsed").forEach(element => element.click())
	}
}

if (location.hostname !== "old.reddit.com" && location.pathname !== "/media") {
	document.title = "reddit: the front page of the internet" // Set title to old default title before redirect is finished
	location.hostname = "old.reddit.com" // Redirect to Old Reddit if URL is not for a media page
}

if (location.hostname !== "old.reddit.com" && location.pathname === "/media") {
	window.stop() // Stop Reddit page from loading so that a custom one can be created
	document.title = ""
	const rootElement = document.documentElement
	if (document.head === null) {
		rootElement.appendChild(document.createElement("head")) // Add head if there isn't a head element
	}
	if (document.body === null) {
		rootElement.appendChild(document.createElement("body")) // Add body if there isn't a body element
	}
	rootElement.removeAttribute("class") // Remove classes from HTML element to prevent breakage
	document.body.innerHTML = "" // Delete everything in the body for now
	document.head.innerHTML = `<style>
		body { margin: 0 }
		.overlay { position: fixed; inset: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; margin: 0; overflow: auto; }
		img.no-zoom { max-height: 100vh; max-width: 100vw; object-fit: contain; margin: 0 auto; }
		img.zoomed-out { max-height: 100vh; max-width: 100vw; object-fit: contain; margin: 0 auto; cursor: zoom-in; }
		img.zoomed-in { margin: auto !important; position: absolute; cursor: zoom-out; }
		img.zoomed-in.overflow-x { left: 0; }
		img.zoomed-in.overflow-y { top: 0; }
	</style><meta name="viewport" content="width=device-width, initial-scale=1.0">`
	const urlParams = new URLSearchParams(window.location.search)
	const url = urlParams.get("url")
	const filename = url.match(/[^/]+$/)[0]
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
