//配置路由
module.exports = (app, router) => {
  // 首页
  router.get('/', async (ctx) => {
    await ctx.render('index')
  })

  // 首页
  router.get('/index.html', async (ctx) => {
    await ctx.render('index')
  })

  // 商城首页
  router.get('/mz_shop.html', async (ctx) => {
    await ctx.render('mz_shop')
  })

  // 手机详情页
  router.get('/plus.html', async (ctx) => {
    await ctx.render('plus')
  })

  // 登录页
  router.get('/login.html', async (ctx) => {
    await ctx.render('login')
  })

  // 注册页
  router.get('/register.html', async (ctx) => {
    await ctx.render('register')
  })

  // 大转盘页
  router.get('/lottery.html', async (ctx) => {
    await ctx.render('lottery')
  })

  app
    .use(router.routes()) //启动路由
    .use(router.allowedMethods()) //最后调用根据ctx.status设置response响应头
}