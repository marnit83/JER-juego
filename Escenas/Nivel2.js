class Nivel2 extends Phaser.Scene{
    constructor(){
        super({key:"Nivel2"});
    }
    create(){
        //this.scene.launch(Arte);

        this.player = new Jugador(this,150, 450, 'dude','D','A','W','S','X','C','V');
        this.player2 = new Jugador(this,1050, 450, 'dude','RIGHT','LEFT','UP','DOWN','B','N','M');

        this.player.enemigo=this.player2;
        this.player2.enemigo=this.player;

        this.arma = new Armas(this, 700, 570, "bomb", 5);
        
        this.terreno= new Plataformas(this,700,600,'ground').setDisplaySize(1500,50);

        
        //Colision entre jugador y arma
        this.physics.add.collider(this.player,this.arma,this.Pegar,null,this);
        this.physics.add.collider(this.player2,this.arma,this.Pegar,null,this);
        
        this.physics.add.collider(this.player,this.arma,this.player.CogeArma(this.arma,this.arma.ataque),null,this);
        this.physics.add.collider(this.player2,this.arma,this.player2.CogeArma(this.arma,this.arma.ataque),null,this);

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

        // if(this.player.vida<=0||this.player2.vida<=0){
        //     scene.scene.transition({
        //         target: Nivel2, //la escena a la que se va
        //         duration: 1000, //duración en milisegundos
        //         })
        // }
    }

    Pegar(){
        if(this.player.lanzada){
            this.player2.vida-=(this.player.ataqueDistancia-this.player2.resistencia);
            this.arma.x=2000;
            this.player2.body.setVelocity(0);
            console.log("vaya");
        }
        if(this.player2.lanzada){
            this.player.vida-=(this.player2.ataqueDistancia-this.player.resistencia);
            this.arma.x=2000;
            this.player.body.setVelocity(0);
        }
    }
    Golpea(){
        if(this.player.pesadoObj.isDown&&this.player.pesado){
            this.player.enemigo.vida-=(this.player.ataquePesado-this.player.enemigo.resistencia);
            //console.log("pesado",this.player.enemigo.vida);
            this.player.pesado=false;
        }
        if(this.player.pesadoObj.isUp)
            this.player.pesado=true;

        
        if(this.player.ligeroObj.isDown&&this.player.ligero){
            this.player.enemigo.vida-=(this.player.ataque-this.player.enemigo.resistencia);
            //console.log("ligero",this.player2.vida);
            this.player.ligero=false;
        }
        if(this.player.ligeroObj.isUp)
            this.player.ligero=true;

        if(this.player2.pesadoObj.isDown&&this.player2.pesado){
            this.player2.enemigo.vida-=(this.player2.ataquePesado-this.player2.enemigo.resistencia);
            //console.log("pesado",this.player2.enemigo.vida);
            this.player2.pesado=false;
        }
        if(this.player2.pesadoObj.isUp)
            this.player2.pesado=true;

        if(this.player2.ligeroObj.isDown&&this.player2.ligero){
            this.player2.enemigo.vida-=(this.player2.ataque-this.player2.enemigo.resistencia);
            //console.log("ligero",this.player.vida);
            this.player2.ligero=false;
        }
        if(this.player2.ligeroObj.isUp)
            this.player2.ligero=true;
        
    }
}
