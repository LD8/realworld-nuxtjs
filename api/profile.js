import { request } from '@/plugins/request'

// get profile
export const getProfile = (username) => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`,
  })
}