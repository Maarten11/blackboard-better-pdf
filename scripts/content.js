chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.message === "get-pdfs") {
		const previews = document.querySelectorAll("bb-file-preview");
		console.log(previews);
		document.body.style.backgroundColor = "blue";
	}
});
