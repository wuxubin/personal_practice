class Scene {
    constructor(game) {
        this.game = game
        this.paddle = Paddle(this.game)
        this.ball = Ball(this.game)
        this.score = 0
        this.init()
    }
    update() {
        if (window.paused) {
            return
        }
        this.ball.move()
        if (this.ball.y > this.paddle.y) {
            var end = new SceneEnd(this.game)
            this.game.replaceScene(end)
        }
        if (this.paddle.collide(this.ball)) {
            this.ball.speedY *= -1
        }
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            if (block.collide(this.ball)) {
                block.kill()
                this.ball.反弹()
                this.score += 100
            }
        }
    }

    draw() {
        this.game.context.fillStyle = '#555'
        this.game.context.fillRect(0, 0, 400, 300)
        this.game.drawImage(this.paddle)
        this.game.drawImage(this.ball)
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            if (block.alive) {
                this.game.drawImage(block)
            }
        }
        this.game.context.fillStyle = '#999'
        this.game.context.fillText('分数：' + this.score, 10, 290)
    }

    init() {
        window.blocks = loadLevel(this.game, 2)
        var enableDrag = false
        this.game.canvas.addEventListener('mousedown', (event) => {
            var x = event.offsetX
            var y = event.offsetY
            // 检查是否点中了 ball
            if (this.ball.hasPoint(x, y)) {
                // 设置拖拽状态
                enableDrag = true
            }
        })
        this.game.canvas.addEventListener('mousemove', (event) => {
            var x = event.offsetX
            var y = event.offsetY
            // log(x, y, 'move')
            if (enableDrag) {
                this.ball.x = x
                this.ball.y = y
            }
        })
        this.game.canvas.addEventListener('mouseup', (event) => {
            var x = event.offsetX
            var y = event.offsetY
            enableDrag = false
        })
        this.game.registerAction('a', () => {
            this.paddle.moveLeft()
        })
        this.game.registerAction('d', () => {
            this.paddle.moveRight()
        })
        this.game.registerAction('f', () => {
            this.ball.fire()
        })
    }
}