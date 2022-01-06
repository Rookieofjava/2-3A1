//載入express，並存入app變數中
const express = require('express')
const app = express()
//載入express-handlebars
const exphbs = require('express-handlebars')
//定義解析engin
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//載入Json
const menu = require('./restaurant.json')
//定義伺服器相關變數
const port = 3000

//載入靜態資料
app.use(express.static('public'))

//設定index page 路由
app.get('/', (req, res) => {
  res.render('index', { menuList: menu.results })
})

//設定show page 路由，實作URL變數及取變數
app.get('/restaurants/:id', (req, res) => {
  const idNumber = req.params.id
  const menuid = menu.results.find((item) => {
    return item.id == idNumber
  })
  res.render('show', { menuList: menuid })
})

//設定Search結果 路由，實作form與query之功能
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const searchResult = menu.results.filter((item) => {
    return item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.toLowerCase().includes(keyword.toLowerCase())
  })
  if(searchResult.length > 0) {
    res.render('index', { menuList: searchResult })
  } else {
    res.render('index', { menuList: menu.results })
  }
  
})

app.listen(port, () => {
  console.log(`This is my server at localhost:${port}`)
})
