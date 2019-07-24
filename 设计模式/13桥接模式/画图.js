//桥接模式
class Color {
    constructor(color) {
        this.color = color;
    }
}
class Shape {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
    draw() {
        //画图...
    }
}
//测试代码
let red = new Color("red")
let yellow = new Color("yellow")
let circle = new Shape('circle', red)
circle.draw()
let triangle = new Shape('triangle', yellow)
triangle.draw()