import { request } from '@/plugins/request'

// 传入查询 query 参数：?tag, ?author, ?favorited, ?limit（分页）, ?offset（跳过）
export const getQueriedArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params,
  })
}

// 查询单个文章
export const getSingleArticle = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })
}

// 查询单个文章评论
export const getComments = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`,
  })
}

// 评论
export const addComment = (slug, data) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data,
  })
}

// 删除评论
export const deleteComment = (slug, id) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`,
  })
}

// 查询用户关注用户的文章
export const getFeeds = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params,
    // 使用拦截器插件便不用在这里设置请求头的身份验证
    // headers: {
    //   // 用户身份验证
    //   // Authorization: `Token jwt.token.here`
    //   Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDgxMTYsInVzZXJuYW1lIjoibHB6OTk5IiwiZXhwIjoxNjEwOTc3NDU5fQ.9SiyxjxHR0caYnYmWO6tTw6A0ONH29bpM0aft2DVYtE`,
    // },
  })
}

// 点赞
export const favorite = (slug) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  })
}

// 取消点赞
export const unfavorite = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  })
}
