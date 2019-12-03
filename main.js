const app = require('./app/app.js')
const { ip } = require('./app/config/index')

app.listen(8881, ip, () => {
    console.log('运行成功')
})