chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log("message", request);
	if (request.action === "get-pdfs") {
		const links = getIFrameLinks();
		console.log({ links: links });
		//@ts-ignore
		sendResponse({ links: links });
		document.body.style.backgroundColor = "blue";
		return true;
	}
});

function getIFrameLinks() {
	const previews: NodeListOf<HTMLIFrameElement> = document.querySelectorAll(
		"bb-file-preview iframe"
	);
	const links = [];
	previews.forEach((p) => {
		links.push(cleanURLS(p.src));
	});

	return links;
}

function cleanURLS(url) {
	return url.replace(
		"&isInlineRender=true&xythos-download=true&render=inline",
		""
	);
}
