var s1=0;//variqble controla shield
var s2=0;
var p1=0;//punch
var p2=0;
var p3=0;
var p4=0;
var dir=0;
var dir2=0;
//var this.player;
//var this.player2;
//var arma;
var st=false;
var st2=false;
class Nivel1 extends Phaser.Scene{
    constructor(){
        super({key:"Nivel1"});
    }
    create(){

        // Añadimos fondo
        this.add.image(710, 300, 'escenarioDos');

        // Añadimos suelo (invisible)
        this.suelo = new Plataformas(this, 700, 490, 'escenarioSuelo').setDisplaySize(1500,50);
        this.suelo.alpha = 0;

        // Añadimos plataformas
        this.plataforma1 = new Plataformas(this, 520, 430, 'escenarioDosPlataformasClaroMitadDos');
        this.plataforma2 = new Plataformas(this, 920, 430, 'escenarioDosPlataformasOscuroMitadDos'); 
        this.plataforma3 = new Plataformas(this, 1300, 295, 'escenarioDosPlataformasOscuro');
        this.plataforma4 = new Plataformas(this, 820, 185, 'escenarioDosPlataformasOscuroMitad'); 
        this.plataforma5 = new Plataformas(this, 140, 295, 'escenarioDosPlataformasClaro');
        this.plataforma6 = new Plataformas(this, 620, 185, 'escenarioDosPlataformasClaroMitad'); 

        


        //Colision entre jugador y terreno
        
        

        this.player = new Jugador(this,150, 450, 'static','D','A','W','S','C','V','B');
        this.player2 = new Jugador(this,1050, 450, 'static2','RIGHT','LEFT','UP','DOWN','I','O','P');

        this.player.enemigo=this.player2;
        this.player2.enemigo=this.player;

        this.arma = new Armas(this, 700, 550, "swordI", 5);
        
        //this.terreno= new Plataformas(this,700,600,'ground').setDisplaySize(1500,50);

        this.cObj = this.input.keyboard.addKey("C");
        this.sObj = this.input.keyboard.addKey("S");
        this.iObj = this.input.keyboard.addKey("I");
        this.oObj = this.input.keyboard.addKey("O");

        this.vObj = this.input.keyboard.addKey("V");
        this.arrowDownObj = this.input.keyboard.addKey("ArrowDown");
        // this.downObj = scene.input.keyboard.addKey(abajo);

        //Colision entre jugador y arma
        this.physics.add.collider(this.player,this.arma,this.PegarDistancia,null,this);
        this.physics.add.collider(this.player2,this.arma,this.PegarDistancia,null,this);
        
        this.physics.add.collider(this.player,this.arma,this.CogeArma,null,this);
        this.physics.add.collider(this.player2,this.arma,this.CogeArma,null,this);

        //Colision entre jugador y terreno
        this.AñadirColider(this.suelo); 
        this.AñadirColider(this.plataforma1); 
        this.AñadirColider(this.plataforma2); 
        this.AñadirColider(this.plataforma3); 
        this.AñadirColider(this.plataforma4); 
        this.AñadirColider(this.plataforma5);
        this.AñadirColider(this.plataforma6);

        //Colision entre jugador y jugador2
        this.physics.add.collider(this.player,this.player.enemigo,this.Golpea,null,this);
        this.physics.add.collider(this.player2,this.player2.enemigo,this.Golpea,null,this);
        //Colision entre arma y terreno
        this.physics.add.collider(this.arma,this.terreno,null,null,this);

        //console.log(Phaser.Input.Keyboard.KeyCodes);
        
        
            
}

AñadirColider(objeto){
    this.physics.add.collider(this.player,objeto,null,null,this);
    this.physics.add.collider(this.player2,objeto,null,null,this);
}

    update(time, delta){

        this.player.Controles()
        this.player2.Controles()

        if (this.cObj.isDown && p1==0 && s1==0 && st==false)
        {
            p1=1;
            //prueba.setVelocityX(10);
            this.player.anims.play('fastR', true);
        
            
            const myTimeout = setTimeout(pausaPD, 500);
            p2=1;
            const myTimeout2 = setTimeout(movPunch, 500);
        
        }
        else if (this.cObj.isDown && p1==2 && s1==0 && st==false)
        {
            p1=1;
            //prueba.setVelocityX(10);
            this.player.anims.play('fastL', true);
        
            
            const myTimeout3 = setTimeout(pausaPI, 500);
            p2=1;
            const myTimeout4 = setTimeout(movPunch, 500);
        
        }
        else if (this.vObj.isDown && p1==0 && s1==0 && st==false)
        {
            p1=1;
            st=true;
            //prueba.setVelocityX(10);
            this.player.anims.play('strongR', true);
        
            
            const myTimeout5 = setTimeout(pausaPD, 800);
            p2=1;
            const myTimeout6 = setTimeout(movPunch, 800);
        
        }
        else if (this.vObj.isDown && p1==2 && s1==0 && st==false)
        {
            st=true;
            p1=1;
            //prueba.setVelocityX(10);
            this.player.anims.play('strongL', true);
        
            
            const myTimeout7 = setTimeout(pausaPI, 800);
            p2=1;
            const myTimeout8 = setTimeout(movPunch, 800);
        
        }
        else if (this.sObj.isDown && s1==0 && p2==0 && st==false)
        {
            s1=1;
           
        
            
            const myTimeout9 = setTimeout(pausaShield, 1000);
            
        
        }

        if (this.iObj.isDown && p3==0 && s2==0)
        {
            p3=1;
            //prueba.setVelocityX(10);
            this.player2.anims.play('fastR2', true);
        
            
            const myTimeout10 = setTimeout(pausaPD2, 500);
            p4=1;
            const myTimeout11 = setTimeout(movPunch2, 500);
        
        }
        else if (this.iObj.isDown && p3==2 && s2==0)
        {
            p3=1;
            //prueba.setVelocityX(10);
            this.player2.anims.play('fastL2', true);
        
            
            const myTimeout12 = setTimeout(pausaPI2, 500);
            p4=1;
            const myTimeout13 = setTimeout(movPunch2, 500);
        
        }
        else if (this.oObj.isDown && p3==0 && s2==0 && st2==false)
        {
            p3=1;
            st2=true;
            //prueba.setVelocityX(10);
            this.player2.anims.play('strongR2', true);
        
            
            const myTimeout14 = setTimeout(pausaPD2, 800);
            p4=1;
            const myTimeout15 = setTimeout(movPunch2, 800);
        
        }
        else if (this.oObj.isDown && p3==2 && s2==0 && st2==false)
        {
            st2=true;
            p3=1;
            //prueba.setVelocityX(10);
            this.player2.anims.play('strongL2', true);
        
            
            const myTimeout16 = setTimeout(pausaPI2, 800);
            p4=1;
            const myTimeout17 = setTimeout(movPunch2, 800);
        
        }
        else if (this.player2.downObj.isDown && s2==0 && p4==0)
        {
            s2=1;
           
        
            
            const myTimeout18 = setTimeout(pausaShield2, 1000);
            
        
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
        else if (this.player.rightObj.isDown && (dir==0 || dir==1))
        {
           
            //this.player.setVelocityX(260);
            if(st){
                this.player.anims.play('strongR', true);
                //this.player.x++;
                //this.player.body.setVelocityX(100);

            }
            else if (p2==1){
                
                this.player.anims.play('fastR', true);
                //this.player.x++;
                //this.player.body.setVelocityX(100);
            }else{
                this.player.anims.play('runSR', true);
                //this.player.body.setVelocityX(160);
                //this.player.x++;
                p1=0;
                dir=1;
            }
        }
       
        else if (this.player.leftObj.isDown && (dir==0 || dir==2)){
            
            //this.player.setVelocityX(-260);
            if(st){
                this.player.anims.play('strongL', true);
                //this.player.x++;
                //this.player.body.setVelocityX(-100);

            }
            else if (p2==1){
                this.player.anims.play('fastL', true);
                //this.player.body.setVelocityX(-100);
                //this.player.x--;
            }else{
                dir=2;
                this.player.anims.play('runSL', true);
                //this.player.body.setVelocityX(-260);
                //this.player.x--;
                p1=2;
            }
          
   
        }
        
        else if (p1==0){
            this.player.anims.play('staticSR', true);
            //this.player.body.setVelocityX(0);
            dir=0;

        }else if(p1==2){
            this.player.anims.play('staticSL', true);
            //this.player.body.setVelocityX(0);
            dir=0

        }else if (this.player.upObj.isDown && this.player.body.onFloor())
        {
            dir=0;
            //this.player.body.setVelocityY(-330);
            
        }
        //jugador 2

        if(s2==1 && p4==0){
            if(p3==0){
                this.player2.anims.play('shieldR2', true);
   
            }else if(p3==2){
                this.player2.anims.play('shieldL2', true);

            }
        

        }
        else if (this.player2.rightObj.isDown && (dir2==0 || dir2==1))
        {
        
            //this.player.setVelocityX(260);
            if(st2){
                this.player2.anims.play('strongR2', true);
                //this.player.x++;
                //this.player2.body.setVelocityX(100);

            }
            else if (p3==1){
                this.player2.anims.play('fastR2', true);
                //this.player.x++;
                //this.player2.body.setVelocityX(100);
            }else{
                this.player2.anims.play('runSR2', true);
                //this.player2.body.setVelocityX(160);
                //this.player.x++;
                p3=0;
                dir2=1;
            }
        }
   
        else if (this.player2.leftObj.isDown && (dir2==0 || dir2==2)){
        
            //this.player.setVelocityX(-260);
            if(st2){
                this.player2.anims.play('strongL2', true);
                //this.player.x++;
                //this.player2.body.setVelocityX(-100);

            }
            else if (p3==1){
                this.player2.anims.play('fastL2', true);
                //this.player2.body.setVelocityX(-100);
                //this.player.x--;
            }else{
                this.player2.anims.play('runSL2', true);
                //this.player2.body.setVelocityX(-260);
                //this.player.x--;
                p3=2;
                dir2=2;
            }
      

        }
    
        else if (p3==0){
            this.player2.anims.play('staticSR2', true);
            //this.player2.body.setVelocityX(0);
            dir2=0;

        }else if(p3==2){
            this.player2.anims.play('staticSL2', true);
            //this.player2.body.setVelocityX(0);
            dir2=0;

        }
    
   
    
       
    
                    
                   
                
    }

    PegarDistancia(){
        if(this.player.lanzada){
            this.player2.vida-=(this.player.ataqueDistancia-this.player2.resistencia);
            this.arma.x=2000;
            this.player2.body.setVelocity(0);
            
            setTimeout(()=>{this.arma.x=700;this.player.lanzada=false;}, 1000);
        }
        if(this.player.lanzada){
            this.player2.vida-=(this.player.ataqueDistancia-this.player2.resistencia);
            this.arma.x=2000;
            this.player2.body.setVelocity(0);
            
            setTimeout(()=>{this.arma.x=700;this.player.lanzada=false;}, 1000);
        }
        if(this.player2.lanzada){
            this.player.vida-=(this.player2.ataqueDistancia-this.player.resistencia);
            this.arma.x=2000;
            this.player.body.setVelocity(0);
            
            setTimeout(()=>{this.arma.x=700;this.player2.lanzada=false;}, 1000);
        }
        if(this.player2.lanzada){
            this.player.vida-=(this.player2.ataqueDistancia-this.player.resistencia);
            this.arma.x=2000;
            this.player.body.setVelocity(0);
            
            setTimeout(()=>{this.arma.x=700;this.player2.lanzada=false;}, 1000);
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
    st=false;
}
function pausaPI(){
    p1=2;
    st=false;
}
function movPunch(){
    p2=0;
}
function pausaShield(){
    s1=0;
}
function pausaPD2(){
    p3=0;
    st2=false;
}
function pausaPI2(){
    p3=2;
    st2=false;
}
function movPunch2(){
    p4=0;
}
function pausaShield2(){
    s2=0;
}

function hit(){
    if(p1==1){
        vida2-=10;
        console.log(vida2);
        p1=0;
    }
}