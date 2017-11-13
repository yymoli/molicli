/*
 * @author: dongzhk
 * @date:   2017-11-01 00:00:00
 * @last modified time: 2017-11-01 18:10:00
 */

const chalk = require('chalk');
const fs = require('fs-extra');
const zipper = require("zip-local");

exports.release = function (platform, type) {
    var nativeDirPath = process.cwd() + "/native/";
    switch (type) {
        case 'package':
            console.log(platform + ' package release build start ');
            console.log("start zip project");
            // 将项目下public信息压缩到www目录中
            var source3wPath = nativeDirPath + '/' + platform + "/www";
            var projectDirPath = process.cwd() + "/public";
            var configJsonFilePath = process.cwd() + "/config.json";
            fs.readFile(configJsonFilePath, "utf8", (err, data) => {
                var configObj = JSON.parse(data);
                var projectName = configObj.buildSetting.projectName;
                // 创建www目录
                fs.mkdirsSync(source3wPath);
                // 将npm生成的public源码copy到www目录中
                fs.copySync(projectDirPath, source3wPath);
                // 将项目配置信息拷贝到www中
                fs.copySync(configJsonFilePath, source3wPath + "/config.json");
                var zipFilePath = nativeDirPath + "/" + projectName + ".zip";
                zipper.sync.zip(source3wPath).compress().save(zipFilePath);
                console.log("成功压缩文件！");
            });
            break;
        case 'project':
            console.log(platform + ' project release build start ');
            console.log('');
            console.log('No Use!');
            break;
        default:
            console.log(chalk.red(`ERROR: uncaught type , -t must be package/project`));
            console.log();
            console.log('  Examples:');
            console.log();
            console.log(chalk.gray('    # moli build ' + platform + ' -t project --release'));
            console.log();
            break;
    }
};

exports.debug = function (platform, type) {
    switch (type) {
        case 'package':
            console.log(platform + ' package debug build start ');
            break;
        case 'project':
            console.log(platform + ' project debug build start ');
            break;
        default:
            console.log(chalk.red(`ERROR: uncaught type , -t must be package/project`));
            console.log();
            console.log('  Examples:');
            console.log();
            console.log(chalk.gray('    # moli build ' + platform + ' -t project --debug'));
            console.log();
            break;
    }
};

function sendBuildRequest(){

}