const path = require('path')
const fs = require('fs')  
const errors = require('./error')
const { exists } = require('../config/index')


const timeDelte = function () {
    setTimeout(() => {
        let time = new Date()
        let url = path.join(__dirname, '../..', `/static/img/${time.getMonth()}_${time.getDate() - 2}`)
        if (exists(url)) {
            return Recursive(url)
        } 
    }, 48 * 60 * 60000)
}

// 递归删除
const Recursive = function(url) {
    fs.readdir(url, (err, files) => {
        if (err) {
            return errors(err)
        }
        // 删除图片
        files.forEach(e => {
            fs.unlinkSync(path.join(url, e))
        })
        // 删除文件夹
        fs.rmdir(url, (err) => {
            if (err) {
                return errors(err)    
            }
        })
    })
}

module.exports = timeDelte
