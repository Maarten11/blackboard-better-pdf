chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("message", request);
    if (request.action === "get-pdfs") {
        var links = getIFrameLinks();
        console.log({ links: links });
        //@ts-ignore
        sendResponse({ links: links });
        document.body.style.backgroundColor = "blue";
        return true;
    }
});
function getIFrameLinks() {
    var previews = document.querySelectorAll("bb-file-preview iframe");
    var links = [];
    previews.forEach(function (p) {
        links.push(cleanURLS(p.src));
    });
    return links;
}
function cleanURLS(url) {
    return url.replace("&isInlineRender=true&xythos-download=true&render=inline", "");
}
