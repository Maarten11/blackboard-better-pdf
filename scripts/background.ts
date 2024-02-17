chrome.runtime.onInstalled.addListener(() => {
	chrome.action.setBadgeText({
		text: "OFF",
	});
});

const extensions = "https://developer.chrome.com/docs/extensions";
const webstore = "https://developer.chrome.com/docs/webstore";
const blackboard = "https://lms.uantwerpen.be/ultra";

function getAllPDFs() {
	// const previews: NodeListOf<HTMLElement> =
	// 	document.querySelectorAll("bb-file-preview");

	const previews: Array<HTMLElement> = Array.from(
		document.querySelectorAll("h1")
	);

	if (!previews.length) {
		previews.forEach((p) => {
			p.style.background = "red";
		});
	}
}

chrome.action.onClicked.addListener(async (tab) => {
	// Url guard
	if (
		tab.url!.startsWith(extensions) ||
		tab.url!.startsWith(webstore) ||
		tab.url!.startsWith(blackboard)
	) {
		const text = await chrome.action.getBadgeText({ tabId: tab.id! });
		await chrome.action.setBadgeText({
			text: text === "ON" ? "OFF" : "ON",
		});
		chrome.scripting.executeScript({
			target: { tabId: tab.id! },
			func: getAllPDFs,
		});

		// if (nextState === "ON") {
		// 	// Insert the CSS file when the user turns the extension on
		// 	await chrome.scripting.insertCSS({
		// 		files: ["focus-mode.css"],
		// 		target: { tabId: tab.id },
		// 	});
		// } else if (nextState === "OFF") {
		// 	// Remove the CSS file when the user turns the extension off
		// 	await chrome.scripting.removeCSS({
		// 		files: ["focus-mode.css"],
		// 		target: { tabId: tab.id },
		// 	});
		// }
	}
});
