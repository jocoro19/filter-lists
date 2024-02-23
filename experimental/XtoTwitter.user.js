// ==UserScript==
// @name          XtoTwitter
// @namespace     https://github.com/jocoro19
// @author        JoCoRo19
// @version       2.1
// @run-at        document-start
// @description   Replaces many mentions of "X" with "Twitter" on many websites
// @icon          https://raw.githubusercontent.com/jocoro19/filter-lists/main/j.png
// @grant         none
// @match         http*://*/*
// ==/UserScript==

/* EXPERIMENTAL: USE AT YOUR OWN RISK!
 * This userscript will replace all mentions "X" with "Twitter" and removes text like "Formerly known as Twitter".
 * There may be some issues with the script such as "Xbox Series X" being changed to "Xbox Series Twitter".
 */

document.addEventListener("DOMContentLoaded", () => {
	const elements = (document.querySelectorAll("title, body *:not(script, iframe, svg, svg *, math, math *)"))
	xToTwitter(elements)
	if (document.body !== null) {
		observer.observe(document.body, observerConfig)
	}
})
function xToTwitter(elements) {
	const replace = /(?<!-|<[^>]*)(?:\bX\b|"X"|'X')(?![^<]*>|-)/g // Regex that matches what to replace with "Twitter"
	const remove = /(?: |, )?\bformerly(?: known as)? Twitter\b,?| ?\(formerly(?: known as)? Twitter\)/gi // Regex that matches what to completely remove from the page
	// Create an array containing the elements to change
	if (elements instanceof NodeList) {
		elements = Array.from(elements)
	}
	if (elements instanceof Array && elements.every(element => element instanceof Node)) {
		const elementsToChange = elements.filter(element => {
			if (element.nodeName === "TITLE") {
				return true // Include title elements in the list of elements to change
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
			if (!(/<\/.*>/.test(element.innerHTML))) {
				// Replace and remove text for elements that don't have nested non-void elements like <a> but not <br>
				if (!(/^(?:X|"X"|'X')$/.test(element.innerHTML))) {
					element.innerHTML = element.innerHTML.replace(replace, "Twitter") // Replace X with Twitter according to the regex if X isn't the only content
				}
				element.innerHTML = element.innerHTML.replace(remove, "")
			} else {
				for (const node of element.childNodes) {
					if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
						if (!(/^(?:X|"X"|'X')$/.test(node.textContent))) {
							node.textContent = node.textContent.replace(replace, "Twitter")
						}
						node.textContent = node.textContent.replace(remove, "")
					}
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
				if (node.nodeType === Node.ELEMENT_NODE && !(node.matches("script, iframe, svg, svg *, math, math *"))) {
					let elements
					if (node.children.length > 0) {
						elements = Array.from(node.querySelectorAll("*:not(script, iframe, svg, svg *, math, math *)"))
					} else {
						elements = [node]
					}
					xToTwitter([node])
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
