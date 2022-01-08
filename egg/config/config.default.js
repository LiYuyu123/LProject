/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1639298847294_6987';

  // add your middleware config here
  config.middleware = [];

  //CSRF  关闭跨域限制
  config.security = {
    csrf : {
      enable : false
    }
  }

  //mysql配置
  config.mysql = {
    app:true,//是否挂载到app下
    agent:false, //是否挂载代理
    client:{
      host:'192.168.18.103',
      port:'3306',
      user:'root',
      password:'123456',
      database: 'L_loginInformation'
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
