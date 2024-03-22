// ==UserScript==
// @name          XtoTwitter
// @namespace     https://github.com/jocoro19
// @author        JoCoRo19
// @version       3.0
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

const replace = /(?<!-|<[^>]*)(?:\bX\b|"X"|'X')(?![^<]*>|-)/g // Regex that matches what to replace with "Twitter"
const remove = /(?: |, )?\bformerly(?: known as)? Twitter\b,?| ?\(formerly(?: known as)? Twitter\)|Twitter\/(?=Twitter)/gi // Regex that matches what to completely remove from the page
const onlyX = /^(?:X|"X"|'X')$/ // Regex that matches "X" with or without quotation marks if there's nothing else
const excludedElements = "script, iframe, svg, svg *, math, math *"//, .CodeMirror *" // Elements to not be changed by the script
const altName = "EKKUSU" // Alternate name to be used in lieu of "Twitter"

const twt = altName || "Twitter"
const elements = (document.querySelectorAll(`title, body *:not(${excludedElements})`))
xToTwitter(elements)
const observer = new MutationObserver(handleChanges)
const observerConfig = {
	childList: true,
	subtree: true,
}
observer.observe(document.body, observerConfig)

function xToTwitter(elements) {
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
						return true // Only include elements with a text node directly under it
					}
				}
				return false
			}
		})
		elementsToChange.forEach(element => {
			if (!(/<\/.*>/.test(element.innerHTML))) {
				// Replace and remove text for elements that don't have text nodes mixed with non-void elements
				const a = element.tagName === "A" ? element : element.closest("a")
				if (!onlyX.test(element.innerHTML)) {
					if (replace.test(element.innerHTML)) {
						element.innerHTML = element.innerHTML.replace(replace, twt) // Replace "X" in elements if it isn't the only content in the element
					}
				} else if (a && /(?:twitter|x)\.com\//.test(a.href)) {
					if (replace.test(element.innerHTML)) {
						element.innerHTML = element.innerHTML.replace(replace, twt) // Replace "X" in <A> elements or descendents of <A> elements if it's the only content in the element
					}
				}
				if (remove.test(element.innerHTML)) {
					element.innerHTML = element.innerHTML.replace(remove, "")
				}
			} else {
				for (const node of element.childNodes) {
					if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
						// Iterate through non-empty text nodes
						if (!onlyX.test(node.textContent)) {
							node.textContent = node.textContent.replace(replace, twt)
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
				if (node.nodeType === Node.ELEMENT_NODE && !(node.matches(excludedElements))) {
					xToTwitter([node])
					if (node.childElementCount > 0) {
						const newElements = Array.from(node.querySelectorAll(":scope, *:not(script, iframe, svg, svg *, math, math *)"))
						xToTwitter(newElements)
					}
				} else if (node.nodeType === Node.TEXT_NODE) {
					if (!onlyX.test(node.textContent)) {
						node.textContent = node.textContent.replace(replace, twt)
					}
					node.textContent = node.textContent.replace(remove, "")
				}
			})
		}
	})
}
