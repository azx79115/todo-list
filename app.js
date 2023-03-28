//載入express 並建構應用程式伺服器
const express = require('express')
const app = express()
//載入mongoose
const mongoose = require('mongoose')
//載入handlebars
const exphbs = require('express-handlebars')
//載入Todo model
const Todo = require('./models/todo')




app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


//設定連線到mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

//設定首頁路由
app.get('/', (req, res) => {
  Todo.find()//取出Todo model裡的所有資料
  .lean()// 把Mongoose的Model物件轉換成乾淨的javascript資料陣列
  .then(todos => res.render('index', { todos }))//將資料傳給index樣板
  .catch(error => console.error(error))//錯誤處理
})

//設定port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})