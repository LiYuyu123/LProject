import axios from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

const duration = 3 * 1000

function request(axiosConfig) {
    const service = axios.create({
        baseURL: process.env.VUE_APP_API_BASE, // 设置统一的请求前缀
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 10000, // 设置统一的超时时长
        transformRequest: (params) => qs.stringify(params),
    })

    // 可以增加需要传到后端的token数据
    service.interceptors.request.use((config) => {
        return config
    })

    // response interceptor
    // 后端返回的报文格式 { code: 0 | 1, data: [], message: '成功' }
    // code: 0 成功 | 1 失败
    service.interceptors.response.use(
        (response) => {
            const res = response.data
            if (+res.code !== 0) {
                ElMessage({
                    showClose: true,
                    message: res.message || '系统错误',
                    type: 'error',
                    duration,
                })
                return Promise.reject(new Error(res.message || '系统错误'))
            } else {
                return res.data
            }
        },
        (error) => {
            ElMessage({
                showClose: true,
                message: error.message || '网络请求失败',
                type: 'error',
                duration,
            })
            return Promise.reject(error)
        }
    )
    return service(axiosConfig)
}

export default request