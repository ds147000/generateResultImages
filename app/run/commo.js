const md5 = require('md5')
const fs = require('fs')
const { url } = require('../config/index')

// 生成结果图片名称
const getImageName = function (msg) {
    let data = msg.data.concat()
    return md5(String(data[0].term) + String(data.pop().term + String(data.pop().results)))
}

// 生成长龙图片名称
const getLongName = function (msg) {
    let data = msg.data.concat()
    let name = ''
    data.forEach(e => {
        name += e.pos + e.betPos + e.num
    })
    return md5(name)
}

// 保存图片
const save = function (path, file) {
    return new Promise((res,rej) => {
        fs.writeFile(path, file, {encoding: 'utf8'}, (err) => {
            if (err) {
                errors(err)
                rej()
            }
            res(path)
        })    
    })
    
}

// 响应
const setReposen = function (res, path, status) {
    if (status) {
        res.status(200).send(getData(200, {'url': url + path})).end()
    } else {
        res.status(500).send(getData(500, {'url': '发生错误，请稍后重试'})).end()
    }
}

// 数据体
const getData = function (status, data) {
    return {
        status,
        data
    }
}

var generatedArr = []
var generatedTime = ''

// 当前图片是否在生成中
const isGenerated = function(name) {
    if (name === null || name === undefined) {
        return true
    }
    cutGeneratedTodat()
    cutGeneratedArr()
    if (generatedArr.find(e => e === name)) {
        return true
    } else {
        generatedArr.push(name)
        return false
    }
}

// 减少记录数组内存大小
const cutGeneratedArr = function () {
    if (generatedArr.length > 20000) {
        generatedArr = generatedArr.slice(generatedArr.length / 2)
    }
}

// 判断缓存数组是否是今天
const cutGeneratedTodat = function () {
    const time = new Date()
    const timeStr  = `${time.getMonth()}-${time.getDate()}`
    if (generatedTime === '') {
        generatedTime = timeStr
        return
    } else if (generatedTime !== timeStr) {
        generatedTime = timeStr
        generatedArr = []
        return
    }
}

exports.getImageName = getImageName 

exports.getLongName = getLongName

exports.save = save

exports.setReposen = setReposen

exports.getData = getData

exports.isGenerated = isGenerated
