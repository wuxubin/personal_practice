let Ball = (game) => {
    let o = game.imageByName('ball')
    o.x = 100
    o.y = 200
    o.speedX = 5
    o.speedY = 5
    o.fired = false
    o.fire = () => {
        o.fired = true
    }
    o.move = () => {
        if (o.fired) {
            if (o.x < 0 || o.x > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY = -o.speedY
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.反弹 = () => {
        o.speedY *= -1
    }
    o.hasPoint = (x, y) => {
        let xIn = x >= o.x && x <= o.x + o.w
        let yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
    return o
}