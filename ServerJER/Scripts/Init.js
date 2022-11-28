const config = {
    type: Phaser.AUTO,
    width:1420,
    height:600,
    parent:"container",
    scene: [Arte, Nivel1, Nivel2],

    physics: {
        default: "arcade",
        arcade:{
            gravity:{
                y:500
            },
            debug:true
        }
    },
};



var game = new Phaser.Game(config);

function preload ()
{
    
    
}

function create ()
{

}

function update ()
{
    
}

