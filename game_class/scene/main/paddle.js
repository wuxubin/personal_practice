

// class Paddle {
//     constructor(game) {
//         let img = game.imageByName('paddle')
//         this.w = img.width
//         this.h = img.height
//         this.image = img
//         this.x = 100
//         this.y = 250
//         this.speed = 5
//     }

//     moveLeft() {
//         this.x -= this.speed
//         if (this.x < 0) {
//             this.x = 0
//         }
//     }
//     moveRight() {
//         this.x += this.speed
//         if (this.x > 400 - this.w) {
//             this.x = 400 - this.w
//         }
//     }
//     aInb(x, x1, x2) {
//         return x >= x1 && x <= x2
//     }
//     collide(ball) {
//         let a = this
//         let b = ball
//         if (this.aInb(a.x, b.x, b.x + b.w) || this.aInb(b.x, a.x, a.x + a.w)) {
//             if (this.aInb(a.y, b.y, b.y + b.h) || this.aInb(b.y, a.y, a.y + a.h)) {
//                 return true
//             }
//         }
//         return false
//     }

// }





let Paddle = (game) => {
    let o = game.imageByName('paddle')
    // let o = {
    //     image: image,
    //     x: 100,
    //     y: 250,
    //     speed: 5,
    // }
    o.x = 100
    o.y = 250
    o.speed = 5
    o.moveLeft = () => {
        o.x -= o.speed
        if (o.x < 0) {
            o.x = 0
        }
    }
    o.moveRight = () => {
        o.x += o.speed
        if (o.x > 400 - o.w) {
            o.x = 400 - o.w
        }
    }
    let aInb = (x, x1, x2) => {
        return x >= x1 && x <= x2
    }
    o.collide = (ball) => {

        let a = o
        let b = ball
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
    return o
}
