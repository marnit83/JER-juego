class hurtState 
{
    player

    constructor(player)
    {
        this.player = player;
    }

    enter()
    {

        if(this.player.oponente.getArmado()){
            if(this.player.getDefendiendo()){
                if(this.player.oponente.getAtaquePesadoDmg()){
                    this.player.setVida(this.player.getVida()-8);
                    this.player.actualizarBarraVida(this.player.getVida());
                    this.player.oponente.resetAtaque();
    
                    this.player.setStuneado(true);
                    this.player.setAplicarStun(true);
                    this.player.setKnockeado(true);
    
                    console.log(this.player.getNombre() + ": AHHHHHHH");
                    return;
                }
    
                if(this.player.oponente.getAtaqueRapidoDmg()){
                    this.player.oponente.setStuneado(true);
                    this.player.oponente.setAplicarStun(true);
                }
                
                this.player.setVida(this.player.getVida()-2);
                this.player.actualizarBarraVida(this.player.getVida());
                
                console.log(this.player.getNombre() + ": DIOOOOOOOOOOOOOO");
                return;
            }
            else if(this.player.oponente.getAtaquePesadoDmg()){
                this.player.setVida(this.player.getVida()-15);
            }
                
            else if(this.player.oponente.getAtaqueRapidoDmg()){
                this.player.setVida(this.player.getVida()-8);
            }
                
        }
        else{
            if(this.player.getDefendiendo()){
                if(this.player.oponente.getAtaquePesadoDmg()){
                    //this.player.setVida(this.player.getVida()-25);
                    this.player.actualizarBarraVida(this.player.getVida());
                    this.player.oponente.resetAtaque();
    
                    this.player.setStuneado(true);
                    this.player.setAplicarStun(true);
                    this.player.setKnockeado(true);
    
                    console.log(this.player.getNombre() + ": DESTRUIDO");
                    return;
                }
    
                if(this.player.oponente.getAtaqueRapidoDmg()){
                    this.player.oponente.setStuneado(true);
                    this.player.oponente.setAplicarStun(true);
                }
    
                
                console.log(this.player.getNombre() + ": DEFENDIDO");
                return;
            }
            else if(this.player.oponente.getAtaquePesadoDmg()){
                this.player.setVida(this.player.getVida()-9);
            }
            else if(this.player.oponente.getAtaqueRapidoDmg()){
                this.player.setVida(this.player.getVida()-50);
            }
        }

        if(this.player.oponente.getOponenteAlcanzado()){
            this.player.setVida(this.player.getVida()-5);
            this.player.oponente.setOponenteAlcanzado(false);
        }

        this.player.quitarStun();
        this.player.setHurting(true);
        this.player.actualizarBarraVida(this.player.getVida());
        this.player.setSpeed(0);
        hitSound.play();
        if(this.player.getDirection() === 1)
            this.player.play('hitR');
        else
            this.player.play('hitL');


        console.log(this.player.getNombre() + ": ESTADO - estado de sufrimiento");
    }


}