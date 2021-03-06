var Block = function (game, position) {
    var p = position
    var o = game.imageByName('block')
    o.x = p[0]
    o.y = p[1]
    o.w = 50
    o.h = 20
    o.alive = true
    o.lifes = p[2] || 1
    o.kill = function () {
        o.lifes--
        if (o.lifes < 1) {
            o.alive = false
        }
    }
    o.collide = function (b) {
        return o.alive && (rectIntersects(b, o) || rectIntersects(o, b))
    }
    return o
}