'use strict';

const controller = require('egg').Controller;

const jwt = require('jsonwebtoken')

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
        const dbData = await ctx.service.dataBase.getLogin()
        const res = dbData !== null && dbData.length >0 ? dbData : {name:'',possword:''}
        //token
        const token = jwt.sign({name:res.name,password:res.possword},'lzjyyy',{expiresIn:'50000s'})

        const resData = { code: 0, data: {token,res: res.name !== '' ? 0 : 1 } , message: '成功' }
        ctx.body =JSON.stringify(resData)
    }
}

module.exports = loginController;
