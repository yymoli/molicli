/**
 * 应用全局配置参数
 * 修改上线的时候，需要同步修改以下文件：
 * 1. src/static/js/summerCommon.js
 * 2. src/pages/Index/Index.html

 * 3. src/pages/SponsorHonour/GroupCode/index.html（已修改）
 * 4.图文验证码：要改地址（已修改）
 5.src/page/CreateNewDynamic/index.js //多图片上传(已修改）
 */

// env 字段在线上环境改为：prod，测试环境改为：dev


var env = "dev";
var RootURL = env == 'prod' ? "https://ws.yonyoucloud.com":"https://wstest.yonyoucloud.com";
var tsURL= env == 'prod' ? 'https://euc.yonyoucloud.com/cas/images/getValiImage?ts=':'http://idtest.yyuap.com/cas/images/getValiImage?ts=';

 var headerTest = {
    deviceId: "1",
    token: "2",
    code: "2"

};

export {RootURL,tsURL,headerTest};
