class Nivel1 extends Phaser.Scene{
    constructor(){
        super({key:"Nivel1", active: true});
    }
    create(){
        this.player = new Jugador(this,100, 450, 'dude');
        this.player.setData('ataque',5);

        this.arma = new Armas(this, 700, 300, "bomb");
        

        this.physics.add.collider(this.player,this.arma,this.CogeArma,null,this);

        //console.log(Phaser.Input.Keyboard.KeyCodes);

        //Controles
        this.rightObj = this.input.keyboard.addKey('RIGHT');
        this.leftObj = this.input.keyboard.addKey('LEFT');
        this.upObj = this.input.keyboard.addKey('UP');
        this.downObj = this.input.keyboard.addKey('DOWN');

        // this.anims.create({
        //     key: 'left',
        //     frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'turn',
        //     frames: [ { key: 'dude', frame: 4 } ],
        //     frameRate: 20
        // });

        // this.anims.create({
        //     key: 'right',
        //     frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        //     frameRate: 10,
        //     repeat: -1
        // });
    }
    update(time, delta){
        if(this.rightObj.isDown){
            this.player.x++;
        }
        if(this.leftObj.isDown){
            this.player.x--;
        }
        if(this.upObj.isDown){
            this.player.body.setVelocityY(-200);
        }
        if(this.downObj.isDown){
            //this.player.x--;
            this.arma.x=700;
        }
    }

    CogeArma(){
        this.player.ataque+=5;
        console.log(this.player.ataque);
        this.arma.x=2000;
    }
}
