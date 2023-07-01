// options.js

document.addEventListener('DOMContentLoaded', function() {
    let saveButton = document.getElementById('saveButton');
    let commentInput = document.getElementById('commentInput');

    saveButton.addEventListener('click', function() {
        let comment = commentInput.value;
        if (comment) {
            chrome.storage.sync.set({ 'comment': comment }, function() {
                console.log('Comment saved');
            });
        }
    });
});

chrome.storage.sync.get('comment', function(data) {
    if (data.comment) {
        document.getElementById('commentInput').value = data.comment;
    }
});