const config = {
    type: Phaser.AUTO,
    width:1420,
    height:600,
    parent:"container",
    scene: [EscenaOrd],

    physics: {
        default: "arcade",
        arcade:{
            gravity:{
                y:500
            },
            debug:false
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

