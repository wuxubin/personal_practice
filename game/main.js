var loadLevel = function (game, n) {
    var blocks = []
    n = n - 1
    var level = levels[n]
    for (let i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function (game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function (event) {
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            window.blocks = loadLevel(game, Number(k))

        }
    })
    document.querySelector('#id-input-speed').addEventListener('input', function (event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var _main = function () {
    var images = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }
    window.fps = 60
    var game = Guagame(images, function (g) {
        console.log('run')
        var paddle = Paddle(game)

        var ball = Ball(game)
        window.blocks = loadLevel(game, 2)
        // for (let i = 0; i < 3; i++) {
        //     var b = Block()
        //     b.x = i * 100
        //     b.y = 50
        //     blocks.push(b)
        // }
        game.registerAction('a', function () {
            paddle.moveLeft()
        })
        game.registerAction('d', function () {
            paddle.moveRight()
        })
        game.registerAction('f', function () {
            ball.fire()
        })
        enableDebugMode(game, true)

        var score = 0
        game.update = function () {
            if (window.paused) {
                return
            }
            ball.move()
            if (paddle.collide(ball)) {
                ball.speedY *= -1
            }
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                if (block.collide(ball)) {
                    console.log('相撞')
                    block.kill()
                    ball.反弹()
                    score += 100
                }
            }
        }
        // mouse event
        var enableDrag = false
        game.canvas.addEventListener('mousedown', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            // 检查是否点中了 ball
            if (ball.hasPoint(x, y)) {
                // 设置拖拽状态
                enableDrag = true
            }
        })
        game.canvas.addEventListener('mousemove', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            // log(x, y, 'move')
            if (enableDrag) {
                ball.x = x
                ball.y = y
            }
        })
        game.canvas.addEventListener('mouseup', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            enableDrag = false
        })
        game.draw = function () {
            game.context.fillStyle = '#555'
            game.context.fillRect(0, 0, 400, 300)
            game.drawImage(paddle)
            game.drawImage(ball)
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                if (block.alive) {
                    game.drawImage(block)
                }
            }
            game.context.fillStyle = '#999'
            game.context.fillText('分数：' + score, 10, 290)
        }

    })
}

_main()