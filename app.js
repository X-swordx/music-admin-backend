const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const cors = require('koa2-cors')
const koaBody = require('koa-body')

const ENV = 'friend-itryw'

//处理跨域(CORS)
app.use(
  cors({
    origin: ['http://localhost:9528'],
    credentials: true,
  })
)
// post方法请求数据需要进行参数解析
app.use(
  koaBody({
    multipart: true,
  })
)
//全局中间件
app.use(async (ctx, next) => {
  ctx.state.env = ENV
  await next()
})

const playlist = require('./controller/playlist.js')
const swiper = require('./controller/swiper.js')
const blog = require('./controller/blog.js')

router.use('/playlist', playlist.routes())
router.use('/swiper', swiper.routes())
router.use('/blog', blog.routes())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('服务已开启在3000端口')
})
