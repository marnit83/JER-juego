class Historia extends Phaser.Scene {
    constructor(){
        super({key:"Historia"});
    }

    preload(){
        console.log("Comienza el modo historia");
    }

    create(){
        // Escape
        this.escObj = this.input.keyboard.addKey('ESC');
        
        // Fondos
        this.textoHistoria2 = this.add.image(710,300, 'introDos').setDisplaySize(1500,600).setScale(0.5);
        this.textoHistoria1 = this.add.image(710,300, 'introUno').setDisplaySize(1500,600).setScale(0.5);
        var contador = 0;

        // Botones
        this.bHistoria = this.add.image(1295, 520, 'botonHistoria').setInteractive();
        this.bHistoria.setScale(0.5);

        // Mano alien
        this.manoAlien = this.add.image(200,100, 'ManoAlien');

        // Interaccion botones
        var that = this;
        this.bHistoria.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            that.textoHistoria1.visible = false;
            contador++;
            if(contador >1){
                that.scene.start("Ronda1");
            }
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