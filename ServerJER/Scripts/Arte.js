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

        // Imagenes intro
        this.load.image('introUno', './Assets/introUno.jpg');
        this.load.image('introDos', './Assets/introDos.jpg'); 

        // Imagen suelo y pared
        this.load.image('escenarioSuelo', './Assets/escenarioSuelo.jpg');
        this.load.image('escenarioPared', './Assets/escenarioParedes.jpg'); 

        // Imagenes escenario 2
        this.load.image('escenarioDos', './Assets/escenarioDos.jpg');
        this.load.image('escenarioDosPlataformasClaro', './Assets/escenarioDosPlataformasClaro.jpg');
        this.load.image('escenarioDosPlataformasOscuro', './Assets/escenarioDosPlataformasOscuro.jpg');
        this.load.image('escenarioDosPlataformasClaroMitad', './Assets/escenarioDosPlataformasClaroMitad.jpg');
        this.load.image('escenarioDosPlataformasOscuroMitad', './Assets/escenarioDosPlataformasOscuroMitad.jpg');
        this.load.image('escenarioDosPlataformasClaroMitadDos', './Assets/escenarioDosPlataformasClaroMitadDos.jpg');
        this.load.image('escenarioDosPlataformasOscuroMitadDos', './Assets/escenarioDosPlataformasOscuroMitadDos.jpg');

        this.load.image('sky', './Assets/sky.png');
        this.load.image('ground', './Assets/platform.png');
        this.load.image('star', './Assets/star.png');
        this.load.image('bomb', './Assets/bomb.png');
        //this.load.spritesheet('dude', './Assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('swordI', './Assets/sword.png');
        //personje 1
        
        this.load.spritesheet('static', './Assets/static.png', { frameWidth: 40, frameHeight: 98 });
        this.load.spritesheet('staticEsp', './Assets/staticEsp.png', { frameWidth: 60, frameHeight: 98 });
        this.load.spritesheet('fastAt', './Assets/ataqueRapido.png', { frameWidth: 123, frameHeight: 98 });
        this.load.spritesheet('fastAt2', './Assets/ataqueRapido2.png', { frameWidth: 123, frameHeight: 98 });
        this.load.spritesheet('strongAt', './Assets/ataqueFuerte.png', { frameWidth: 130, frameHeight: 98 });
        this.load.spritesheet('strongAt2', './Assets/ataqueFuerte2.png', { frameWidth: 130, frameHeight: 98 });
        this.load.spritesheet('static2', './Assets/static2.png', { frameWidth: 40, frameHeight: 98 });
        this.load.spritesheet('staticEsp2', './Assets/staticEsp2.png', { frameWidth: 60, frameHeight: 98 });
        this.load.spritesheet('shield', './Assets/defence.png', { frameWidth: 62, frameHeight: 98 });
        this.load.spritesheet('run', './Assets/run.png', { frameWidth: 62, frameHeight: 98 });
        this.load.spritesheet('runS', './Assets/runS.png', { frameWidth: 62, frameHeight: 98 });
        this.load.spritesheet('runS2', './Assets/runS2.png', { frameWidth: 62, frameHeight: 98 });
        this.load.spritesheet('run2', './Assets/run2.png', { frameWidth: 62, frameHeight: 98 });
        this.load.spritesheet('punch', './Assets/punch.png', { frameWidth: 60, frameHeight: 98 });
        this.load.spritesheet('punchF', './Assets/punchF.png', { frameWidth: 60, frameHeight: 98 });
        this.load.spritesheet('punchF2', './Assets/punchF2.png', { frameWidth: 60, frameHeight: 98 });
        this.load.spritesheet('punch2', './Assets/punch2.png', { frameWidth: 60, frameHeight: 98 });


    }
    create(){
        this.add.image(700, 300, 'sky').setDisplaySize(1500,600);
        this.add.image(400, 300, 'star');
        //this.add.image(400, 500, 'swordI');
        
        //this.ground=this.add.image(700, 600, 'ground').setDisplaySize(1500,50);
        this.anims.create({
            key: 'staticR',
            frames: this.anims.generateFrameNumbers('static', { start: 0, end: 3 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'staticL',
            frames: this.anims.generateFrameNumbers('static', { start: 4, end: 8 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'staticSR',
            frames: this.anims.generateFrameNumbers('staticEsp', { start: 0, end: 4 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'staticSL',
            frames: this.anims.generateFrameNumbers('staticEsp', { start: 5, end: 9 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'staticSR2',
            frames: this.anims.generateFrameNumbers('staticEsp2', { start: 0, end: 3 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'staticSL2',
            frames: this.anims.generateFrameNumbers('staticEsp2', { start: 4, end: 7 }),
            frameRate: 1,
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
            key: 'runSR',
            frames: this.anims.generateFrameNumbers('runS', { start: 0, end: 9 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'runSL',
            frames: this.anims.generateFrameNumbers('runS', { start: 10, end: 19 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'runSR2',
            frames: this.anims.generateFrameNumbers('runS2', { start: 0, end: 9 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'runSL2',
            frames: this.anims.generateFrameNumbers('runS2', { start: 10, end: 19 }),
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
            key: 'punchFR',
            frames: this.anims.generateFrameNumbers('punchF', { start: 0, end: 4 }),
            frameRate: 6,
            repeat: 0
            
        });
        this.anims.create({
            key: 'punchFL',
            frames: this.anims.generateFrameNumbers('punchF', { start: 5, end: 9 }),
            frameRate: 6,
            repeat: 0
            
        });
        this.anims.create({
            key: 'punchFR2',
            frames: this.anims.generateFrameNumbers('punchF2', { start: 0, end: 4 }),
            frameRate: 6,
            repeat: 0
            
        });
        this.anims.create({
            key: 'punchFL2',
            frames: this.anims.generateFrameNumbers('punchF2', { start: 5, end: 9 }),
            frameRate: 6,
            repeat: 0
            
        });
        this.anims.create({
            key: 'punchL',
            frames: this.anims.generateFrameNumbers('punch', { start: 5, end: 9 }),
            frameRate: 8,
            repeat: 0
            
        });
        this.anims.create({
            key: 'punchR2',
            frames: this.anims.generateFrameNumbers('punch2', { start: 0, end: 4 }),
            frameRate: 8,
            repeat: 0
            
        });
        this.anims.create({
            key: 'punchL2',
            frames: this.anims.generateFrameNumbers('punch2', { start: 5, end: 9 }),
            frameRate: 8,
            repeat: 0
            
        });
        this.anims.create({
            key: 'fastR',
            frames: this.anims.generateFrameNumbers('fastAt', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: 0
            
        });
        this.anims.create({
            key: 'fastL',
            frames: this.anims.generateFrameNumbers('fastAt', { start: 4, end: 7 }),
            frameRate: 8,
            repeat: 0
            
        });
        this.anims.create({
            key: 'fastR2',
            frames: this.anims.generateFrameNumbers('fastAt2', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: 0
            
        });
        this.anims.create({
            key: 'fastL2',
            frames: this.anims.generateFrameNumbers('fastAt2', { start: 4, end: 7 }),
            frameRate: 8,
            repeat: 0
            
        });
        this.anims.create({
            key: 'strongR',
            frames: this.anims.generateFrameNumbers('strongAt', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: 0
            
        });
        this.anims.create({
            key: 'strongL',
            frames: this.anims.generateFrameNumbers('strongAt', { start: 8, end: 15 }),
            frameRate: 10,
            repeat: 0
            
        });
        this.anims.create({
            key: 'strongR2',
            frames: this.anims.generateFrameNumbers('strongAt2', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: 0
            
        });
        this.anims.create({
            key: 'strongL2',
            frames: this.anims.generateFrameNumbers('strongAt2', { start: 8, end: 15 }),
            frameRate: 10,
            repeat: 0
            
        });
        this.anims.create({
            key: 'staticR2',
            frames: this.anims.generateFrameNumbers('static2', { start: 0, end: 3 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'staticL2',
            frames: this.anims.generateFrameNumbers('static2', { start: 4, end: 8 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'runR2',
            frames: this.anims.generateFrameNumbers('run2', { start: 0, end: 9 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'runL2',
            frames: this.anims.generateFrameNumbers('run2', { start: 10, end: 19 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'punchR2',
            frames: this.anims.generateFrameNumbers('punch2', { start: 0, end: 4 }),
            frameRate: 8,
            repeat: 0
            
        });
        this.anims.create({
            key: 'punchL2',
            frames: this.anims.generateFrameNumbers('punch2', { start: 5, end: 9 }),
            frameRate: 8,
            repeat: 0
            
        });
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
        this.anims.create({
            key: 'shieldL2',
            frames: [ { key: 'shield', frame: 5 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'shieldR2',
            frames: [ { key: 'shield', frame: 4 } ],
            frameRate: 20
        });
    

        
        
    }
}
