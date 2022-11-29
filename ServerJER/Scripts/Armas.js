class Armas extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,type,ataque){
        super(scene,x,y,type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        //this.body.immovable=true;
        this.body.setCollideWorldBounds(false);
        this.body.allowGravity=false;

        this.ataque=ataque;
    }

    
        
}
