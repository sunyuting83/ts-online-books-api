import {get} from './httpServer'
import Config from './config'
export default async function router(ctx:any) {
  let body = {}
  const path = ctx.request.path
  const { id, page, bookid } = ctx.request.query
  switch (path) {
    case '/api/index':
      body = await get(Config.RootUrl,'index')
      break;
    case '/api/category':
      body = await get(Config.RootUrl, 'getcategory')
      break;
    case '/api/trophy':
      let trophy = 'trophy'
      if (id === 'quanben') trophy = 'quanben'
      body = await get(Config.TrophyUrl(id, page), trophy)
      break;
    case '/api/detail':
      body = await get(Config.DetailUrl(id), 'detail')
      break;
    case '/api/writer':
      body = await get(Config.WriterUrl(id), 'writer')
      break;
    case '/api/categorylist':
      body = await get(Config.CategoryUrl(id,page), 'category')
      break;
    case '/api/search':
      body = await get(Config.SearchUrl(id,page), 'search')
      break;
    case '/api/book':
      body = await get(Config.ReadUrl(id ,bookid), 'book')
      break;
    default:
      body = {
        status: 404
      }
      break;
  }
  return body
}