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
	const links = [];
	previews.forEach((p) => {
		links.push(cleanURLS(p.src));
	});

	const closedPreviews: NodeListOf<HTMLAnchorElement> =
		document.querySelectorAll("bb-file-viewer .file-preview a");
	closedPreviews.forEach((a) => {
		links.push(a.getAttribute("data-ally-file-preview-url"));
	});

	// Fast exit when no links
	if (!links.length) {
		return;
	}

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
