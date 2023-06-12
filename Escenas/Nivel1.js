class Nivel1 extends Phaser.Scene{
    constructor(){
        super({key:"Nivel1"});
    }
    
    create(){
        console.log("Comienza la ronda 1");

        this.escObj = this.input.keyboard.addKey('ESC');

        this.add.image(710, 300, 'escenarioDos').setDisplaySize(1500,600);

        this.botonPausa = this.add.image(720,90, 'botonPausa').setInteractive();
        this.botonPausa.setScale(0.30);

        var that = this;
        this.botonPausa.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});  
            escenaLlamada = "Nivel1";          
            that.scene.launch('Pausa');
            that.scene.pause();

            console.log("Juego pausado");
        });

        //SE CREAN LOS JUGADORES
        this.createPlayers();
        this.player1.setOponente(this.player2);
        this.player2.setOponente(this.player1);
      
        //.setScale(0.5);

        // Añadimos suelo (invisible)
        //this.suelo = new Plataformas(this, 700, 555, 'escenarioSuelo').setDisplaySize(1500,50);
       // this.suelo.alpha = 0;

        // Añadimos plataformas
        this.plataforma1 = new Plataformas(this, 520, 430, 'escenarioDosPlataformasClaroMitadDos');
        this.plataforma2 = new Plataformas(this, 920, 430, 'escenarioDosPlataformasOscuroMitadDos'); 
        this.plataforma3 = new Plataformas(this, 1300, 295, 'escenarioDosPlataformasOscuro');
        this.plataforma4 = new Plataformas(this, 820, 185, 'escenarioDosPlataformasOscuroMitad'); 
        this.plataforma5 = new Plataformas(this, 140, 295, 'escenarioDosPlataformasClaro');
        this.plataforma6 = new Plataformas(this, 620, 185, 'escenarioDosPlataformasClaroMitad'); 
        
        /*
        this.physics.add.collider(this.player1,this.suelo,null,null,this);
        this.physics.add.collider(this.player2,this.suelo,null,null,this);
        this.physics.add.collider(this.player1,this.plataforma1,null,null,this);
        this.physics.add.collider(this.player2,this.plataforma1,null,null,this);
        this.physics.add.collider(this.player1,this.plataforma2,null,null,this);
        this.physics.add.collider(this.player2,this.plataforma2,null,null,this);
        this.physics.add.collider(this.player1,this.plataforma3,null,null,this);
        this.physics.add.collider(this.player2,this.plataforma3,null,null,this);
        this.physics.add.collider(this.player1,this.plataforma4,null,null,this);
        this.physics.add.collider(this.player2,this.plataforma4,null,null,this);
        this.physics.add.collider(this.player1,this.plataforma5,null,null,this);
        this.physics.add.collider(this.player2,this.plataforma5,null,null,this);
        this.physics.add.collider(this.player1,this.plataforma6,null,null,this);
        this.physics.add.collider(this.player2,this.plataforma6,null,null,this);
*/
        //Colision entre jugador y terreno
       // this.AñadirColider(this.suelo); 
  /*      this.AñadirColider(this.plataforma1); 
        this.AñadirColider(this.plataforma2); 
        this.AñadirColider(this.plataforma3); 
        this.AñadirColider(this.plataforma4); 
        this.AñadirColider(this.plataforma5);
        this.AñadirColider(this.plataforma6);       */


        this.arma = new Arma(this, 700, -100, "swordI", 5);

        this.leftObj = this.input.keyboard.addKey('LEFT');
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

        //----------- JUGADOR 2 -------------
        this.player2.actualizarHitbox();
        this.player2.actualizarAttackBox();
        this.player2.moverJugador();
        this.player2.jugadorMovimiento();
        this.player2.jugadorAtacar();
        this.player2.jugadorHurt();
        this.player2.actualizarArma();

        //------------ ARMA -------------------
        this.arma.hitbox.actualizar();
        this.arma.checkPick(this.player1);
        this.arma.checkPick(this.player2);

        var that = this;
        if(this.escObj.isDown){
            that.scene.launch('Pausa');
            that.scene.pause();

            console.log("Juego pausado");
        }
    }
}