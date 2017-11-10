/*
 * @author: dongzhk
 * @date:   2017-11-01 00:00:00
 * @last modified time: 2017-11-01 18:10:00
 */


var chalk = require('chalk');
var fs = require('fs');
var archiver = require('archiver');


exports.release = function (platform, type) {
    switch (type) {
        case 'package':
            console.log(platform + ' package release build start ');
            console.log("start zip project");
            var zipFile = fs.createWriteStream(process.cwd() + '/temp/example.zip');
            var archive = archiver('zip', {
                zlib: { level: 9 } // Sets the compression level.
            });
            zipFile.on('close', function() {
                console.log(archive.pointer() + ' total bytes');
                console.log('archiver has been finalized and the output file descriptor has closed.');
            });
            zipFile.on('end', function() {
                console.log('Data has been drained');
            });
            archive.on('warning', function(err) {
                if (err.code === 'ENOENT') {
                    // log warning
                } else {
                    // throw error
                    throw err;
                }
            });
            archive.on('error', function(err) {
                throw err;
            });
            archive.pipe(zipFile);
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