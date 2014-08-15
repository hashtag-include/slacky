chrome.app.runtime.onLaunched.addListener(function() {
	var screenWidth = screen.availWidth;
	var screenHeight = screen.availHeight;
	var width = 1100;
	var height = 700;

	chrome.app.window.create( 'index.html', {
		id: "slacky",
		bounds: {
			width: width,
			height: height,
			left: Math.round((screenWidth - width) / 2),
			top: Math.round((screenHeight - height) / 2)
		},
		innerBounds: {
			minWidth: width,
			minHeight: height
		},
		frame: {
			color: "#3e313c"
		}
	});
});