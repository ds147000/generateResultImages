const fs = require('fs')
const path = require('path')

module.exports = function(err) {
    console.error(err)
    let time = new Date()
    fs.writeFile(path.join(__dirname, `../../static/error/${time.getMonth()}-${time.getDate()}-${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}.txt`), err, () => {
        
    })
}