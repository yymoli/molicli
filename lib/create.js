/*
 * @author: dongzhk
 * @date:   2017-11-01 00:00:00
 * @last modified time: 2017-11-01 18:10:00
 */

const fs = require('fs-extra');
// 命令行变色工具
const chalk = require('chalk');

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
                console.log(chalk.red("Write Project Config File ["+configJsonPath+"] Error:" + err));
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
        '    <name>' + projectName + '</name>\n' +
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
    // 将projectInfo写入.project文件中
    fs.writeFile(projectFilePath, projectInfo, (err) => {
        if (err) {
            console.log(chalk.red("Write Project Config File ["+projectFilePath+"] Error:" + err));
            throw err;
        }
    });
};

exports.run = function (projectName) {
    // 命令开始时间
    var startTime = new Date().getTime();
    console.log("Start Create Project："+chalk.green(projectName));
    console.log("Project Name：" + chalk.green(projectName));
    var targetDirPath = process.cwd() + "/" + projectName;
    console.log("Project Path:" + chalk.green(targetDirPath));
    fs.pathExists(targetDirPath, (err, exists) => {
        if (err) {
            console.log(chalk.red("Validate Project Path Error:" + err));
        }
        if (exists) {
            console.log(chalk.red("Project Path [" + targetDirPath + "] Is Already Exists! Create Project Failed!"));
        } else {
            var templateDirPath = __dirname + "/../template/default-project"
            // 同步拷贝文件
            console.log("Start Load Template Project:\n" + chalk.green(templateDirPath));
            fs.copySync(templateDirPath, targetDirPath);
            console.log("Init Project Config Files!");
            // 这里需要将项目信息写入文件中
            initProjectConfigJson(projectName);
            // 这里需要反向生成工具项目
            initProjectFile(projectName);
            console.log("Create Project Success!");
            // 命令结束时间
            var endTime = new Date().getTime();
            console.log("Used Time：" + chalk.green((endTime - startTime) / 1000 + "s"));
        }
    });
};

