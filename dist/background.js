function linksToModal(links) {
    var modal = document.createElement("dialog");
    var linksList = document.createElement("ul");
    modal.appendChild(linksList);
    links.forEach(function (l) {
        var li = document.createElement("li");
        var a = document.createElement("a");
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
    var POPUPID = "bb-pdf-link-popup";
    // If the popup was made, make a new one (this is necessary when switch courses/pages)
    var existingModal = document.getElementById(POPUPID);
    if (existingModal != null) {
        existingModal.remove();
    }
    var previews = document.querySelectorAll("bb-file-preview iframe");
    var links = {};
    previews.forEach(function (p) {
        var cleaned = cleanURLS(p.src);
        links[cleaned] = cleaned;
    });
    var closed = document.querySelectorAll("bb-file-viewer .file-container");
    closed.forEach(function (c) {
        // console.log(c);
        var title = c.querySelector("button.file-name")
            .innerText;
        var file = c.querySelector(".file-preview a").getAttribute("data-ally-file-preview-url");
        // console.log(title, file);
        links[title] = file;
    });
    // const closedPreviews: NodeListOf<HTMLAnchorElement> =
    // 	document.querySelectorAll("bb-file-viewer .file-preview a");
    // const titles = document.querySelectorAll("bb-file-viewer .file-name");
    // closedPreviews.forEach((a) => {
    // 	a.que
    // 	links[]
    // });
    // Fast exit when no links
    if (!Object.keys(links).length) {
        return;
    }
    // if (!links.length) {
    // 	return;
    // }
    var modal = document.createElement("dialog");
    modal.id = POPUPID;
    var modalStyles = {
        borderRadius: "1em",
        padding: "1em",
        maxWidth: "50vw",
        maxHeight: "50vh",
        border: "0",
        boxShadow: "0px 0px 2px rgb(0 0 0 / 0.3)"
    };
    Object.keys(modalStyles).forEach(function (s) {
        modal.style[s] = modalStyles[s];
    });
    var linksList = document.createElement("ul");
    var linksListStyles = {
        paddingRight: "2em"
    };
    Object.keys(linksListStyles).forEach(function (s) {
        linksList.style[s] = linksListStyles[s];
    });
    modal.appendChild(linksList);
    for (var title in links) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = links[title];
        a.target = "_blank";
        a.innerText = title;
        a.style.marginInline = "0.5em";
        li.appendChild(a);
        linksList.appendChild(li);
    }
    var closeButton = document.createElement("button");
    closeButton.innerHTML = "&#215;";
    var closeButtonStyles = {
        borderRadius: "0.5em",
        position: "absolute",
        width: "2ch",
        height: "2ch",
        top: "0",
        right: "0",
        margin: "0.5em",
        fontSize: "1.5em"
    };
    Object.keys(closeButtonStyles).forEach(function (s) {
        closeButton.style[s] = closeButtonStyles[s];
    });
    closeButton.addEventListener("click", function () {
        modal.close();
    });
    modal.appendChild(closeButton);
    document.body.appendChild(modal);
    modal.showModal();
}
chrome.action.onClicked.addListener(function (tab) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: makeLinkModal
    });
});
