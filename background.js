// Regex-pattern to check URLs against. 
// It matches URLs like: http[s]://[...]stackoverflow.com[...]
var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?baidu\.com/;

// A function to use as callback
function doStuffWithDom(domContent) {
//	console.log('I received the following DOM content:\n' + domContent);
//alert(domContent);
chrome.tabs.executeScript(null,
//      {code:"document.querySelector('#s_lg_img').src = 'https://p.ssl.qhimg.com/t0116dc2aba5828892b.png'", runAt:"document_start"});

      {code:"document.getElementById('s_lg_img').src = 'https://p.ssl.qhimg.com/t0116dc2aba5828892b.png'", runAt:"document_start"});
//      {code:"document.getElementById('s_lg_img').src = 'google.jpg'", runAt:"document_start"});
}

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	if (changeInfo.status == 'loading') {
// When the browser-action button is clicked...
//chrome.browserAction.onClicked.addListener(function (tab) {
    // ...check the URL of the active tab against our pattern and...
    if (urlRegex.test(tab.url)) {
        // ...if it matches, send a message specifying a callback too
        chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
    }
}
});
