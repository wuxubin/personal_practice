class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // game.registerAction('k', () => {
        //     let s = new Scene(game)
        //     game.replaceScene(s)
        // })
        // var label = new GuaLabel(game, "hello from gua")
        // this.addElement(label)
        let bg = new GuaImage(game, 'bg')
        this.addElement(bg)
        this.grounds = []
        for (let i = 0; i < 21; i++) {
            let g = new GuaImage(game, 'ground')
            g.x = i * 37
            g.y = 895
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 8
        let b = new GuaAnimation(game)
        b.x = 180
        b.y = 300
        this.bird = b
        this.addElement(b)
        this.setupInputs()
    }
    update() {
        super.update()
        this.skipCount--
        let offset = -2
        if (this.skipCount == 0) {
            this.skipCount = 8
            offset = 14
        }
        for (let i = 0; i < 21; i++) {
            let g = this.grounds[i]
            g.x += offset
        }
    }
    setupInputs() {
        this.game.registerAction('a', (keyStatus) => {
            this.bird.move(-5, keyStatus)
        })
        this.game.registerAction('d', (keyStatus) => {
            this.bird.move(5, keyStatus)
        })
        this.game.registerAction('j', (keyStatus) => {
            this.bird.jump()
        })
    }
}


// class GuaParticle extends GuaImage {
//     constructor(game) {
//         super(game, 'fire')
//         this.setup()
//     }
//     setup() {
//         this.life = 10
//     }
//     init(x, y, vx, vy) {
//         this.x = x
//         this.y = y
//         this.vx = vx
//         this.vy = vy
//     }
//     update() {
//         this.life--
//         this.x += this.vx
//         this.y += this.vy
//         let factor = 0.02
//         this.vx += factor * this.vx
//         this.vy += factor * this.vy
//     }
// }

// class GuaParticleSystem {
//     constructor(game) {
//         this.game = game
//         this.setup()
//     }
//     setup() {
//         this.duration = 50
//         this.x = 150
//         this.y = 200
//         this.numberOfParticles = 100
//         this.particles = []
//     }
//     update() {
//         this.duration--
//         // 添加小火花
//         if (this.particles.length < this.numberOfParticles) {
//             let p = new GuaParticle(this.game)
//             let s = 2
//             let vx = randomBetween(-s, s)
//             let vy = randomBetween(-s, s)
//             p.init(this.x, this.y, vx, vy)
//             this.particles.push(p)
//         }
//         // 更新所有的小火花
//         for (const p of this.particles) {
//             p.update()
//         }
//         this.particles = this.particles.filter(p => p.life > 0)
//     }
//     draw() {
//         if (this.duration < 0) {
//             // 这里应该从scene删掉，这个是临时的
//             return

//         }
//         for (const p of this.particles) {
//             p.draw()
//         }
//     }

// }

