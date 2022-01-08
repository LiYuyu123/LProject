'use strict' //开启严格模式


const controller = require('egg').Controller

class indexController extends controller {
    async init() {
        const {ctx} = this
        ctx.body = '<h1>i am lzj</h1>'
    }

    //自由传参
    async geList() {
        const {ctx} = this
        ctx.body = ctx.query //请求的参数
    }

    //严格传参
    async geList2() {
        const {ctx} = this
        ctx.body = ctx.params.name //请求的参数
    }

    //post
    async add() {
        const {ctx} = this
        ctx.body = {
                status:200,
                message: 'ok',
                data:[]
            }

    }
}

module.exports = indexController