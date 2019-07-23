// js的事件就是代理



const star = {
    name: 'hank',
    age: 25,
    phone: 'star: 13900001111'
}

const agent = new Proxy(star, {
    get(target, key) {
        if (key === 'phone') {
            // 返回经纪人自己的电话
            return 'agent: 16899997777'
        }
        if (key === 'price') {
            // 明星不报价, 经纪人报价
            return 120000
        }
        return target[key]
    },
    set(target, key, value) {
        if (key === 'customPrice') {
            if (value < 100000) {
                // 最低 10w
                throw new Error('价格太低')
            } else {
                target[key] = value
                return true
            }
        }
    }
})

// test
console.log(agent.name)
console.log(agent.age)
console.log(agent.phone)
console.log(agent.price)

console.log(agent.customPrice = 9000)
