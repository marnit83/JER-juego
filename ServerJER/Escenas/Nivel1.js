var s1=0;//variqble controla shield
var s2=0;
var p1=0;//punch
var p2=0;
//var this.player;
//var this.player2;
//var arma;
class Nivel1 extends Phaser.Scene{
    constructor(){
        super({key:"Nivel1", active: true});
    }
    create(){
        this.player = new Jugador(this,150, 450, 'dude','D','A','W','S','X','C','V');
        this.player2 = new Jugador(this,1050, 450, 'dude','RIGHT','LEFT','UP','DOWN','B','N','M');

        this.player.enemigo=this.player2;
        this.player2.enemigo=this.player;

        this.arma = new Armas(this, 700, 550, "bomb", 5);
        
        this.terreno= new Plataformas(this,700,600,'ground').setDisplaySize(1500,50);

        this.cObj = this.input.keyboard.addKey("C");
        this.sObj = this.input.keyboard.addKey("S");
        // this.downObj = scene.input.keyboard.addKey(abajo);

        //Colision entre jugador y arma
        this.physics.add.collider(this.player,this.arma,this.PegarDistancia,null,this);
        this.physics.add.collider(this.player2,this.arma,this.PegarDistancia,null,this);
        
        this.physics.add.collider(this.player,this.arma,this.CogeArma,null,this);
        this.physics.add.collider(this.player2,this.arma,this.CogeArma,null,this);

        //Colision entre jugador y terreno
        this.physics.add.collider(this.player,this.terreno,null,null,this);
        this.physics.add.collider(this.player2,this.terreno,null,null,this);

        //Colision entre jugador y jugador2
        this.physics.add.collider(this.player,this.player.enemigo,this.Golpea,null,this);
        this.physics.add.collider(this.player2,this.player2.enemigo,this.Golpea,null,this);
        //Colision entre arma y terreno
        this.physics.add.collider(this.arma,this.terreno,null,null,this);

        //console.log(Phaser.Input.Keyboard.KeyCodes);
        
        
            
}
    update(time, delta){

        this.player.Controles()
        this.player2.Controles()

        if (this.cObj.isDown && p1==0 && s1==0)
        {
            p1=1;
            //prueba.setVelocityX(10);
            this.player.anims.play('punchR', true);

        
            
            const myTimeout = setTimeout(pausaPD, 700);
            p2=1;
            const myTimeout2 = setTimeout(movPunch, 700);
        
        }
        else if (this.cObj.isDown && p1==2 && s1==0)
        {
            p1=1;
            //prueba.setVelocityX(10);
            this.player.anims.play('punchL', true);
        
            
            const myTimeout3 = setTimeout(pausaPI, 700);
            p2=1;
            const myTimeout4 = setTimeout(movPunch, 700);
        
        }
        else if (this.sObj.isDown && s1==0 && p2==0)
        {
            s1=1;
            
        
            
            const myTimeout = setTimeout(pausaShield, 1000);
            
        
        }
            

        if(this.player.vida<=0||this.player2.vida<=0){
            
            //this.scene.stop(Arte);
            //config.scene.scene.start(Nivel2);
            
        }

        if(s1==1 && p2==0){
            if(p1==0){
                this.player.anims.play('shieldR', true);

            }else if(p1=2){
                this.player.anims.play('shieldL', true);

            }
                        
            
        }
        else if (this.player.rightObj.isDown)
        {
            
            //this.player.setVelocityX(260);
            
            if (p2==1){
                this.player.anims.play('punchR', true);
                //this.player.x++;
            }else{
                this.player.anims.play('runR', true);
                //this.player.x++;
                p1=0;
            }
        }
        
        else if (this.player.leftObj.isDown){
            
            //this.player.setVelocityX(-260);
            if (p2==1){
                this.player.anims.play('punchL', true);
                this.player.x--;
            }else{
                this.player.anims.play('runL', true);
                //this.player.x--;
                p1=2;
            }
            
    
        }
        
        else if (p1==0){
            this.player.anims.play('staticR', true);

        }else if(p1==2){
            this.player.anims.play('staticL', true);

        }else if (this.player.upObj.isDown && this.player.body.onFloor())
        {
            
        }
                    
                   
                
    }

    PegarDistancia(){
        if(this.player.lanzada){
            this.player2.vida-=(this.player.ataqueDistancia-this.player2.resistencia);
            this.arma.x=2000;
            this.player2.body.setVelocity(0);
        }
        if(this.player2.lanzada){
            this.player.vida-=(this.player2.ataqueDistancia-this.player.resistencia);
            this.arma.x=2000;
            this.player.body.setVelocity(0);
        }
    }
    Golpea(){
        if(this.player.pesadoObj.isDown&&this.player.pesado&&this.player.ligero&&!this.player.cubriendose){
            this.player.enemigo.vida-=(this.player.ataquePesado-this.player.enemigo.resistencia);
            //console.log("pesado",this.player.enemigo.vida);
            this.player.pesado = false;
            setTimeout(()=> {this.player.pesado= true}, 1000);
        }
            

            
        
        if(this.player.ligeroObj.isDown&&this.player.ligero&&this.player.pesado&&!this.player.cubriendose){
            this.player.enemigo.vida-=(this.player.ataque-this.player.enemigo.resistencia);
            //console.log("ligero",this.player2.vida);
            this.player.ligero=false;
            setTimeout(()=> {this.player.ligero= true}, 1000);
        }
            

        if(this.player2.pesadoObj.isDown&&this.player2.pesado&&this.player2.ligero&&!this.player2.cubriendose){
            this.player2.enemigo.vida-=(this.player2.ataquePesado-this.player2.enemigo.resistencia);
            //console.log("pesado",this.player2.enemigo.vida);
            this.player2.pesado = false;
            setTimeout(()=> {this.player2.pesado= true}, 1000);
        }
            

            
        
        if(this.player2.ligeroObj.isDown&&this.player2.ligero&&this.player2.pesado&&!this.player2.cubriendose){
            this.player2.enemigo.vida-=(this.player2.ataque-playthis.player2er.enemigo.resistencia);
            //console.log("ligero",this.player2.vida);
            this.player2.ligero=false;
            setTimeout(()=> {this.player2.ligero= true}, 1000);
        }
        
    }


    CogeArma(){
        if(this.player.distanciaObj.isDown&&!this.player.cubriendose){
            
            this.player.ataque+=this.arma.armaAtk;
            this.player.ataquePesado+=this.arma.armaAtk;
            this.player.ataqueDistancia+=this.arma.armaAtk;
            
            this.player.armaCogida=this.arma;
            this.player.armaCogidaAtk=this.arma.armaAtk;
            
            // console.log(this);
            // console.log(this.armaCogida);
        }
        
        if(this.player2.distanciaObj.isDown&&!this.player2.cubriendose){
            
            this.player2.ataque+=this.arma.armaAtk;
            this.player2.ataquePesado+=this.arma.armaAtk;
            this.player2.ataqueDistancia+=this.arma.armaAtk;
            
            this.player2.armaCogida=this.arma;
            this.player2.armaCogidaAtk=this.arma.armaAtk;
            
            // console.log(this);
            // console.log(this.armaCogida);
        }
    }
}
function pausaPD(){
    p1=0;
}
function pausaPI(){
    p1=2;
}
function movPunch(){
    p2=0;
}
function pausaShield(){
    s1=0;
}
