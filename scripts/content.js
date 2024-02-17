chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === "get-pdfs") {
		const previews = document.querySelectorAll("bb-file-preview iframe");
		const links = [];
		previews.forEach((p) => {
			links.push(cleanURLS(p.src));
		});
		console.log({ links: links });
		sendResponse({ links: links });
		document.body.style.backgroundColor = "blue";
		return true;
	}
});

function cleanURLS(url) {
	return url.replace(
		"&isInlineRender=true&xythos-download=true&render=inline",
		""
	);
}
