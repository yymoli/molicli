/*
 * @author: dongzhk
 * @date:   2017-11-01 00:00:00
 * @last modified time: 2017-11-01 18:10:00
 */

// 命令行变色工具
const chalk = require('chalk');
// 文件操作工具
const fs = require('fs-extra');

exports.run = function () {
    // 命令开始时间
    var startTime = new Date().getTime();
    var projectPath = process.cwd();
    var configJsonFile = projectPath + "/config.json";
    var packageJsonFile = projectPath + "/package.json";

    fs.pathExists(configJsonFile, (err, exists) => {
        if (!exists) {
            console.error(chalk.red('Error! Be Sure You Are In Project Dir! Can Not Found Project config.json File'));
            process.exit(1);
        }
    });

    fs.pathExists(packageJsonFile, (err, exists) => {
        if (!exists) {
            console.error(chalk.red('Error! Be Sure You Are In Project Dir! Can Not Found Project package.json File'));
            process.exit(1);
        }
    });

    const defaults = {
        cwd: process.cwd(),
        env: process.env,
        shell: true
    };
    // 子进程操作安装npm依赖插件
    const child = require('child_process');
    const npmInstall = child.spawn('npm', ['run', 'dev', '-dd'], defaults);
    npmInstall.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    npmInstall.stderr.on('data', (data) => {
        console.log(`${data}`);
    });

    npmInstall.on('close', (code) => {
        console.log(`Success Dev!：${code}`);
        // 命令结束时间
        var endTime = new Date().getTime();
        console.log("Used Time：" + chalk.green((endTime - startTime) / 1000 + "s"));
    });
};