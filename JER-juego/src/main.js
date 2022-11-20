import Phaser from 'phaser'

import LoadScene from './scenes/LoadScene'
import MenuScene from './scenes/MenuScene'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [LoadScene]
}

export default new Phaser.Game(config)
