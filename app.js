//載入express 並建構應用程式伺服器
const express = require('express')
//載入handlebars
const exphbs = require('express-handlebars')
//載入body-parser
const bodyParser = require('body-parser')
//載入methodOverride
const methodOverride = require('method-override')
//引用路由器
const routes = require('./routes')

require('./config/mongoose')
const app = express()
//如果在Heroku 環境則使用process.env.PORT；否則為本地環境使用3000
const PORT = process.env.PORT || 3000



//hnadlebars引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
//用app.use 規定每一筆請求都需要透過body-parser進行前置處理
app.use(bodyParser.urlencoded({ extened: true }))
//設定每一筆請求都會透過methodOverride進行前置處理
app.use(methodOverride('_method'))
//將 request導入路由器
app.use(routes)


//設定port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})