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
        //this.load.spritesheet('dude', './Assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        //personje 1
        
        this.load.spritesheet('dude', './Assets/static.png', { frameWidth: 40, frameHeight: 98 });
        this.load.spritesheet('shield', './Assets/defence.png', { frameWidth: 62, frameHeight: 98 });
        this.load.spritesheet('run', './Assets/run.png', { frameWidth: 62, frameHeight: 98 });
        this.load.spritesheet('punch', './Assets/punch.png', { frameWidth: 60, frameHeight: 98 });
    }
    create(){
        this.add.image(700, 300, 'sky').setDisplaySize(1500,600);
        this.add.image(400, 300, 'star');
        
        //this.ground=this.add.image(700, 600, 'ground').setDisplaySize(1500,50);
        this.anims.create({
            key: 'staticR',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'staticL',
            frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 8 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'runR',
            frames: this.anims.generateFrameNumbers('run', { start: 0, end: 9 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'runL',
            frames: this.anims.generateFrameNumbers('run', { start: 10, end: 19 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'punchR',
            frames: this.anims.generateFrameNumbers('punch', { start: 0, end: 4 }),
            frameRate: 8,
            repeat: 0
            
        });
        this.anims.create({
            key: 'punchL',
            frames: this.anims.generateFrameNumbers('punch', { start: 5, end: 9 }),
            frameRate: 8,
            repeat: 0
            
        });
        // this.anims.create({
        //     key: 'shieldR',
        //     frames: this.anims.generateFrameNumbers('shield', { start: 0, end: 1 }),
        //     frameRate: 4,
        //     repeat: 0
        // });
        // this.anims.create({
        //     key: 'shieldL',
        //     frames: this.anims.generateFrameNumbers('shield', { start: 2, end: 3 }),
        //     frameRate: 4,
        //     repeat: 0
        // });
        this.anims.create({
            key: 'shieldL',
            frames: [ { key: 'shield', frame: 3 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'shieldR',
            frames: [ { key: 'shield', frame: 1 } ],
            frameRate: 20
        });
    

        
        
    }
}
