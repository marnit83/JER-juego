class derrotadoState 
{
    player

    constructor(player)
    {
        this.player = player;
    }

    enter()
    {
        this.player.setDerrotado(true);
        this.player.setSpeed(0);
        

        

        if(this.player.getNombre() === 'J1' && ULTIMA_VIDA_J1){
            fondoV.play();
            fondo1.stop();
            fondo2.stop();
            fondo3.stop();
            fondoM.stop();

            this.player.scene.time.addEvent({ delay: 4000,  loop: false, callback: this.player.derrota , callbackScope: this.player });
            if(this.player.getNombre() === 'J1'){
                if(this.player.getDirection() === 1)
                    this.player.play('muerteR');
                else
                    this.player.play('muerteL');
            }
        }
        else if(this.player.getNombre() === 'J2' && ULTIMA_VIDA_J2){
            fondoV.play();
            fondo1.stop();
            fondo2.stop();
            fondo3.stop();
            fondoM.stop();
            this.player.scene.time.addEvent({   delay: 4000,  loop: false, callback: this.player.derrota , callbackScope: this.player });
            if(this.player.getNombre() === 'J2'){
                if(this.player.getDirection() === 1)
                    this.player.play('muerteR2');
                else
                    this.player.play('muerteL2');
            }
        }
        else{
            this.player.scene.time.addEvent({ delay: 4000,  loop: false, callback: this.player.nextRound , callbackScope: this.player });
            if(this.player.getNombre() === 'J1'){
                if(this.player.getDirection() === 1)
                    this.player.play('heridoR');
                else
                    this.player.play('heridoL');
            }
            else if(this.player.getNombre() === 'J2'){
                if(this.player.getDirection() === 1)
                    this.player.play('heridoR2');
                else
                    this.player.play('heridoL2');
            }
        }
        
        console.log(this.player.getNombre() + ": ESTADO - derrotado");
    }


}