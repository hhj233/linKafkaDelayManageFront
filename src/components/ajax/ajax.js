import axios from 'axios'
import {ElMessage} from "element-plus";
import {get} from 'lodash'

const ajax = axios.create({
    baseURL: 'api',
    timeout: 10000, //请求超过10s
    withCredentials: true // 允许跨域
})

const API_CODE = {
    SUCCESS: 200,
    UNLOGIN: 23000101,
    SYSTEM_UNAUTHORIZATION: 23000102,
    MENU_UNAUTHORIZATION: 23000103
}

// request拦截器
ajax.interceptors.request.use(
    config => {
        return config
    },
    error => {
        Message({
            message: 'HTTP Request Error',
            type: 'error',
            duration: 5 * 1000
        })
        Promise.reject(error)
    }
)

// response 拦截器
ajax.interceptors.response.use(
    response => {
        let res = response.data
       /* if (res.code === API_CODE.UNLOGIN) {
            loginUtil.redirectToLogin()
        } else if (res.code === API_CODE.MENU_UNAUTHORIZATION || res.code === API_CODE.SYSTEM_UNAUTHORIZATION) {
            loginUtil.redirectToAuthorization()
        }*/
        return Promise.resolve(res)
    },
    error => {
        const errMsg = get(error, 'response.data.msg') || get(error, 'message')
        ElMessage.error(errMsg)

        return Promise.reject(errMsg)
    }
)

export default ajax