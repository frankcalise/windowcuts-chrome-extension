// setup keyboard shortcuts
chrome.commands.onCommand.addListener(function(command) {
	console.log('command:', command);

	// check for switch focus command
	if (command.indexOf('switch_window_focus') == 0) {
		setFocusWindow(command.slice(-1));
	}

	if (command == 'join_current_window') {
		joinWindow();
	} else if (command == 'explode_current_tab') {
		explodeTab();
	} else if (command == 'explode_tabs_to_right') {
		explodeTabsToRight();
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

/**
 * Take all tabs from the current Chrome window and move
 * them to the end of the main (first open) Chrome window.
 */
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

	// TODO - select first joined tab
}

/**
 * Pop the current tab out to a new Chrome window.
 */
function explodeTab() {
	chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
		var win = chrome.windows.create({ tabId: tabs[0].id });
	});
}

/**
 * Take all tabs to the right of the active one (including the active)
 * and move to a new Chrome window.
 */
function explodeTabsToRight() {
	// get current tab index and number of tabs
	chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
		var currentTabIdx = tabs[0].index;


		var win = chrome.windows.getCurrent({ populate: true }, function(win) {
			var tabIds = [];
			
			// build tab id array
			win.tabs.forEach(function(tab) {
				if (tab.index >= currentTabIdx) {
					tabIds.push(tab.id);
				}
			});		

			// move the tabs (let first assume new tab position)
			chrome.windows.create({ tabId: tabIds.shift() }, function(newWin) {
				// move the remaining tabs to the end of the new window
				chrome.tabs.move(tabIds, { windowId: newWin.id, index: -1 });
			});
		});
	});
}