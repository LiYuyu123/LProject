'use strict';

const controller = require('egg').Controller;

class loginController extends controller {
    // 注册
    async set() {
        const {ctx} = this;
        const res = await ctx.service.dataBase.setLogin()
        ctx.body = JSON.stringify(res);
    }

    //登录信息
    async get() {
        const {ctx} = this
        const res = await ctx.service.dataBase.getLogin()
        const resData = res !== null ? { code: 0, data: res, message: '成功' } : {code: 1, data: [], message: '失败'}
        ctx.body =JSON.stringify(resData)
    }
}

module.exports = loginController;
