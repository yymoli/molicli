/*
 * @author: dongzhk
 * @date:   2017-11-01 00:00:00
 * @last modified time: 2017-11-06 18:10:00
 */

var chalk = require('chalk');
const build = require('../lib/build');
const create = require('../lib/create');
const program = require('commander');

// 获取当前node版本，如果小于6，则无法使用
var currentNodeVersion = process.versions.node;
if (currentNodeVersion.split('.')[0] < 6) {
    console.error(chalk.red('You are running Node ' + currentNodeVersion + '.\n' + 'Create Uba App requires Node 6 or higher. \n' + 'Please update your version of Node.'));
    process.exit(1);
}

program
    .command('create <projectName>')
    .description('create your moli project')
    .action(function (projectName) {
        // validate projectName
        create.run(projectName);
    });

var moliInfo = require('./../package.json');

program
    .version(moliInfo.version);

program
    .usage('')
    .command('build <platform>')
    .option("-t,--type <type>", "build type package", "package")
    .option("--release", "release mode")
    .option("--debug", "debug mode")
    .description('build your project with android/ios')
    .action(function (platform, options) {
        var buildType = options.type;
        if ("ios" == platform || "android" == platform) {
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

program.on('--help', function () {
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('    $ moli create hello');
    console.log('    $ moli build -h');
    console.log('    $ moli build ios --release');
    console.log('');
});

program.parse(process.argv);