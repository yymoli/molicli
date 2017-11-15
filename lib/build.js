/*
 * @author: dongzhk
 * @date:   2017-11-01 00:00:00
 * @last modified time: 2017-11-01 18:10:00
 */

const chalk = require('chalk');
const fs = require('fs-extra');
const zipper = require("zip-local");
const needle = require("needle");

var sysSayDelay = function () {
    process.stdout.write(".");
};

exports.release = function (platform, type) {
    // native目录
    var nativeDirPath = process.cwd() + "/native/";
    // 删除对应的平台目录
    fs.removeSync(nativeDirPath + platform);
    // 项目的config.json文件
    var configJsonFilePath = process.cwd() + "/config.json";
    // 先创建请求返回的目录
    fs.mkdirsSync(nativeDirPath + "output/" + platform);
    // 这个是请求返回的文件信息
    var exportFilePath = nativeDirPath + "output/" + platform + "/export.zip";
    // 需要先删除已经存在的构建信息
    fs.removeSync(exportFilePath);
    // 删除已存在的export信息
    switch (type) {
        case 'package':
            console.log("Start Read Project Config Info..");
            fs.readFile(configJsonFilePath, "utf8", (err, data) => {
                // 将json信息读取到configObj中
                var configObj = JSON.parse(data);
                // 从配置信息中获取项目名称
                var projectName = configObj.buildSetting.projectName;
                var appName = configObj.buildSetting.appName;
                var packageName = configObj.buildSetting.packageName;
                var versionName = configObj.buildSetting.versionName;
                console.log("Success Read Project Config Info");
                console.log("Build Platform:" + chalk.green(platform));
                console.log("Build Type:" + chalk.green(type));
                console.log("Project Name:" + chalk.green(projectName));
                console.log("App Name:" + chalk.green(appName));
                console.log("App PackageName:" + chalk.green(packageName));
                console.log("App VersionName:" + chalk.green(versionName));
                console.log("Start Zip Web Files To Temp.");
                // 将项目下public信息压缩到www目录中
                var projectDirPath = process.cwd() + "/public";
                // 获取项目下platform/projectName/www目录
                var source3wPath = nativeDirPath + platform + "/" + projectName + "/www";
                // 创建platform/projectName/www目录
                fs.mkdirsSync(source3wPath);
                // 将npm生成的public源码copy到platform/projectName/www目录中
                fs.copySync(projectDirPath, source3wPath);
                // 将项目配置信息拷贝到www中
                fs.copySync(configJsonFilePath, source3wPath + "/config.json");
                // 压缩项目信息临时存放
                var projectTempZipFile = nativeDirPath + platform + "/" + projectName + ".zip";
                // 将平台目录压缩平台下
                zipper.sync.zip(nativeDirPath + platform).compress().save(projectTempZipFile);
                console.log("Success Zip Web Files To Temp.");
                // 这里是构建需要使用的用户名称
                var userName = "littlemod";
                // 这里是构建的接口地址
                var requestUrl = "http://123.103.9.204:8050/ump/web/cordovabuild/buildProject";
                // 初始化请求参数
                var buffer = fs.readFileSync(projectTempZipFile);
                var data = {
                    zip_file: {
                        buffer: buffer,
                        filename: projectName + '.zip',
                        content_type: 'application/octet-stream'
                    },
                    userName: userName,
                    buildType: platform
                };
                // 请求默认信息
                needle.defaults({
                    open_timeout: 360000,
                    parse_response: false
                });
                console.log("Start Send Build App Request To BuildServer.");
                console.log("App Is Building.. Please Wait For A Moment");
                // 发送构建命令开始等待
                var startTime = new Date().getTime();
                // 这里需要定时函数处理打包延迟
                var timer = setInterval(sysSayDelay, 3000);
                needle.post(requestUrl, data, {
                    multipart: true,
                    output: exportFilePath
                }, function (err, resp, data) {
                    if (err) {
                        console.log("Build App Error:\n" + err);
                        process.exit(1);
                    }
                    // 收到返回信息，需要删除原zip包
                    fs.remove(projectTempZipFile);
                    clearInterval(timer);
                    var endTime = new Date().getTime();
                    console.log("");
                    console.log("Used Time：" + chalk.green((endTime - startTime) / 1000 + "s"));
                    // 获取返回信息
                    console.log("Success Get BuildServer Response File:\n" + chalk.green(exportFilePath));
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
