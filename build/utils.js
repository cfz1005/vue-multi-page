'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}





/* 这里是新增的代码 --------------------------------------------------------------------------------------------------------------------------------- */

const glob = require('glob');                             // glob是一个第三方模块，该模块允许你使用*等符号，例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
const htmlWebpackPlugin = require('html-webpack-plugin'); // 页面模板
const merge = require('webpack-merge');                   // 用于做相应的merge处理
const pagesPath = path.resolve(__dirname, '../src/pages'); // 获取相应的页面路径（我们已经在src下配置好了），所以这里是获取src文件夹下的pages文件夹

// 多入口配置
// 公共glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果文件存在就作为入口处理
exports.entries = function () {
  let entryFiles = glob.sync(pagesPath + '/*/*.js');
  let map = {};
  entryFiles.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
    map[filename] = filePath;
  });
  return map;
};

// 多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中返回
exports.htmlPlugin = function () {
  let entryHtml = glob.sync(pagesPath + '/*/*.html');
  let arr = [];
  entryHtml.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
    let conf = {
      template: filePath,                       // 模板来源
      filename: filename + '.html',             // 文件名称
      chunks: ['manifest', 'vendor', filename], // 页面模板需要的js脚步文件，如果不加这行则会引入所有的js脚步
      inject: true
    };
    if (process.env.NODE_ENV === 'production') { // 如果是生产环境，做一些压缩处理
      conf = merge(conf, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      });
    }
    arr.push(new htmlWebpackPlugin(conf));
  });
  return arr;
  // return [];
};

/* -------------------------------------------------------------------------------------------------------------------------------------------------- */