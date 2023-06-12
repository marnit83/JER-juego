class Ronda1Online extends Phaser.Scene {
    constructor() {
        super({ key: "Ronda1Online" });

        this.player1;
        this.player2;

        this.i = 0;

        this.processImperative = function (body) {
            this.player2.x = body.x;
            this.player2.y = body.y;
            this.player2.setSpeed(body.v);
            this.player1.setVida(body.Hp);
            this.player2.setState(body.state);
            this.player2.setDirection(body.dir);

        }


        this.sendImperative = function () {
            if (this.player1 != undefined) {
                let a = this.player1.x, b = this.player1.y;
                let v = this.player1.getSpeed();
                let state = this.player1.playerController.currentState.name;

                let pkg = {
                    x: a,
                    y: b,
                    v: v,
                    Hp: this.player2.getVida(),
                    state: state,
                    hurtOP: this.player1.oponente.getHurt(),
                    hurt: this.player1.getHurt(),
                    dir: this.player1.getDirection(),
                    hurtingOP: this.player1.oponente.getHurting(),
                    hurting: this.player1.getHurting(),

                }

                //console.log(pkg);

                gameWebSocket.sendMessage(pkg, "imp")
            }

        }
        gameWebSocket.setGame(this);
    }

    sendMsg(k, val) {
        var pkg = {
            key: k,
            value: val
        }

        gameWebSocket.sendMessage(pkg, "game");
    }

    processMsg(pkg) {
        if (pkg.value == "1") {
            switch (pkg.key) {
                case "W":
                    this.player2.saltarTecla = true;
                    break;
                case "S":
                    this.player2.defensaTecla = true;
                    break;
                case "A":
                    this.player2.izquierdaTecla = true;
                    break;
                case "D":
                    this.player2.derechaTecla = true;
                    break;
                case "C":
                    this.player2.ataqueRapidoTecla = true;
                    break;
                case "V":
                    this.player2.ataquePesadoTecla = true;
                    break;
                case "B":
                    this.player2.interaccionTecla = true;
                    break;
            }
        } else if (pkg.value == "0") {
            switch (pkg.key) {
                case "W":
                    this.player2.saltarTecla = false;
                    break;
                case "S":
                    this.player2.defensaTecla = false;
                    break;
                case "A":
                    this.player2.izquierdaTecla = false;
                    break;
                case "D":
                    this.player2.derechaTecla = false;
                    break;
                case "C":
                    this.player2.ataqueRapidoTecla = false;
                    break;
                case "V":
                    this.player2.ataquePesadoTecla = false;
                    break;
                case "B":
                    this.player2.interaccionTecla = false;
                    break;
            }
        }
    }

    init(data) {
        // saving the selected character
        this.mySide = data.side;

        console.log(data);
    }

    create() {
        console.log("Comienza la ronda 1 Online");


        // Añadimos fondo y UI
        this.add.image(710, 300, 'escenarioUno').setDisplaySize(1420, 600);
        this.add.image(710, 300, 'inGameUI').setDisplaySize(1420, 600);

        // Añadimos suelo (invisible)
        this.suelo = new Plataformas(this, 700, 525, 'escenarioSuelo').setDisplaySize(1500, 50);
        this.suelo.alpha = 0;

        // Añadimos plataformas
        this.plataforma1 = new Plataformas(this, 200, 195, 'escenarioUnoPlataformas');
        this.plataforma2 = new Plataformas(this, 1220, 195, 'escenarioUnoPlataformas');
        this.plataforma3 = new Plataformas(this, 710, 340, 'escenarioUnoPlataformasDos');


        // Manejo del menú de pausa //
        this.escObj = this.input.keyboard.addKey('ESC');

        this.botonPausa = this.add.image(50, 50, 'botonPausa').setInteractive();
        this.botonPausa.setScale(0.20);

        var that = this;
        this.botonPausa.on('pointerdown', function (pointer) {
            that.sound.play('BAudio', { volume: 0.2 });
            escenaLlamada = "Ronda1";
            that.scene.launch('Pausa');
            that.scene.pause();

            console.log("Juego pausado");
        });
        // Manejo del menú de pausa //

        //SE CREAN LOS JUGADORES
        this.createPlayers();

        this.inputDeclaration();

        this.player1.setOponente(this.player2);
        this.player2.setOponente(this.player1);

        // Colision entre jugadores y plataformas
        this.physics.add.collider(this.player1, this.suelo, null, null, this);
        this.physics.add.collider(this.player2, this.suelo, null, null, this);
        this.physics.add.collider(this.player1, this.plataforma1, null, null, this);
        this.physics.add.collider(this.player2, this.plataforma1, null, null, this);
        this.physics.add.collider(this.player1, this.plataforma2, null, null, this);
        this.physics.add.collider(this.player2, this.plataforma2, null, null, this);
        this.physics.add.collider(this.player1, this.plataforma3, null, null, this);
        this.physics.add.collider(this.player2, this.plataforma3, null, null, this);

        //Colision entre jugador y terreno        
        this.AnadirColider(this.suelo);
        this.AnadirColider(this.plataforma1);
        this.AnadirColider(this.plataforma2);
        this.AnadirColider(this.plataforma3);

        // Armas
        this.arma = new Arma(this, 700, -100, "swordI", 5);
        this.AnadirColiderArma(this.suelo);
        this.AnadirColiderArma(this.plataforma1);
        this.AnadirColiderArma(this.plataforma2);
        this.AnadirColiderArma(this.plataforma3);
    }

    AnadirColider(objeto) {
        this.physics.add.collider(this.player1, objeto, null, null, this);
        this.physics.add.collider(this.player2, objeto, null, null, this);
    }

    AnadirColiderArma(objeto) {
        this.physics.add.collider(this.arma, objeto, null, null, this);
    }

    createPlayers() {
        if (this.mySide == "blue") {
            this.player1 = new J1Online(
                this,
                150,
                450,
                'static',
                'J1',
                "blue"
            );

            this.player2 = new J1Online(
                this,
                1150,
                450,
                'static2',
                'J2',
                "red"
            );
        }
        else {
            this.player2 = new J1Online(
                this,
                150,
                450,
                'static',
                'J1',
                "blue"
            );

            this.player1 = new J1Online(
                this,
                1150,
                450,
                'static2',
                'J2',
                "red"
            );
        }


    }

    update() {
        //----------- JUGADOR 1 -------------
        this.player1.actualizarHitbox();
        this.player1.actualizarAttackBox();
        this.player1.moverJugador();
        this.player1.jugadorMovimiento();
        this.player1.jugadorAtacar();
        this.player1.jugadorHurt();
        this.player1.actualizarArma();
        this.player1.checkMuerte();

        //----------- JUGADOR 2 -------------
        this.player2.actualizarHitbox();
        this.player2.actualizarAttackBox();
        this.player2.moverJugador();
        this.player2.jugadorMovimiento();
        this.player2.jugadorAtacar();
        this.player2.jugadorHurt();
        this.player2.actualizarArma();
        this.player2.checkMuerte();
        //console.log("El nombre es este " + this.player1.playerController + "y" + this.player2.playerController)
        //console.log(this.player1.playerController.currentState);

        //------------ ARMA -------------------
        this.arma.hitbox.actualizar();
        this.arma.checkPick(this.player1);
        this.arma.checkPick(this.player2);

        var that = this;
        if (this.escObj.isDown) {
            that.scene.launch('Pausa');
            that.scene.pause();

            console.log("Juego pausado");
        }
        this.i += 1;

        if (this.i % 10 == 0) {
            this.sendImperative();
        }

        if (this.player1.getSiguienteRonda()) {
            
            var pkg={endGame:true}
            gameWebSocket.sendMessage(pkg, "endgame");
            this.scene.launch('Inicio');
            this.scene.stop();
            
        }
        else if (this.player2.getSiguienteRonda()) {
            var pkg={endGame:true}
            gameWebSocket.sendMessage(pkg, "endgame");
            this.scene.launch('Inicio');
            this.scene.stop();
        }
    }



    inputDeclaration() {
        var that = this.player1;
        var this_game = this;

        this.input.keyboard.on('keydown', function (event) {
            if (!gameWebSocket.chatHasFocus) {
                if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.W) {
                    that.saltarTecla = true;
                    this_game.sendMsg("W", "1");
                    console.log('W Pressed');
                } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.A && !that.keyA) {
                    that.derechaTecla = true;
                    this_game.sendMsg("D", "1");
                    console.log('D Pressed');
                } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.S && !that.keyS) {
                    that.defensaTecla = true;
                    this_game.sendMsg("S", "1");
                    console.log('S Pressed');
                } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.D && !that.keyD) {

                    that.izquierdaTecla = true;
                    this_game.sendMsg("A", "1");
                    console.log('A Pressed');
                } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.C) {
                    that.ataqueRapidoTecla = true;
                    this_game.sendMsg("C", "1");
                    console.log('C Pressed');
                } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.V) {
                    that.ataquePesadoTecla = true;
                    this_game.sendMsg("V", "1");
                    console.log('V Pressed');
                } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.B) {
                    that.interaccionTecla = true;
                    this_game.sendMsg("B", "1");
                    console.log('B Pressed');
                }
            }
        });



        // Input event that checks when a key goes up
        this.input.keyboard.on('keyup', function (event) {

            if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.W) {
                that.saltarTecla = false;
                this_game.sendMsg("W", "0");
                console.log('W Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.A && !that.keyA) {
                that.derechaTecla = false;
                this_game.sendMsg("D", "0");
                console.log('D Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.S && !that.keyS) {
                that.defensaTecla = false;
                this_game.sendMsg("S", "0");
                console.log('S Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.D && !that.keyD) {

                that.izquierdaTecla = false;
                this_game.sendMsg("A", "0");
                console.log('A Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.C) {
                that.ataqueRapidoTecla = false;
                this_game.sendMsg("C", "0");
                console.log('C Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.V) {
                that.ataquePesadoTecla = false;
                this_game.sendMsg("V", "0");
                console.log('V Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.B) {
                that.interaccionTecla = false;
                this_game.sendMsg("B", "0");
                console.log('B Depressed');
            }

        });



    }


}