class ataquePesadoState 
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
        this.player.setAtaquePesadoDmg(true);

        if(this.player.getArmado()){
            if(this.player.getNombre() === 'J1'){
                if(this.player.getDirection() > 0)
                    this.player.play('strongR');
                else
                    this.player.play('strongL');
            }
    
            else if(this.player.getNombre() === 'J2'){
                if(this.player.getDirection() > 0)
                    this.player.play('strongR2');
                else
                    this.player.play('strongL2');
            }
        }
        else{
            if(this.player.getNombre() === 'J1'){
                if(this.player.getDirection() > 0)
                    this.player.play('punchFR');
                else
                    this.player.play('punchFL');
            }
    
            else if(this.player.getNombre() === 'J2'){
                if(this.player.getDirection() > 0)
                    this.player.play('punchFR2');
                else
                    this.player.play('punchFL2');
            }
        }

        
           
        if(this.player.checkColision())       // && this.currentState != this.defensa
            this.player.oponente.hurt = true;

        console.log(this.player.getNombre() + ": ESTADO - ataque pesado");
    }


}