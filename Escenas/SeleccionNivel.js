class SeleccionNivel extends Phaser.Scene{
    constructor(){
        super({key:"SeleccionNivel"});
    }

    create(){
        // Escape
        this.escObj = this.input.keyboard.addKey('ESC');

        // Fondo
        this.add.image(710, 300, 'escenaSeleccionNivel').setDisplaySize(1500,600).setScale(0.5);

        // Botones
        this.bNivelUno = this.add.image(282, 390, 'botonNivelUno').setInteractive();

        this.bNivelDos = this.add.image(710, 430, 'botonNivelDos').setInteractive();

        this.bNivelTres = this.add.image(1130, 390, 'botonNivelTres').setInteractive();

        // Mano alien
        this.manoAlien = this.add.image(200,100, 'ManoAlien');


        // Interaccion botones
        var that = this;
        this.bNivelUno.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            that.scene.start("Ronda1");
        });
        this.bNivelDos.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            that.scene.start("Ronda2");
        });
        this.bNivelTres.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            that.scene.start("Ronda3");
        });
    }

    update(){
        if(this.escObj.isDown){
            this.scene.start("SeleccionModo");
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