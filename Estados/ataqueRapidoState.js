class ataqueRapidoState 
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
       this.player.setAtaqueRapidoDmg(true);

       

        //[[[HACIA LA ANIMACION EN FUNCION DE LA DIRECCION Y EL NOMBRE DEL JUGADOR]]]
        if(this.player.getArmado()){
            esp.play();
            if(this.player.getNombre() === 'J1'){
                if(this.player.getDirection() > 0)
                    this.player.play('fastR');
                else
                    this.player.play('fastL');
            }
            else if(this.player.getNombre() === 'J2'){
                if(this.player.getDirection() > 0)
                    this.player.play('fastR2');
                else
                    this.player.play('fastL2');
            }
        }
        else{
            punch.play();
            if(this.player.getNombre() === 'J1'){
                if(this.player.getDirection() > 0)
                    this.player.play('punchR');
                else
                    this.player.play('punchL');
            }
            else if(this.player.getNombre() === 'J2'){
                if(this.player.getDirection() > 0)
                    this.player.play('punchR2');
                else
                    this.player.play('punchL2');
            }
        }

        
        
        if(this.player.checkColision()){      // && this.currentState != this.defensa
            this.player.oponente.hurt = true;
        }
            
        console.log(this.player.getNombre() + ": ESTADO - ataque rapido");
    }


}