const {createCanvas} = require('canvas')
const { save, isGenerated } = require('./commo')
const {color, titleType1, titleType2, size, getFileUrl, fontFamily } = require('../config/index')
const path = require('path')
const errors = require('./error')


// 绘制列表背景
function drawBack(ctx) {
    ctx.fillStyle = size.color1
    ctx.fillRect(0, 0, size.width, size.height)
    ctx.fillStyle = size.color2
    // 绘制灰色
    let cellHeight = size.height / size.number
    for(let i = 0; i < size.number; i += 2) {
        ctx.fillRect(0, cellHeight * i, size.width, cellHeight)
    }
}

// 绘制标题
function drawTitle(ctx, text1, text2, text3, text4) {
    ctx.fillStyle = '#000000'
    ctx.textBaseline = "middle"
    ctx.font = `18px ${fontFamily}`

    let cellHeight = size.height / size.number / 2
    ctx.fillText(text1, 30, cellHeight)
    ctx.fillText(text2, 180, cellHeight)
    ctx.fillText(text3, 330, cellHeight)
    ctx.fillText(text4, 430, cellHeight)
}

// 绘制列表数据
function drawList(ctx, list = [], type) {
    list.forEach((el, k) => {
        // 获取高
        let cellHeight = size.height / size.number
        let height = cellHeight / 2 + (k + 1) * cellHeight

        drawTerm(ctx, el.term, height)

        drawGYH(ctx, el.sum, height)

        drawLH(ctx, el.lh, height)

        return type === 1 ? drawResult(ctx, el.IResults, height) : drawResult2(ctx, el.IResults, height)
    })
}

// 绘制期数
function drawTerm(ctx, text, y) {
    ctx.fillStyle = '#000000'
    ctx.textBaseline = "middle"
    ctx.textAlign = "left"
    ctx.font = `18px ${fontFamily}`
    ctx.fillText(text, 12, y)
}

// 绘制冠亚和
function drawGYH(ctx, text, y) {
    ctx.fillText(text, 330, y)
}

// 绘制龙虎
function drawLH(ctx, text, y) {
    for(let i = 0; i < text.length; i++) {
        ctx.fillStyle = color[text[i]]
        ctx.fillText(text[i], 415 + i * 20, y)
    }
}

// 绘制开奖号码
function drawResult(ctx, list = [], y) {
    ctx.font = `15px ${fontFamily}`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    list.forEach((el, k) => {
        let inX = 125 + k * 20
        // 绘制圆形
        ctx.fillStyle = color[el]
        ctx.beginPath()
        ctx.arc(inX, y, 10, 0 * Math.PI / 180 , 360 * Math.PI / 180)
        ctx.fill()
        ctx.closePath()
        // 绘制文件
        ctx.fillStyle = '#ffffff'
        ctx.fillText(el, inX, y)
    })
}

// 绘制二号类型开奖号码
function drawResult2(ctx, list = [], y) {
    ctx.font = `15px ${fontFamily}`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    list.forEach((el, k) => {
        let inX = 175 + k * 20
        // 绘制圆形
        ctx.fillStyle = '#FFD306'
        ctx.beginPath()
        ctx.arc(inX, y, 10, 0 * Math.PI / 180 , 360 * Math.PI / 180)
        ctx.fill()
        ctx.closePath()
        // 绘制文件
        ctx.fillStyle = '#ffffff'
        ctx.fillText(el, inX, y)
    })
}

// 生产图片
module.exports = function (body, name) {
    // 判断图片是否已经在生成中
    if (isGenerated(name)) {
        return 
    }
    let canvas = createCanvas(size.width, size.height)
    let ctx = canvas.getContext('2d')

    // 背景
    drawBack(ctx)

    // 标题
    if (body.type === 1) {
        drawTitle(ctx, ...titleType1)
    } else {
        drawTitle(ctx, ...titleType2)
    }

    // 列表数据
    drawList(ctx, body.data, body.type)

    // 导出图片
    canvas.toBuffer((err, buf) => {
        if (err) {
            return errors(err)
        }
        save(path.join(__dirname, '../../', getFileUrl(), `${name}.png`), buf)
    }, 'image/png')
}