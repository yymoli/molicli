/*
 * @author: dongzhk
 * @date:   2017-11-01 00:00:00
 * @last modified time: 2017-11-01 18:10:00
 */

const chalk = require('chalk');
const fs = require('fs-extra');
const zipper = require("zip-local");
const needle = require("needle");
const path = require('path');

exports.release = function (platform, type) {
    var nativeDirPath = process.cwd() + "/native/";
    switch (type) {
        case 'package':
            console.log(platform + ' package release build start ');
            console.log("start zip project");
            // 将项目下public信息压缩到www目录中
            var source3wPath = nativeDirPath + platform + "/www";
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
                var zipFilePath = nativeDirPath + platform + "/" + projectName + ".zip";
                zipper.sync.zip(source3wPath).compress().save(zipFilePath);
                console.log("成功压缩文件！");
                // 这里发送post请求
                var buffer = fs.readFileSync(zipFilePath);
                var data = {
                    zip_file: {
                        buffer: buffer,
                        filename: projectName + '.zip',
                        content_type: 'application/octet-stream'
                    },
                    userName: "littlemod",
                    buildType: "ios"
                };
                // 请求默认信息
                needle.defaults({
                    open_timeout: 60000,
                    parse_response: false
                });
                // 请求返回文件信息
                var exportFilePath = nativeDirPath + platform + "/export.zip";
                needle.post('http://123.103.9.204:8050/ump/web/cordovabuild/buildProject', data, {
                    multipart: true,
                    output: exportFilePath
                }, function (err, resp, data) {
                    // 获取返回信息
                    var size = fs.statSync(exportFilePath).size;
                    if (size == resp.bytes) {
                        console.log(resp.bytes + ' bytes written to file.');
                    }
                    else {
                        throw new Error('File size mismatch: ' + size + ' != ' + resp.bytes);
                    }
                });
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

function sendBuildRequest() {

}