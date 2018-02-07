// 导入数据请求组件
import axios from 'axios'
import qs from 'qs'
// 导入提示组件
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
let token = ''
const service = axios.create({
  // 设置基础路径
  headers: {
    Authorization: 'Bearer ' + token
  },
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
// 发起请求之前修改参数
service.interceptors.request.use(config => {
  // 如果存在令牌
  if (!store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  } else {
    axios({
      method: 'post',
      url: 'https://cloud.minapp.com/api/oauth2/hydrogen/openapi/authorize/',
      data: JSON.stringify({
        client_id: '24ccc646c434f0b2b31a',
        client_secret: '2056d3f1a7cfd3d83b5aab1a404737eb1b3b397f'
      })
    }).then((res) => {
      debugger
      axios({
        method: 'post',
        url: 'https://cloud.minapp.com/api/oauth2/access_token/',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
          client_id: '24ccc646c434f0b2b31a',
          client_secret: '2056d3f1a7cfd3d83b5aab1a404737eb1b3b397f',
          grant_type: 'authorization_code',
          code: res.data.code
        })
      }).then((res) => {
        token = res.data.access_token
        console.log(res.data.access_token)
      }).catch((err) => {
        console.log(err)
      })
    })
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
    * code为非20000是抛错 可结合自己业务进行修改
    */
    const res = response.data
    if (res.code !== 20000) {
      Message({
        message: res.data,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 仓库更改状态
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
