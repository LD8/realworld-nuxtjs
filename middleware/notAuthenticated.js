/**
 * 验证是否登录的中间件
 * 如果已经登录想访问 login 等页面，redirect 至首页
 */
export default function({ store, redirect }) {
  if (store.state.user) {
    return redirect('/')
  }
}
