// ==UserScript==
// @name          JHS Reddit fixes (Userscript)
// @namespace     https://github.com/jocoro19
// @author        JoCoRo19
// @version       1.0
// @run-at        document-start
// @description   Redirects all Reddit links to Old Reddit and fixes image links by using a custom image viewer
// @grant         none
// @match         https://www.reddit.com/*
// @match         https://new.reddit.com/*
// @match         https://sh.reddit.com/*
// @exclude-match https://www.reddit.com/poll/*
// @exclude-match https://www.reddit.com/gallery/*
// ==/UserScript==

window.stop() // Stop Reddit page from loading
if (location.pathname !== "/media") {
	location.hostname = "old.reddit.com" // Redirect to Old Reddit if URL is not for a media page
} else {
	// Replace Reddit media viewer with a custom one
	if (document.head === null) {
		document.documentElement.appendChild(document.createElement("head")) // Add head if there isn't a head element
	}
	if (document.body === null) {
		document.documentElement.appendChild(document.createElement("body")) // Add body if there isn't a body element
	}
	document.body.innerHTML = '' // Delete everything in the body for now
	const urlParams = new URLSearchParams(window.location.search)
	const url = urlParams.get("url")
	const filename = url.match(/[^/]+$/)[0]
	document.title = filename
	document.head.innerHTML = `<style>
		body { margin: 0 }
		.overlay { position: fixed; inset: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; margin: 0; overflow: auto; }
		img.no-zoom { max-height: 100vh; max-width: 100vw; object-fit: contain; margin: 0 auto; }
		img.zoomed-out { max-height: 100vh; max-width: 100vw; object-fit: contain; margin: 0 auto; cursor: zoom-in; }
		img.zoomed-in { margin: auto !important; position: absolute; cursor: zoom-out; }
		img.zoomed-in.overflow-x { left: 0; }
		img.zoomed-in.overflow-y { top: 0; }
	</style>`
	if (url !== null) {``
		const loadImage = new Image()
		loadImage.src = url
		if (!loadImage.complete) {
			loadImage.onload = imgViewer // Wait for image to load if not loaded yet
		} else {
			imgViewer()
		}
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
				// Get the location of the mouse click as a percentage of the height/width of the image
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
		}
	}
}
