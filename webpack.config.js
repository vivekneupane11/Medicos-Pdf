const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer-brotli').BundleAnalyzerPlugin;

const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const zlib = require("zlib");

const webpack = require('webpack')

// const JscramblerWebpack = require('jscrambler-webpack-plugin');


module.exports = {
 mode: "production",
 devtool: "nosources-source-map",

 entry: {
   app: "./src/index.js"
 },
 devtool: 'inline-source-map',
 devServer: {
     hot:true,
  static: path.join(__dirname, './dist'),
  historyApiFallback: true,

     //    publicPath: '/dist', //relative path to output path where  devserver will look for compiled files
 },
 output: {
   //with contenthash name only change when the content of assets changes
   filename: '[name].[contenthash].bundle.js',
   path: path.resolve(__dirname, './dist'), // base path where to send compiled assets
   publicPath: '/'

//    publicPath:'./dist'
 },
 resolve: {
   extensions: ['*', '.js', '.jsx'],
   alias: {
     '@': path.resolve(__dirname, 'src') // shortcut to reference src folder from anywhere
   }
 },
 optimization: {
  moduleIds: 'deterministic',

  runtimeChunk: 'single',

  splitChunks: {  
   chunks: "all",
   maxInitialRequests: Infinity,
   minSize: 0,
   cacheGroups: {
     commons: {
       test: /[\\/]node_modules[\\/]/,
       filename: 'vendors.[contenthash].js',
       chunks: 'all',
     },
    firebaseVendor: {
      test: /[\\/]node_modules[\\/](firebase)/,
      name: 'firebaseVendor',
       chunks: 'all',
       priority: 11,
     },
     reactVendor: {
       test: /[\\/]node_modules[\\/](react|react-dom)/,
       name: 'reactVendor',
       chunks: 'all',
       priority: 10,
     },
     lodashVendor: {
      test: /[\\/]node_modules[\\/](lodash)/,
      name: 'lodashVendor',
      chunks: 'all',
      priority: 10,
    },
   formikVendor: {
      test: /[\\/]node_modules[\\/](formik)/,
      name: 'formikVendor',
      chunks: 'all',
      priority: 10,
    },
   downshiftVendor: {
      test: /[\\/]node_modules[\\/](downshift)/,
      name: 'downshiftVendor',
      chunks: 'all',
      priority: 10,
    },
    
   }
  },
  minimize: true,

    minimizer: [
        new UglifyJsPlugin({
          include: /\.bundle\.js$/,
            cache: true,
            parallel: true,
            sourceMap: true, // set to true if you want JS source maps for css
            uglifyOptions: {
              output: {
                // removing comments
                comments: false,
              },
              compress: {
         
                // remove console.logs
                drop_console: true,
              },
            },
        }),
        new OptimizeCSSAssetsPlugin({})
    ]
},
 module: {
 
   rules: [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
            presets: [
                '@babel/preset-env',
                ["@babel/preset-react", {"runtime": "automatic"}]
            ],
            plugins: [
              'lodash',
                '@babel/transform-runtime'
            ]
        }
    },
     { // config for sass compilation
       test: /\.scss$/,
       use: [
         {
           loader: MiniCssExtractPlugin.loader
         },
         'css-loader',
         {
           loader: "sass-loader"
         }
       ]
     },
     {
        test: /\.(css)$/,
        use: ['style-loader','css-loader']
    },
     { // config for images
       test: /\.(png|svg|jpg|jpeg|gif|webp)$/,
       use: [
         {
           loader: 'file-loader',
           options: {
             outputPath: 'images',
           }
         }
       ],
     },
     {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,

        use: [
           {
            loader:  'file-loader?name=[name].[ext]',

            options: {
                esModule: false,
              },
             } // ?name=[name].[ext] is only necessary to preserve the original file name
            ]
      },
     { // config for fonts
       test: /\.(woff|woff2|eot|ttf|otf)$/,
       use: [
         {
           loader: 'file-loader',
           options: {
             outputPath: 'fonts',
           }
         }
       ],
     },
     {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"]
       }
   ]
 },
 plugins: [
    new HtmlWebpackPlugin({
      meta: {
        viewport: 'width=device-width, initial-scale=1,viewport-fit=cover, shrink-to-fit=no',
        'theme-color': '#12D288',
        'apple-mobile-web-app-status-bar-style': '#12D288',
        'og:title': 'Medicos Pdf',
        'og:description': 'Best place for free Medical Books , Slides , Notes , Articles , News and Journals',
        'content-type': {'http-equiv': 'content-type', content: 'text/html; charset=UTF-8'}
    },
        template: "./public/index.html",
        filename: "index.html",
        favicon: './public/favicon.ico',
        manifest: "./public/manifest.json",
        title: "Medicos Pdf",
        inject:true,
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
      }
       }),
    //  new BundleAnalyzerPlugin(),
     new LodashModuleReplacementPlugin({
      'collections': true,
      'paths': true
    }),
       new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new CopyPlugin({
        patterns: [
          { from: "./public/favicon.ico", to: "" },
          { from: "./public/manifest.json", to: "" },
          { from: "./public/logo192.png", to: "" },
          { from: "./public/android-chrome-512x512.png", to: "" },
        ],
      }),
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: "./src/src-sw.js",
        swDest: "sw.js",
        maximumFileSizeToCacheInBytes: 5*1024*1024,

      }),
   new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: ["css/*.*", "js/*.*", "fonts/*.*", "images/*.*"]
   }),
   new CompressionPlugin({
    filename: '[path][base].gz[query]',
    algorithm: 'gzip',
    test: /\.(js|css|html|svg)$/,
    minRatio: 0.1
   }),
   new CompressionPlugin({
    filename: "[path][base].br",
    algorithm: "brotliCompress",
    test: /\.(js|css|html|svg)$/,
    compressionOptions: {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      },
    },
    threshold: 10240,
    minRatio: 0.1,
  }),
   new MiniCssExtractPlugin({ // plugin for controlling how compiled css will be outputted and named
     filename: "css/[name].css",
     chunkFilename: "css/[id].css",
     ignoreOrder: true // Enable to remove warnings about conflicting order

   }),
//    new JscramblerWebpack({
//     enable: true, // optional, defaults to true
//     chunks: ['app'], // optional, defaults to all chunks
//     params: [], 
//     applicationTypes: {}
//     // and other jscrambler configurations
//   })
 ]
};