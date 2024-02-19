document.addEventListener("DOMContentLoaded", function () {
    getIFrameLinks();
});
function getIFrameLinks() {
    var previews = document.querySelectorAll(
    // "bb-file-preview iframe body"
    "h1");
    // const links = [];
    previews.forEach(function (p) {
        // links.push(cleanURLS(p.src));
        p.style.backgroundColor = "red";
    });
    // return links;
}
function cleanURLS(url) {
    return url.replace("&isInlineRender=true&xythos-download=true&render=inline", "");
}
