class Hitbox 
{
    constructor(sprite, x, y){

        this.sprite = sprite;
       // this.physics.world.enable(this);
       // this.body.immovable=true;
       // this.body.setCollideWorldBounds(true);
       // this.body.allowGravity=true;
       // this.body.setBounce(0.23);


        this.hitbox = this.sprite.scene.add.rectangle(this.sprite.x, this.sprite.y, x, y, 0x6666ff);
        this.hitbox.visible = false;
    }

    actualizar(){
        this.hitbox.x = this.sprite.x;
        this.hitbox.y = this.sprite.y;
    }

    check(object){
        this.object = object;

        if(this.hitbox.x + this.hitbox.width >= this.object.getHitbox().x && this.hitbox.x <= this.object.getHitbox().x + this.object.getHitbox().width
            && this.hitbox.y + this.hitbox.height >= this.object.getHitbox().y && this.hitbox.y <= this.object.getHitbox().y + this.object.getHitbox().height){
                return true;
            }
        return false;
       }

    
        
}
