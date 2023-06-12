class Boot extends Phaser.Scene {
    constructor(){
        super({key: "Boot"});
    }

    preload()
    {
      //  this.load.image('TextoReanudar', './Assets/TextoReanudar.png');
      //  this.load.image('TextoEmpezar', './Assets/TextoEmpezar.png');
    }

    create()
    {
        
        this.scene.start('Carga');
    }

    update()
    {

    }
}