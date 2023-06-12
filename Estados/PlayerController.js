class PlayerController 
{
    //states
    

    //currentState
    
    constructor(player){

        this.states = {
            idle: new estaticoState(player),
            moveLeft: new moverIzqState(player),
            moveRight: new moverDerechaState(player),
            ataqueRapido: new ataqueRapidoState(player),
            ataquePesado: new ataquePesadoState(player),
            defensa: new defensaState(player),
            hurt: new hurtState(player),
            stun: new stunState(player),
            ataqueDistancia: new ataqueDistanciaState(player),
            derrotado: new derrotadoState(player)
        }

        this.player = player;

        console.log(this.player.getNombre() + " - Controlador creado");

    }

    setState(name){
        if(this.player.getDerrotado()){
            return
        }
        else if(this.player.getStuneado()){
            //this.player.setAtaqueRapido(false);
            //this.player.setAtaquePesado(false);
        }
        else if(this.player.getAtacando()){
             return
        }

        else if(this.player.getHurting()){
            return
        }

        else if(this.currentState === this.states[name])    //esto era un if
        {
            return
        }

        this.currentState = this.states[name];
        this.currentState.enter();

    }

    getState(name){
         if(this.currentState === this.states[name])
        {
            return true;
        }

        return false;
    }

    //HACER OTRA FUNCION DE SET STATE PARA EL SEGUNDO JUGADOR
    //      Ó
    //CREAR UN NUEVO PLAYERCONTROLLER CON TODAS LAS NUEVAS CLASES
}