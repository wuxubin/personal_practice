let loadLevel = (game, n) => {
    let blocks = []
    n = n - 1
    let level = levels[n]
    for (let i = 0; i < level.length; i++) {
        let p = level[i]
        let b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

let enableDebugMode = (game, enable) => {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', (event) => {
        let k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            window.blocks = loadLevel(game, Number(k))

        }
    })
    document.querySelector('#id-input-speed').addEventListener('input', (event) => {
        let input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

let _main = () => {
    let images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/paddle.png',
    }
    window.fps = 60
    let game = new Guagame(images, (g) => {
        let s = new SceneTitle(g)
        g.runWithScene(s)
    })
    enableDebugMode(game, true)
}

_main()