const CORE_LIBRARIES = [
  'react',
  '@hot-loader/react-dom',
  'redux',
  'react-redux',
  'mdi-react',
];

const getCoreLibrariesRegExp = () => {
  const nodeModules = '[\\\\/]node_modules[\\\\/]';

  const coreLibs = CORE_LIBRARIES.map(coreLibrary =>
    coreLibrary.replace(/\//, '[\\\\/]'),
  ).join('|');

  return new RegExp(`${nodeModules}(${coreLibs})[\\\\/]`);
};

const coreLibrariesRegExp = getCoreLibrariesRegExp();

const optimization = {
  runtimeChunk: 'single',
  splitChunks: {
    maxInitialRequests: Infinity,
    cacheGroups: {
      xcritical: {
        test: /[\\/]node_modules[\\/](@xcritical)[\\/]/,
        name: 'xcritical',
        chunks: 'all',
      },
      platform: {
        test: /[\\/]node_modules[\\/](@my-account)[\\/]/,
        name: 'platform',
        chunks: 'all',
      },
      packages: {
        test: /[\\/]packages[\\/]my-acc-forex[\\/]src[\\/]components[\\/]/,
        name: 'packages',
        chunks: 'all',
      },
      theme: {
        test: /[\\/]packages[\\/]my-acc-forex[\\/]src[\\/]theme[\\/]/,
        name: 'theme',
        chunks: 'all',
      },
      libraries: {
        test(modulePath) {
          return (
            /node_modules/.test(modulePath.context) &&
            !/@xcritical/.test(modulePath.context) &&
            !/@my-account/.test(modulePath.context) &&
            !/packages/.test(modulePath.context) &&
            !coreLibrariesRegExp.test(modulePath.context)
          );
        },
        name: 'libraries',
        chunks: 'all',
      },
      coreLibraries: {
        test(modulePath) {
          return coreLibrariesRegExp.test(modulePath.context);
        },
        name: 'core-libraries',
        chunks: 'all',
      },
    },
  },
};

module.exports = {
  optimization,
};
