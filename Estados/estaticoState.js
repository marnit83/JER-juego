class estaticoState 
{
    player

    constructor(player)
    {
        this.player = player;
    }

    enter()
    {
        this.player.setSpeed(0);
        run.pause();


        //[[[ANIMACION]]]
        if(this.player.getArmado()){
            if(this.player.getNombre() === 'J1'){
                if(this.player.getDirection() === 1)
                    this.player.play('staticSR');
                else
                    this.player.play('staticSL');
            }
            else if(this.player.getNombre() === 'J2'){
                if(this.player.getDirection() === 1)
                    this.player.play('staticSR2');
                else
                    this.player.play('staticSL2');
            }
        }
        else{
            if(this.player.getNombre() === 'J1'){
                if(this.player.getDirection() === 1)
                    this.player.play('staticR');
                else
                    this.player.play('staticL');
            }
            else if(this.player.getNombre() === 'J2'){
                if(this.player.getDirection() === 1)
                    this.player.play('staticR2');
                else
                    this.player.play('staticL2');
            }
        }
    }


}