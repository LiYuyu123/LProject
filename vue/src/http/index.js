import request from './request'

/**
 * @description 测试代码
 * @param 无
 * @returns
 */
export function getLogin() {
    return request({
        method: 'GET',
        url: '/getLogin',
    })
}