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

// 获取当前用户
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/api/user',
  })
}

// 更新用户信息
export const updateUserInfo = (data) => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data,
  })
}

// follow user
export const followUser = (username) => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`,
  })
}

// unfollow user
export const unfollowUser = (username) => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`,
  })
}