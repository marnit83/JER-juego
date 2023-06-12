ULTIMA_VIDA_J1  = false;
ULTIMA_VIDA_J2  = false;
MUERTO_J1       = false;
MUERTO_J2       = false;

class J1Online extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, key, nombre, side){
        super(scene,x,y, key);                  //llama a la clase padre, sprite
        scene.add.existing(this);
        scene.physics.world.enable(this);
        
        this.scene = scene;

        this.body.setCollideWorldBounds(true);
        //this.body.setBounce(0.2);
        this.nombre     = nombre;
        this.oponente   = null;
        this.hurt       = false;
        this.speed      = 5;
        this.vida       = 100;
        this.side       = side;

        this.ataqueRapidoDmg    = false;
        this.ataquePesadoDmg    = false;
        this.aplicarStun        = false;
        this.knockeado          = false;
        this.ultimaVida         = false;
        this.siguienteRonda     = false;
        
        this.atacando           = false;
        this.hurting            = false;
        this.derrotado          = false;   
        this.muerto             = false;           
        this.defendiendo        = false;
        this.stuneado           = false;
        this.ataquePesado       = false;
        this.ataqueRapido       = false;
        

        //ESPADA
        this.arma               = new Arma(this.scene, this.x, this.y, "swordI", 5);
        this.arma.visible       = false;
        this.armado             = false;
        this.interaccion        = false;
        this.ataqueDistancia    = false;
        this.oponenteAlcanzado  = false;

        
        this.direction = 1;
        if(this.nombre === 'J2'){
            this.direction = -1;
        }

        this.x = x;
        this.y = y;

        //[[[CONTROLES]]]
        this.izquierdaTecla     = false;
        this.derechaTecla       = false;
        this.saltarTecla        = false;
        this.defensaTecla       = false;

        this.ataqueRapidoTecla = false;
        this.ataquePesadoTecla = false;
        this.interaccionTecla  = false;

        // if(this.nombre === 'J1')
            this.playerController = new PlayerController(this);
        this.playerController.setState('idle');

        //[[[HITBOX Y ATTACKBOX]]]
        this.hitbox = new Hitbox(this, 30, 80);
        this.attackBox = new Hitbox(this, 40,40);

        //[[[BARRA DE VIDA]]]
        this.barraVida = this.scene.add.graphics();
        this.barraVida.fillStyle(0x808080);

        if(this.nombre === 'J1')
            this.barraPos = this.x - 40;
        else if(this.nombre === 'J2')
            this.barraPos = this.x-230;

        this.barraVida.fillRoundedRect(this.barraPos,560,this.vida*3.8,20,2);
        this.barraVida.fillStyle(0x00ff00);
        this.barraVida.fillRoundedRect(this.barraPos,560,this.vida*3.8,20,2);
        
        console.log(this.nombre + ": CREADO");
    }

    checkMuerte(){
        if(this.getVida() <= 0){
            this.playerController.setState('derrotado');
        }
    }

    derrota(){
        if(this.getNombre() === 'J1'){
            MUERTO_J1 = true;
        }
        else{
            MUERTO_J2 = true;
        }
    }

    nextRound()
    {
        this.setSiguienteRonda(true);
    }

    

    jugadorMovimiento(){
        if(!this.getKnockeado()){
            if(!this.defensaTecla){
                this.setDefendiendo(false);
            }
            if(!this.interaccionTecla && !this.getArmado()){
                this.setAtaqueDistancia(false);
            }
            if(this.getInteraccion() && this.interaccionTecla){
                this.setArmado(true);
                this.setAtaqueDistancia(false);
            }
            
            //console.log(this.getInteraccion());
            //MOVIMIENTO
            if(this.saltarTecla && this.body.onFloor()){
                this.body.setVelocityY(-400);
            }
            else if(this.defensaTecla){
                this.playerController.setState('defensa');
                this.setDefendiendo(true);
            }
            else if(this.derechaTecla){
                this.playerController.setState('moveLeft');
            }
            else if(this.izquierdaTecla){
                this.playerController.setState('moveRight');
            }
            else{
                this.playerController.setState('idle');
            }
        }
       
    }

    jugadorAtacar(){
        if(this.getStuneado() && this.getAplicarStun()){
            this.playerController.setState('stun');
            this.setAplicarStun(false);
        }
        else if(!this.getStuneado()){
            if (this.ataqueRapidoTecla){
                this.setAtaqueRapido(true);
            }
            if (this.ataquePesadoTecla){
                this.setAtaquePesado(true);
            }
            if(this.getArmado()){
                if (this.interaccionTecla) {
                    this.setAtaqueDistancia(true);
                }
            }
        }

        if(this.getDefendiendo()){
            this.quitarStun();
        }
        //[[[HACER EL ATAQUE ON KEY.UP]]]
       if(!this.getDefendiendo()){
            if(!this.ataqueRapidoTecla && this.getAtaqueRapido()){
                this.playerController.setState('ataqueRapido');
                this.setAtaqueRapido(false);
            }
            if(!this.ataquePesadoTecla && this.getAtaquePesado()){
                this.playerController.setState('ataquePesado');
                this.setAtaquePesado(false);
            }
            if(!this.interaccionTecla && this.getAtaqueDistancia() && this.getArmado()){
                this.playerController.setState('ataqueDistancia');
                this.setAtaqueDistancia(false);
                this.setArmado(false);
            }
       }    
    }

    jugadorHurt(){
        if(this.getAtacando()){
            this.once('animationcomplete', () => { 
                if(this.oponente.hurt)
                {
                    this.oponente.playerController.setState('hurt');
                }

                this.oponente.hurt = false;
                this.setAtaquePesadoDmg(false);
                this.setAtacando(false);
             })
        }

        if(this.getHurting()){
            this.once('animationcomplete', () => {
                this.setHurting(false);
                this.resetAtaque();
            })
        }
    }

    quitarStun(){
        this.oponente.setHurting(false);
        this.oponente.setHurt(false);
        this.setKnockeado(false);
        this.setAtaquePesadoDmg(false);
        this.setAtaqueRapidoDmg(false);
        this.setAtaqueRapido(false);
        this.setAtaquePesado(false);
        this.setAtacando(false);
        this.setStuneado(false);
    }


    actualizarArma(){
        this.arma.attackBox.actualizar();
        this.arma.x += this.arma.getSpeed() * this.arma.getDireccion();

        if(this.arma.x < 0 || this.arma.x > 1400){
            this.arma.visible = false;
            this.setOponenteAlcanzado(false);
            this.arma.setLanzada(false);
        }

        if(this.arma.getLanzada() && this.arma.attackBox.check(this.oponente)){
            this.setOponenteAlcanzado(true);
            this.oponente.playerController.setState('hurt');
        }
    }

   actualizarHitbox()
   {
    this.hitbox.actualizar();
            //this.hitbox.x = this.x;
            //this.hitbox.y = this.y;
   }

   actualizarAttackBox()
   {
    if(this.getDirection() === 1){
        this.getAttackBox().hitbox.x = this.x + 30;
        this.getAttackBox().hitbox.y = this.y - 20;
    }
    else{
        this.getAttackBox().hitbox.x = this.x - 30;
        this.getAttackBox().hitbox.y = this.y - 20;
    }
   }

   checkColision(){
    return this.getAttackBox().check(this.oponente);
   }

   moverJugador(){
        this.x += this.speed * this.direction;
   }

   actualizarBarraVida(vida){
    this.barraVida.fillStyle(0x000000);
    this.barraVida.fillRoundedRect(this.barraPos,560,380,20,2)
    this.barraVida.fillStyle(0x00ff00);
    this.barraVida.fillRoundedRect(this.barraPos,560,vida*3.8,20,2)
   }

   resetAtaque(){
    this.setAtaquePesadoDmg(false);
    this.setAtaqueRapidoDmg(false);
   }


    //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    //---------------- GETTERS Y SETTER ----------------------
    //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    getPosition(){return this;}
    setPosition(x, y)
    {
        this.x = x;
        this.y = y;
    }

    getNombre(){return this.nombre};
    setNombre(nombre){this.nombre = nombre};

    getVida(){return this.vida;}
    setVida(vida) {this.vida = vida;}

    getOponente(){return this.oponente};
    setOponente(oponente){ this.oponente = oponente};

    getSpeed() {return this.speed};
    setSpeed(speed){this.speed = speed};

    getHurt() {return this.hurt};
    setHurt(hurt) {this.hurt = hurt;}

    getDirection() {return this.direction};
    setDirection(dir) {this.direction = dir};

    getHitbox(){return this.hitbox.hitbox;}
    setHitbox(hitbox){this.hitbox.hitbox = hitbox};

    getAttackbox(){return this.attackBox.hitbox;}
    setAttackbox(hitbox){this.attackBox.hitbox = hitbox};

    getAtaqueRapidoDmg(){ return this.ataqueRapidoDmg;}
    setAtaqueRapidoDmg(ataque){ this.ataqueRapidoDmg = ataque;}

    getAtaquePesadoDmg(){ return this.ataquePesadoDmg;}
    setAtaquePesadoDmg(ataque){ this.ataquePesadoDmg = ataque;}

    getAtaqueDistancia(){return this.ataqueDistancia;}
    setAtaqueDistancia(ataque){this.ataqueDistancia = ataque;}

    getDefendiendo(){return this.defendiendo};
    setDefendiendo(def) {this.defendiendo = def};

    getAtacando(){return this.atacando};
    setAtacando(atac) {this.atacando = atac};
    
    getHurting(){return this.hurting};
    setHurting(hurt) {this.hurting = hurt};

    getStuneado(){return this.stuneado};
    setStuneado(stun) {this.stuneado = stun};

    getKnockeado(){return this.knockeado};
    setKnockeado(ko){this.knockeado = ko};

    getAtaquePesado(){return this.ataquePesado};
    setAtaquePesado(atac){this.ataquePesado = atac};

    getAtaqueRapido(){return this.ataqueRapido};
    setAtaqueRapido(atac){this.ataqueRapido = atac};

    getAplicarStun() {return this.aplicarStun;}
    setAplicarStun(stun) {this.aplicarStun = stun;}

    getInteraccion() {return this.interaccion;}
    setInteraccion(inter) {this.interaccion = inter;}

    getDerrotado() {return this.derrotado;}
    setDerrotado(der) {this.derrotado = der;}

    getUltimaVida() {return this.ultimaVida;}
    setUltimaVida(vida) {this.ultimaVida = vida;}

    getArmado(){return this.armado;}
    setArmado(arma){this.armado = arma;}

    getOponenteAlcanzado() {return this.oponenteAlcanzado;}
    setOponenteAlcanzado(alc) {this.oponenteAlcanzado = alc;}

    getSiguienteRonda() {return this.siguienteRonda;}
    setSiguienteRonda(ronda) {this.siguienteRonda = ronda;}

    getMuerto() {return this.muerto;}
    setMuerto(muerto) {this.muerto = muerto;}

    getAttackBox(){return this.attackBox;}
    setAttackBox(x, y)
    {
        this.attackBox.x = x;
        this.attackBox.y = y;
    }


}
