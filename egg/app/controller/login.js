'use strict';

const controller = require('egg').Controller;

class loginController extends controller {
    // 注册
    async set() {
        const {ctx} = this;
        const res = await ctx.service.dataBase.setLogin()
        ctx.body = '注册：' + JSON.stringify(res);
    }

    //登录信息
    async get() {
        const {ctx} = this
        const res = await ctx.service.dataBase.getLogin()
        ctx.body = '登陆信息:' + JSON.stringify(res)
    }
}

module.exports = loginController;
