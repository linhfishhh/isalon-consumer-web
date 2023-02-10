// Important modules this config uses
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OfflinePlugin = require('offline-plugin');
const { HashedModuleIdsPlugin, DefinePlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const platform = process.env.TARGET_PLATFORM || 'browser';
const isCordova = platform === 'ios' || platform === 'android';
const environment = process.env.TARGET_ENV || 'stg';
const ignoreCachePaths = ['/tin-tuc'];

module.exports = require('./webpack.base.babel')({
  mode: 'production',

  // In production, we skip all hot-reloading stuff
  entry: [
    require.resolve('react-app-polyfill/ie11'),
    path.join(process.cwd(), 'app/app.js'),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },

  plugins: (() => {
    const plugins = [
      // Minify and optimize the index.html
      // Put it in the end to capture all the HtmlWebpackPlugin's
      // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
      new HtmlWebpackPlugin({
        template: isCordova ? 'app/index_cordova.html' : 'app/index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
        inject: true,
      }),
    ];
    if (platform === 'browser') {
      plugins.push(
        /*
        new OfflinePlugin({
          relativePaths: false,
          publicPath: '/',
          appShell: '/',

          // No need to cache .htaccess. See http://mxs.is/googmp,
          // this is applied before any match in `caches` section
          excludes: ['.htaccess'],

          caches: {
            main: [':rest:'],

            // All chunks marked as `additional`, loaded after main section
            // and do not prevent SW to install. Change to `optional` if
            // do not want them to be preloaded at all (cached only when first loaded)
            additional: ['*.chunk.js'],
          },

          // ignore some cache paths
          cacheMaps: [
            {
              match: url => {
                if (
                  ignoreCachePaths.findIndex(
                    p => url.pathname.indexOf(p) === 0,
                  ) > 0
                ) {
                  return true;
                }

                // eslint-disable-next-line no-restricted-globals
                return new URL('/', location);
              },
              requestTypes: ['navigate'],
            },
          ],

          // Removes warning for about `additional` section usage
          safeToUseOptionalCaches: true,

          // Option for service worker and app cache
          ServiceWorker: {
            events: true,
          },
          AppCache: {
            events: true,
          },
        }),
        */
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8,
        }),

        new WebpackPwaManifest({
          name: 'iSalon Booking',
          short_name: 'iSalon Booking',
          background_color: '#fafafa',
          theme_color: '#b1624d',
          inject: true,
          ios: true,
          icons: [
            {
              src: path.resolve('app/assets/images/ic_logo.png'),
              sizes: [72, 96, 128, 144, 192, 384, 512],
            },
            {
              src: path.resolve('app/assets/images/ic_logo.png'),
              sizes: [120, 152, 167, 180],
              ios: true,
            },
          ],
        }),
      );
    } else {
      plugins.push(
        new DefinePlugin({
          CodePushDeploymentKey: JSON.stringify(
            (() => {
              const keys = {
                ios: {
                  prod: 'WPD4ecW96pkXYg7K0HVIMOQCTpVh464noL4xV',
                  stg: 'h3K5bdPdkHtVyE2sOQVhPFxXZWZWzEOM3XXye',
                },
                android: {
                  prod: '0jHSuV5Rn7r8uZ-sijy-c24B2HWYvsUureUAJ',
                  stg: 'dfrZpKyr6ZVV8maLXIcbg2EWxPmuvfWkvIlm0',
                },
              };
              return keys[platform][environment] || 'NONE';
            })(),
          ),
        }),
      );
    }

    plugins.push(
      new HashedModuleIdsPlugin({
        hashFunction: 'sha256',
        hashDigest: 'hex',
        hashDigestLength: 20,
      }),
    );

    return plugins;
  })(),

  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },

  module: {
    rules: [],
  },
});
