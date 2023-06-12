// Variable que almacena la clase que llama al menú de pausa
var escenaLlamada;

// Variable que almacena la clase que llama al menú
var escenaLlamadaMenu;

//VARIABLES PARA SONIDO
var escudo;
var golpef;
var golpefE;
var hitSound;
var lanzar;
var esp;
var punch;
var run;
var fondo1;
var fondo2;
var fondoM;
var fondoV;
var fondo3;
var stun;
var jump;
class Carga extends Phaser.Scene 
{
    constructor(){
        super({key: 'Carga'});
    }

    init()
    {
        //VARIABLES GLOABLES
    }

    preload()
    {        
        // Barra de carga
        this.crearBarraCarga();
        
        // Mano
        this.load.image('ManoAlien', './JER-juego/ServerJER/Assets/Arte/manoAlien.png')
      
        // Escenas
        this.load.image('escenaMenuNueva', './JER-juego/ServerJER/Assets/UI/Escenas/escenaMenu 3.jpg');
        this.load.image('Inicio', './JER-juego/ServerJER/Assets/UI/Escenas/escenaCarga.jpg');
        this.load.image('escenaCarga', './JER-juego/ServerJER/Assets/UI/Escenas/escenaCarga.png');
        this.load.image('escenaPausa', './JER-juego/ServerJER/Assets/UI/Escenas/escenaPausa.jpg');
        this.load.image('escenaCreditos', './JER-juego/ServerJER/Assets/UI/Escenas/escenaCreditos.jpg');
        this.load.image('Controles', './JER-juego/ServerJER/Assets/UI/Escenas/escenaControles.jpg');
        this.load.image('Opciones', './JER-juego/ServerJER/Assets/UI/Escenas/escenaOpciones.jpg');  
        this.load.image('escenaOnline', './JER-juego/ServerJER/Assets/UI/Escenas/escenaOnline.jpg');              
        this.load.image('escenaSeleccionModo', './JER-juego/ServerJER/Assets/UI/Escenas/escenaSeleccionModo.jpg');          
        this.load.image('escenaSeleccionNivel', './JER-juego/ServerJER/Assets/UI/Escenas/escenaSeleccionNivel.jpg');   
        this.load.image('escenaVictoriaJ1', './JER-juego/ServerJER/Assets/UI/Escenas/escenaVictoriaJ1.png');     
        this.load.image('escenaVictoriaJ2', './JER-juego/ServerJER/Assets/UI/Escenas/escenaVictoriaJ2.png');  

        // Botones        
        this.load.image('BJugar', './JER-juego/ServerJER/Assets/UI/Botones/BotonJugar.png');
        this.load.image('BSalir', './JER-juego/ServerJER/Assets/UI/Botones/BotonSalir.png');
        this.load.image('BOpciones', './JER-juego/ServerJER/Assets/UI/Botones/BotonOpciones.png');
        this.load.image('BControles', './JER-juego/ServerJER/Assets/UI/Botones/BotonControles.png');
        this.load.image('BCreditos', './JER-juego/ServerJER/Assets/UI/Botones/botonCreditos.png');        
        this.load.image('BAtras', './JER-juego/ServerJER/Assets/UI/Botones/botonAtras.png');
        this.load.image('botonPausa', './JER-juego/ServerJER/Assets/UI/Botones/botonPausa.png');
        this.load.image('botonOnline', './JER-juego/ServerJER/Assets/UI/Botones/botonOnline.png');
        this.load.image('botonHistoria', './JER-juego/ServerJER/Assets/UI/Botones/botonAvanzar.png');
        this.load.image('BVolverPartida', './JER-juego/ServerJER/Assets/UI/Botones/botonVolverPartida.png');
        this.load.image('botonNivelUno', './JER-juego/ServerJER/Assets/UI/Botones/botonNivelUno.png');
        this.load.image('botonNivelDos', './JER-juego/ServerJER/Assets/UI/Botones/botonNivelDos.png');
        this.load.image('botonNivelTres', './JER-juego/ServerJER/Assets/UI/Botones/botonNivelTres.png');
        this.load.image('botonModoOnline', './JER-juego/ServerJER/Assets/UI/Botones/botonModoOnline.png');
        this.load.image('botonModoHistoria', './JER-juego/ServerJER/Assets/UI/Botones/botonModoHistoria.png');
        this.load.image('botonModoSeleccion', './JER-juego/ServerJER/Assets/UI/Botones/botonModoSeleccion.png');

        // Audio
        this.load.audio('BAudio', './JER-juego/ServerJER/Assets/Sonido/botonSonido.wav');
        this.load.audio('hit', './JER-juego/ServerJER/Assets/Sonido/golpe.wav');
        this.load.audio('lan', './JER-juego/ServerJER/Assets/Sonido/lanzar.mp3');
        this.load.audio('esp', './JER-juego/ServerJER/Assets/Sonido/espada1.mp3');
        this.load.audio('punch', './JER-juego/ServerJER/Assets/Sonido/punch.mp3');
        this.load.audio('run', './JER-juego/ServerJER/Assets/Sonido/correr.mp3');
        this.load.audio('fondo1', './JER-juego/ServerJER/Assets/Sonido/fondo.mp3');
        this.load.audio('fondo2', './JER-juego/ServerJER/Assets/Sonido/maya.mp3');
        this.load.audio('fondoM', './JER-juego/ServerJER/Assets/Sonido/musicaalien.mp3');
        this.load.audio('fondoV', './JER-juego/ServerJER/Assets/Sonido/fondoMenu.mp3');
        this.load.audio('fondo3', './JER-juego/ServerJER/Assets/Sonido/fondo3.mp3');
        this.load.audio('stun', './JER-juego/ServerJER/Assets/Sonido/stun.mp3');
        this.load.audio('jump', './JER-juego/ServerJER/Assets/Sonido/jump.wav');
        this.load.audio('golpeF', './JER-juego/ServerJER/Assets/Sonido/GolpeF.mp3');
        this.load.audio('golpeFE', './JER-juego/ServerJER/Assets/Sonido/GolpeFE.mp3');
        this.load.audio('escudo', './JER-juego/ServerJER/Assets/Sonido/Escudo.mp3');


        // Imagenes historia
        this.load.image('introUno', './JER-juego/ServerJER/Assets/UI/Escenas/escenaHistoria1.jpg');
        this.load.image('introDos', './JER-juego/ServerJER/Assets/UI/Escenas/escenaHistoria2.jpg');
        
        // Imagenes para todos los escenarios
        this.load.image('escenarioSuelo', './JER-juego/ServerJER/Assets/Arte/escenarioSuelo.jpg');
        this.load.image('escenarioPared', './JER-juego/ServerJER/Assets/Arte/escenarioParedes.jpg'); 

        // Imagenes escenario 1
        this.load.image('escenarioUno', './JER-juego/ServerJER/Assets/Arte/escenarioUno.jpg');
        this.load.image('escenarioUnoPlataformas', './JER-juego/ServerJER/Assets/Arte/escenarioUnoPlataformas.jpg');
        this.load.image('escenarioUnoPlataformasDos', './JER-juego/ServerJER/Assets/Arte/escenarioUnoPlataformasDos.jpg');
        
        // Imagenes escenario 2
        this.load.image('escenarioDos', './JER-juego/ServerJER/Assets/Arte/escenarioDos.jpg');
        this.load.image('escenarioDosPlataformasClaro', './JER-juego/ServerJER/Assets/Arte/escenarioDosPlataformasClaro.jpg');
        this.load.image('escenarioDosPlataformasOscuro', './JER-juego/ServerJER/Assets/Arte/escenarioDosPlataformasOscuro.jpg');
        this.load.image('escenarioDosPlataformasClaroMitad', './JER-juego/ServerJER/Assets/Arte/escenarioDosPlataformasClaroMitad.jpg');
        this.load.image('escenarioDosPlataformasOscuroMitad', './JER-juego/ServerJER/Assets/Arte/escenarioDosPlataformasOscuroMitad.jpg');
        this.load.image('escenarioDosPlataformasClaroMitadDos', './JER-juego/ServerJER/Assets/Arte/escenarioDosPlataformasClaroMitadDos.jpg');
        this.load.image('escenarioDosPlataformasOscuroMitadDos', './JER-juego/ServerJER/Assets/Arte/escenarioDosPlataformasOscuroMitadDos.jpg');

        // Imagenes escenario 3
        this.load.image('escenarioTres', './JER-juego/ServerJER/Assets/Arte/escenarioTres.jpg');
        this.load.image('escenarioTresPlataformas', './JER-juego/ServerJER/Assets/Arte/escenarioTresPlataformas.jpg');        
        this.load.image('escenarioTresPlataformasDos', './JER-juego/ServerJER/Assets/Arte/escenarioTresPlataformasDos.jpg');

        // Arma y UI
        this.load.image('ground', './JER-juego/ServerJER/Assets/Arte/platform.png');
        this.load.image('swordI', './JER-juego/ServerJER/Assets/Arte/sword.png');
        this.load.image('inGameUI', './JER-juego/ServerJER/Assets/UI/Escenas/inGameUI.png');


        // Animaciones
        this.load.spritesheet('static', './JER-juego/ServerJER/Assets/Animaciones/static.png', { frameWidth: 40, frameHeight: 98 });
        this.load.spritesheet('staticEsp', './JER-juego/ServerJER/Assets/Animaciones/staticEsp.png', { frameWidth: 60, frameHeight: 98 });
        this.load.spritesheet('fastAt', './JER-juego/ServerJER/Assets/Animaciones/ataqueRapido.png', { frameWidth: 123, frameHeight: 98 });
        this.load.spritesheet('fastAt2', './JER-juego/ServerJER/Assets/Animaciones/ataqueRapido2.png', { frameWidth: 123, frameHeight: 98 });
        this.load.spritesheet('strongAt', './JER-juego/ServerJER/Assets/Animaciones/ataqueFuerte.png', { frameWidth: 130, frameHeight: 98 });
        this.load.spritesheet('strongAt2', './JER-juego/ServerJER/Assets/Animaciones/ataqueFuerte2.png', { frameWidth: 130, frameHeight: 98 });
        this.load.spritesheet('static2', './JER-juego/ServerJER/Assets/Animaciones/static2.png', { frameWidth: 40, frameHeight: 98 });
        this.load.spritesheet('staticEsp2', './JER-juego/ServerJER/Assets/Animaciones/staticEsp2.png', { frameWidth: 60, frameHeight: 98 });
        this.load.spritesheet('shield', './JER-juego/ServerJER/Assets/Animaciones/defence.png', { frameWidth: 62, frameHeight: 98 });
        this.load.spritesheet('run', './JER-juego/ServerJER/Assets/Animaciones/run.png', { frameWidth: 62, frameHeight: 98 });
        this.load.spritesheet('runS', './JER-juego/ServerJER/Assets/Animaciones/runS.png', { frameWidth: 62, frameHeight: 98 });
        this.load.spritesheet('runS2', './JER-juego/ServerJER/Assets/Animaciones/runS2.png', { frameWidth: 62, frameHeight: 98 });
        this.load.spritesheet('run2', './JER-juego/ServerJER/Assets/Animaciones/run2.png', { frameWidth: 62, frameHeight: 98 });
        this.load.spritesheet('punch', './JER-juego/ServerJER/Assets/Animaciones/punch.png', { frameWidth: 60, frameHeight: 98 });
        this.load.spritesheet('punchF', './JER-juego/ServerJER/Assets/Animaciones/punchF.png', { frameWidth: 60, frameHeight: 98 });
        this.load.spritesheet('punchF2', './JER-juego/ServerJER/Assets/Animaciones/punchF2.png', { frameWidth: 60, frameHeight: 98 });
        this.load.spritesheet('punch2', './JER-juego/ServerJER/Assets/Animaciones/punch2.png', { frameWidth: 60, frameHeight: 98 });
        this.load.spritesheet('herido', './JER-juego/ServerJER/Assets/Animaciones/herido.png', { frameWidth: 68, frameHeight: 98 });
        this.load.spritesheet('herido2', './JER-juego/ServerJER/Assets/Animaciones/herido2.png', { frameWidth: 68, frameHeight: 98 });
        this.load.spritesheet('muerte', './JER-juego/ServerJER/Assets/Animaciones/muerte.png', { frameWidth: 110, frameHeight: 98 });
        this.load.spritesheet('muerte2', './JER-juego/ServerJER/Assets/Animaciones/muerte2.png', { frameWidth: 110, frameHeight: 98 });
    }

    create()
    {

        console.log("CARGANDO...");
        

        //SONIDO
        hitSound = this.sound.add('hit', { volume: 0.4 });
        lanzar = this.sound.add('lan', { loop: false });
        esp = this.sound.add('esp', { volume: 0.1 });
        punch = this.sound.add('punch', { volume: 0.3 });
        run = this.sound.add('run');
        stun = this.sound.add('stun');
        jump = this.sound.add('jump');
        golpef = this.sound.add('golpeF', { volume: 0.3 });
        golpefE = this.sound.add('golpeFE', { volume: 0.3 });
        escudo = this.sound.add('escudo');
        fondo1 = this.sound.add('fondo1', { volume: 0.3, loop: true });
        fondo2 = this.sound.add('fondo2', { volume: 0.6, loop: true });
        fondoM = this.sound.add('fondoM', { volume: 0.3, loop: true });
        fondoV = this.sound.add('fondoV', { volume: 0.3, loop: true });
        fondo3 = this.sound.add('fondo3', { volume: 0.3, loop: true });

        //ANIMACIONES
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
            frameRate: 24,   //estaba a 8
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
            frameRate: 24,
            repeat: 0
            
        });
        this.anims.create({
            key: 'punchR2',
            frames: this.anims.generateFrameNumbers('punch2', { start: 0, end: 4 }),
            frameRate: 24,
            repeat: 0
            
        });
        this.anims.create({
            key: 'punchL2',
            frames: this.anims.generateFrameNumbers('punch2', { start: 5, end: 9 }),
            frameRate: 24,
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
            frames: this.anims.generateFrameNumbers('strongAt', { start: 0, end: 8 }),
            frameRate: 8,
            repeat: 0
            
        });
        this.anims.create({
            key: 'strongL',
            frames: this.anims.generateFrameNumbers('strongAt', { start: 9, end: 17 }),
            frameRate: 8,
            repeat: 0
            
        });
        this.anims.create({
            key: 'strongR2',
            frames: this.anims.generateFrameNumbers('strongAt2', { start: 0, end: 8 }),
            frameRate: 8,
            repeat: 0
            
        });
        this.anims.create({
            key: 'strongL2',
            frames: this.anims.generateFrameNumbers('strongAt2', { start: 9, end: 17 }),
            frameRate: 8,
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
            key: 'stunL',
            frames: [ { key: 'shield', frame: 9 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'stunR',
            frames: [ { key: 'shield', frame: 8 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'stunR2',
            frames: [ { key: 'shield', frame: 7 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'stunL2',
            frames: [ { key: 'shield', frame: 6 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'heridoR',
            frames: this.anims.generateFrameNumbers('herido', { start: 0, end: 5 }),
            frameRate: 3,
            repeat: 0
        });
        this.anims.create({
            key: 'heridoL',
            frames: this.anims.generateFrameNumbers('herido', { start: 6, end: 11 }),
            frameRate: 3,
            repeat: 0
        });
        this.anims.create({
            key: 'heridoReposoR',
            frames: [ { key: 'herido', frame: 11 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'heridoReposoL',
            frames: [ { key: 'herido', frame: 5 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'heridoR2',
            frames: this.anims.generateFrameNumbers('herido2', { start: 0, end: 5 }),
            frameRate: 3,
            repeat: 0
        });
        this.anims.create({
            key: 'heridoL2',
            frames: this.anims.generateFrameNumbers('herido2', { start: 6, end: 11 }),
            frameRate: 3,
            repeat: 0
        });
        this.anims.create({
            key: 'heridoReposoR2',
            frames: [ { key: 'herido2', frame: 11 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'heridoReposoL2',
            frames: [ { key: 'herido2', frame: 5 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'hitR',
            frames: [ { key: 'herido', frame: 12 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'hitL',
            frames: [ { key: 'herido', frame: 13 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'muerteR',
            frames: this.anims.generateFrameNumbers('muerte', { start: 0, end: 6 }),
            frameRate: 4,
            repeat: 0
        });
        this.anims.create({
            key: 'muerteFR',
            frames: [ { key: 'muerte', frame: 6 } ],
            frameRate: 4,
            repeat: 0
        });
        this.anims.create({
            key: 'muerteL',
            frames: this.anims.generateFrameNumbers('muerte', { start: 7, end: 13 }),
            frameRate: 4,
            repeat: 0
        });
        this.anims.create({
            key: 'muerteFL',
            frames: [ { key: 'muerte', frame: 13 } ],
            frameRate: 4,
            repeat: 0
        });
        this.anims.create({
            key: 'muerteR2',
            frames: this.anims.generateFrameNumbers('muerte2', { start: 0, end: 6 }),
            frameRate: 4,
            repeat: 0
        });
        this.anims.create({
            key: 'muerteFR2',
            frames: [ { key: 'muerte2', frame: 6 } ],
            frameRate: 4,
            repeat: 0
        });
        this.anims.create({
            key: 'muerteL2',
            frames: this.anims.generateFrameNumbers('muerte2', { start: 7, end: 13 }),
            frameRate: 4,
            repeat: 0
        });
        this.anims.create({
            key: 'muerteFL2',
            frames: [ { key: 'muerte2', frame: 13 } ],
            frameRate: 4,
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


        console.log("Escena inicial y resto de escenas cargadas");
        
        var that = this;
        this.input.on('pointerdown', function(pointer){
            that.sound.play('BAudio', {volume: 0.2});
            that.scene.start("Menu");
        })
       
        // Sustituido el delay por un click en la escena inicial
        /*
        //ESTE EVENTO RETRASA UN POCO IR AL MENU PARA QUE SE VEA LA PANTALLA DE CARGA
        this.time.addEvent({
            delay   : 600,
            callback: () => {this.scene.start("Menu"); },
            callbackScope: this
        })
        */


       
        // Imagen inicial
        this.add.image(710, 300, 'escenaCarga').setDisplaySize(1500,600).setScale(0.5);
    }
   
    crearBarraCarga(){      
        //EVENTO
        this.load.on("progress", this.onProgress, this);
    }

    //evento que se ejecuta cada vez que se carga un elemento, phaser envia un valor que va subiendo de 0 -> 1 a medida que se cargan los elementos
    onProgress(val){
        this.barraCarga = this.add.rectangle(700, 450, 1000*val, 150, 0x7ffda0);
    }
}