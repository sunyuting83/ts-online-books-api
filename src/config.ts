import * as iconv from 'iconv-lite'
const RootUrl = 'https://www.qb5.tw/'
const TrophyUrl = (id: String = '', page: String = '') => {
  if (id === 'quanben')  return `${RootUrl}${id}/${page}`
  return `${RootUrl}top/${id}/${page}.html`
}
const DetailUrl = (id: String = '') => {
  return `${RootUrl}shu/${id}.html`
}
const CategoryUrl = (id: String = '1', page: String = '1') => {
  return `${RootUrl}list/${id}/${page}.html`
}
const WriterUrl = (id = '') => {
  id = encode(id, 'gbk')
  // console.log(id)
  const url = `${RootUrl}modules/article/authorarticle.php?author=${id}`
  return url
}

const SearchUrl = (id = '', page = '') => {
  id = encode(id, 'gbk')
  const url = `${RootUrl}modules/article/search.php?searchtype=articlename&searchkey=${id}&page=${page}`
  return url
}

const ReadUrl = (bookid = '', id = '') => {
  return `${RootUrl}shu/${bookid}/${id}.html`
}

function encode(str = '', charset = '') {
  var buf = iconv.encode(str, charset);
  var encodeStr = '';
  var ch = '';
  for (var i = 0; i < buf.length; i++) {
    ch = buf[i].toString(16);
    if (ch.length === 1) {
      ch = '0' + ch;
    }
    encodeStr += '%' + ch;
  }
  encodeStr = encodeStr.toUpperCase();
  return encodeStr;
}
const GlobalTitle = '免费小说-最新小说连载免费在线观看-笔趣阁'
const SliderRoot = 'https://www.r5k.com/'
const TabLabe = [
  {
    id: 0,
    title: '书架',
    icon: 'archive',
    link: '/mybook'
  },
  {
    id: 1,
    title: '书城',
    icon: 'shopping-bag',
    link: '/'
  },
  {
    id: 2,
    title: '排行',
    icon: 'trophy',
    link: '/trophy'
  },
]

const indexMenu = [
  {
    id: 0,
    title: '热门',
    icon: 'fa-free-code-camp',
    color: 'color:#fd6b67'
  },
  {
    id: 1,
    title: '排行',
    icon: 'fa-bar-chart',
    color: 'color:#6eccc6'
  },
  {
    id: 2,
    title: '人气',
    icon: 'fa-gg',
    color: 'color:#fd8a3f'
  }, {
    id: 3,
    title: '入库',
    icon: 'fa-cube',
    color: 'color:#74a8e6'
  },
  {
    id: 4,
    title: '最新',
    icon: 'fa-star',
    color: 'color:#aaca31'
  }
]

const slider = [
  `${SliderRoot}p/images/banner01.jpg`,
  `${SliderRoot}p/images/banner02.jpg`,
  `${SliderRoot}p/images/banner03.jpg`,
  `${SliderRoot}p/images/banner04.jpg`,
  `${SliderRoot}p/images/banner05.jpg`
]

export default {
  RootUrl,
  CategoryUrl,
  TabLabe,
  slider,
  TrophyUrl,
  indexMenu,
  DetailUrl,
  SearchUrl,
  ReadUrl,
  WriterUrl,
  GlobalTitle
}
