const path = require('path')
const fs = require('fs')

// 判断文件
const exists = function(path) {
    return fs.existsSync(path)
}

const color = {
    "1": "rgba(255,220,0,1)",
	"2": "rgba(56,168,224,1)",
	"3": "rgba(55,60,60,1)",
	"4": "rgba(239,125,0,1)",
	"5": "rgba(68,244,184,1)",
	"6": "rgba(75,88,201,1)",
	"7": "rgba(107,106,105,1)",
	"8": "rgba(243,87,93,1)",
	"9": "rgba(227,6,19,1)",
    "10": "rgba(54,230,44,1)",
    "大": "#FF0000",
    "小": "#1183E7",
    "龙": "#FF0000",
    "虎": "#1183E7",
    "单": "#FF0000",
    "双": "#1183E7"
}

const titleType1 = ['期数', '开奖号码', '冠亚和', '1~5龙虎']

const titleType2 = ['期数', '开奖号码', '总和', '1~5龙虎']

const size = {
    width: 540,
    height: 840,
    number: 21,
    color1: '#ffff',
    color2: '#EEEEEE'
}

const longSize = {
    width: 300,
    height: 40,
    fontColor: 'red',
    backgroundColor: '#443A52',
    title: '长龙排行榜'
}

// 生成文件夹
const getFileUrl = function() {
    let time = new Date()
    let url = `/static/img/${time.getMonth()}_${time.getDate()}/`
    // 文件不存在创建文件夹
    if (!exists(path.join(__dirname, '../..', url))) {
        fs.mkdirSync(path.join(__dirname, '../..', url))
    } 
    return url
}


exports.color = color

exports.titleType1 = titleType1

exports.titleType2 = titleType2

exports.size = size

exports.longSize = longSize

exports.url = 'http://huanzhewan.com.cn'

exports.ip = '127.0.0.1'

exports.getFileUrl = getFileUrl

exports.fontFamily = 'Microsoft YaHei'

exports.exists = exists