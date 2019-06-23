const imageByName = (path) => {
    let img = new Image()
    img.src = path
    return img
}



const rectIntersects = (a, b) => {
    if (b.y > a.y && b.y < a.y + a.image.height) {
        if (b.x > a.x && b.x < a.x + a.image.width) {
            return true
        }
    }
}

const randomBetween = (start, end) => {
    let n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}