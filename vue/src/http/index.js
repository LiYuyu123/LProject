import request from './request'

/**
 * @description 登录
 * @returns
 * @param data: 上传数据
 */
export function getLogin(data= {}) {
    return request({
        method: 'post',
        url: '/getLogin',
        data,
    })
}


/**
 * @description 注册
 * @returns
 * @param data: 上传数据
 */
export function setLogin(data= {}) {
    return request({
        method: 'post',
        url: '/setLogin',
        data,
    })
}