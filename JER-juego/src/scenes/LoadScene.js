import Phaser from 'phaser'
import { KEYS } from '../KEYS'
import MenuScene from './MenuScene'

export default class LoadScene extends Phaser.Scene
{
	constructor()
	{
		super({
            key: KEYS.SCENES.LOAD
        })
	}

	preload()
    {
        this.load.image("loadBar", './assets/BarV6_ProgressBarBorder.png')
        this.load.image("loadBarFill", './assets/BarV2_Bar.png')
    }

    create()
    {
        console.log("lolol")
        //this.scene.add(KEYS.SCENES.MENU, MenuScene, false)
        
        
        this.add.image(260,295, "loadBar").setOrigin(0,0)
        this.add.image(0,0, "loadBarFill").setOrigin(-0.97,-14.3)
    }
}
