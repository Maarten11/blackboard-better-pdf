document.addEventListener("DOMContentLoaded", () => {
	getIFrameLinks();
});

function getIFrameLinks() {
	const previews: NodeListOf<HTMLElement> = document.querySelectorAll(
		// "bb-file-preview iframe body"
		"h1"
	);
	// const links = [];
	previews.forEach((p) => {
		// links.push(cleanURLS(p.src));
		p.style.backgroundColor = "red";
	});

	// return links;
}
