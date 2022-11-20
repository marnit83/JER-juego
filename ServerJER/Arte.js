class Arte extends Phaser.Scene{
    constructor(){
        super({key:"Arte"});
    }
    preload(){
        this.load.on("complete", ()=>{
            this.scene.start("Nivel1");
            this.scene.start("Jugador");
            this.scene.start("Armas");
            this.scene.start("Arte");
        });
        this.load.image('sky', './Assets/sky.png');
        this.load.image('ground', './Assets/platform.png');
        this.load.image('star', './Assets/star.png');
        this.load.image('bomb', './Assets/bomb.png');
        this.load.spritesheet('dude', 
            './Assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }
    create(){
        this.add.image(700, 300, 'sky').setDisplaySize(1500,600);
        this.add.image(400, 300, 'star');
        this.ground=this.add.image(700, 600, 'ground').setDisplaySize(1500,50);
    }
}
