let obj = [
    { id: 1, parent: null },
    { id: 2, parent: 1 },
    { id: 3, parent: 2 }
]

let child = obj.pop();

const 递归 = (child) => {
    if (child.parent) {
        let parent = obj[child.parent - 1]
        parent.child = child
        return 递归(parent)
    } else {
        return ({
            obj: child
        });
    }
}
let obj2 = 递归(child);
console.log('obj2', obj2);
