/**
 * 验证是否登录的中间件
 * 如果没有登录想访问 profile 等页面，redirect 至登录页面
 */
export default function({ store, redirect }) {
  if (!store.state.user) {
    return redirect('/login')
  }
}
