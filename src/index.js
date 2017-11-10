/*
 * @author: dongzhk
 * @date:   2017-11-01 00:00:00
 * @last modified time: 2017-11-06 18:10:00
 */

// 命令行变色工具
const chalk = require('chalk');
// 处理build命令
const build = require('../lib/build');
// 处理create命令
const create = require('../lib/create');
// 基于commander的命令行工具
const program = require('commander');

// 获取当前node版本，如果小于6，则无法使用
const currentNodeVersion = process.versions.node;
if (currentNodeVersion.split('.')[0] < 6) {
    console.error(chalk.red('You are running Node ' + currentNodeVersion + '.\n' + 'Create Uba App requires Node 6 or higher. \n' + 'Please update your version of Node.'));
    process.exit(1);
}

// moli组件信息
const moliInfo = require('./../package.json');

// 设置版本信息
program
    .version(moliInfo.version);

// create命令
program
    .command('create <projectName>')
    .description('create your moli project')
    .action(function (projectName) {
        // validate projectName
        create.run(projectName);
    });

// build命令
program
    .command('build <platform>')
    .option("-t,--type <type>", "build type package", "package")
    .option("--release", "release mode")
    .option("--debug", "debug mode")
    .description('build your project with android/ios')
    .action(function (platform, options) {
        const buildType = options.type;
        if (platform == "ios" || platform == "android") {
            console.log("platform " + platform + " buildType " + buildType);
            if (options.release) {
                console.log("this release build");
                build.release(platform, buildType);
            } else if (options.debug) {
                console.log("this debug build");
                build.debug(platform, buildType);
            } else {
                console.log("this release build");
                build.release(platform, buildType);
            }
        } else {
            console.log("build platform must be android/ios");
        }

    });

// 帮助命令
program.on('--help', function () {
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('    $ moli create hello');
    console.log('    $ moli build -h');
    console.log('    $ moli build ios --release');
    console.log('');
});

// 格式化命令
program.parse(process.argv);