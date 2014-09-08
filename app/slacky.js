// Constants
var baseUrl = "https://my.slack.com";
var frameColor = "#3e313c";
var view = "view.html";
var width = 1100;
var height = 700;

// Setup the initial Slack window
chrome.app.runtime.onLaunched.addListener(function() {
	createWindow(baseUrl);
});

function createWindow(destUrl) {
	chrome.app.window.create(
		// We're allowed to just render the same view for all pages because we can
		// just change the webview src to reflect the requested page
		//
		// Other benefits include having the same document store of cookies and sessions
		// so everything persists accross new windows -- sweet!
		view, {
			// Set the height and width and then rander it in the middle of the screen
			bounds: {
				width: width,
				height: height,
				left: Math.round((screen.availWidth - width) / 2),
				top: Math.round((screen.availHeight - height) / 2)
			},
			// Minimum sizes
			innerBounds: {
				minWidth: width,
				minHeight: height
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
				// Render the page requested inside the webviuew
				webview.src = destUrl;
				// Set links opened off the base page to open in a new window
				// but ones opened off child windows to open in the same window
				windowEventHandlers(webview, (destUrl === baseUrl));
			};
		}
	);
}

function windowEventHandlers(webview, _blank) {
	webview.addEventListener('newwindow', function(dest) {
		// Event handler for when external links are clicked because for some
		// reason window.open(dest.targetUrl) just crashes the chrome tab
		dest.preventDefault();
		if(_blank)
			createWindow(dest.targetUrl);
		else
			webview.src = dest.targetUrl;
	});
}
