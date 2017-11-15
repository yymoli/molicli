/*
 * @author: dongzhk
 * @date:   2017-11-01 00:00:00
 * @last modified time: 2017-11-01 18:10:00
 */

const chalk = require('chalk');
const fs = require('fs-extra');
const zipper = require("zip-local");
const needle = require("needle");

exports.release = function (platform, type) {
    var nativeDirPath = process.cwd() + "/native/";
    switch (type) {
        case 'package':
            console.log(platform + ' package release build start ');
            console.log("START ZIP PROJECT FILES");
            var configJsonFilePath = process.cwd() + "/config.json";
            fs.readFile(configJsonFilePath, "utf8", (err, data) => {
                // 将项目下public信息压缩到www目录中
                var projectDirPath = process.cwd() + "/public";
                var configObj = JSON.parse(data);
                // 从配置信息中获取项目名称
                var projectName = configObj.buildSetting.projectName;
                // 获取项目下www目录
                var source3wPath = nativeDirPath + platform + "/" + projectName + "/www";
                // 删除对应的平台目录
                fs.removeSync(nativeDirPath + platform);
                // 创建platform/projectName/www目录
                fs.mkdirsSync(source3wPath);
                // 将npm生成的public源码copy到www目录中
                fs.copySync(projectDirPath, source3wPath);
                // 将项目配置信息拷贝到www中
                fs.copySync(configJsonFilePath, source3wPath + "/config.json");
                var zipFilePath = nativeDirPath + platform + "/" + projectName + ".zip";
                zipper.sync.zip(nativeDirPath + platform + "/").compress().save(zipFilePath);
                console.log("END ZIP PROJECT FILES！");
                // 这里发送post请求
                var buffer = fs.readFileSync(zipFilePath);
                var data = {
                    zip_file: {
                        buffer: buffer,
                        filename: projectName + '.zip',
                        content_type: 'application/octet-stream'
                    },
                    userName: "littlemod",
                    buildType: platform
                };
                // 请求默认信息
                needle.defaults({
                    open_timeout: 360000,
                    parse_response: false
                });
                // 先创建请求返回的目录
                fs.mkdirsSync(nativeDirPath + "output/" + platform);
                // 这个是请求返回的文件信息
                var exportFilePath = nativeDirPath + "output/" + platform + "/export.zip";
                needle.post('http://123.103.9.204:8050/ump/web/cordovabuild/buildProject', data, {
                    multipart: true,
                    output: exportFilePath
                }, function (err, resp, data) {
                    // 收到返回信息，需要删除原zip包
                    fs.removeSync(zipFilePath);
                    // 获取返回信息
                    var size = fs.statSync(exportFilePath).size;
                    if (size == resp.bytes) {
                        console.log(resp.bytes + ' bytes written to file.');
                        console.log('Your Build Result At ' + exportFilePath);
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
