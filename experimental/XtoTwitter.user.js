// ==UserScript==
// @name          XtoTwitter
// @namespace     https://github.com/jocoro19
// @author        JoCoRo19
// @version       4.0
// @run-at        document-end
// @description   Replaces any mention of "X" with "Twitter"
// @icon          https://raw.githubusercontent.com/jocoro19/filter-lists/main/j.png
// @grant         none
// @match         http*://*/*
// ==/UserScript==

/* EXPERIMENTAL: USE AT YOUR OWN RISK!
 * This userscript will replace ALL mentions of "X" with "Twitter" and removes text like "Formerly known as Twitter".
 * There may be some issues with the script such as "Xbox Series X" being changed to "Xbox Series Twitter".
 */

const replace = /(?<!-)(?:\bX\b|"X"|'X'|\u{1D54F}|\u{1D569})(?!-)/gu // Regex that matches what to replace with "Twitter"
const remove = /(?: |, )?\bformerly(?: known as)? Twitter\b,?| ?\(formerly(?: known as)? Twitter\)|Twitter(?:\/(?=Twitter))/gi // Regex that matches what to completely remove from the page
const onlyX = /^(?:X|"X"|'X'|\u{1D54F}|\u{1D569})$/u // Regex that matches "X" with or without quotation marks if there's nothing else
const hostnames = /\b(?:twitter\.com|x\.com|t\.co)$/ // Hostnames for links to Twitter
const excludedElements = "script, iframe, svg, svg *, math, math *" // Elements not to be changed by the script
const altName = "" // Alternate name to be used in lieu of "Twitter" (leave empty to disable)

const twt = altName || "Twitter"
const elem = (document.querySelectorAll(`title, body *:not(${excludedElements})`))
xToTwitter(elem)
const observer = new MutationObserver(handleChanges)
const observerConfig = {
	childList: true,
	subtree: true,
	characterDataOldValue: true,
}
observer.observe(document.body, observerConfig)

// Main function
function xToTwitter(elements) {
	// Create an array containing the elements to change
	if (elements instanceof NodeList) {
		elements = Array.from(elements)
	}
	if (elements instanceof Array && elements.every(element => element instanceof Node)) {
		// Change element
		const elementsToChange = elements.filter(element => {
			if (element.nodeName === "TITLE") {
				return true // Include title elements in the list of elements to change
			} else if (!element.isContentEditable) {
				for (const node of element.childNodes) {
					if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
						return true // Only include elements with a text node directly under it
					}
				}
				return false
			}
		})
		elementsToChange.forEach(element => {
			const a = element.tagName === "A" ? element : element.closest("a")
			for (const node of element.childNodes) {
				if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
					// Iterate through non-empty text nodes inside the element
					if (!onlyX.test(node.textContent)) {
						if (replace.test(node.textContent)) {
							node.textContent = node.textContent.replace(replace, twt) // Replace nodes that contain "X" if it isn't the only content of the node
						}
					} else if (a && hostnames.test(a.hostname)) {
						node.textContent = node.textContent.replace(replace, twt) // Replace "X" in <a> elements or descendents of <a> elements linking to Twitter even if it's the only content in the element
					}
					if (remove.test(node.textContent)) {
						node.textContent = node.textContent.replace(remove, "") // Remove text
					}
				}
			}
		})
		// Titles
		elements.forEach(element => {
			const a = element.tagName === "A" ? element : element.closest("a")
			if (element.title) {
				if (!onlyX.test(element.title)) {
					element.title = element.title.replace(replace, twt)
				} else if (a && hostnames.test(a.hostname)) {
					element.title = element.title.replace(replace, twt)
				}
				if (remove.test(element.title)) {
					element.title = element.title.replace(remove, "")
				}
			}
		})
	}
}

// Function to be called when DOM changes occur
function handleChanges(mutationsList) {
	mutationsList.forEach(mutation => {
		// Check if new nodes have been added
		if (mutation.type === "childList") {
			mutation.addedNodes.forEach(node => {
				if (node.nodeType === Node.ELEMENT_NODE && !(node.matches(excludedElements))) {
					xToTwitter([node])
					if (node.childElementCount > 0) {
						const newElements = Array.from(node.querySelectorAll(`:scope, *:not(${excludedElements})`))
						xToTwitter(newElements)
					}
				} else if (node.nodeType === Node.TEXT_NODE) {
					if (!onlyX.test(node.textContent)) {
						replace.test(node.textContent) && console.log(node)
						node.textContent = node.textContent.replace(replace, twt)
					}
					node.textContent = node.textContent.replace(remove, "")
				}
			})
		}
	})
}
