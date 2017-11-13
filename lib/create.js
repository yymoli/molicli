/*
 * @author: dongzhk
 * @date:   2017-11-01 00:00:00
 * @last modified time: 2017-11-01 18:10:00
 */


const fs = require('fs-extra');

// 初始化项目信息 config.json
var initProjectConfigJson = function (projectName) {
    // 获取项目下默认的config.json
    var configJsonPath = process.cwd() + "/" + projectName + "/config.json";
    // 读取json文件并修改projectName信息
    fs.readFile(configJsonPath, "utf8", (err, data) => {
        var configObj = JSON.parse(data);
        configObj.buildSetting.projectName = projectName;
        // 将修改后的json文件写回去
        fs.writeFile(configJsonPath, JSON.stringify(configObj), (err) => {
            if (err) {
                throw err;
            }
        });
    });
};

// 初始化.project文件
var initProjectFile = function (projectName) {
    var projectFilePath = process.cwd() + "/" + projectName + "/.project";
    var projectInfo = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<projectDescription>\n' +
        '    <name>'+projectName+'</name>\n' +
        '    <comment></comment>\n' +
        '    <projects>\n' +
        '    </projects>\n' +
        '    <buildSpec>\n' +
        '    </buildSpec>\n' +
        '    <natures>\n' +
        '    <nature>com.yonyou.uap.ump.project.webProjectNature</nature>\n' +
        '    <nature>com.yonyou.uap.ump.project.nature</nature>\n' +
        '    <nature>org.eclipse.jdt.core.javanature</nature>\n' +
        '    </natures>\n' +
        '    </projectDescription>';
    console.log("projectInfo" + projectInfo);
    // 将projectInfo写入.project文件中
    fs.writeFile(projectFilePath,projectInfo,(err) => {
        if(err){
            throw err;
        }
    });
    console.log("end write .project");
};

exports.run = function (projectName) {
    console.log(`Start Create Moli Project`);
    console.log(`ProjectName:` + projectName);
    var targetDirPath = process.cwd() + "/" + projectName;
    console.log("targetDirPath:" + targetDirPath);
    fs.pathExists(targetDirPath, (err, exists) => {
        if (err) {
            console.log("Validate Path Error:" + err);
        }
        if (exists) {
            console.log("Path [" + targetDirPath + "] Already Exists! Create Moli Project Failed!");
        } else {
            var templateDirPath = __dirname + "/../template/default-project"
            // 同步拷贝文件
            fs.copySync(templateDirPath, targetDirPath);
            console.log('copy template end..');
            console.log("Start init Moli Project ....!");
            // 默认环境
            const defaults = {
                cwd: targetDirPath,
                env: process.env
            };
            // 子进程操作安装npm依赖插件
            const child = require('child_process');
            const npmInstall = child.spawn('npm', ['install','-dd'], defaults);
            npmInstall.stdout.on('data', (data) => {
                console.log('${data}');
            });

            npmInstall.stderr.on('data', (data) => {
                console.log(`${data}`);
            });

            npmInstall.on('close', (code) => {
                console.log(`init完成：${code}`);
            });
            // 这里需要将项目信息写入文件中
            initProjectConfigJson(projectName);
            // 写入项目信息完成
            console.log("----end config.json----");
            // 这里需要反向生成工具项目
            initProjectFile(projectName);
            console.log("----end .project.json ----");

        }
    });
};

