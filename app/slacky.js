// Constants
var baseUrl = "https://my.slack.com";
var view = "view.html";
var width = 1100;
var height = 700;
var minWidth = 765;
var minHeight = 300;

// Setup the initial Slack window
chrome.app.runtime.onLaunched.addListener(function() {
    createWindow(baseUrl);
});

function createWindow(destUrl) {
    chrome.app.window.create(
        view, {
            // Set the height and width and then render it in the middle of the screen
            innerBounds: {
                width: width,
                height: height,
                minWidth: minWidth,
                minHeight: minHeight,
                left: Math.round((screen.availWidth - width) / 2),
                top: Math.round((screen.availHeight - height) / 2)
            }
        }, function(createdWindow) {
            createdWindow.contentWindow.onload = function() {
                // Retrieve the webview element
                var webview = createdWindow.contentWindow.document.querySelector('webview');
                // When the window is resized, resize the webview to conform to the new size
                createdWindow.onBoundsChanged.addListener(function() {
                    var bounds = createdWindow.getBounds();
                    webview.style.height = bounds.height;
                    webview.style.width = bounds.width;
                });
                // Render the page requested inside the webview
                webview.src = destUrl;
                // Add event listener for when webview finishes loading
                webview.addEventListener("contentload", function() {
                    // Focus on the webview, so focus can go to the proper elements within it
                    webview.focus();
                    // Add event listener for when window becomes focused
                    createdWindow.contentWindow.onfocus = function() {
                        // Focus on the webview, so focus can go to the proper elements within it
                        webview.focus();
                    };
                });
            };
        }
    );
}
