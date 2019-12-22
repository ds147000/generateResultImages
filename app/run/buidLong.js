const { createCanvas } = require('canvas')
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
    ctx.fillStyle = longSize.borderColor
    ctx.lineWidth = 0.5
    ctx.moveTo(0, longSize.titleHeight)
    ctx.lineTo(0, height)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(longSize.width / 2, longSize.titleHeight)
    ctx.lineTo(longSize.width / 2, height)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(longSize.width, longSize.titleHeight)
    ctx.lineTo(longSize.width, height)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, height - 0.5)
    ctx.lineTo(longSize.width, height - 0.5)
    ctx.stroke()
}

// 绘制标题
function drawTitle(ctx, text) {
    ctx.fillStyle = longSize.backgroundColor
    ctx.fillRect(0, 0, longSize.width, longSize.titleHeight)

    ctx.fillStyle = '#ffffff'
    ctx.textBaseline = "middle"
    ctx.textAlign = "center"
    ctx.font = `18px ${fontFamily}`

    ctx.fillText(text, longSize.width / 2, longSize.titleHeight / 2)
}

// 绘制列表数据
function drawList(ctx, list = []) {
    ctx.font = `12px ${fontFamily}`
    list.forEach((el, k) => {
        ctx.fillStyle = longSize.fontColor
        ctx.textAlign = "left"
        // 计算高度
        let height = k * longSize.height + longSize.titleHeight
        let cellHeight = height + longSize.height / 2
        // 名次
        ctx.fillText(el.pos, 30, cellHeight)

        // 数值
        ctx.fillStyle = color[el.betPos]
        ctx.fillRect(91, cellHeight - 9.5, 19, 19)
        ctx.fillStyle = '#fff'
        ctx.fillText(el.betPos, 95, cellHeight)

        // 数量
        ctx.textAlign = "center"
        ctx.fillStyle = longSize.fontColor
        ctx.fillText(el.num, 250, cellHeight)

        ctx.beginPath()
        ctx.fillStyle = longSize.borderColor
        ctx.lineWidth = 0.5
        ctx.moveTo(0, height)
        ctx.lineTo(longSize.width, height)
        ctx.stroke()
    })
}


// 备选：base64导出
const buiBase64 = function(canvas, name) {
    canvas.toDataURL((err, png) => {
        if (err) {
            return errors('base64模式失败' + err)
        }
        // 保存文件
        save(path.join(__dirname, '../../', getFileUrl(), `${name}.png`), png)
    })
}

// 生产图片
module.exports = function (body, name) {
    // 判断图片是否已经在生成中
    if (isGenerated(name)) {
        return
    }
    let height = Number(body.data.length * longSize.height + 2 + longSize.titleHeight)
    let canvas = createCanvas(longSize.width, height)
    let ctx = canvas.getContext('2d')

    // 背景
    drawBack(ctx, height)

    // 标题
    drawTitle(ctx, longSize.title)

    // 列表数据
    drawList(ctx, body.data)

    // 导出图片
    canvas.toBuffer((err, buf) => {
        if (err) {
            errors('buff模式生成失败' + err)
            buiBase64(canvas, name)
            return
        }
        // 保存文件
        save(path.join(__dirname, '../../', getFileUrl(), `${name}.png`), buf)
    }, 'image/png')
}