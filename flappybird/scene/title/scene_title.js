class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 250
        this.管子横向间距 = 400
        this.columsOfPipe = 3
        for (let i = 0; i < 3; i++) {
            let p1 = new GuaImage(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * this.管子横向间距
            let p2 = new GuaImage(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-500, -200)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    update() {
        for (const p of this.pipes) {
            p.x -= 5
            if (p.x < -100) {
                p.x += this.管子横向间距 * this.columsOfPipe
            }
        }
    }
    draw() {
        let context = this.game.context
        for (const p of this.pipes) {
            context.save()
            let w2 = p.w / 2
            let h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            let scaleX = p.flipX ? -1 : 1
            let scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.globalAlpha = p.alpha
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0)
            context.restore()
        }
    }
}

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
        // 加入水管
        this.pipe = new Pipes(game)
        this.addElement(this.pipe)
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

