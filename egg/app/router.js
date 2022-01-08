'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/getInit',controller.home.getInit)
  router.get('/index',controller.index.init)
  router.get('/getList',controller.index.geList)//  router.get('/getList:name',controller.index.geList) 严格传参模式 ，必须传name
  router.get('/setLogin',controller.login.set)
  router.get('/getLogin',controller.login.get)
};
