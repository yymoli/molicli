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
// 初始化project命令
const init = require('../lib/init');
// 处理npm run dev命令
const dev = require('../lib/dev');
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
    .description('Create Your Moli Project')
    .action(function (projectName) {
        // validate projectName
        create.run(projectName);
    });

// init命令
program
    .command('init')
    .description('Init Your Moli Project')
    .action(function () {
        init.run();
    });

// dev命令
program
    .command('dev <platform>')
    .description('Dev Your Moli Project (web/mobile)')
    .action(function (platform, options) {
        if (platform == "web" || platform == "mobile") {
            console.log("Start Run Dev [" + platform + "]");
            dev.run(platform);
        } else {
            console.log(chalk.red("build <platform> Must Be web/mobile/android/ios"));
        }
    });

// build命令
program
    .command('build <platform>')
    .option("--server", "App Build From Build Server")
    .description('Package/Build Your Moli Project To An App(android/ios)')
    .action(function (platform, options) {
        if (platform == "ios" || platform == "android") {
            console.log("Start Build App [" + platform + "]");
            if (options.server) {
                build.server(platform);
            } else {
                build.locate(platform);
            }
        } else if(platform == "web"){
            build.locate(platform);
        } else if(platform == "mobile"){
            build.locate(platform);
        } else{
            console.log(chalk.red("build <platform> Must Be web/mobile/android/ios"));
        }
    });

// 帮助命令
program.on('--help', function () {
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('    $ moli create hello');
    console.log('    $ moli init');
    console.log('    $ moli dev mobile');
    console.log('    $ moli build mobile');
    console.log('    $ moli build ios --server');
    console.log('');
});

// 格式化命令
program.parse(process.argv);