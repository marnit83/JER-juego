var gameMode = "";
class SeleccionModo extends Phaser.Scene{
    constructor(){
        super({key:"SeleccionModo"});
    }

    create(){
        // Escape
        this.escObj = this.input.keyboard.addKey('ESC');

        // Fondo
        this.add.image(710, 300, 'escenaSeleccionModo').setDisplaySize(1500,600).setScale(0.5);

        // Botones
        this.bModoHistoria = this.add.image(520, 250, 'botonModoHistoria').setInteractive();
        this.bModoHistoria.setScale(0.5);

        this.bModoSeleccion = this.add.image(710,450, 'botonModoSeleccion').setInteractive();
        this.bModoSeleccion.setScale(0.52);

        this.bModoOnline = this.add.image(905, 250, 'botonModoOnline').setInteractive();
        this.bModoOnline.setScale(0.52);

        // Mano alien
        this.manoAlien = this.add.image(200,100, 'ManoAlien');


        // Interacción botones
        var that = this;        
        this.bModoHistoria.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            gameMode = "ModoHistoria";
            that.scene.start("Historia");
        });
        this.bModoSeleccion.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            gameMode = "ModoSeleccion";
            that.scene.start("SeleccionNivel");
        });
        this.bModoOnline.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            that.scene.start("Online");
        });
    }

    update(){
        if(this.escObj.isDown){
            this.scene.start("Menu");
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