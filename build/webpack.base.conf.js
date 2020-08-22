'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      },
      {
        test: /\/src\/assets\/obj\/.*\/.*\.bin/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('obj/[name].[ext]')
        }
      },
      {
        test: /\.(fbx|gltf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('obj/[name].[ext]')
        }
      },
      {
        test: /bower_components\/EaselJS\/.*\.js$/,
        loader: 'imports?this=>window!exports?window.createjs'
      },
      {
        test: require.resolve("three/examples/js/controls/OrbitControls"),
        use: "imports-loader?THREE=three"
      },
      {
        test: require.resolve("three/examples/js/controls/OrbitControls"),
        use: "exports-loader?THREE.OrbitControls"
      },
      {
        test: require.resolve("three/examples/js/loaders/FBXLoader"),
        use: "imports-loader?THREE=three"
      },
      {
        test: require.resolve("three/examples/js/loaders/FBXLoader"),
        use: "exports-loader?THREE.FBXLoader"
      },
      {
        test: require.resolve("three/examples/js/loaders/GLTFLoader"),
        use: "imports-loader?THREE=three"
      },
      {
        test: require.resolve("three/examples/js/loaders/GLTFLoader"),
        use: "exports-loader?THREE.GLTFLoader"
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
