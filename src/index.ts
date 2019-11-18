import * as Koa from 'koa'
import Router from './router'

const app = new Koa()

app.use(async (ctx: any, next: any) => {
  ctx.response.body = await Router(ctx)
  await next()
})

app.listen(3000)