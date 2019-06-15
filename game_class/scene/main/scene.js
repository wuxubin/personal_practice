var Scene = function (game) {
    var s = {
        game: game,
    }
    var paddle = Paddle(game)

    var ball = Ball(game)
    var score = 0
    window.blocks = loadLevel(game, 2)
    s.update = function () {
        if (window.paused) {
            return
        }
        ball.move()
        if (ball.y> paddle.y) {
            var end=new SceneEnd(game)
            game.replaceScene(end)
        }
        if (paddle.collide(ball)) {
            ball.speedY *= -1
        }
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            if (block.collide(ball)) {
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

    s.draw = function () {
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
    game.registerAction('a', function () {
        paddle.moveLeft()
    })
    game.registerAction('d', function () {
        paddle.moveRight()
    })
    game.registerAction('f', function () {
        ball.fire()
    })
    return s
}