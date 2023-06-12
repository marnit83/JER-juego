// class Game_WebSocket {

// setServerSupport(serverSupport){
// 	this.serverSupport = serverSupport;
// }


// setMenu(menu){
// 	this.menu = menu;
// }

// setGame(game){
// 	this.game = game;
// }


// setInMenu(menu){
// 	this.inMenu = menu;
// }


// proChatMessage(msg){
// 	let chat = $("#chatbox");
// 	let out;

// 	out = '<p>' + msg.date;
// 	out += '- <label style="color:'+ msg.color + '"><b>' + msg.user + "</b>: " + msg.text;
// 	out += "</label></p>"

// 	chat.append(out);
// }


// proMessage(msg){
// 	var data = JSON.parse(msg.data);
// 	console.log("data " + data);
// 	if(data.type == "chat"){
// 		console.log("Mensaje tipo chat: " + data.body);
// 		this.proChatMessage(data.body);
// 	} else if (data.type == "menu" && this.inMenu){
// 		this.menu.processMsg(data.body);
// 	} else if (data.type == "side")
// 	{
// 		// "red" ó "blue"
// 		this.menu.setSide(data.body);
// 	}else if(data.type == "start"){
// 		this.menu.startGame();
// 	} else if(data.type == "game"){
// 		this.game.processMsg(data.body);
// 	} else if(data.type == "imp"){
// 		this.game.processImperative(data.body);
// 	}

// }


// sendMessage(msg, type)
// {

// 	var pkg = {
// 		type : type,
// 		body: msg
// 	}

// 	this.connection.send(JSON.stringify(pkg));
// }

// init_TTsocket(){

// 	this.connection = new WebSocket('ws://192.168.0.30:8080/game');

// 	this.inMenu = false;

// 	this.lobby = undefined;

// 	var that = this;

// 	this.connection.onmessage = function(msg) {
// 		that.proMessage(msg);
// 	}

// 	this.connection.onclose = function() {
// 		console.log("Closing socket");

// 		// $('#send-btn').click(
// 		// 	function() {
// 		// 	var msg = {
// 		// 		name : $('#name').val(),
// 		// 		message : $('#message').val()
// 		// 	}
// 		// 	$('#chat').val($('#chat').val() + "\n" + msg.name + ": " + msg.message);
// 		// 	this.connection.send(JSON.stringify(msg));
// 		// });

// 		let chat = $("#chatbox");
// 			chat.empty();
// 			chat.append('<h1 style= color: red> Servidor desconectado </h1>');
// 			chat.append('<p>Prueba más adelante</p>');

// 			$("#messageAction").empty();			

// 			let usrData = $("#userdata");
// 			usrData.empty();
// 			usrData.append('<input type="text" id="nick"/><input type="button" id="setName" value="set Nickname"/> <label for="setColor">Choose color: </label><select id="setColor"><option value="magenta">Magenta</option><option value="red">Red</option><option value="orange">Orange</option><option value="yellow">Yellow</option><option value="green">Green</option><option value="cyan">Cyan</option><option value="blue">Blue</option><option value="violet">Violet</option></select>')

// 			$('#submitmsg').click( function () {
// 				let plainText = $("#usermsg").val();
// 				var now = new Date();
// 				now = "> " + now.toLocaleString();
// 				var pickedColor = color;

// 				var msg = {
// 					date: now,
// 					text: plainText,
// 					user: player,
// 					color: pickedColor,
// 				}

// 				if(plainText != ''){
// 					Game_WebSocket.prototype.sendMessage(msg, "chat");
// 					Game_WebSocket.prototype.proChatMessage(msg);
// 				}

// 				//Borramos el field text
// 				$("#usermsg").val('');
// 			});
// 	}

// 	this.connection.onerror = function(e) {
// 		console.log("WS error: " + e);
// 	}






// }
// }

class Game_WebSocket {
	constructor() {
		this.connection = null;
		this.inMenu = false;
		this.lobby = undefined;
		this.chatHasFocus = false;
	}

	setServerSupport(serverSupport) {
		this.serverSupport = serverSupport;
	}

	setMenu(menu) {
		this.menu = menu;
	}

	setGame(game) {
		this.game = game;
	}

	setInMenu(menu) {
		this.inMenu = menu;
	}

	async proChatMessage(msg) {
		const chat = $("#chatbox");
		const out = `<p>${msg.date} - <label style="color:${msg.color}"><b>${msg.user}</b>: ${msg.text}</label></p>`;
		chat.append(out);
	}

	async proMessage(msg) {
		const data = JSON.parse(msg.data);
		//console.log(`data ${data}`);
		if (data.type == "chat") {
			console.log(`Mensaje tipo chat: ${data.body}`);
			await this.proChatMessage(data.body);
		} else if (data.type == "menu" && this.inMenu) {
			await this.menu.processMsg(data.body);
		} else if (data.type == "side") {
			// "red" ó "blue"
			this.menu.setSide(data.body);
		} else if (data.type == "start") {
			await this.menu.startGame();
		} else if (data.type == "game") {
			await this.game.processMsg(data.body);
		} else if (data.type == "imp") {
			await this.game.processImperative(data.body);
		}
		else if (data.type == "playerData") {
			await this.game.processPlayerData(data.body);
		}
	}

	sendMessage(msg, type) {
		const pkg = {
			type: type,
			body: msg,
		};
		this.connection.send(JSON.stringify(pkg));
	}

	async init_TTsocket() {
  		this.connection = new WebSocket(`ws://192.168.1.135:8080/game`);

		this.inMenu = false;

		this.lobby = undefined;

		this.connection.onmessage = async (msg) => {
			await this.proMessage(msg);
		};

		this.connection.onclose = () => {
			console.log("Closing socket");

			const chat = $("#chatbox");
			chat.empty();
			chat.append('<h1 style= color: red> Servidor desconectado </h1>');
			chat.append('<p>Prueba mas adelante</p>');

			$("#messageAction").empty();

			const usrData = $("#userdata");
			usrData.empty();
			usrData.append(
				'<input type="text" id="nick"/><input type="button" id="setName" value="set Nickname"/> <label for="setColor">Choose color: </label><select id="setColor"><option value="magenta">Magenta</option><option value="red">Red</option><option value="orange">Orange</option><option value="yellow">Yellow</option><option value="green">Green</option><option value="cyan">Cyan</option><option value="blue">Blue</option><option value="violet">Violet</option></select>'
			);

			$("#submitmsg").click(() => {
				const plainText = $("#usermsg").val();
				const now = new Date();
				const date = `> ${now.toLocaleString()}`;
				const color = this.color || "black";
				const user = this.player || "anonymous";

				const msg = {
					date: date,
					text: plainText,
					user: user,
					color: color,
				};

				if (plainText != "") {
					gameWebSocket.sendMessage(msg, "chat");
					gameWebSocket.proChatMessage(msg);
				}
				$("#usermsg").val('');
			})
		}

	}
	
}
// var player = undefined;
// var color =  "black";

// function changeDisplay() {

//     // Rellenamos lon la interfaz de chat
//     let msgAction = $("#messageAction");
//     msgAction.empty();
//     msgAction.append('<input name"usermsg" type="text" id="usermsg" size="63"/>');
//     msgAction.append('<input name"submitmsg" type="button" id="submitmsg" value="Send"/>');
    
//     $('#submitmsg').click( function () {
//         let plainText = $("#usermsg").val();
//         var now = new Date();
//         now = "> " + now.toLocaleString();
//         var pickedColor = color;

//         var msg = {
//             date: now,
//             text: plainText,
//             user: player,
//             color: pickedColor,
//         }

//         if(plainText != ''){
//             Game_WebSocket.prototype.sendMessage(msg, "chat");
//             Game_WebSocket.prototype.proChatMessage(msg);
//         }

//         //Borramos el field text
//         $("#usermsg").val('');
//     });
// }

// $("#setName").click( function () {
//     //Cogemos el color del mensaje
//     color = $('select option').filter(':selected').val();

//     let nick = $("#nick");
//     let aux = nick.val();
//     player = aux;
//     nick.val("");
// 	console.log("se hace");

//     Game_WebSocket.prototype.sendMessage(aux, "id");

//     $("#userdata").empty();
//     $("#userdata").append("<h2>" + player + "</h2>");

//     changeDisplay();

//     //sendPlayer(aux, pingServer);
// });