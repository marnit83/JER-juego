class Historia extends Phaser.Scene {
    constructor(){
        super({key:"Historia"});
    }

    preload(){
        console.log("Historia cargada");
        this.load.image('IntroUno', './Assets/introUno.jpg');
        this.load.image('IntroDos', './Assets/introDos.jpg');
    }

    create(){
        this.textoHistoria2 = this.add.image(710,300, 'IntroDos');
        this.textoHistoria1 = this.add.image(710,300, 'IntroUno');
        //this.add.image(665, 300, 'MenuInicio').setDisplaySize(1500,600);
        var contador = 0;


        var that = this;
        this.input.on('pointerdown', function(pointer){
            that.textoHistoria1.visible = false;
            contador++;
            if(contador >1){
                that.scene.start("Nivel1");
                that.scene.start("Arte");
            }
        })
    }

}