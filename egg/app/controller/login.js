'use strict';

const controller = require('egg').Controller;

class loginController  extends  controller{
     //注册
    async set() {
        const {ctx} = this;
        ctx.body='注册'
    }
}

module.exports = loginController