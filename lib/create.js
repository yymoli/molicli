/*
 * @author: dongzhk
 * @date:   2017-11-01 00:00:00
 * @last modified time: 2017-11-01 18:10:00
 */

const fs = require('fs-extra');

exports.run = function (projectName) {
    console.log(`Start Create Moli Project`);
    console.log(`ProjectName:` + projectName);
    var targetDirPath = process.cwd() + "/" + projectName;
    console.log("targetDirPath:" + targetDirPath);
    fs.pathExists(targetDirPath, (err, exists) => {
        if (err) {
            console.log("Validate Path Error:" + err);
        }
        if (exists) {
            console.log("Path [" + targetDirPath + "] Already Exists! Create Moli Project Failed!");
        } else {
            var templateDirPath = __dirname + "/../template/default-project"
            fs.copySync(templateDirPath, targetDirPath);
            console.log('copy end..');
            console.log("Create Moli Project Success!");
        }
    });
};
