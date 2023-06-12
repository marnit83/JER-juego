class ControladorEscenas extends Phaser.Scene {
    constructor(){
        super({key: "ControladorEscenas"});
    }

    preload(){     
        // Niveles //
        this.scene.add("Ronda1", new Ronda1);   
        this.scene.add("Ronda1Online", new Ronda1Online);   
        this.scene.add("Ronda2", new Ronda2);
        this.scene.add("Ronda3", new Ronda3);     

        // Menús //
        this.scene.add("Pausa", new Pausa);
        this.scene.add("Controles", new Controles);  
        this.scene.add("Creditos", new Creditos);
        this.scene.add("Opciones", new Opciones); 
        this.scene.add("Inicio", new Inicio);

        // Inicio //  
        this.scene.add("Boot", new Boot);
        this.scene.add("Carga", new Carga);
        this.scene.add("Menu", new Menu);

        // Otros //
        this.scene.add("Historia", new Historia);    
        this.scene.add("SeleccionNivel", new SeleccionNivel);      
        this.scene.add("SeleccionModo", new SeleccionModo);
        this.scene.add("Online", new Online);
    }

    create(){
        this.leftObj = this.input.keyboard.addKey('LEFT');
        

        var that = this;
        this.input.on('pointerdown', function(pointer){
            that.scene.start("Boot");
        })
        
        this.time.addEvent({
            delay   : 500,
            callback: () => {this.scene.start("Boot"); },
            callbackScope: this
        })

    }

    update(time, delta){
        if(this.leftObj.isDown){
            this.scene.start("Menu");
        };

        
    }
}