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
    var previews = document.querySelectorAll("bb-file-preview iframe");
    var links = [];
    previews.forEach(function (p) {
        links.push(cleanURLS(p.src));
    });
    var modal = document.createElement("dialog");
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
    // modal.style.borderRadius = "1em";
    // modal.style.padding = "1em";
    // modal.style.maxWidth = "50vw";
    // modal.style.maxHeight = "50vh";
    var linksList = document.createElement("ul");
    modal.appendChild(linksList);
    links.forEach(function (l) {
        var li = document.createElement("li");
        var a = document.createElement("a");
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
chrome.action.onClicked.addListener(function (tab) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: makeLinkModal
    });
});
