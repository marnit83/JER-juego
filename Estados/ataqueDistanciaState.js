class ataqueDistanciaState 
{
    player

    constructor(player)
    {
        this.player = player;
    }

    enter()
    {
       this.player.setSpeed(0);
       this.player.setAtacando(true);
       this.player.arma.setSpeed(15);
       this.player.arma.setDireccion(this.player.getDirection());
       this.player.arma.x = this.player.x;
       this.player.arma.y = this.player.y;
       this.player.arma.visible = true;
       this.player.arma.setLanzada(true);
       lanzar.play();

        //[[[HACIA LA ANIMACION EN FUNCION DE LA DIRECCION Y EL NOMBRE DEL JUGADOR]]]
    
        if(this.player.getNombre() === 'J1'){
            if(this.player.getDirection() > 0){
                this.player.play('punchR');
            }     
            else{
                this.player.play('punchL');
            }
        }
        else if(this.player.getNombre() === 'J2'){
            if(this.player.getDirection() > 0){
                this.player.play('punchR2');
            }
                
            else{
                this.player.play('punchL2');
            }
                
        }


        
        
            
        console.log(this.player.getNombre() + ": ESTADO - ataque distancioso");
    }
}