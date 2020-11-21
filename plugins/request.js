/**
 * 基于 axios 封装的请求模块插件
 * 为什么要使用插件：
 *  因为想要实现 SSR 必须在请求头中获取客户端的 store 容器中 state.user
 *  nuxt 在调用插件时会将 context 注入插件的参数，context 包括了 store 等上下文信息
 */

import axios from 'axios'

// 创建 axios 实例，该方法经过下面插件的处理拥有了拦截器的功能
export const request = axios.create({
  baseURL: 'https://conduit.productionready.io',
})

// nuxt 插件必须为导出的默认方法
// 因为 nuxt 在调用插件时会将 context 注入插件的参数
// 所以插件方法可以在参数中获取 context，包括 query, params, req, res, app, store...
export default ({ store }) => {
  // 请求拦截器 - interceptor：相关api 可以在axios github仓库说明文档中查找到
  // 任何请求都要经过请求拦截器
  // 可以在请求拦截器中做一些公共的业务处理，例如统一设置 token 等
  request.interceptors.request.use(
    function(config) {
      // 请求成功会执行这些代码
      const { user } = store.state

      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`
      }

      // 返回请求配置对象，否则请求无法发送
      return config
    },
    function(error) {
      // 请求失败会执行这些代码
      return Promise.reject(error)
    },
  )

  // 响应拦截器
}
