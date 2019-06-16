let Block = (game, position) => {
    let p = position
    let o = game.imageByName('block')
    o.x = p[0]
    o.y = p[1]
    o.w = 50
    o.h = 20
    o.alive = true
    o.lifes = p[2] || 1
    o.kill = () => {
        o.lifes--
        if (o.lifes < 1) {
            o.alive = false
        }
    }
    o.collide = (b) => {
        return o.alive && (rectIntersects(b, o) || rectIntersects(o, b))
    }
    return o
}