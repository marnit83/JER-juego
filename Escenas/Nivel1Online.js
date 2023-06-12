var s1 = 0;//variqble controla shield
var s2 = 0;
var p1 = 0;//punch
var p2 = 0;
var p3 = 0;
var p4 = 0;
var dir = 0;
var dir2 = 0;
//var this.player;
//var this.player2;
//var arma;
var st = false;
var st2 = false;
// var arma=false;
// var this.player2.armaJose=false;
class Nivel1Online extends Phaser.Scene {
    constructor() {
        super({ key: "Nivel1Online" });

        var that = this;

        this.playerLocal = new Jugador(this, 150, 450, 'static', 'D', 'A', 'W', 'S', 'C', 'V', 'B', p1);
        this.playerNet = new Jugador(this, 1050, 450, 'static2', 'RIGHT', 'LEFT', 'UP', 'DOWN', 'I', 'O', 'P', p3);
        // Envío de datos
        // this.sendPlayerData = function () {
        //     if (that.playerLocal != undefined) {
        //         let a = that.playerLocal.x, b = that.playerLocal.y;
        //         let v_x = that.playerLocal.body.velocity.x, v_y = that.playerLocal.body.velocity.y;
        //         let pkg = {
        //             x: a,
        //             y: b,
        //             vX: v_x,
        //             vY: v_y,
        //             Hp: that.playerNet.vida,
        //             s1: s1,
        //             p1: p1,
        //             pnp1: that.playerLocal.p1,
        //             p2: p2,
        //             dir1: dir1,
        //             st1: st1,
        //             armaJose: that.playerLocal.armaJose,
        //             // anim: that.playerLocal.anims.currentAnim.key,
        //             // frame: that.playerLocal.anims.currentFrame.index
        //         }
        //         //console.log(pkg);
        //         Game_WebSocket.prototype.sendMessage(pkg, "playerData")
        //     }
        // }

        this.sendImperative = function () {
            if (that.playerLocal != undefined) {
                let pkg = {
                    anim: that.playerLocal.anims.currentAnim.key,
                    frame: that.playerLocal.anims.currentFrame.index
                }
                //console.log(pkg);
                Game_WebSocket.prototype.sendMessage(pkg, "imp")
            }
        }

        // Recepción de datos
        // this.processPlayerData = function (pkg) {
        //     that.playerNet.x = pkg.x;
        //     that.playerNet.y = pkg.y;
        //     that.playerNet.body.setVelocityX(pkg.vX);
        //     that.playerNet.body.setVelocityY(pkg.vY);
        //     that.playerLocal.vida = pkg.Hp;
        //     s2 = pkg.s1;
        //     p3 = pkg.p1;
        //     that.playerNet.p1 = pkg.pnp1;
        //     p4 = pkg.p2;
        //     dir2 = pkg.dir1;
        //     st2 = pkg.st1;
        //     that.playerNet.armaJose = pkg.armaJose;
        // }

        //   this.processImperative = function(pkg) {
        //     that.playerNet.anims.play(pkg.anim);
        //     that.playerNet.anims.setCurrentFrame(that.playerNet.anims.currentAnim.frames[pkg.frame]);
        //   }

        // Envío de datos
this.sendPlayerData = function () {
    if (that.playerLocal != undefined) {
      let a = that.playerLocal.x, b = that.playerLocal.y;
      let v_x = that.playerLocal.body.velocity.x, v_y = that.playerLocal.body.velocity.y;
      let pkg = {
        x: a,
        y: b,
        vX: v_x,
        vY: v_y,
        Hp: that.playerLocal.vida,
        s1:s1,
        p1:p1,
        pnp1:that.playerLocal.p1,
        p2:p2,
        dir:dir,
        st:st,
        armaJose:that.playerLocal.armaJose,
        anim: that.playerLocal.anims.currentAnim.key, // Add current animation
        frame: that.playerLocal.anims.currentFrame.index // Add current frame
      }
      Game_WebSocket.prototype.sendMessage(pkg, "playerData")
    }
  }
  
  this.processPlayerData = function (pkg) {
    that.playerNet.x = pkg.x;
    that.playerNet.y = pkg.y;
    that.playerNet.body.setVelocityX(pkg.vX);
    that.playerNet.body.setVelocityY(pkg.vY);
    that.playerNet.vida = pkg.Hp; 
    s2=pkg.s1;
    p3=pkg.p1;
    that.playerNet.p1=pkg.pnp1;
    p4=pkg.p2;
    dir2=pkg.dir;
    st2=pkg.st;
    that.playerNet.armaJose=pkg.armaJose;
    
    if (pkg.anim) { // Check if an animation key was received
      that.playerNet.anims.play(pkg.anim, true); // Play received animation
    }
  }
  


        Game_WebSocket.prototype.setGame(this);
    }

    setMeFromOutside() {
        Game_WebSocket.prototype.setGame(this);
    }

    preload() {
        this.load.image('TextoReanudar', '/JER-juego/ServerJER/Assets/TextoReanudar.png');
        this.load.image('TextoSalir', '/JER-juego/ServerJER/Assets/TextoSalir.png');

        //this.load.audio('Musica', './Assets/MusicaJuego.mp3');
    }
    create() {

        // Añadimos fondo
        // this.musica = this.sound.add('Musica', {volume: 0.2});
        // this.musica.play();

        console.log("barra1");
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x808080);
        this.graphics.fillRoundedRect(160, 563, 315, 20, 2);
        this.graphics.fillStyle(0x00ff00);
        this.graphics.fillRoundedRect(160, 563, 315, 20, 2);

        console.log("barra2");
        this.graphics1 = this.add.graphics();
        this.graphics1.fillStyle(0x808080);
        this.graphics1.fillRoundedRect(945, 563, 315, 20, 2);
        this.graphics1.fillStyle(0x00ff00);
        this.graphics1.fillRoundedRect(945, 563, 315, 20, 2);

        this.texto = this.add.image(300, 180, 'TextoReanudar');
        this.texto.visible = false;

        // Añadimos suelo (invisible)
        this.suelo = new Plataformas(this, 700, 555, 'escenarioSuelo').setDisplaySize(1500, 50);
        this.suelo.alpha = 0;

        // Añadimos plataformas
        this.plataforma1 = new Plataformas(this, 520, 430, 'escenarioDosPlataformasClaroMitadDos');
        this.plataforma2 = new Plataformas(this, 920, 430, 'escenarioDosPlataformasOscuroMitadDos');
        this.plataforma3 = new Plataformas(this, 1300, 295, 'escenarioDosPlataformasOscuro');
        this.plataforma4 = new Plataformas(this, 820, 185, 'escenarioDosPlataformasOscuroMitad');
        this.plataforma5 = new Plataformas(this, 140, 295, 'escenarioDosPlataformasClaro');
        this.plataforma6 = new Plataformas(this, 620, 185, 'escenarioDosPlataformasClaroMitad');




        //Colision entre jugador y terreno





        this.arma = new Armas(this, 700, 120, "swordI", 5);

        //this.terreno= new Plataformas(this,700,600,'ground').setDisplaySize(1500,50);

        this.cObj = this.input.keyboard.addKey("C");
        this.sObj = this.input.keyboard.addKey("S");
        this.iObj = this.input.keyboard.addKey("I");
        this.oObj = this.input.keyboard.addKey("O");

        this.vObj = this.input.keyboard.addKey("V");
        this.arrowDownObj = this.input.keyboard.addKey("ArrowDown");
        this.tPressed = this.input.keyboard.addKey('t');
        // this.downObj = scene.input.keyboard.addKey(abajo);

        //Colision entre jugador y arma
        this.physics.add.collider(this.playerLocal, this.arma, this.PegarDistancia, null, this);
        this.physics.add.collider(this.playerNet, this.arma, this.PegarDistancia, null, this);

        this.physics.add.collider(this.playerLocal, this.arma, this.CogeArma, null, this);
        this.physics.add.collider(this.playerNet, this.arma, this.CogeArma, null, this);

        //Colision entre jugador y terreno
        this.AddCollider(this.suelo);
        this.AddCollider(this.plataforma1);
        this.AddCollider(this.plataforma2);
        this.AddCollider(this.plataforma3);
        this.AddCollider(this.plataforma4);
        this.AddCollider(this.plataforma5);
        this.AddCollider(this.plataforma6);

        //Colision entre jugador y jugador2
        this.physics.add.collider(this.playerLocal, this.playerNet, this.Golpea, null, this);
        this.physics.add.collider(this.playerNet, this.playerLocal, this.Golpea, null, this);
        //Colision entre arma y terreno
        this.physics.add.collider(this.arma, this.terreno, null, null, this);

        //console.log(Phaser.Input.Keyboard.KeyCodes);
        this.texto = this.add.image(300, 180, 'TextoReanudar');
        this.texto.visible = false;
        Game_WebSocket.prototype.setGame(this);

        // const DELAY_TIME = 500;

        // const actions = {
        // 'punchRight': {
        //     button: this.cObj,
        //     localPlayer: this.playerLocal,
        //     netPlayer: this.playerNet,
        //     localAnim: 'punchR',
        //     netAnim: 'punchR2',
        //     delay: DELAY_TIME
        // },
        // 'punchLeft': {
        //     button: this.cObj,
        //     localPlayer: this.playerLocal,
        //     netPlayer: this.playerNet,
        //     localAnim: 'punchL',
        //     netAnim: 'punchL2',
        //     delay: DELAY_TIME
        // },
        // 'strongRight': {
        //     button: this.vObj,
        //     localPlayer: this.playerLocal,
        //     netPlayer: this.playerNet,
        //     localAnim: 'strongR',
        //     netAnim: 'strongR2',
        //     delay: DELAY_TIME * 1.6
        // },
        // 'strongLeft': {
        //     button: this.vObj,
        //     localPlayer: this.playerLocal,
        //     netPlayer: this.playerNet,
        //     localAnim: 'strongL',
        //     netAnim: 'strongL2',
        //     delay: DELAY_TIME * 1.6
        // },
        // 'shield': {
        //     button: this.sObj,
        //     localPlayer: this.playerLocal,
        //     netPlayer: this.playerNet,
        //     localAnim: 'shieldR',
        //     netAnim: 'shieldR2',
        //     delay: DELAY_TIME * 2
        // }
        // };
    }

    AddCollider(objeto) {
        this.physics.add.collider(this.playerLocal, objeto, null, null, this);
        this.physics.add.collider(this.playerNet, objeto, null, null, this);
    }

    update(time, delta) {


        this.playerLocal.Controles()
        this.playerNet.Controles()

        if (this.cObj.isDown && p1 == 0 && s1 == 0 && st == false) {
            p1 = 1;
            this.playerLocal.p1 = 1;
            //prueba.setVelocityX(10);
            if (this.playerLocal.armaJose) {
                this.playerLocal.anims.play('fastR', true);
                this.sendImperative();
            }
            else {
                this.playerLocal.anims.play('punchR', true);
                this.sendImperative();
            }


            const myTimeout = setTimeout(pausaPD, 500);
            p2 = 1;
            const myTimeout2 = setTimeout(movPunch, 500);

        }
        else if (this.cObj.isDown && p1 == 2 && s1 == 0 && st == false) {
            p1 = 1;
            this.playerLocal.p1 = 1;
            //prueba.setVelocityX(10);
            if (this.playerLocal.armaJose) {
                this.playerLocal.anims.play('fastL', true);
                this.sendImperative();
            }
            else {
                this.playerLocal.anims.play('punchL', true);
                this.sendImperative();
            }


            const myTimeout3 = setTimeout(pausaPI, 500);
            p2 = 1;
            const myTimeout4 = setTimeout(movPunch, 500);

        }
        else if (this.vObj.isDown && p1 == 0 && s1 == 0 && st == false) {
            p1 = 1;
            this.playerLocal.p1 = 1;
            st = true;
            //prueba.setVelocityX(10);
            if (this.playerLocal.armaJose) {
                this.playerLocal.anims.play('strongR', true);
                this.sendImperative();
            }
            else {
                this.playerLocal.anims.play('punchFR', true);
                this.sendImperative();
            }


            const myTimeout5 = setTimeout(pausaPD, 800);
            p2 = 1;
            const myTimeout6 = setTimeout(movPunch, 800);

        }
        else if (this.vObj.isDown && p1 == 2 && s1 == 0 && st == false) {
            st = true;
            p1 = 1;
            this.playerLocal.p1 = 1;
            //prueba.setVelocityX(10);
            if (this.playerLocal.armaJose) {
                this.playerLocal.anims.play('strongL', true);
                this.sendImperative();
            }
            else {
                this.playerLocal.anims.play('punchFL', true);
                this.sendImperative();
            }


            const myTimeout7 = setTimeout(pausaPI, 800);
            p2 = 1;
            const myTimeout8 = setTimeout(movPunch, 800);

        }
        else if (this.sObj.isDown && s1 == 0 && p2 == 0 && st == false) {
            s1 = 1;



            const myTimeout9 = setTimeout(pausaShield, 1000);


        }

        if (p3 == 0 && s2 == 0) {
            p3 = 1;
            this.playerNet.p1 = 1;
            //prueba.setVelocityX(10);
            if (this.playerNet.armaJose) {
                this.playerNet.anims.play('fastR2', false);
            }
            else {
                this.playerNet.anims.play('punchR2', false);
            }



            const myTimeout10 = setTimeout(pausaPD2, 500);
            p4 = 1;
            const myTimeout11 = setTimeout(movPunch2, 500);

        }
        else if (p3 == 2 && s2 == 0) {
            p3 = 1;
            this.playerNet.p1 = 1;
            //prueba.setVelocityX(10);
            if (this.playerNet.armaJose) {
                this.playerNet.anims.play('fastL2', true);
            }
            else {
                this.playerNet.anims.play('punchL2', true);
            }


            const myTimeout12 = setTimeout(pausaPI2, 500);
            p4 = 1;
            const myTimeout13 = setTimeout(movPunch2, 500);

        }
        else if (p3 == 0 && s2 == 0 && st2 == false) {
            p3 = 1;
            this.playerNet.p1 = 1;
            st2 = true;
            //prueba.setVelocityX(10);
            if (this.playerNet.armaJose) {
                this.playerNet.anims.play('strongR2', true);
            }
            else {
                this.playerNet.anims.play('punchFR2', true);
            }


            const myTimeout14 = setTimeout(pausaPD2, 800);
            p4 = 1;
            const myTimeout15 = setTimeout(movPunch2, 800);

        }
        else if (p3 == 2 && s2 == 0 && st2 == false) {
            st2 = true;
            p3 = 1;
            this.playerNet.p1 = 1;
            //prueba.setVelocityX(10);
            if (this.playerNet.armaJose) {
                this.playerNet.anims.play('strongL2', true);
            }
            else {
                this.playerNet.anims.play('punchFL2', true);
            }


            const myTimeout16 = setTimeout(pausaPI2, 800);
            p4 = 1;
            const myTimeout17 = setTimeout(movPunch2, 800);

        }
        else if (s2 == 0 && p4 == 0) {
            s2 = 1;



            const myTimeout18 = setTimeout(pausaShield2, 1000);


        }




        if (s1 == 1 && p2 == 0) {
            if (p1 == 0) {

                this.playerLocal.anims.play('shieldR', true);
                this.sendImperative();

            } else if (p1 = 2) {
                this.playerLocal.anims.play('shieldL', true);
                this.sendImperative();

            }


        }
        else if (this.playerLocal.rightObj.isDown && (dir == 0 || dir == 1)) {

            //this.player.setVelocityX(260);
            if (st) {
                if (this.playerLocal.armaJose) {
                    this.playerLocal.anims.play('strongR', true);
                    this.sendImperative();
                }
                else {
                    this.playerLocal.anims.play('punchFR', true);
                    this.sendImperative();
                }
                //this.player.x++;
                //this.player.body.setVelocityX(100);

            }
            else if (p2 == 1) {
                if (this.playerLocal.armaJose) {
                    this.playerLocal.anims.play('fastR', true);
                    this.sendImperative();
                }
                else {
                    this.playerLocal.anims.play('punchR', true);
                    this.sendImperative();
                }
                //this.player.anims.play('fastR', true);
                //this.player.x++;
                //this.player.body.setVelocityX(100);
            } else {
                if (this.playerLocal.armaJose) {
                    this.playerLocal.anims.play('runSR', true);
                    this.sendImperative();
                }
                else {
                    this.playerLocal.anims.play('runR', true);
                    this.sendImperative();
                }
                //this.player.anims.play('runSR', true);
                //this.player.body.setVelocityX(160);
                //this.player.x++;
                p1 = 0;
                this.playerLocal.p1 = 0;
                dir = 1;
            }
        }

        else if (this.playerLocal.leftObj.isDown && (dir == 0 || dir == 2)) {

            //this.player.setVelocityX(-260);
            if (st) {
                if (this.playerLocal.armaJose) {
                    this.playerLocal.anims.play('strongL', true);
                    this.sendImperative();
                }
                else {
                    this.playerLocal.anims.play('punchFL', true);
                    this.sendImperative();
                }
                //this.player.anims.play('strongL', true);
                //this.player.x++;
                //this.player.body.setVelocityX(-100);

            }
            else if (p2 == 1) {
                if (this.playerLocal.armaJose) {
                    this.playerLocal.anims.play('fastL', true);
                    this.sendImperative();
                }
                else {
                    this.playerLocal.anims.play('punchL', true);
                    this.sendImperative();
                }
                //this.player.anims.play('fastL', true);
                //this.player.body.setVelocityX(-100);
                //this.player.x--;
            } else {
                dir = 2;
                if (this.playerLocal.armaJose) {
                    this.playerLocal.anims.play('runSL', true);
                    this.sendImperative();
                }
                else {
                    this.playerLocal.anims.play('runL', true);
                    this.sendImperative();
                }
                //this.player.anims.play('runSL', true);
                //this.player.body.setVelocityX(-260);
                //this.player.x--;
                p1 = 2;
                this.playerLocal.p1 = 2;
            }


        }

        else if (p1 == 0) {
            if (this.playerLocal.armaJose) {
                this.playerLocal.anims.play('staticSR', true);
                this.sendImperative();
            }
            else {
                this.playerLocal.anims.play('staticR', true);
                this.sendImperative();
            }
            //this.player.anims.play('staticSR', true);
            //this.player.body.setVelocityX(0);
            dir = 0;

        } else if (p1 == 2) {
            if (this.playerLocal.armaJose) {
                this.playerLocal.anims.play('staticSL', true);
                this.sendImperative();
            }
            else {
                this.playerLocal.anims.play('staticL', true);
                this.sendImperative();
            }
            //this.player.anims.play('staticSL', true);
            //this.player.body.setVelocityX(0);
            dir = 0

        } else if (this.playerLocal.upObj.isDown && this.playerLocal.body.onFloor()) {
            dir = 0;
            //this.player.body.setVelocityY(-330);

        }
        //jugador 2

        if (s2 == 1 && p4 == 0) {
            if (p3 == 0) {

                this.playerNet.anims.play('shieldR2', false);

            } else if (p3 == 2) {
                this.playerNet.anims.play('shieldL2', false);

            }


        }
        else if ((dir2 == 0 || dir2 == 1)) {

            //this.player.setVelocityX(260);
            if (st2) {
                if (this.playerNet.armaJose) {
                    this.playerNet.anims.play('strongR2', true);
                }
                else {
                    this.playerNet.anims.play('punchFR2', true);
                }
                //this.player2.anims.play('strongR2', true);
                //this.player.x++;
                //this.player2.body.setVelocityX(100);

            }
            else if (p4 == 1) {
                if (this.playerNet.armaJose) {
                    this.playerNet.anims.play('fastL2', false);
                }
                else {
                    this.playerNet.anims.play('punchL2', true);
                }
                //this.player2.anims.play('fastR2', true);
                //this.player.x++;
                //this.player2.body.setVelocityX(100);
            } else {
                if (this.playerNet.armaJose) {
                    this.playerNet.anims.play('runSR2', false);
                }
                else {
                    this.playerNet.anims.play('runR2', false);
                }
                //this.player2.anims.play('runSR2', true);
                //this.player2.body.setVelocityX(160);
                //this.player.x++;
                p3 = 0;
                this.playerNet.p1 = 0;
                dir2 = 1;
            }
        }

        else if ((dir2 == 0 || dir2 == 2)) {

            //this.player.setVelocityX(-260);
            if (st2) {
                if (this.playerNet.armaJose) {
                    this.playerNet.anims.play('strongL2', true);
                }
                else {
                    this.playerNet.anims.play('punchFL2', true);
                }
                //this.player2.anims.play('strongL2', true);
                //this.player.x++;
                //this.player2.body.setVelocityX(-100);

            }
            else if (p4 == 1) {
                if (this.playerNet.armaJose) {
                    this.playerNet.anims.play('fastL2', false);
                }
                else {
                    this.playerNet.anims.play('punchL2', true);
                }
                //this.player2.anims.play('fastL2', true);
                //this.player2.body.setVelocityX(-100);
                //this.player.x--;
            } else {
                if (this.playerNet.armaJose) {
                    this.playerNet.anims.play('runSL2', false);
                    debugger;
                }
                else {
                    this.playerNet.anims.play('runL2', false);
                    debugger;
                }
                //this.player2.anims.play('runSL2', true);
                //this.player2.body.setVelocityX(-260);
                //this.player.x--;
                p3 = 2;
                this.playerNet.p1 = 2;
                dir2 = 2;
            }


        }

        else if (p3 == 0) {
            if (this.playerNet.armaJose) {
                this.playerNet.anims.play('staticSR2', true);
            }
            else {
                this.playerNet.anims.play('staticR2', true);
            }
            //this.player2.anims.play('staticSR2', true);
            //this.player2.body.setVelocityX(0);
            dir2 = 0;

        } else if (p3 == 2) {
            if (this.playerNet.armaJose) {
                this.playerNet.anims.play('staticSL2', true);
            }
            else {
                this.playerNet.anims.play('staticL2', true);
            }
            //this.player2.anims.play('staticSL2', true);
            //this.player2.body.setVelocityX(0);
            dir2 = 0;

        }



        if (this.playerLocal.vida <= 0 || this.playerNet.vida <= 0) {
            //this.sendPlayerData();
            //this.game.sound.stopAll();
            this.scene.start("Menu");
            this.scene.stop("Arte");
            this.scene.stop("Nivel1");
        }
        if (this.pausa) {
            this.texto.visible = false;
            this.pausa = false;
            console.log("eoooo");
        }
        if (this.tPressed.isDown) {
            this.scene.pause("Nivel1");
            this.texto.visible = true;
            this.pausa = true;
        }



    }

    PegarDistancia() {
        if (this.playerLocal.lanzada) {
            this.playerNet.vida -= (this.playerLocal.ataqueDistancia - this.playerNet.resistencia);
            this.arma.x = 2000;
            this.playerNet.body.setVelocity(0);
            //this.sendPlayerData();

            setTimeout(() => { this.arma.x = 700; this.playerLocal.lanzada = false; }, 1000);
        }
    }
    Golpea() {
        // if(this.player.pesadoObj.isDown&&this.player.pesado&&this.player.ligero&&!this.player.cubriendose&&this.player.enemigo.cubriendose){
        //     this.player2.vida-=this.player.ataquePesado
        //     this.player2.vida+=this.player.enemigo.resistencia;
        //     console.log("pesado",this.player2.vida);
        //     this.player.pesado = false;

        //     this.graphics1.fillStyle(0xff0000);
        //     this.graphics1.fillRoundedRect(945,563,315,20,2);
        //     this.graphics1.fillStyle(0x00ff00);
        //     this.graphics1.fillRoundedRect(945,563,this.player2.vida*3,20,2);

        //     setTimeout(()=> {this.player.pesado= true}, 1000);
        // }




        // if(this.player.ligeroObj.isDown&&this.player.ligero&&this.player.pesado&&!this.player.cubriendose&&this.player.enemigo.cubriendose){
        //     this.player2.vida-=this.player.ataque
        //     this.player2.vida+=this.player.enemigo.resistencia;
        //     //console.log("ligero",this.player2.vida);
        //     this.player.ligero=false;

        //     this.graphics1.fillStyle(0xff0000);
        //     this.graphics1.fillRoundedRect(945,563,315,20,2);
        //     this.graphics1.fillStyle(0x00ff00);
        //     this.graphics1.fillRoundedRect(945,563,this.player2.vida*3,20,2);

        //     setTimeout(()=> {this.player.ligero= true}, 1000);
        // }
        if (this.playerLocal.pesadoObj.isDown && this.playerLocal.pesado && this.playerLocal.ligero && !this.playerLocal.cubriendose && !this.playerNet.cubriendose) {
            this.playerLocal.pesado = false;
            this.playerNet.vida -= this.playerLocal.ataquePesado;
            console.log("pesado", this.playerNet.vida);


            this.graphics1.fillStyle(0xff0000);
            this.graphics1.fillRoundedRect(945, 563, 315, 20, 2);
            this.graphics1.fillStyle(0x00ff00);
            this.graphics1.fillRoundedRect(945, 563, this.playerNet.vida * 3, 20, 2);
            //this.sendPlayerData();

            setTimeout(() => { this.playerLocal.pesado = true }, 5000);
        }




        if (this.playerLocal.ligeroObj.isDown && this.playerLocal.ligero && this.playerLocal.pesado && !this.playerLocal.cubriendose && !this.playerNet.cubriendose) {
            this.playerLocal.ligero = false;
            this.playerNet.vida -= this.playerLocal.ataque;
            console.log("ligero", this.playerNet.vida);


            this.graphics1.fillStyle(0xff0000);
            this.graphics1.fillRoundedRect(945, 563, 315, 20, 2);
            this.graphics1.fillStyle(0x00ff00);
            this.graphics1.fillRoundedRect(945, 563, this.playerNet.vida * 3, 20, 2);
            //this.sendPlayerData();

            setTimeout(() => { this.playerLocal.ligero = true }, 5000);
        }


        // if(this.player2.pesadoObj.isDown&&this.player2.pesado&&this.player2.ligero&&!this.player2.cubriendose&&this.player.enemigo.cubriendose){
        //     this.player.vida-=this.player2.ataquePesado
        //     this.player.vida+=this.player2.enemigo.resistencia;
        //     //console.log("pesado",this.player.vida);
        //     this.player2.pesado = false;


        //     this.graphics.fillStyle(0xff0000);
        //     this.graphics.fillRoundedRect(160,61,315,20,2);
        //     this.graphics.fillStyle(0x00ff00);
        //     this.graphics.fillRoundedRect(160,61,this.player2.vida*3,20,2);
        //     setTimeout(()=> {this.player2.pesado= true}, 1000);
        // }




        // if(this.player2.ligeroObj.isDown&&this.player2.ligero&&this.player2.pesado&&!this.player2.cubriendose&&this.player.enemigo.cubriendose){
        //     this.player.vida-=this.player2.ataque
        //     this.player.vida+=this.player2.enemigo.resistencia;
        //     //console.log("ligero",this.player2.vida);
        //     this.player2.ligero=false;

        //     this.graphics.fillStyle(0xff0000);
        //     this.graphics.fillRoundedRect(160,61,315,20,2);
        //     this.graphics.fillStyle(0x00ff00);
        //     this.graphics.fillRoundedRect(160,61,this.player2.vida*3,20,2);


        //     setTimeout(()=> {this.player2.ligero= true}, 1000);
        // }

        if (this.playerNet.pesadoObj.isDown && this.playerNet.pesado && this.playerNet.ligero && !this.playerNet.cubriendose && !this.playerNet.cubriendose) {
            this.playerLocal.vida -= this.playerNet.ataquePesado;
            console.log("pesado", this.playerLocal.vida);
            this.playerNet.pesado = false;


            this.graphics.fillStyle(0xff0000);
            this.graphics.fillRoundedRect(160, 563, 315, 20, 2);
            this.graphics.fillStyle(0x00ff00);
            this.graphics.fillRoundedRect(160, 563, this.playerNet.vida * 3, 20, 2);
            setTimeout(() => { this.playerNet.pesado = true }, 1000);
        }




        if (this.playerNet.ligeroObj.isDown && this.playerNet.ligero && this.playerNet.pesado && !this.playerNet.cubriendose && !this.playerNet.cubriendose) {
            this.playerLocal.vida -= this.playerNet.ataque;
            console.log("ligero", this.playerNet.vida);
            this.playerNet.ligero = false;

            this.graphics.fillStyle(0xff0000);
            this.graphics.fillRoundedRect(160, 563, 315, 20, 2);
            this.graphics.fillStyle(0x00ff00);
            this.graphics.fillRoundedRect(160, 563, this.playerNet.vida * 3, 20, 2);


            setTimeout(() => { this.playerNet.ligero = true }, 1000);
        }

    }


    CogeArma() {
        if (this.playerLocal.distanciaObj.isDown && !this.playerLocal.cubriendose) {

            this.playerLocal.ataque += this.arma.armaAtk;
            this.playerLocal.ataquePesado += this.arma.armaAtk;
            this.playerLocal.ataqueDistancia += this.arma.armaAtk;

            this.playerLocal.armaCogida = this.arma;
            this.playerLocal.armaCogidaAtk = this.arma.armaAtk;
            this.playerLocal.armaJose = true;
            //this.sendPlayerData();
            // console.log(this);
            // console.log(this.armaCogida);
        }

        if (this.playerNet.distanciaObj.isDown && !this.playerNet.cubriendose) {

            this.playerNet.ataque += this.arma.armaAtk;
            this.playerNet.ataquePesado += this.arma.armaAtk;
            this.playerNet.ataqueDistancia += this.arma.armaAtk;

            this.playerNet.armaCogida = this.arma;
            this.playerNet.armaCogidaAtk = this.arma.armaAtk;
            this.playerNet.armaJose = true;
            // console.log(this);
            // console.log(this.armaCogida);
        }
    }
}
function pausaPD() {
    p1 = 0;
    st = false;
}
function pausaPI() {
    p1 = 2;
    st = false;
}
function movPunch() {
    p2 = 0;
}
function pausaShield() {
    s1 = 0;
}
function pausaPD2() {
    p3 = 0;
    st2 = false;
}
function pausaPI2() {
    p3 = 2;
    st2 = false;
}
function movPunch2() {
    p4 = 0;
}
function pausaShield2() {
    s2 = 0;
}

function hit() {
    if (p1 == 1) {
        vida2 -= 10;
        console.log(vida2);
        p1 = 0;
    }
}