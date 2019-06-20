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

        walk1: 'img/zombie/Walk (1).png',
        walk2: 'img/zombie/Walk (2).png',
        walk3: 'img/zombie/Walk (3).png',
        walk4: 'img/zombie/Walk (4).png',
        walk5: 'img/zombie/Walk (5).png',
        walk6: 'img/zombie/Walk (6).png',
        walk7: 'img/zombie/Walk (7).png',
        walk8: 'img/zombie/Walk (8).png',
        walk9: 'img/zombie/Walk (9).png',
        walk10: 'img/zombie/Walk (10).png',

        idle1: 'img/zombie/idle (1).png',
        idle2: 'img/zombie/idle (2).png',
        idle3: 'img/zombie/idle (3).png',
        idle4: 'img/zombie/idle (4).png',
        idle5: 'img/zombie/idle (5).png',
        idle6: 'img/zombie/idle (6).png',
        idle7: 'img/zombie/idle (7).png',
        idle8: 'img/zombie/idle (8).png',
        idle9: 'img/zombie/idle (9).png',
        idle10: 'img/zombie/idle (10).png',
        idle11: 'img/zombie/idle (11).png',
        idle12: 'img/zombie/idle (12).png',
        idle13: 'img/zombie/idle (13).png',
        idle14: 'img/zombie/idle (14).png',
        idle15: 'img/zombie/idle (15).png',
        cave: 'img/cave.jpg',
        // flappy bird images
        bg:'img/bird/background.png',
        ground:'img/bird/ground.png',
        b1:'img/bird/bird1.png',
        b2:'img/bird/bird2.png',
        b3:'img/bird/bird3.png',
    }
    window.fps = 60
    let game = Guagame.instance(images, (g) => {
        // let s = new Scene(g)
        let s = new SceneTitle(g)
        g.runWithScene(s)
    })
    enableDebugMode(game, true)
}

_main()