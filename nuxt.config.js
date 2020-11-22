export default {
  // 配置路由
  router: {
    linkActiveClass: 'active', // <-- This is an option IN router
    extendRoutes(routes, resolve) {
      // 由于 logister 目录为 login 和 register 公用，为了分开需要先删除默认 logister route 配置
      const logisterIndex = routes.findIndex((r) => r.name === 'logister')
      const articleIndex = routes.findIndex((r) => r.name === 'article')
      const profileIndex = routes.findIndex((r) => r.name === 'profile')
      routes.splice(logisterIndex, 1)
      routes.splice(articleIndex, 1)
      routes.splice(profileIndex, 1)
      routes.push(
        ...[
          {
            path: '/login',
            name: 'login',
            component: resolve(__dirname, 'pages/logister'),
          },
          {
            path: '/register',
            name: 'register',
            component: resolve(__dirname, 'pages/logister'),
          },
          // 此处替换原有article路由，因为原路由 path 未设置传参，不能实现动态路由
          {
            path: '/article/:slug',
            name: 'article',
            component: resolve(__dirname, 'pages/article'),
          },
          {
            path: '/profile/@:slug',
            name: 'profile',
            component: resolve(__dirname, 'pages/profile'),
          },
        ],
      )
      // console.log(routes)
    },
  },
  // 注册插件
  plugins: ['~/plugins/request.js', '~/plugins/dayjs.js'],
  head: {
    link: [
      {
        // ionicons 图标库加载
        rel: 'stylesheet',
        href: 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css',
        // icon 使用 CDN 本地化（jsdelivr.net）加载速度优化，但不一定比上面的块，所以又换回来了
        // href: 'https://cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css',
        type: 'text/css',
      },
      {
        // 谷歌字体加载
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic',
        type: 'text/css',
      },
      {
        // realworld demo 样式文件加载
        rel: 'stylesheet',
        // href: 'https://demo.productionready.io/main.css',
        // 直接存储在 static 目录下，提高加载速度；注意👇链接形式可被直接访问
        href: '/realworld.css',
      },
    ],
  },
}
