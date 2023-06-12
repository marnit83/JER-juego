class stunState 
{
    player

    constructor(player)
    {
        this.player = player;
    }

    enter()
    {
        this.player.setDefendiendo(false);
        
        if(this.player.getAtaqueRapidoDmg()){
            this.player.scene.time.addEvent({ delay: 500,  loop: false, callback: this.player.quitarStun , callbackScope: this.player });
            console.log(this.player.getNombre() + ": ESTADO - stun ligero");
            return
        };


        if(this.player.getNombre() === 'J1'){
            stun.play();
            if(this.player.getDirection() === 1)
                this.player.play('stunR');
            else
                this.player.play('stunL');
        }
        else{
            stun.play();
            if(this.player.getDirection() === 1)
                this.player.play('stunL2');
            else
                this.player.play('stunR2');
        };


        this.player.scene.time.addEvent({ delay: 1000,  loop: false, callback: this.player.quitarStun , callbackScope: this.player });

        this.player.resetAtaque();
        console.log(this.player.getNombre() + ": ESTADO - stun :(");
    }
}