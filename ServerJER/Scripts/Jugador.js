class Jugador extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,type,derecha,izquierda,arriba,abajo,ligero,pesado,distancia){
        super(scene,x,y,type);
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.body.setCollideWorldBounds(true);
        this.body.setBounce(0.2);

        this.vida=100;
        this.resistencia=0;
        this.ataque=5;
        this.ataquePesado = 10;

        this.ligero=true;
        this.pesado=true;

        this.cubriendose = false;
        this.puedeLanzar = false;
        
        this.ataqueDistancia = 5;
        this.lanzada=false;

        this.armaCogida=null;
        this.armaCogidaAtk=null;

        this.enemigo=this;
        
        this.ligeroObj = scene.input.keyboard.addKey(ligero);
        this.pesadoObj = scene.input.keyboard.addKey(pesado);
        this.distanciaObj = scene.input.keyboard.addKey(distancia);

        this.rightObj = scene.input.keyboard.addKey(derecha);
        this.leftObj = scene.input.keyboard.addKey(izquierda);
        this.upObj = scene.input.keyboard.addKey(arriba);
        this.downObj = scene.input.keyboard.addKey(abajo);
    }
    
    


    Controles(){
        if(this.rightObj.isDown&&!this.cubriendose&&!this.leftObj.isDown){
            this.body.setVelocityX(260);
        }
        if(this.rightObj.isUp&&!this.leftObj.isDown){
            this.body.setVelocityX(0);
        }
        if(this.leftObj.isDown&&!this.cubriendose&&!this.rightObj.isDown){
            this.body.setVelocityX(-260);
        }
        if(this.leftObj.isUp&&!this.rightObj.isDown){
            this.body.setVelocityX(0);
        }
        if(this.upObj.isDown&&this.body.onFloor()&&!this.cubriendose){
            this.body.setVelocityY(-200);
        }
        if(this.downObj.isDown&&!this.cubriendose&&this.pesado&&this.ligero){
            this.body.setVelocity(0);
            this.resistencia+=5;
            console.log(this.resistencia);
            this.cubriendose=true;
            setTimeout(()=> {this.cubriendose= false;this.resistencia-=5}, 1000);
        }
        if(this.distanciaObj.isUp&&this.armaCogida!=null){
            this.puedeLanzar=true;
        }
        if(this.distanciaObj.isDown&&this.puedeLanzar&&this.armaCogida!=null&&!this.cubriendose){
            
            console.log("up",this.ataqueDistancia);
    
            this.ataque-=this.armaCogidaAtk;
            this.ataquePesado-=this.armaCogidaAtk;
            this.ataqueDistancia-=this.armaCogidaAtk;
    
            this.lanzada=true;
            this.puedeLanzar=false;
            this.armaCogida.body.setVelocityX(200);
            
        }

        if(this.armaCogida!=null&&(this.armaCogida.body.x>1500||this.armaCogida.body.x<0)&&this.lanzada){
            this.armaCogida=null;
            this.armaCogidaAtk=null;
        }
        if(this.armaCogida!=null&&!this.lanzada){
            this.armaCogida.body.x=this.body.x+40;
            this.armaCogida.body.y=this.body.y+20;
        }

        
    }
    
    
}