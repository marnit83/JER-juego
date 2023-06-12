class Controles extends Phaser.Scene {
    constructor(){
        super({key: "Controles"});
    }

    preload(){
        console.log("Controles cargado");
    }

    create(){
        // Escape
        this.escObj = this.input.keyboard.addKey('ESC');
        
        // Fondo
        this.add.image(710, 300, 'Controles').setDisplaySize(1500,600).setScale(0.5);

        // Botones
        this.bAtras = this.add.image(710, 520, 'BAtras').setInteractive();
        this.bAtras.setScale(0.5);

        // Mano alien
        this.manoAlien = this.add.image(200,100, 'ManoAlien');

        // Se puede quitar
        console.log(escenaLlamadaMenu);
        // Se puede quitar 

        // Interacción botones
        var that = this;
        this.bAtras.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            that.scene.start(escenaLlamadaMenu);
        });
    }

    update(time, delta){
        if(this.escObj.isDown){
            this.scene.start(escenaLlamadaMenu);
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