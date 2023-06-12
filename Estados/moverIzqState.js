class moverIzqState 
{
    player

    constructor(player)
    {
        this.player = player;
    }

    enter()
    {
        this.player.setDirection(-1);
        this.player.setSpeed(5);
        run.play();

        if(this.player.getArmado()){
            if(this.player.getNombre() === 'J1')
                this.player.anims.play('runSL'); 
            else
                this.player.anims.play('runSL2'); 
        }
        else{
            if(this.player.getNombre() === 'J1')
                this.player.anims.play('runL'); 
            else
                this.player.anims.play('runL2'); 
        }
    }

}