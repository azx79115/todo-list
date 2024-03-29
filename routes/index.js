// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//引入home模組程式碼
const home = require('./modules/home')
//引入 todos 模組程式碼
const todos = require('./modules/todos')

//將網址結構符合/字串的request導向home模組
router.use('/', home) 
//將網址結構符合 /todos 字串開頭的request導向todos模組
router.use('/todos', todos)

// 匯出路由器
module.exports = router