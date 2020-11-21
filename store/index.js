// 仅在服务端加载 cookieparser
const cookieparser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间运行的都是同一个实例
// 为了防止数据冲突/污染，务必将 state 定义为一个函数，返回数据对象
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: null,
  }
}

// 这里定义的是函数，所以 mutations 本身不需要是函数
export const mutations = {
  setUser(state, data) {
    state.user = data
  },
}

export const actions = {
  /**
   * nuxtServerInit 是一个特殊的 action 方法
   * 它只会在服务端渲染期间自动调用
   * 作用：在服务端 初始化 store 数据
   *    1. 从请求头中获取 cookie 并进行解析获取用户数据
   *    2. 传递数据给客户端（浏览器）使用
   */
  nuxtServerInit({ commit }, { req }) {
    let user = null

    // 判断请求头中是否有 cookie
    if (req.headers.cookie) {
      // 如果有 cookie 则使用 cookieparser 进行解析
      const parsed = cookieparser.parse(req.headers.cookie)
      // console.log('parsed: ', parsed)
      // 此时 parsed 中包含了其他 cookie 信息，且不是 JS 对象
      // parsed: {
      //   'Pycharm-4b6be6f8': 'fef831f5...',
      //   _ga: 'GA1.1....',
      //   csrftoken: 'T0jw...',
      //   user: '{"id":124841...}'
      // }

      try {
        // 最终将 parsed.user 解析为 JS 对象
        user = JSON.parse(parsed.user)
        // console.log('user: ', user)
      } catch (err) {
        // No valid cookie found
      }

      // 最终使用 mutations 中对应的钩子函数保存数据到全局
      commit('setUser', user)
    }
  },
}
