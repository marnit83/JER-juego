class Menu extends Phaser.Scene {
    constructor(){
        super({key:"Menu"});
    }

    preload(){
        console.log("Menu cargado");

        this.load.image('MenuInicio', './Assets/MENU_INICIO.png');
        this.load.image('ground', './Assets/platform.png');
        this.load.image('BJugar', './Assets/BotonJugar.png');
        this.load.image('BSalir', './Assets/BotonSalir.png');
        this.load.image('BOpciones', './Assets/BotonOpciones.png');
        this.load.image('BControles', './Assets/BotonControles.png');
        this.load.image('BCreditos', './Assets/BotonCredito.png');
        this.load.image('ManoAlien', './Assets/MANO.png')
        this.load.audio('BAudio', './Assets/botonSonido.wav');
    }

    create(){
        //IMAGEN MENU
        this.add.image(665, 300, 'MenuInicio').setDisplaySize(1500,600);

        this.rightObj = this.input.keyboard.addKey('RIGHT');
        this.upObj = this.input.keyboard.addKey('UP');


        //BOTONES
        this.bJugar = this.add.image(699, 460, 'BJugar').setInteractive();
        this.bJugar.setScale(0.5);

        this.bSalir = this.add.image(1027,270, 'BSalir').setInteractive();
        this.bSalir.setScale(0.52);

        this.bOpciones = this.add.image(375, 270, 'BOpciones').setInteractive();
        this.bOpciones.setScale(0.52);

        this.bControles = this.add.image(515, 385, 'BControles').setInteractive();
        this.bControles.setScale(0.52);
        
        this.bCreditos = this.add.image(882, 385, 'BCreditos').setInteractive();
        this.bCreditos.setScale(0.52);

        //Mano Alienigena
        this.manoAlien = this.add.image(200,100, 'ManoAlien').setScale(0.4);


        //INTERACCION BOTONES
        var that = this;
        this.bJugar.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            that.scene.start("Nivel1");
            that.scene.start("Arte");
        });
        this.bSalir.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            console.log(":(");
        });
        this.bOpciones.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            console.log(":)");
        });
        this.bControles.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            that.scene.start("Controles");
        });
        this.bCreditos.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            console.log("creditos");
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
        mano.x = ratonX + 50;
        if(ratonY > 230){
            mano.y = ratonY + 175;
        }
    }
}