class Jugador extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,type,derecha,izquierda,arriba,abajo,ligero,pesado,distancia,p1){
        super(scene,x,y,type);
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.body.setCollideWorldBounds(true);
        this.body.setBounce(0.2);

        this.vida=100;
        
        this.ataque=5;
        this.ataquePesado = 10;
        this.resistencia=5;

        this.ligero=true;
        this.pesado=true;

        this.cubriendose = false;
        this.puedeLanzar = false;
        
        this.ataqueDistancia = 5;
        this.lanzada=false;

        this.armaCogida=null;
        this.armaCogidaAtk=null;

        this.enemigo=this;

        this.derecha=false;
        this.izquierda=false;

        this.armaJose=false;
        this.p1=p1;
        
        this.ligeroObj = scene.input.keyboard.addKey(ligero);
        this.pesadoObj = scene.input.keyboard.addKey(pesado);
        this.distanciaObj = scene.input.keyboard.addKey(distancia);

        this.rightObj = scene.input.keyboard.addKey(derecha);
        this.leftObj = scene.input.keyboard.addKey(izquierda);
        this.upObj = scene.input.keyboard.addKey(arriba);
        this.downObj = scene.input.keyboard.addKey(abajo);
    }
    
    


    Controles(){
        if(this.rightObj.isDown&&!this.cubriendose&&!this.izquierda){
            this.body.x+=4;
            this.derecha=true;
            
        }
        if(this.rightObj.isUp){
            this.derecha=false;
            
        }
        if(this.leftObj.isDown&&!this.cubriendose&&!this.derecha){
            this.body.x-=4;
            this.izquierda=true;
        }
        if(this.leftObj.isUp){
            this.izquierda=false;
        }
        if(this.upObj.isDown&&this.body.onFloor()&&!this.cubriendose){
            this.body.setVelocityY(-400);
        }
        if(this.downObj.isDown&&!this.cubriendose&&this.pesado&&this.ligero){
            //this.body.setVelocity(0);
            this.resistencia+=5;
            console.log(this.resistencia);
            this.cubriendose=true;
            setTimeout(()=> {this.cubriendose= false;this.resistencia-=5}, 1000);
        }
        if(this.distanciaObj.isUp&&this.armaCogida!=null){
            this.puedeLanzar=true;
        }
        if(this.distanciaObj.isDown&&this.puedeLanzar&&this.armaCogida!=null&&!this.cubriendose&&this.armaJose){
            
            console.log("up",this.ataqueDistancia);
    
            this.ataque-=this.armaCogidaAtk;
            this.ataquePesado-=this.armaCogidaAtk;
            this.ataqueDistancia-=this.armaCogidaAtk;
    
            this.lanzada=true;
            this.puedeLanzar=false;
            if(this.p1==0){
                console.log("derecha")
                this.armaCogida.body.x=this.body.x+20;
                this.armaCogida.body.setVelocityX(200);
                this.armaJose=false;
            }
            if(this.p1==2){
                console.log("izquierda")
                this.armaCogida.body.x=this.body.x-20;
                this.armaCogida.body.setVelocityX(-200);
                this.armaJose=false;
            }
            
        }

        if(this.armaCogida!=null&&(this.armaCogida.body.x>1500||this.armaCogida.body.x<0)&&this.lanzada){
            this.armaCogida=null;
            this.armaCogidaAtk=null;
        }
        if(this.armaCogida!=null&&!this.lanzada){
            this.armaCogida.body.x=2000;

        }

        
    }
    MoverArmaDer(){
        this.armaCogida.body.x+=3;
    }
    MoverArmaIzq(){
        this.armaCogida.body.x-=3;
    }
}