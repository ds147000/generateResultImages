const express = require('express')

const timeDelete = require('./run/timeDelete')
const { setOrigin } = require('./run/header')
const { getCodeResult, getCodeLong } = require('./run/getCode')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 生成20期
app.post('/getResultImage', [setOrigin , getCodeResult])

app.post('/getLongImage', [setOrigin, getCodeLong])

app.all(/[^getCode]\d/, (req, res) => {
    res.status(200).send('请求错误')
})

// 48小时后删除
timeDelete()

module.exports = app