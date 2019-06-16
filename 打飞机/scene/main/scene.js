const config = {
    player_speed: 10,
    cloud_speed: 1,
    enemy_speed: 5,
    bullet_speed: 5,
    fire_cooldown: 9,
}
class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.speed = 1
    }
    update() {
        this.speed = config.bullet_speed
        this.y -= this.speed
    }
}


class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = 5
        this.cooldown = 0
    }
    update() {
        this.speed = config.player_speed
        // if (this.cooldown > 0) {
        //     this.cooldown--
        // }
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
    fire() {
        if (this.cooldown > 0) {
            this.cooldown--
            return
        }
        this.cooldown = config.fire_cooldown
        let b = new Bullet(this.game)
        let x = this.x + this.w / 2 - b.w / 2
        let y = this.y - b.h / 2
        b.x = x
        b.y = y

        // 
        this.scene.addElement(b)
    }
}

class Enemy extends GuaImage {
    constructor(game) {
        let type = randomBetween(0, 4)
        let name = 'enemy' + type
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 400)
        this.y = randomBetween(0, 150)
    }
    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
}
class Cloud extends GuaImage {
    constructor(game) {
        super(game, 'cloud')
        this.setup()
    }
    setup() {
        this.speed = 1
        this.x = randomBetween(0, 400)
        this.y = randomBetween(0, 150)
    }
    update() {
        // this.speed = config.cloud_speed
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
    debug() {
        this.speed = config.cloud_speed
    }
}
class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        this.numberOfEnemies = 10
        this.bg = new GuaImage(this.game, "sky")
        this.player = new Player(this.game)
        this.cloud = new Cloud(this.game)
        this.player.x = 100
        this.player.y = 400
        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        this.addEnemies()
    }
    addEnemies() {
        let es = []
        for (let i = 0; i < this.numberOfEnemies; i++) {
            const e = new Enemy(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    setupInputs() {
        var s = this
        this.game.registerAction('a', () => {
            this.player.moveLeft()
        })
        this.game.registerAction('d', () => {
            this.player.moveRight()
        })
        this.game.registerAction('w', () => {
            this.player.moveUp()
        })
        this.game.registerAction('s', () => {
            this.player.moveDown()
        })
        this.game.registerAction('j', () => {
            this.player.fire()
        })
    }
    update() {
        super.update()
        this.cloud.y += 1
    }



}