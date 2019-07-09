var path = require("path");
var fs = require("fs");
var num = 19641847
for (let i = 0; i < 92; i++) {
    for (let j = 0; j < 50; j++) {
        let pathName = `D:/download/${num}/${i + 1}/entry.json`;
        let path1 = `D:/download/${num}/${i + 1}/lua.flv.bili2api.80/${j}.blv`
        fs.readFile(pathName, function (err, data) {
            if (err) {
                return console.error(err);
            }
            let d = JSON.parse(data).page_data.part;
            let path2 = `D:/download/${num}/${i}-${d}${j}.mp4`
            fs.rename(path1, path2, function (err) {
                if (err) {
                    console.error(err);
                    return;
                }
                // console.log('重命名成功', i + 1);
            });
        });
    }
}