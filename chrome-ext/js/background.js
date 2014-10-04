var notifications = {};
var ws;
connect();
// chrome.notifications.onClicked
// 		.addListener(function(notificationId) {
// 			var fullPrefName = notifications[notificationId];
// 			console.log(fullPrefName + " is retrieved");
// //			chrome.tabs
// //					.getAllInWindow(
// //							undefined,
// //							function(tabs) {
// //								for (var i = 0, tab; tab = tabs[i]; i++) {
// //									if (tab.url && isGvsUrl(tab.url)) {
// //										console
// //												.log("Notification - onclick: Tab is opened already. Refreshing...");
// //										chrome.tabs.update(tab.id, {
// //											selected : true
// //										});
// //										return;
// //									}
// //								}
// //								console
// //										.log("Notification - onclick: Creating tab...");
// //								chrome.tabs.create({
// //									url : getGvsUrl()
// //								});
// //							});
// 		});

function isGvsUrl(url) {
	return (url.indexOf('gvs.conversationboard.com/gvs.html') > 0);
}

function getGvsUrl() {
	var gvsUrl = 'http://gvs.conversationboard.com/gvs.html?username='
			+ localStorage.user_first_name + '.' + localStorage.user_last_name;
	console.log("GVS URL: " + gvsUrl);
	return gvsUrl;
}

function connect() {
	var target = 'ws://localhost:8888/cfd-chat/call_notification';
	if ('WebSocket' in window) {
		ws = new WebSocket(target);
	} else if ('MozWebSocket' in window) {
		ws = new MozWebSocket(target);
	} else {
		console.log('WebSocket is not supported by this browser.');
		return;
	}
	ws.onopen = function() {
		console.log('Info: WebSocket connection opened.');
	};
	ws.onmessage = function(event) {
		console.log('Received: ' + event.data);
		sendNotification(event.data);
	};
	ws.onclose = function() {
		console.log('Info: WebSocket connection closed.');
	};
}

function disconnect() {
	if (ws != null) {
		ws.close();
		ws = null;
	}
}

function getNotificationId(fullPrefName) {
	var id = Math.floor(Math.random() * 9007199254740992) + 1;
	var idStr = id.toString();
	notifications[idStr] = fullPrefName;
	return idStr;
}

function sendNotification(msg) {
	var json = JSON.parse(msg);
	chrome.notifications.create(getNotificationId(json.fullPrefName), {
		title : 'New email',
		iconUrl : 'icon_128.png',
		type : 'basic',
		message : json.message
	}, creationCallback);
}

function creationCallback(notID) {
	console.log("Succesfully created " + notID + " notification");
}
