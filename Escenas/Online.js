class Online extends Phaser.Scene {
    constructor(){
        super({key: "Online"});
        gameWebSocket.setMenu(this);

        this.listo=false;
        this.listo2=false;
        this.side;

        this.setSide = function (lado) {
            this.side = lado;
            console.log("Su lado es el: " + this.side);
        }

        this.sendMsg = function (body) {
            this.listo=true;
            console.log("yo estoy "+this.listo)
            var pkg = {
                side: body
            }

            gameWebSocket.sendMessage(pkg, "menu");
        }
        //TODO: Encarfado de procesar los cambios del otro jugador (online)
        this.processMsg = function (body) {

            this.listo2 = body.side;
            this.listo2 = true;
            console.log("el otro esta "+this.listo2)

            

        }
    }
    preload(){
        console.log("Lobby online cargado"); 
    }

    create(){
        // Escape
        this.escObj = this.input.keyboard.addKey('ESC');

        // Fondo
        this.add.image(710, 300, 'escenaOnline').setDisplaySize(1500,600).setScale(0.5);

        // Botones
        // this.bListo = this.add.image(725, 420, 'botonOnline').setInteractive();
        // this.bListo.setScale(0.5);

        // Mano
        this.manoAlien = this.add.image(200,100, 'ManoAlien').setScale(0.4);

        // Interacción botones
        var that = this;
        // Pulsado de botón
        this.input.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            console.log("Se ha pulsado el boton -Listo-");
            that.sendMsg(true);
        })  
        gameWebSocket.setInMenu(true);
    }

    update(time, delta){   
        if(this.escObj.isDown){
            this.scene.start("SeleccionModo");
        }
        
        var ratonX = this.input.mousePointer.x;
        var ratonY = this.input.mousePointer.y;
        this.MoverMano(this.manoAlien, ratonX, ratonY);

        // if(this.listo==true&&this.listo2==true){
        //     this.scene.start("Ronda1");
        // }
    }

    MoverMano(mano, ratonX, ratonY){
        mano.x = ratonX + 50;
        if(ratonY > 230){
            mano.y = ratonY + 175;
        }
    }

    chatPicked(character) {
        var now = new Date();
        now = "> " + now.toLocaleString();

        var msg = {
            date: now,
            text: character + " picked",
            user: "SYSTEM",
            color: "#000000",
        }

        gameWebSocket.sendMessage(msg, "chat");
        gameWebSocket.proChatMessage(msg);
    }

    startGame() {
        console.log('Empezamos la partida');
        this.scene.start("Ronda1Online", { side: this.side });
    }

}