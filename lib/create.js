/*
 * @author: dongzhk
 * @date:   2017-11-01 00:00:00
 * @last modified time: 2017-11-01 18:10:00
 */

const fs = require('fs-extra');

var testFunction = function (data) {
    console.log(data);
};

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
            // 同步拷贝文件
            fs.copySync(templateDirPath, targetDirPath);
            console.log('copy template end..');
            console.log("Start init Moli Project ....!");
            var timer = setInterval(testFunction,1000,"init npm module ...");
            // 默认环境
            const defaults = {
                cwd: targetDirPath,
                env: process.env
            };
            // 子进程操作安装npm依赖插件
            const child = require('child_process');
            const npmInstall = child.spawn('npm', ['install'], defaults);
            npmInstall.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });

            npmInstall.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
            });

            npmInstall.on('close', (code) => {
                console.log(`init完成：${code}`);
                clearInterval(timer);
            });

        }
    });
};

