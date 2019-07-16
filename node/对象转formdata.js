const convertModelToFormData = function (model, formData = new FormData(), namespace = '') {    
    for (let propertyName in model) {
        // in 不能识别哪些属性是对象自身的，哪些属性是继承的，所以要用 hasOwnProperty 先判断一下
        if (!model.hasOwnProperty(propertyName) || model[propertyName] == undefined) continue;
        // 如果有传入键名就传入的键名，没有就是 propertyName
        let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
        if (model[propertyName] instanceof Date) {
            // 后台的时间格式为 UTC 时间，也就是比北京时间晚8个小时。
            formData.append(formKey, (model[propertyName]).toUTCString());
        }
        else if (model[propertyName] instanceof File) {
            // 键值对为 文件名：文件
            formData.append(model[propertyName].name, model[propertyName]);
        }
        else if (model[propertyName] instanceof Array) {
            model[propertyName].forEach((element, index) => {
                if (typeof element != 'object') {
                    // 键值对为 数组名[]：数值，后面看情况修改
                    formData.append(`${formKey}[]`, element);
                }
                // File也是对象
                else if (element instanceof File) {                  
                    formData.append(element.name, element);
                }
                else {
                    // 键值对为 数组名[索引值]：对象键值，后面看情况修改
                    const tempFormKey = `${formKey}[${index}]`;
                    let convert = convertModelToFormData(element, formData, tempFormKey);
                    // let convert = convertModelToFormData(element, formData);
                    for (var pair of convert) {
                        formData.append(pair[0], pair[1])
                    }
                }
            });
        }
        else if (typeof model[propertyName] === 'object') {
            // 键值对为 对象名：对象键值，后面看情况修改
            let convert = convertModelToFormData(model[propertyName], formData, formKey);
            for (var pair of convert.entries()) {
                formData.append(pair[0], pair[1])
            }
        }
        else {
            formData.append(formKey, model[propertyName].toString());
        }
    }
    return formData;
}