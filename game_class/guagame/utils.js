let imageByName = (path) => {
    let img = new Image()
    img.src = path
    return img
}



let rectIntersects = (a, b) => {
    if (b.y > a.y && b.y < a.y + a.image.height) {
        if (b.x > a.x && b.x < a.x + a.image.width) {
            return true
        }
    }
}
