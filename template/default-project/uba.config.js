require("babel-polyfill");
const path = require("path");
const os = require("os");
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const glob = require('glob');
const entries = {};
const chunks = [];
const prodEntries = {};
const prodChunks = [];
const svrConfig = {
  host: "127.0.0.1",
  port: 3000
};
const proxyConfig = [{
  enable : true,//如果为true那么就是启用代理，mock会失效，为false的时候代理失效，mock生效
  //enable : false,//如果为true那么就是启用代理，mock会失效，为false的时候代理失效，mock生效
  router: "/",

  //url: "http://10.11.65.50:8080",
  //url: "https://wstest.yonyoucloud.com",
    //url: "http://172.20.7.97:8900",
    url:"http://10.3.13.7:8091",
    //url:"http://172.27.35.1:8900",

  options : {
    filter : function(req,res){
      return (req.url.indexOf("webpack_hmr") > -1 ? false : true);
    }
  }
}];
const staticConfig = {
  folder: "src"
};

glob.sync('./src/**/index.js').forEach(path => {
  const chunk = path.split('./src/')[1].split('/index.js')[0];
  entries[chunk] = ["babel-polyfill",path, hotMiddlewareScript];
  chunks.push(chunk);
});
glob.sync('./src/**/index.js').forEach(path => {
  const chunk = path.split('./src/')[1].split('/index.js')[0];
  prodEntries[chunk] = ["babel-polyfill",path];
  prodChunks.push(chunk);
});

var devConfig = {
  devtool: 'cheap-module-source-map',
  entry: entries,
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'assets/js/[name].js',
    publicPath: '/'
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "axios":"axios"
  },
  module: {
    rules: [{
      test: /\.js[x]?$/,
      exclude: /(node_modules)/,
      include: path.resolve('src'),
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'postcss-loader'],
        fallback: 'style-loader'
      })
    }, {
      test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
      exclude: /favicon\.png$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/images/[name].[hash:8].[ext]'
        }
      }]
    }, {
      test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[hash:8].[ext]'
        }
      }]
    }, {
      test: /\.json$/,
      use: 'json-loader'
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'postcss-loader', 'less-loader'],
        fallback: 'style-loader'
      })
    }]
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'vendors',
      filename: 'assets/js/vendors.js',
      chunks: chunks,
      minChunks: chunks.length
    }),
    new ExtractTextPlugin({
      filename: 'assets/css/[name].css',
      allChunks: true
    }),
    new OpenBrowserPlugin({
      url: `http://${svrConfig.host}:${svrConfig.port}`
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    // extensions: [".js", ".jsx", ".json"],
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      api: path.resolve(__dirname, 'src/api/'),
      mock: path.resolve(__dirname, 'mock/'),
      config: path.resolve(__dirname, 'src/config/'),
	  widget : path.resolve(__dirname,`src/components/${process.env.NODE_ENV}`)
    }
  }
}

//解决兼容问题紧紧支持mac webpack-dashboard

// if (os.platform() == "darwin") {
//   devConfig.plugins.push(new DashboardPlugin(new Dashboard().setData));
// }

var prodConfig = {
  //devtool: 'cheap-module-source-map',   //压缩注释
  entry: prodEntries,
  output: {
    path: path.resolve(__dirname, `./public/${process.env.NODE_ENV}`),
    filename: 'assets/js/[name].js',
    publicPath: '../'
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "axios":"axios"
  },
  module: {
    rules: [{
      test: /\.js[x]?$/,
      exclude: /(node_modules)/,
      include: path.resolve('src'),
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'postcss-loader'],
        fallback: 'style-loader'
      })
    }, {
      test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
      exclude: /favicon\.png$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assets/images/[name].[hash:8].[ext]'
        }
      }]
    }, {
      test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[hash:8].[ext]'
        }
      }]
    }, {
      test: /\.json$/,
      use: 'json-loader'
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'postcss-loader', 'less-loader'],
        fallback: 'style-loader'
      })
    }]
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'vendors',
      filename: 'assets/js/vendors.js',
      chunks: prodChunks,
      minChunks: prodChunks.length
    }),
    new ExtractTextPlugin({
      filename: 'assets/css/[name].css',
      allChunks: true
    }),
    //紧紧是为了到手机端调试方便临时取消压缩
    // new uglifyJsPlugin({
    //  compress: {
    //    warnings: false
    //  }
    // }),
    new CopyWebpackPlugin([{
      from: "src/static",
      to: "static"
    }, {
      from: "src/resourse/css",
      to: "css"
    }])
  ],
  resolve: {
    extensions: [
      '.js', 'jsx'
    ],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      api: path.resolve(__dirname, 'src/api/'),
      mock: path.resolve(__dirname, 'mock/'),
      config: path.resolve(__dirname, 'src/config/'),
	  widget : path.resolve(__dirname,`src/components/${process.env.NODE_ENV}`)
    }
  }
}

//--------------------
glob.sync('./src/**/*.html').forEach(path => {
  const chunk = path.split('./src/')[1].split('/index.html')[0];
  const filename = chunk + '.html';
  const htmlConf = {
    filename: filename,
    template: path,
    inject: 'body',
    favicon: './src/static/img/favicon.png',
    hash: false,
    chunks: ['vendors', chunk]
  }
  devConfig.plugins.push(new HtmlWebpackPlugin(htmlConf));
});
glob.sync('./src/**/*.html').forEach(path => {
  const chunk = path.split('./src/')[1].split('/index.html')[0];
  const filename = chunk + '.html';
  const htmlConf = {
    filename: filename,
    template: path,
    inject: 'body',
    favicon: './src/static/img/favicon.png',
    hash: true,
    chunks: ['vendors', chunk]
  }
  prodConfig.plugins.push(new HtmlWebpackPlugin(htmlConf));
});

module.exports = {
  devConfig: devConfig,
  prodConfig: prodConfig,
  svrConfig: svrConfig,
  proxyConfig: proxyConfig,
  staticConfig: staticConfig
};
