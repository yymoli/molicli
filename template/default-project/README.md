
## 1.环境搭建及运行

安装依赖包

```
npm install
```

开启调试服务

```bash
npm run dev
```

产出构建资源

```bash
npm run build
```


## 2.规范

### 2.1 目录规范

- config iuap-mobile配置文件
- mock 数据模拟
- public 构建产出资源，可以直接在浏览器打开，也可以使用iuap-mobile产出客户端。
- src 开发源代码

**src下的目录说明及规范：**

- Workbench目录下面是工作台代码，工作台本身也是一个应用组件。
- HR、FI等目录按是业务模块划分，一个应用组件（application component）对应一个文件夹，比如 FI、PO、Sales，名字可以由开发者自己命名，原则上该文件夹能代表一个应用组件。
- static下面存放该工程可以被引用的公共静态资源，比如公共的js、css、图片等资源。有些只用于特定应用组件的静态资源，也可以放在对应的目录，不一定都要放在static下面。
- component目录下就是用来存放可以被公共引用的UI组件（这里的组件都是基于React开发的组件），同时每一个应用组件目录下也可以有属于自身的component目录

### 2.2 编码规范

- 应用组件目录名及UI组件名统一使用**大驼峰**命名
- 如果有样式冲突，可以基于webpack的css-loader实现css-modules
- 统一配置缩进为**两个**空格

### 2.3 仓库分支规范

- master 线上代码分支，对应线上生产环境
- develop 开发主干分支，对应测试环境
- release 预发布分支，对应待上线的staging环境

## 3.配置

### 3.1 调试服务

调试使用`npm run dev`.(安装调试工具`uba`命令：`npm i uba -g`).

### 3.2 构建打包

使用命令 `npm run build`即可打包产出资源.默认会自动产出一个public目录.


### 3.3 模拟数据

- 首先找到我们的`mock`目录，里面可以存放简单的`.json`文件来模拟数据。系统里面默认存放了`mock/api/test.json`模拟数据，想访问该mock地址就是`http://127.0.0.1:3000/api/test.json`

- 目录内还存放了`mock.js`文件，该文件里面可以自由的匹配规则来模拟自定义的路由以及数据，可以通过第三方的mockjs相关造假数据的能力来模拟非常真实的数据环境.具体的规则可以查看[http://expressjs.com/en/4x/api.html#res](http://expressjs.com/en/4x/api.html#res)

> 针对无缝模拟后端数据接口的问题，uba新增加了对该功能的支持

- 找到配置文件`uba.mock.js`，内容如下：

```js
module.exports = {
  "GET": [{
    "/User/Home": "./mock/api/user/home.json"
  }, {
    "/User/Get": "./mock/api/user/allsection.json"
  }],
  "POST": [{
    "/User/Post": "./mock/api/user/home.json"
  },{
    "/User/Send": "./mock/api/send/user.json"
  }]
}

```
可以看出里面是有对应`GET`,`POST` 请求方法的设置，在这个节点下去编写你的访问路由规则，其中`key`对应的是我们访问的数据模拟接口的地址，`value`就是我们本地真实的路径。

通过以上的设置，开启服务后，我们访问的地址就是：`http://127.0.0.1:3000/User/Home`, `uba` 就会去找到我们设置后的模拟json来加载访问的。同样，使用POST的模拟也是这样如此。

### 3.4 代理访问

`uba`提供这种代理访问的模式，通过配置我们的`uba.config.js`下的`proxyConfig`字段来设置：

```js
const proxyConfig = [{
  router: "/proxy",
  url: "cnodejs.org"
},{
  router: "/api",
  url: "g.alicdn.cn"
}];
```
这里是一个数组对象，可以代理多种访问路径和路由.访问的地址就是：`http://127.0.0.1:3000/proxy/api/v1/topic/5433d5e4e737cbe96dcef312`

代理服务真实的路径是：`http://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312`

### 3.5 更换IP或端口

`uba.config.js`内的`svrConfig`字段修改.

# test
### 先安装moli(必要时加上sudo)

$ sudo npm install uba -g
$ uba -v
Version : 2.0.4
### 创建工程
$ moli init

### 进入应用，启动项目
$ cd manage-demo
$ npm run start
访问项目首页，http://localhost:8080/
