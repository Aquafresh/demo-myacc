/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
const path = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('@cerner/duplicate-package-checker-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components')
  .default;

const { configCreator, paths } = require('@xcritical/webpack-conf');

const { name } = require(path.resolve(process.cwd(), 'package.json'));
const projectName = name.slice(1).replace('/', '_');

// const { optimization } = require('./optimization');

const styledComponentsTransformer = createStyledComponentsTransformer();

const analysisPlugins = process.env.ANALYZE
  ? [new DuplicatePackageCheckerPlugin(), new BundleAnalyzerPlugin()]
  : [];

const cacheOptions = {
  type: 'filesystem',
  name: projectName,
  maxAge: 2 * 24 * 60 * 60 * 1000,
  allowCollectingMemory: true,
  cacheDirectory: path.resolve(__dirname, '..', '..', '.cache'),
  buildDependencies: {
    config: [__filename],
    yarnlock: [path.resolve(__dirname, '..', '..', '..', 'yarn.lock')],
    platform: [
      `${path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'node_modules',
        '@my-account',
      )}/`,
    ],
  },
};

module.exports = ({ proxy, host }) =>
  configCreator({
    loaders: [
        {
            test: /\.m?js/,
            resolve: {
                fullySpecified: false,
            },
        },
      {
        test: /\.csv$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.tsx?$/,
        include(modulePath) {
          return (
            /node_modules/.test(modulePath) && /@my-account/.test(modulePath)
          );
        },
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
              allowTsInNodeModules: true,
            },
          },
        ],
      },
      {
        test: /\.(less)$/,
        loader: 'less-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
    ],
    development: {
      resolve: {
        // mainFields: ['my-account:source', 'module', 'browser', 'main'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      cache: cacheOptions,
    },
    production: {
      cache: cacheOptions,
    },
    aliases: {
      production: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    isBabelDebug: false,
    typescript: {
      getCustomTransformers: () => ({
        before: [styledComponentsTransformer],
      }),
    },
    plugins: {
      common: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.join(paths.PUBLIC_DIR, 'manifest.json'),
            },
          ],
        }),
        new ScriptExtHtmlWebpackPlugin({
          async: /\.js$/,
          preload: {
            test: /\.js$/,
          },
        }),
      ],
      dev: [
        new ReactRefreshWebpackPlugin(),
        new webpack.DefinePlugin({ __DEV__: JSON.stringify(true) }),
        // new webpack.SourceMapDevToolPlugin({}),
      ],
      prod: [
        new webpack.DefinePlugin({ __DEV__: JSON.stringify(false) }),
        ...analysisPlugins,
      ],
    },
    // optimization,
    devServer: {
        allowedHosts: 'all',
      port: 8090,
      https: true,
      host: host || 'local.umarkets.info',
      proxy,
    },
  });
