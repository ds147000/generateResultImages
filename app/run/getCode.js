const fs = require('fs')
const path = require('path')
const buidResult = require('./buidResult')
const buidLong = require('./buidLong')
const { getImageName, getLongName, setReposen } = require('./commo')
const { getFileUrl, exists } = require('../config/index')


// 获取图片中间件，不存在进到下一步
exports.getCodeResult = function (req, res, netx) {
    // 生成名字
    const name = getImageName(req.body)
    // 存在生成文件
    const url = `${getFileUrl()}${name}.png`

    if (exists(path.join(__dirname, `../..${url}`))) {
        return setReposen(res, url, true)
    } else {
        // 异步生成
        setTimeout(() => {
            buidResult(req.body, name)
        }, 0)
        return setReposen(res, url, true)
    }
}

exports.getCodeLong = function (req, res, netx) {
    // 生成名字
    const name = getLongName(req.body)

    // 存在生成文件
    const url = `${getFileUrl()}${name}.png`

    if (exists(path.join(__dirname, `../..${url}`))) {
        return setReposen(res, url, true)
    } else {
        // 异步生成
        setTimeout(() => {
            buidLong(req.body, name)
        }, 0)
        return setReposen(res, url, true)
    }
}