import axios from "axios"
import API from './api'
import * as iconv from 'iconv-lite'
// import qs from "qs";
// react 中使用antd  此处自定义
// import { message } from "antd";
// vue中使用element-ui 此处自定义
// import { Loading} from "element-ui";

var rooturl = 'https://www.qb5.tw/';
// 创建axios默认请求
axios.defaults.baseURL = rooturl;
// 配置超时时间
axios.defaults.timeout = 100000;
axios.defaults.headers = {
  "Accept": 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  "Content-Type": 'text/html;charset=UTF-8',
  "Connection": "close"
};
axios.defaults.withCredentials = true;
// 配置请求拦截
axios.interceptors.request.use(config => {
  // config.setHeaders([
  //   // 在这里设置请求头与携带token信息
  // ]);
  return config;
});
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // console.log(response);
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
/**
 * get请求
 * @method get
 * @param {url, params, loading} 请求地址，请求参数，是否需要加载层
 */
var get = (url: string, pages:string = '') => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        responseType: 'stream'
      })
      .then(res => {
        if (res.status === 200) {
          //此时的res.data 则为stream
          let chunks = [];
          res.data.on('data', chunk => {
            chunks.push(chunk);
          });
          res.data.on('end', () => {
            let buffer = Buffer.concat(chunks);
            //通过iconv来进行转化。
            let str = iconv.decode(buffer, 'gbk')
            const json = makeData(pages,str)
            resolve(json)
          })
        }else {
          resolve({
            status: 1,
            message: res.status
          })
        }
      })
      .catch(err => {
        resolve({
          status: 1,
          message: err.message
        })
      })
  })
}
/**
 * post请求
 * @method post
 * @param {url, params} 请求地址，请求参数，是否需要加载层
 */
var post = (url:string, data:object) => {
  return new Promise((resolve, reject) => {
    // qs.stringify(data)
    axios
      .post(url, data)
      .then(res => {
        console.log(res);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}

function makeData(page:string, data:string):object {
  let json = {}
  switch (page) {
    case 'index':
      json = API.IndexJson(data)
      break
    case 'getcategory':
      json = API.Category(data)
      break
    case 'trophy':
      json = API.TrophyJson(data)
      break
    case 'quanben':
      json = API.AllBooks(data)
      break
    case 'detail':
      json = API.BookJson(data)
      break
    case 'writer':
      json = API.writerJson(data)
      break
    case 'category':
      json = API.catagoryJson(data)
      break
    case 'search':
      json = API.writerJson(data)
      break
    case 'book':
      json = API.readJson(data)
      break
    default:
      json = API.IndexJson(data)
      break
  }
  return json
}

export {
  get,
  post
}