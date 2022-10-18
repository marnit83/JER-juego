import Phaser from 'phaser'
import { KEYS } from '../KEYS'

export default class MenuScene extends Phaser.Scene
{
	constructor()
	{
		super({
            key: KEYS.SCENES.MENU
        })
	}

    init(data){
        console.log(data);
        console.log("eo");
    }

    preload(){
        this.load.image("loadBar", "./assets/BarV6_ProgressBarBorder.png")
    }
    create()
    {
        this.add.image(0,0, "loadBar").setOrigin(0,0)
    }
}
