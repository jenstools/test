```javascript
let comments = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'LOAD_COMMENTS') {
    let url = request.url;
    if (comments[url]) {
      sendResponse({comments: comments[url]});
    } else {
      sendResponse({comments: []});
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'SAVE_COMMENT') {
    let url = request.url;
    let comment = request.comment;
    if (!comments[url]) {
      comments[url] = [];
    }
    comments[url].push(comment);
    chrome.storage.sync.set({comments: comments}, () => {
      sendResponse({status: 'Comment saved'});
    });
  }
  return true;
});

chrome.storage.sync.get('comments', (data) => {
  if (data.comments) {
    comments = data.comments;
  }
});
```