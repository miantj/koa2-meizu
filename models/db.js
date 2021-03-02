const mysql = require('mysql')


class db {

  constructor() {
    this.mydb = null

  }

  connect() {
    console.warn('mydb', this.mydb)
    if (!this.mydb) {
      this.mydb = mysql.createPool({
        host: 'localhost', //远程的话，写ip
        user: 'root', //数据库管理员
        password: '12345678', //数据库密码
        database: 'mz' //要连接的数据库名称
      })
    }
  }

  // 查询
  find(sql) {
    this.connect()
    return new Promise((resolve, reject) => {
      this.mydb.getConnection((err, connection) => {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, (err, results, fields) => {
            if (err) {
              reject(err)
            }
            resolve(results)
            connection.release() //会话结束
          })
        }
      });
    })
  }

  

}

module.exports = new db()