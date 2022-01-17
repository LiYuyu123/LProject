'use strict';

const Service = require('egg').Service;

class dbService extends Service {
    //获取登陆信息
    async getLogin() {
        try {
            const app = this.app
            const { username,password} = this.ctx.request.body
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
            const {username,password} = this.ctx.request.body
            const getData =  await app.mysql.query('SELECT name FROM L_login WHERE name = ? ',[username])
            return  getData.length > 0 ?  '该用户名已存在': await app.mysql.query('INSERT INTO L_login VALUES (?,?) ', [username,password])
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = dbService;
