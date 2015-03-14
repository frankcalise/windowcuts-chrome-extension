listWindows();

function listWindows() {
	var windows = chrome.windows.getAll({ populate: true}, function(windows) {
		windows.forEach(function(window) {
			window.tabs.forEach(function(tab) {
				// collect all the tab urls here
				console.log(tab.url + ' ' + tab.title);
			})
		})
	})
}