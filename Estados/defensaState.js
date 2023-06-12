class defensaState 
{
    player

    constructor(player)
    {
        this.player = player;
    }

    enter()
    {
        this.player.setDefendiendo(true);
        this.player.setSpeed(0);

    
        if(this.player.getNombre() === 'J1'){
            if(this.player.getDirection() === 1)
                this.player.play('shieldR');
            else
                this.player.play('shieldL');
        }
        else{
            if(this.player.getDirection() === 1)
                this.player.play('shieldR2');
            else
                this.player.play('shieldL2');
        };

        

        console.log(this.player.getNombre() + ": ESTADO - defensa");
    }

}