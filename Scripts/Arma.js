class Arma extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,type){
        super(scene,x,y,type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
       // this.body.immovable=true;
        this.body.setCollideWorldBounds(true);
        this.body.allowGravity=true;
        this.body.setBounce(0.23);

        this.hitbox = new Hitbox(this, 30, 80);
        this.attackBox = new Hitbox(this, 100,20);


        this.interactuable = true;
        this.lanzado = false;
        this.direccion = 0;
        this.speed = 0;
    }

    actualizarHitbox(){
        this.hitbox.x = this.x;
        this.hitbox.y = this.y;

    }

    checkPick(player)
    {
        this.player = player;

        if(this.player.getArmado()){
            this.setInteractuable(false);
            this.player.setInteraccion(false);
            this.destroy();
            return false;
        }
        else if(this.getInteractuable()){
            if(this.hitbox.check(player)){
                this.player.setInteraccion(true);
                return true;
            }
            this.player.setInteraccion(false);
            return false;
        }
    }


    //--------------- GETTERS Y SETTERS ---------------
    getInteractuable() {return this.interactuable;}
    setInteractuable(inter) {this.interactuable = inter;}     
    
    getLanzada() {return this.lanzado};
    setLanzada(lanza){this.lanzado = lanza};

    getDireccion() { return this.direccion;}
    setDireccion(dir) 
    {
        this.direccion = dir;
        this.angle = 90*this.direccion;
    }

    getSpeed() {return this.speed};
    setSpeed(speed){this.speed = speed};
}
