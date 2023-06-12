var mensajeVictoriaJ1;
var mensajeVictoriaJ2

class Ronda3 extends Phaser.Scene{
    constructor(){
        super({key:"Ronda3"});
    }

    create(){
        console.log("Comienza la ronda 3");
        fondo2.stop();
        fondo3.play();
        fondoM.stop();
        fondo1.stop();
        
        // Añadimos fondo
        this.add.image(710, 300, 'escenarioTres').setDisplaySize(1420,600);
        this.add.image(710, 300, 'inGameUI').setDisplaySize(1420,600);  
        
        // Añadimos suelo (invisible)
        this.suelo = new Plataformas(this, 700, 527, 'escenarioSuelo');
        this.suelo.alpha = 0;

        /*
        // Añadimos paredes (invisibles)
        this.pared1 = new Plataformas(this, 625, 260, 'escenarioPared').setDisplaySize(160,160);
        //this.pared1.alpha = 0;
        this.pared2 = new Plataformas(this, 1280, 420, 'escenarioPared');
        //this.pared2.alpha = 0;
        this.pared3 = new Plataformas(this, 70, 250, 'escenarioPared');
        //this.pared3.alpha = 0;
        this.pared4 = new Plataformas(this, 1335, 250, 'escenarioPared');
        //this.pared4.alpha = 0;
        this.pared5 = new Plataformas(this, 40, 110, 'escenarioPared');
        //this.pared5.alpha = 0;
        this.pared6 = new Plataformas(this, 1365, 110, 'escenarioPared');
        //this.pared6.alpha = 0;
        */

        // Añadimos plataformas
        this.plataforma1 = new Plataformas(this, 170, 365, 'escenarioTresPlataformas').setDisplaySize(400,30); 
        this.plataforma2 = new Plataformas(this, 1300, 365, 'escenarioTresPlataformas').setDisplaySize(400,30);
        this.plataforma3 = new Plataformas(this, 720, 175, 'escenarioTresPlataformasDos').setDisplaySize(800,30); 
        this.plataforma4 = new Plataformas(this, -130, 240, 'escenarioTresPlataformas').setDisplaySize(400,30);         
        this.plataforma5 = new Plataformas(this, 1550, 240, 'escenarioTresPlataformas').setDisplaySize(400,30); 


        // Manejo del menú de pausa //
        this.escObj = this.input.keyboard.addKey('ESC');

        this.botonPausa = this.add.image(50,50, 'botonPausa').setInteractive();
        this.botonPausa.setScale(0.20);

        var that = this;
        this.botonPausa.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});            
            escenaLlamada = "Ronda3";      
            that.scene.launch('Pausa');
            that.scene.pause();

            console.log("Juego pausado");
        });
        // Manejo del menú de pausa //

        
        // SE CREAN LOS JUGADORES
        this.createPlayers();
        this.player1.setOponente(this.player2);
        this.player2.setOponente(this.player1);


        this.physics.add.collider(this.player1,this.pared1,null,null,this);
        this.physics.add.collider(this.player2,this.pared1,null,null,this);


        //Colision entre jugador y terreno        
        this.AnadirColider(this.suelo); 
        this.AnadirColider(this.plataforma1); 
        this.AnadirColider(this.plataforma2); 
        this.AnadirColider(this.plataforma3); 
        this.AnadirColider(this.plataforma4); 
        this.AnadirColider(this.plataforma5);     

        /*
        //Colision entre jugador y paredes invisibles   
        // Arreglar
        this.AñadirColider(this.pared1); 
        this.AñadirColider(this.pared2); 
        this.AñadirColider(this.pared3); 
        this.AñadirColider(this.pared4); 
        this.AñadirColider(this.pared5); 
        this.AñadirColider(this.pared6);   
        */

        // Armas y collider
        this.arma = new Arma(this, 700, -100, "swordI", 5);
        this.AnadirColiderArma(this.suelo);
        this.AnadirColiderArma(this.plataforma1);
        this.AnadirColiderArma(this.plataforma2);
        this.AnadirColiderArma(this.plataforma3);
        this.AnadirColiderArma(this.plataforma4);
        this.AnadirColiderArma(this.plataforma5);

        // Mensajes de victoria (sirve para todos las rondas)
        mensajeVictoriaJ1 = this.add.image(720, 260, 'escenaVictoriaJ1');
        mensajeVictoriaJ1.visible = false; 
        mensajeVictoriaJ2 = this.add.image(720, 260, 'escenaVictoriaJ2');
        mensajeVictoriaJ2.visible = false; 
    }

    AnadirColider(objeto){
        this.physics.add.collider(this.player1,objeto,null,null,this);
        this.physics.add.collider(this.player2,objeto,null,null,this);
    }

    AnadirColiderArma(objeto){
        this.physics.add.collider(this.arma,objeto,null,null,this);
    }

    createPlayers(){
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

        
    }

    update(){
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

        //------------ ARMA -------------------
        this.arma.hitbox.actualizar();
        this.arma.checkPick(this.player1);
        this.arma.checkPick(this.player2);

        if (gameMode == "ModoHistoria"){if(MUERTO_J1){
            this.scene.launch('Inicio');
            this.scene.stop();
        }
        else if(MUERTO_J2){
            this.scene.launch('Inicio');
            this.scene.stop();
        }}else if(gameMode == "ModoSeleccion") {
            if (this.player1.getSiguienteRonda()) {
                this.scene.launch('Inicio');
                this.scene.stop();
            }
            else if (this.player2.getSiguienteRonda()) {
                this.scene.launch('Inicio');
                this.scene.stop();
            }
        }

        var that = this;
        if(this.escObj.isDown){
            that.scene.launch('Pausa');
            that.scene.pause();

            console.log("Juego pausado");
        }
    }
}