// let loadLevel = (game, n) => {
//     let blocks = []
//     n = n - 1
//     let level = levels[n]
//     for (let i = 0; i < level.length; i++) {
//         let p = level[i]
//         let b = Block(game, p)
//         blocks.push(b)
//     }
//     return blocks
// }

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
            // window.blocks = loadLevel(game, Number(k))

        }
    })
    document.querySelector('#id-input-speed').addEventListener('input', (event) => {
        let input = event.target
        window.fps = Number(input.value)
        let label = document.querySelector('#id-speed-label')
        label.innerText = window.fps
    })
}

let _main = () => {
    let images = {
        bullet: 'img/bullet.png',
        cloud: 'img/cloud.png',
        player: 'img/player.png',
        sky: 'img/sky.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        enemy4: 'img/enemy4.png',
        fire: 'img/fire.png',
    }
    window.fps = 60
    let game = Guagame.instance(images, (g) => {
        let s = new Scene(g)
        // let s = new SceneTitle(g)
        g.runWithScene(s)
    })
    enableDebugMode(game, true)
}

_main()