'use strict';

const controller = require('egg').Controller;

const jwt = require('jsonwebtoken')

class loginController extends controller {
    // 注册
    async set() {
        const {ctx} = this;
        const res = await ctx.service.dataBase.setLogin()
        ctx.body = JSON.stringify({ code: 0, data:res, message: '成功' });
    }

    //登录信息
    async get() {
        const {ctx} = this
        const dbData = await ctx.service.dataBase.getLogin()
        const res = dbData !== null && dbData.length >0 ? dbData : {name:'',possword:''}
        //token
        //TODO 前端收到的token,解密出来有问题
        const token = jwt.sign({name:res[0].name},'lzjyyy',{expiresIn:'50000s'})

        const resData = { code: 0, data: {token,res: res.name !== '' ? 0 : 1 } , message: '成功' }
        ctx.body =JSON.stringify(resData)
    }
}

module.exports = loginController;
