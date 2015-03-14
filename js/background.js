// setup keyboard shortcuts
chrome.commands.onCommand.addListener(function(command) {
	console.log('command:', command);

	// check for switch focus command
	if (command.indexOf('switch_window_focus') == 0) {
		setFocusWindow(command.slice(-1));
	}

	if (command == 'join_current_window') {
		joinWindow();
	}
});

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

function joinWindow() {
	var win = chrome.windows.getCurrent({ populate: true }, function(win) {
		var tabIds = [];
		
		// build tab id array
		win.tabs.forEach(function(tab) {
			tabIds.push(tab.id);
		});

		// get main window id
		var wins = chrome.windows.getAll(function(wins) {
			// move the tabs to the main window
			chrome.tabs.move(tabIds, { windowId: wins[0].id, index: -1 });
		});
	});
}

function explodeWindow() {
	// TODO - move tabs from current tab and to the right to a new chrome window
}