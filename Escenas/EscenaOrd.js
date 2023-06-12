class EscenaOrd extends Phaser.Scene {
    constructor(){
        super({key: "EscenaOrd"});
    }

    preload(){
        console.log("EscenaOrd");
        
        this.scene.add("Menu", new Menu);
        this.scene.add("Controles", new Controles);
        this.scene.add("Arte", new Arte);
        this.scene.add("Nivel1", new Nivel1);
        this.scene.add("Historia", new Historia);
    }

    create(){
        this.leftObj = this.input.keyboard.addKey('LEFT');

        var that = this;
        this.input.on('pointerdown', function(pointer){
            console.log("eo");
            that.scene.start("Menu");
        })
    }

    update(time, delta){
        if(this.leftObj.isDown){
            this.scene.start("Menu");
        };

        
    }
}