// const webpackConfig = require('@my-acc/webpack-config');

const webpackConfig = require('./modules/webpack-config');

 const environments = {
    UAT_UMARKETS: 'uat-umarkets',
    QA1_UMARKETS: 'qa1-umarkets',
    QA2_UMARKETS: 'qa2-umarkets',
    QA3_UMARKETS: 'qa3-umarkets',

    UAT_MAXIMARKETS: 'uat-maxi',
    QA1_MAXIMARKETS: 'qa1-maxi',
    QA2_MAXIMARKETS: 'qa2-maxi',
    QA3_MAXIMARKETS: 'qa3-maxi',
};

 const environmentsConfig = {
    [environments.UAT_UMARKETS]: {
        host: 'local.umarkets-qa.space',
        myAccount: 'https://test-myaccountnew.umarkets-qa.space',
    },
    [environments.QA1_UMARKETS]: {
        host: 'local.umarkets.info',
        myAccount: 'https://qa1-myaccountnew.umarkets.biz',
    },
    [environments.QA2_UMARKETS]: {
        host: 'local.umarkets.net',
        myAccount: 'https://qa2-myaccount.umarkets.net',
    },
    [environments.QA3_UMARKETS]: {
        host: 'local.umarkets-qa.space',
        myAccount: 'https://qa3-myaccountnew.umarkets-qa.space',
    },

    [environments.UAT_MAXIMARKETS]: {
        host: 'local.maximarkets.ai',
        myAccount: 'https://test-myaccountnew.maximarkets.ai',
    },
    [environments.QA1_MAXIMARKETS]: {
        host: 'local.maximarkets.net',
        myAccount: 'https://qa1-myaccountnew.maximarkets.net',
    },
    [environments.QA2_MAXIMARKETS]: {
        host: 'local.maximarkets.info',
        myAccount: 'https://qa2-myaccount.maximarkets.info',
    },
    [environments.QA3_MAXIMARKETS]: {
        host: 'local.maximarkets.net',
        myAccount: 'https://qa3-myaccountnew.maximarkets.net',
    },
};

 const getEnvironmentByArgs = (args, defaultEnv = environments.UAT_UMARKETS) => {
    const env = args.find(env => env.startsWith('qa') || env.startsWith('uat'));

    if (env && environmentsConfig[env]) {
        return env;
    }

    return defaultEnv;
};
//
// module.exports = {
//   environments,
//   getEnvironmentByArgs,
//   environmentsConfig,
// };

// export const environments = environments;
// export const getEnvironmentByArgs = getEnvironmentByArgs;
// export const environmentsConfig = environmentsConfig;

// export default {
//     environments,
//     getEnvironmentByArgs,
//     environmentsConfig,
// };


const selectedEnvironment = getEnvironmentByArgs(
  process.argv,
  environments.UAT_UMARKETS,
);

const proxy = {
  '/api/': {
    target: environmentsConfig[selectedEnvironment].myAccount,
    secure: true,
    changeOrigin: true,
    ws: true,
  },
  '/old/': {
    target: environmentsConfig[selectedEnvironment].myAccount,
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '/old': '',
    },
  },
  '/content/': {
    target: environmentsConfig[selectedEnvironment].myAccount,
    secure: false,
    changeOrigin: true,
  },
};

module.exports = webpackConfig({
  proxy,
  host: environmentsConfig[selectedEnvironment].host,
});
