const {createCanvas} = require('canvas')
const { save, isGenerated } = require('./commo')
const { longSize, color, getFileUrl, fontFamily } = require('../config/index')
const path = require('path')
const errors = require('./error')

// 绘制列表背景
function drawBack(ctx, height) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, longSize.width, height)
    // 绘制边框
    ctx.beginPath()
    ctx.fillStyle = longSize.backgroundColor
    ctx.lineWidth = 1
    ctx.moveTo(1, longSize.height)
    ctx.lineTo(1, height)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(149.5, longSize.height)
    ctx.lineTo(149.5, height)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(longSize.width, longSize.height)
    ctx.lineTo(longSize.width, height)
    ctx.stroke()
}

// 绘制标题
function drawTitle(ctx, text) {
    ctx.fillStyle = longSize.backgroundColor
    ctx.fillRect(0, 0, longSize.width, longSize.height)

    ctx.fillStyle = '#ffffff'
    ctx.textBaseline = "middle"
    ctx.textAlign = "center"
    ctx.font = `24px ${fontFamily}`

    ctx.fillText(text, longSize.width / 2, longSize.height / 2)
}

// 绘制列表数据
function drawList(ctx, list = []) {
    ctx.font = `18px ${fontFamily}`
    list.forEach((el, k) => {
        ctx.fillStyle = longSize.fontColor
        ctx.textAlign = "left"
        // 计算高度
        let height = (k + 1) * longSize.height
        let cellHeight = height + longSize.height / 2
        // 名次
        ctx.fillText(el.pos, 20, cellHeight)

        // 数值
        ctx.fillStyle = color[el.betPos]
        ctx.fillText(el.betPos, 100, cellHeight)

        // 数量
        ctx.textAlign = "center"
        ctx.fillStyle = longSize.fontColor
        ctx.fillText(el.num, 225, cellHeight)

        ctx.beginPath()
        ctx.fillStyle = longSize.backgroundColor
        ctx.lineWidth = 1
        ctx.moveTo(0, height)
        ctx.lineTo(longSize.width, height)
        ctx.stroke()
    })
}

// 生产图片
module.exports = function (body, name) {
    // 判断图片是否已经在生成中
    if (isGenerated(name)) {
        return 
    }
    let height = body.data.length * longSize.height
    let canvas = createCanvas(longSize.width, height)
    let ctx = canvas.getContext('2d')

    // 背景
    drawBack(ctx, height)

    // 标题
    drawTitle(ctx, longSize.title)

    // 列表数据
    drawList(ctx, body.data, body.type)
    // 导出图片
    canvas.toBuffer((err, buf) => {
        if (err) {
            return errors(err)
        }
        // 保存文件
        save(path.join(__dirname, '../../', getFileUrl(), `${name}.png`), buf)
    }, 'image/png')
}