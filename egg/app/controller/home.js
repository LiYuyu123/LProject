'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, lzj';
  }
  async getInit(){
    const {ctx} =this
    ctx.body = 'api'
  }
}

module.exports = HomeController;
