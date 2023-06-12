
// En este Script se recopilará y manejará toda la informacion relevante a la conexion de un usuario con el servidor

/*
var aux = window.location + "get/";

var Color = "black";

//player name
var player;
    
// lobby id
var lobby;

// timer
var timer;

function setColor (c)
{
    Color = c;
}

//POST -> Player
function sendPlayer(newplayer, callback){
    $.ajax({
        method: "POST",
        url: aux,
        data: newplayer,
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        // name returned
        // console.log(data.name);
        player = data.name;

        // lobby returned
        console.log(data.lobby);
        lobby = data.lobby;
        
        // Rellenamos lon la interfaz de chat
        let msgAction = $("#messageAction");
        msgAction.empty();
        msgAction.append('<input name"usermsg" type="text" id="usermsg" size="63"/>');
        msgAction.append('<input name"submitmsg" type="button" id="submitmsg" value="Send"/>');

        // Vaciamos el user data y ponemos un display del nombre
        let userData = $("#userdata");
        userData.empty();
        userData.append('<p><b>'+ player +'</b> tu lobby es el: '+ lobby +'</p>');

        // Programamos el evento pulsar el submit
        $('#submitmsg').click( function () {
            let plainText = $("#usermsg").val();
            var now = new Date();
            now = "> " + now.toLocaleString();
            var pickedColor = Color;

            var msg = {
                date: now,
                text: plainText,
                user: player,
                color: pickedColor,
            }
    
            if(plainText != ''){
                sendMassage(msg, pingServer);
            }

            //Borramos el field text
            $("#usermsg").val('');
        });

        //Veces por segundo que mandara su estado el cliente
        refreshRate = 1.4

        //Creamos el timer
        timer = setInterval(function () {
            pingServer();
        }, refreshRate * 1000)

        // hacemos el callback
        callback();
    })

}

//  PUT -> MENSAJE
function sendMassage( msg, callback) {
    $.ajax({
        method: "PUT",
        url: aux + lobby,
        data: JSON.stringify(msg),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        callback();
    })
}

// GET -> MENSAJES
// De paso decimos al server que no nos hemos desconectado y nos bajamos los mensajes que hayan
function pingServer()
{
    $.ajax({
        url: aux + lobby + '/' + player,
    }).done(function (info) {
        let chat = $("#chatbox");
        let out;
        // Limpiamos el contenedor
        chat.empty();
        // Concatenamos todos los mensajes
        for (i = 0; i < info.length; i++){
            out = '<p>' + info[i].date;
            out += '- <label style="color:'+ info[i].color + '"><b>' + info[i].user + "</b>: " + info[i].text;
            out += "</label></p>"
            chat.append(out);
        }
    })
}

$(document).ready(function () {
    

    //Boton asociado al addPlayer()
    
	
});

*/
$(document).ready(function() {
var player = undefined;
var color =  "black";


function changeDisplay() {

    // Rellenamos lon la interfaz de chat
    let msgAction = $("#messageAction");
    msgAction.empty();
    msgAction.append('<input name"usermsg" type="text" id="usermsg" size="63"/>');
    msgAction.append('<input name"submitmsg" type="button" id="submitmsg" value="Send"/>');

    $("#usermsg").focus(() => {
        window.gameWebSocket.chatHasFocus = true;
    });

    $("#usermsg").blur(() => {
        window.gameWebSocket.chatHasFocus = false;
    });
    
    $('#submitmsg').click( function () {
        let plainText = $("#usermsg").val();
        var now = new Date();
        now = "> " + now.toLocaleString();
        var pickedColor = color;

        var msg = {
            date: now,
            text: plainText,
            user: player,
            color: pickedColor,
        }

        if(plainText != ''){
            window.gameWebSocket.sendMessage(msg, "chat");
            window.gameWebSocket.proChatMessage(msg);
        }

        //Borramos el field text
        $("#usermsg").val('');
    });
}

$("#nick").focus(() => {
    window.gameWebSocket.chatHasFocus = true;
});

$("#nick").blur(() => {
    window.gameWebSocket.chatHasFocus = false;
});

$("#setName").click( function () {
    //Cogemos el color del mensaje
    color = $('#setColor option').filter(':selected').val();

    let nick = $("#nick");
    let aux = nick.val();
    player = aux;
    nick.val("");

    window.gameWebSocket.sendMessage(aux, "id");

    $("#userdata").empty();
    $("#userdata").append("<h2>" + player + "</h2>");

    changeDisplay();

    //sendPlayer(aux, pingServer);
});
})
