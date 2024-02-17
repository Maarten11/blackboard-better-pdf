// const article = document.querySelector("article");
// // `document.querySelector` may return null if the selector doesn't match anything.
// if (article) {
// 	const text = article.textContent;
// 	const wordMatchRegExp = /[^\s]+/g; // Regular expression
// 	const words = text.matchAll(wordMatchRegExp);
// 	// matchAll returns an iterator, convert to array to get word count
// 	const wordCount = [...words].length;
// 	const readingTime = Math.round(wordCount / 200);
// 	const badge = document.createElement("p");
// 	// Use the same styling as the publish information in an article's header
// 	badge.classList.add("color-secondary-text", "type--caption");
// 	badge.textContent = `⏱️ ${readingTime} min read`;
// 	// Support for API reference docs
// 	const heading = article.querySelector("h1");
// 	// Support for article docs with date
// 	const date = article.querySelector("time")?.parentNode;
// 	(date ?? heading).insertAdjacentElement("afterend", badge);
// }
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
    return true;
});
function returnIFrameChild(element) {
    if (!element.hasChildNodes)
        return null;
    var queue = Array.from(element.children);
    queue.forEach(function (child) {
        console.log(child, child.tagName);
        if (child.tagName === "IFRAME") {
            return child;
        }
        else {
            if (child.hasChildNodes()) {
                Array.from(child.children).forEach(function (c) { return queue.push(c); });
            }
        }
    });
    return null;
}
var previews = document.querySelectorAll("bb-file-preview");
if (!!previews.length) {
    previews.forEach(function (p) {
        p.style.color = "red";
    });
    // const list = document.createElement("ul");
    // previews.forEach((p) => {
    // 	p.style.color = "red !important";
    // 	const iFrame = returnIFrameChild(p);
    // 	if (!iFrame) return;
    // 	const item = document.createElement("li");
    // 	item.innerText = iFrame.getAttribute("src")!;
    // 	list.appendChild(item);
    // });
    // previews[0].parentNode!.insertBefore(previews[0], list);
}
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        previews.forEach(function (p) {
            p.style.color = "blue";
        });
    }
};
