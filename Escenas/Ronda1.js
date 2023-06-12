class Ronda1 extends Phaser.Scene {
    constructor() {
        super({ key: "Ronda1" });
    }

    create() {
        console.log("Comienza la ronda 1");
        fondo1.play();
        fondoM.stop();
        fondo2.stop();
        fondo3.stop();

        ULTIMA_VIDA_J1 = false;
        ULTIMA_VIDA_J2 = false;
        MUERTO_J1 = false;
        MUERTO_J2 = false;

        // Añadimos fondo y UI
        this.add.image(710, 300, 'escenarioUno').setDisplaySize(1420, 600);
        this.add.image(710, 300, 'inGameUI').setDisplaySize(1420, 600);

        // Añadimos suelo (invisible)
        this.suelo = new Plataformas(this, 700, 525, 'escenarioSuelo');
        this.suelo.alpha = 0;

        // Añadimos plataformas                       
        this.plataforma1 = new Plataformas(this, 720, 220, 'escenarioUnoPlataformasDos').setDisplaySize(600, 30);
        this.plataforma2 = new Plataformas(this, 250, 365, 'escenarioUnoPlataformasDos').setDisplaySize(600, 30);
        this.plataforma3 = new Plataformas(this, 1120, 365, 'escenarioUnoPlataformasDos').setDisplaySize(600, 30);


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
        this.player1.setOponente(this.player2);
        this.player2.setOponente(this.player1);


        //Colision entre jugador y terreno        
        this.AnadirColider(this.suelo);
        this.AnadirColider(this.plataforma1);
        this.AnadirColider(this.plataforma2);
        this.AnadirColider(this.plataforma3);

        // Arma y collider
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
        this.player1 = new J1(
            this,
            150,
            450,
            'static',
            'J1',
            'a', 'd', 'w', 's', 'c', 'v', 'b'
        );
        this.player2 = new J1(
            this,
            1150,
            450,
            'static2',
            'J2',
            'LEFT', 'RIGHT', 'UP', 'DOWN', 'i', 'o', 'p'
        );

        // Mensajes de victoria
        mensajeVictoriaJ1 = this.add.image(720, 260, 'escenaVictoriaJ1');
        mensajeVictoriaJ1.visible = false;
        mensajeVictoriaJ2 = this.add.image(720, 260, 'escenaVictoriaJ2');
        mensajeVictoriaJ2.visible = false;
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

        if (this.player1.getSiguienteRonda()) {
            if (gameMode == "ModoHistoria") {
                ULTIMA_VIDA_J1 = true;
                this.scene.launch('Ronda2');
                this.scene.stop();
            } else if (gameMode == "ModoSeleccion") {
                // if(MUERTO_J1){
                //     this.scene.launch('Inicio');
                //     this.scene.stop();
                // }
                this.scene.launch('Inicio');
                this.scene.stop();
            }
        }
        else if (this.player2.getSiguienteRonda()) {
            if (gameMode == "ModoHistoria") {
                ULTIMA_VIDA_J2 = true;
                this.scene.launch('Ronda2');
                this.scene.stop();
            } else if (gameMode == "ModoSeleccion") {
                // if(MUERTO_J2){
                //     this.scene.launch('Inicio');
                //     this.scene.stop();
                // }
                this.scene.launch('Inicio');
                this.scene.stop();
            }
        }

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
    }
}