document.querySelector('webview').addEventListener('newwindow', function(event) {
    // Event handler for when external links are clicked because of
    // the Chrome packaged app security restriction on opening links in the regular browser
    event.preventDefault();
    window.open(event.targetUrl);
});