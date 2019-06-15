        // let imageByName = function (path) {
        //     let img = new Image()
        //     img.src = path
        //     return img
        // }
        let imageByName = function (path) {
            let img = new Image()
            img.src = path
            return img
        }

       

        let rectIntersects = function (a, b) {
            if (b.y > a.y && b.y < a.y + a.image.height) {
                if (b.x > a.x && b.x < a.x + a.image.width) {
                    return true
                }
            }
        }
