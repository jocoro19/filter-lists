// ==UserScript==
// @name          XtoTwitter
// @namespace     https://github.com/jocoro19
// @author        JoCoRo19
// @version       1.0
// @run-at        document-start
// @description   Replaces ALL mentions of "X" with "Twitter" on almost all websites
// @grant         none
// @match         http*://*/*
// @exclude-match https://developer.mozilla.org/*
// @exclude-match https://*.wikipedia.org/*
// ==/UserScript==

document.addEventListener("DOMContentLoaded", () => {
	const elements = (document.querySelectorAll("title, body *"))
	xToTwitter(elements)
	observer.observe(document.body, observerConfig)
})
function xToTwitter(elements) {
	const replace = /(?<!-|<[^>]*)(?:\bX\b|"X"|'X')(?![^<]*>|-)/g // Regex that matches what to replace with "Twitter"
	const remove = / ?\bFormerly(?: known as)? Twitter\b| ?\(Formerly(?: known as)? Twitter\)/gi // Regex that matches what to completely remove from the page
	// Create an array containing the elements to change
	if (elements instanceof NodeList) {
		elements = Array.from(elements)
	}
	if (elements instanceof Array && elements.every(element => element instanceof Node)) {
		const elementsToChange = elements.filter(element => {
			if (element.nodeName === "TITLE") {
				return true // Include title elements in the list of elements to change
			} else if (getComputedStyle(element).display === "none") {
				return false
			} else {
				for (const node of element.childNodes) {
					if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
						return true
					}
				}
				return false
			}
		})
		elementsToChange.forEach(element => {
			element.innerHTML = element.innerHTML.replace(replace, "Twitter")
			element.innerHTML = element.innerHTML.replace(remove, "")
		})
	}
}

// Function to be called when DOM changes occur
function handleChanges(mutationsList) {
	mutationsList.forEach(mutation => {
		// Check if new nodes have been added
		if (mutation.type === "childList") {
			mutation.addedNodes.forEach(node => {
				if (node.nodeType === Node.ELEMENT_NODE) {
					let elements
					if (node.children.length > 0) {
						elements = node.querySelectorAll("*")
					} else {
						elements = [node]
					}
					console.log(elements)
					xToTwitter(elements)
				}
			})
		}
	})
}

const observer = new MutationObserver(handleChanges)
const observerConfig = {
	childList: true,
	subtree: true,
}
