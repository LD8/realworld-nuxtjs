import { request } from '@/plugins/request'

// 用户登录
export const login = (data) => {
  // lpzmail@163.com
  // 12345678
  return request({
    method: 'POST',
    url: '/api/users/login',
    data,
  })
}

// 用户注册
export const register = (data) => {
  return request({
    method: 'POST',
    url: '/api/users',
    data,
  })
}
