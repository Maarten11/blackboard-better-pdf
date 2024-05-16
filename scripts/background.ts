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
	const cleanURLS = (url: string) => {
		return url.replace(
			"&isInlineRender=true&xythos-download=true&render=inline",
			""
		);
	};
	const POPUPID = "bb-pdf-link-popup";

	// If the popup was made, make a new one (this is necessary when switch courses/pages)
	const existingModal = document.getElementById(
		POPUPID
	) as HTMLDialogElement | null;
	if (existingModal != null) {
		existingModal.remove();
	}
	const previews: NodeListOf<HTMLIFrameElement> = document.querySelectorAll(
		"bb-file-preview iframe"
	);
	const links: Record<string, string> = {};
	previews.forEach((p) => {
		const cleaned = cleanURLS(p.src);
		links[cleaned] = cleaned;
	});

	const closed: NodeListOf<HTMLDivElement> = document.querySelectorAll(
		"bb-file-viewer .file-container:not(:has(video))"
	);
	closed.forEach((c) => {
		// console.log(c);
		const title = (c.querySelector(".file-name") as HTMLButtonElement)
			.innerText;
		const file = (
			c.querySelector(".file-preview a") as HTMLAnchorElement
		).getAttribute("data-ally-file-preview-url");
		// console.log(title, file);
		links[title] = file;
	});
	const videos: NodeListOf<HTMLDivElement> = document.querySelectorAll(
		"bb-file-viewer .file-container video"
	);
	videos.forEach((v, i) => {
		const title = `Video ${i + 1}`;
		const file = v.getAttribute("src");
		links[title] = file;
	});
	// const closedPreviews: NodeListOf<HTMLAnchorElement> =
	// 	document.querySelectorAll("bb-file-viewer .file-preview a");
	// const titles = document.querySelectorAll("bb-file-viewer .file-name");
	// closedPreviews.forEach((a) => {
	// 	a.que
	// 	links[]
	// });
	const otherFiles: NodeListOf<HTMLDivElement> = document.querySelectorAll(
		"bb-rich-text-editor div[data-bbtype='attachment']"
	);
	console.log(otherFiles);
	otherFiles.forEach((v) => {
		const title: string = v.querySelector(
			".bb-editor-file-viewer div[title$='File'] span"
		).textContent;
		const file = v.getAttribute("href");
		links[title] = file;
	});

	// Fast exit when no links
	if (!Object.keys(links).length) {
		return;
	}
	// if (!links.length) {
	// 	return;
	// }

	const modal = document.createElement("dialog");

	modal.id = POPUPID;

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

	const linksList = document.createElement("ul");
	const linksListStyles = {
		paddingRight: "2em",
	};
	Object.keys(linksListStyles).forEach((s) => {
		linksList.style[s] = linksListStyles[s];
	});
	modal.appendChild(linksList);

	for (const title in links) {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.href = links[title];
		a.target = "_blank";
		a.innerText = title;
		a.style.marginInline = "0.5em";
		li.appendChild(a);
		linksList.appendChild(li);
	}

	const closeButton = document.createElement("button");
	closeButton.innerHTML = `&#215;`;
	const closeButtonStyles = {
		borderRadius: "0.5em",
		position: "absolute",
		width: "2ch",
		height: "2ch",
		top: "0",
		right: "0",
		margin: "0.5em",
		fontSize: "1.5em",
	};
	Object.keys(closeButtonStyles).forEach((s) => {
		closeButton.style[s] = closeButtonStyles[s];
	});
	closeButton.addEventListener("click", () => {
		modal.close();
	});

	modal.appendChild(closeButton);

	document.body.appendChild(modal);

	modal.showModal();
}

chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: makeLinkModal,
	});
});
