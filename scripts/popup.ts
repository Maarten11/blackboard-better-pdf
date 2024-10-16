document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("get-links").addEventListener("click", () => {
		chrome.tabs.query(
			{ currentWindow: true, active: true },
			async function (tabs) {
				const response = await chrome.tabs.sendMessage(tabs[0].id, {
					action: "get-pdfs",
				});
				console.log(response);
				insertLinks(response.links);
			}
		);
	});
});

function insertLinks(links: Array<string>) {
	const linksList = document.querySelector("ul.links");
	links.forEach((l) => {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.href = l;
		a.target = "_blank";
		a.innerText = l;
		li.appendChild(a);
		linksList.appendChild(li);
	});
}
