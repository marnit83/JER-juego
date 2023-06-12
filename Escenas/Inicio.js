class Inicio extends Phaser.Scene {
    constructor(){
        super({key: "Inicio"});
    }

    preload(){
        console.log("Inicio cargado");        
    }

    create(){
        // Fondo
        this.add.image(710, 300, 'Inicio').setDisplaySize(1500,600).setScale(0.5);
        

        // Interacción botones
        var that = this;
        this.input.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            that.scene.start("Menu");
        })  
    }    
}