function linksToModal(links: Array<string>) {
	const modal = document.createElement("dialog");

	const linksList = document.createElement("ul");
	modal.appendChild(linksList);

	links.forEach((l) => {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.href = l;
		a.target = "_blank";
		a.innerText = l;
		li.appendChild(a);
		linksList.appendChild(li);
	});

	document.body.appendChild(modal);

	modal.showModal();
}

function makeLinkModal() {
	const previews: NodeListOf<HTMLIFrameElement> = document.querySelectorAll(
		"bb-file-preview iframe"
	);
	const links = [];
	previews.forEach((p) => {
		links.push(cleanURLS(p.src));
	});

	const modal = document.createElement("dialog");

	const modalStyles = {
		borderRadius: "1em",
		padding: "1em",
		maxWidth: "50vw",
		maxHeight: "50vh",
		border: "0",
		boxShadow: "0px 0px 2px rgb(0 0 0 / 0.3)",
	};

	Object.keys(modalStyles).forEach((s) => {
		modal.style[s] = modalStyles[s];
	});

	// modal.style.borderRadius = "1em";
	// modal.style.padding = "1em";
	// modal.style.maxWidth = "50vw";
	// modal.style.maxHeight = "50vh";

	const linksList = document.createElement("ul");
	modal.appendChild(linksList);

	links.forEach((l) => {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.href = l;
		a.target = "_blank";
		a.innerText = l;
		a.style.marginInline = "0.5em";
		li.appendChild(a);
		linksList.appendChild(li);
	});

	document.body.appendChild(modal);

	modal.showModal();
}

chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: makeLinkModal,
	});
});
