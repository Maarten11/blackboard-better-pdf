document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("get-links").addEventListener("click", () => {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { message: "get-pdfs" });
		});
	});
});
