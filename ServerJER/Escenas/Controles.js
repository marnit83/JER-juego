class Controles extends Phaser.Scene {
    constructor(){
        super({key: "Controles"});
    }

    preload(){
        console.log("Controles cargado");

        this.load.image('Controles', './Assets/Controles.png');
        this.load.image('BAtras', './Assets/botonAtras.png');
        this.load.audio('BAudio', './Assets/botonAudio.wav');
    }

    create(){
        this.leftObj = this.input.keyboard.addKey('LEFT');
        this.add.image(710, 300, 'Controles').setDisplaySize(1500,600).setScale(0.5);

        this.bAtras = this.add.image(699, 495, 'BAtras').setInteractive();
        this.bAtras.setScale(0.5);

        this.manoAlien = this.add.image(200,100, 'ManoAlien').setScale(0.4);

        var that = this;
        this.bAtras.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            that.scene.start("Menu");
        });
    }

    update(time, delta){
        if(this.leftObj.isDown){
            this.scene.start("Menu");
        }
        var ratonX = this.input.mousePointer.x;
        var ratonY = this.input.mousePointer.y;
        this.MoverMano(this.manoAlien, ratonX, ratonY);
    }

    MoverMano(mano, ratonX, ratonY){
        mano.x = ratonX + 50;
        if(ratonY > 230){
            mano.y = ratonY + 175;
        }
    }
}