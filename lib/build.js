/*
 * @author: dongzhk
 * @date:   2017-11-01 00:00:00
 * @last modified time: 2017-11-01 18:10:00
 */

const chalk = require('chalk');
const fs = require('fs-extra')
const zipper = require("zip-local");

exports.release = function (platform, type) {
    switch (type) {
        case 'package':
            console.log(platform + ' package release build start ');
            console.log("start zip project");
            var nativeDirPath = process.cwd() + "/native/";
            fs.mkdirsSync(nativeDirPath)
            var zipFilePath = nativeDirPath + '/example.zip';
            var targetDirPath = process.cwd() + "/public";
            zipper.sync.zip(targetDirPath).compress().save(zipFilePath);
            console.log("成功压缩文件！");
            break;
        case 'project':
            console.log(platform + ' project release build start ');
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