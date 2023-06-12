class Menu extends Phaser.Scene {
    constructor(){
        super({key:"Menu"});
    }

    create(){
        console.log("Menu principal");
        fondoM.play();
        fondo1.stop();
        fondo2.stop();
        fondo3.stop();
        fondoV.stop();



        this.add.image(710, 300, 'escenaMenuNueva').setDisplaySize(1500,600).setScale(0.5);

        this.rightObj = this.input.keyboard.addKey('RIGHT');
        this.upObj = this.input.keyboard.addKey('UP');


        //BOTONES
        this.bJugar = this.add.image(573, 465, 'BJugar').setInteractive();
        this.bJugar.setScale(0.5);

        this.bSalir = this.add.image(845,465, 'BSalir').setInteractive();
        this.bSalir.setScale(0.5);

        this.bOpciones = this.add.image(437, 265, 'BOpciones').setInteractive();
        this.bOpciones.setScale(0.5);

        this.bControles = this.add.image(710, 265, 'BControles').setInteractive();
        this.bControles.setScale(0.5);
        
        this.bCreditos = this.add.image(980, 265, 'BCreditos').setInteractive();
        this.bCreditos.setScale(0.5);

        // Mano alien
        this.manoAlien = this.add.image(200,100, 'ManoAlien');


        //INTERACCION BOTONES
        var that = this;
        this.bJugar.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            that.scene.start("SeleccionModo");
        });
        this.bSalir.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            that.scene.start("Inicio");
        });
        this.bOpciones.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            escenaLlamadaMenu = "Menu";
            that.scene.start("Opciones");
        });
        this.bControles.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            escenaLlamadaMenu = "Menu";
            that.scene.start("Controles");
        });
        this.bCreditos.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            escenaLlamadaMenu = "Menu";
            that.scene.start("Creditos");
        });

        //this.scene.add("Controles", new Controles);
        //this.scene.start("Controles");
    }

    update(){
        if(this.rightObj.isDown){
            this.scene.start("Controles");
        }
        if(this.upObj.isDown){
            this.scene.start("Arte");
            this.scene.start("Nivel1");
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