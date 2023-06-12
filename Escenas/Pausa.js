class Pausa extends Phaser.Scene{
    constructor(){
        super({key:"Pausa"});
    }

    create(){
        this.add.image(710, 300, 'escenaPausa').setDisplaySize(1500,600).setScale(0.5);

        this.escObj = this.input.keyboard.addKey('ESC');
        fondo1.pause();
        fondo2.pause();
        fondo3.pause();



        //BOTONES
        this.bVolverPartida = this.add.image(573, 465, 'BJugar').setInteractive();
        this.bVolverPartida.setScale(0.5);

        this.bSalir = this.add.image(845,465, 'BSalir').setInteractive();
        this.bSalir.setScale(0.52);

        this.bOpciones = this.add.image(437, 285, 'BOpciones').setInteractive();
        this.bOpciones.setScale(0.52);

        this.bControles = this.add.image(710, 285, 'BControles').setInteractive();
        this.bControles.setScale(0.52);
        
        this.bCreditos = this.add.image(980, 285, 'BCreditos').setInteractive();
        this.bCreditos.setScale(0.52);

        // Mano alien
        this.manoAlien = this.add.image(200,100, 'ManoAlien');


        //INTERACCION BOTONES
        var that = this;
        this.bVolverPartida.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            that.scene.resume(escenaLlamada);
            that.scene.stop();
            fondo1.resume();
            fondo2.resume();
            fondo3.resume();

            console.log("Juego reanudado");
        });
        this.bSalir.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            that.scene.stop(escenaLlamada);
            that.scene.start("Inicio");
        });
        this.bOpciones.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            escenaLlamadaMenu = "Pausa";
            that.scene.start("Opciones");
        });
        this.bControles.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            escenaLlamadaMenu = "Pausa";
            that.scene.start("Controles");
        });
        this.bCreditos.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            escenaLlamadaMenu = "Pausa";
            that.scene.start("Creditos");
        });
    }

    update(){
        var that = this;
        if(this.escObj.isDown){
            that.scene.resume('Ronda1');
            that.scene.stop();

            console.log("Juego reanudado");
        }
        
        var ratonX = this.input.mousePointer.x;
        var ratonY = this.input.mousePointer.y;
        this.MoverMano(this.manoAlien, ratonX, ratonY);
    }

    MoverMano(mano, ratonX, ratonY){
        mano.x = ratonX + 40; 
        mano.y = ratonY + 290;
    }
}