class Single0bject {
    login() {
        console.log(' login...')
    }
}
SingleObject.getInstance = (function () {
    let instance
    return function () {
        if (!instance) {
            instance = new Single0bject()
        }
        return instance
    }
})()
let obj1 = SingleObject.getInstance()
obj1.login()
let obj2 = Single0bject.getInstance()
obj2.Login()
console.log('obj1===obj2', obj1 === obj2)