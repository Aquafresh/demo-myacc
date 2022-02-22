module.exports = {
  presets: [],
  plugins: [],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        'dynamic-import-node',
        '@babel/transform-runtime',
        '@babel/proposal-throw-expressions',
        '@babel/proposal-class-properties',
        '@babel/proposal-optional-chaining',
      ],
    },
  },
};
