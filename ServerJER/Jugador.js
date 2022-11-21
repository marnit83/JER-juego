class Jugador extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,type){
        super(scene,x,y,type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.immovable=true;
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(0.2);

        this.vida=100;
        this.resistencia=0;
        this.ataque=5;
    }
}