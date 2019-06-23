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

const ajax = request => {
    let r = new XMLHttpRequest()
    r.open('GET', request.url, true)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = event => {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    r.send()
}
const e = sel => document.querySelector(sel)
const log = console.log.bind(console)
let _main = () => {
    let images = {
        // flappy bird images
        bg:'img/bird/background.png',
        pipe:'img/bird/pipe.png',
        ground:'img/bird/ground.png',
        b1:'img/bird/bird1.png',
        b2:'img/bird/bird2.png',
        b3:'img/bird/bird3.png',
    }
    window.fps = 60

    let request = {
        url: 'mario.nes',
        callback(r) {
            window.bytes = new Uint8Array(r)
            log(bytes)
            let game = Guagame.instance(images, (g) => {
                // let s = new Scene(g)
                let s = new SceneTitle(g)
                g.runWithScene(s)
            })
            enableDebugMode(game, true)

            // log('bytes', bytes)
            // drawNes(bytes)
            // let step = 0
            // let bitesPerBlock = 16
            // let tilesPerSprite = 8
            // let bytesPerSprite = bitesPerBlock * tilesPerSprite
            // setInterval(() => {
            //     // log(step)
            //     let offset = tileOffset + step * bytesPerSprite
            //     drawSprite(bytes.slice(offset))
            //     if (window.pause) {

            //     } else {
            //         step++
            //         step %= 6
            //     }
            // }, 500);
        },
    }
    ajax(request)

    
}

_main()