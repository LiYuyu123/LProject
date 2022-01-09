'use strict';

const Service = require('egg').Service;

class dbService extends Service {
    //获取登陆信息
    async getLogin() {
        try {
            const app = this.app
            const { username,password} = this.ctx.request.body.data
            return await app.mysql.query('SELECT * FROM L_login WHERE name = ? AND possword = ?' ,[username,password])
        } catch (error) {
            console.log(error)
            return null
        }
    }

    //注册
    async setLogin() {
        try {
            const app = this.app
            const name = 'yyy'
            const possword = '2222'
            return await app.mysql.query('INSERT INTO L_login VALUES (?,?)', [name, possword])
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = dbService;
