// Create instance of chat widget

// HTTC Transport Version
var oChatUI = new GenesysChatUI($, $("#demo_chat_XYZ"),

Transport_REST_HTTC, {
	id : "515a4376-ac30-4ed2-801f-a876c0d56c93",
	dataURL : "https://genesysvoice.com:8080/gcfd/servlets/chats/api/v2/chats/",
	context : "demo"
});

oChatUI.startSession();
