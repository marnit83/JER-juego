const config = {
    type: Phaser.AUTO,
    width:1420,
    height:600,
    backgroundColor: '#0A0A0A',
    parent:"container",
    scene: [ControladorEscenas],

    physics: {
        default: "arcade",
        arcade:{
            gravity:{
                y:500
            },
            debug:false
        }
    },
};
var game = new Phaser.Game(config);

// Crear una instancia de Game_WebSocket
var gameWebSocket = new Game_WebSocket();

// Inicializar la conexión WebSocket
gameWebSocket.init_TTsocket();

// Opcionalmente, puedes hacer que la instancia de Game_WebSocket sea accesible globalmente
window.gameWebSocket = gameWebSocket;

