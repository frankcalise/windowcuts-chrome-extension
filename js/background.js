// setup keyboard shortcuts
chrome.commands.onCommand.addListener(function(command) {
	console.log('command:', command);

	// check for switch focus command
	if (command.indexOf('switch_window_focus') == 0) {
		setFocusWindow(command.slice(-1));
	}
});

listWindows();

function listWindows() {
	var windows = chrome.windows.getAll({ populate: true}, function(windows) {
		windows.forEach(function(window) {
			console.log('window id: ' + window.id)
			window.tabs.forEach(function(tab) {
				// collect all the tab urls here
				console.log(tab.url + ' ' + tab.title);
			});
		});
	});
}

function setFocusWindow(index) {
	var windows = chrome.windows.getAll(function(windows) {
		// indexes 1 through 8, go to that window, 
		// index 9 give last window (consistent with tab shortcuts)
		var idx = (index == 9 ? windows.length - 1 : index - 1);
		
		// bounds check
		if (idx < windows.length) {
			var w = chrome.windows.get(windows[idx].id, { populate: true }, function(w) {
				
			});	
		}
	});
}