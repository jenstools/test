```javascript
let comments = {};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveButton').addEventListener('click', saveComment);
    document.getElementById('optionsButton').addEventListener('click', openOptions);
    loadComments();
});

function saveComment() {
    let commentInput = document.getElementById('commentInput');
    let comment = commentInput.value.trim();
    if (comment) {
        let url = window.location.href;
        let timestamp = new Date().getTime();
        let commentData = { url, comment, timestamp };
        comments[url] = comments[url] || [];
        comments[url].push(commentData);
        chrome.storage.sync.set({ 'comments': comments }, function() {
            commentInput.value = '';
            loadComments();
        });
    }
}

function loadComments() {
    chrome.storage.sync.get('comments', function(data) {
        comments = data.comments || {};
        let url = window.location.href;
        let commentList = document.getElementById('commentList');
        commentList.innerHTML = '';
        if (comments[url]) {
            comments[url].forEach(function(commentData) {
                let commentElement = document.createElement('li');
                commentElement.textContent = commentData.comment;
                commentList.appendChild(commentElement);
            });
        }
    });
}

function openOptions() {
    chrome.runtime.openOptionsPage();
}
```