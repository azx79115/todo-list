//載入express 並建構應用程式伺服器
const express = require('express')
//載入mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String, //資料型別是字串
    required: true //這個是必填欄位
  },
  done: {
    type: Boolean
  }
})
module.exports = mongoose.model('Todo', todoSchema)
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const app = express()

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
  res.send('hello word')
})

//設定port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})