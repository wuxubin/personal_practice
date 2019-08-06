// var path = require("path");
// var fs = require("fs");
// var num = 52545607
// for (let i = 0; i < 100; i++) {
//     let pathName = `D:/download/${num}/${i + 1}/entry.json`;
//     fs.readFile(pathName, function (err, data) {
//         if (err) {
//             return;
//         }
//         for (let j = 0; j < 50; j++) {
//             let d = JSON.parse(data).page_data.part;
//             let path1 = `D:/download/${num}/${i + 1}/lua.flv720.bili2api.64/${j}.blv`
//             let path2 = `D:/download/${num}/${i}-${d}${j}.mp4`
//             fs.rename(path1, path2, function (err) {
//                 if (err) {                    
//                     return;
//                 }
//                 console.log('重命名成功', i + 1);
//             });
//         }
//     });
// }

var path = require("path");
var fs = require("fs");
var num = 56394225
for (let i = 0; i < 100; i++) {
    let pathName = `D:/download/${num}/${i + 1}/entry.json`;
    fs.readFile(pathName, function (err, data) {
        if (err) {
            return;
        }
        for (let j = 0; j < 50; j++) {
            let d = JSON.parse(data).page_data.part;
            let path1 = `D:/download/${num}/${i + 1}/16/audio.m4s`
            let path2 = `D:/download/${num}/${i}-${d}${j}.mp3`
            fs.rename(path1, path2, function (err) {
                if (err) {                    
                    return;
                }
                console.log('重命名成功', i + 1);
            });
        }
    });
}