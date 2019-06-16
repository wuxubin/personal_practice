class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
    }
    draw() {
        for (let i = 0; i < this.elements.length; i++) {
            const e = this.elements[i];
            this.game.drawImage(e)
        }
    }
    update() {
        for (let i = 0; i < this.elements.length; i++) {
            const e = this.elements[i];
            e.update()
        }
    }
    addElement(img) {
        //
        img.scene = this
        
        this.elements.push(img)
    }
}
