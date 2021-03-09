const mysql = require("mysql");

class db {
  constructor() {
    this.pools = {}; //连接池
  }

  query = (sql, host = "localhost", port = "3306") => {
    if (!this.pools.hasOwnProperty(host)) {
      //是否存在连接池
      this.pools[host] = mysql.createPool({
        //不存在创建
        host: host,
        port: port,
        user: "root",
        password: "12345678",
        database: "mz",
      });
    }
    return new Promise((resolve, reject) => {
      this.pools[host].getConnection((err, connection) => {
        //初始化连接池
        if (err) console.log(err, "数据库连接失败");
        else
          connection.query(sql, (err, results) => {
            //去数据库查询数据
            connection.release(); //释放连接资源
            if (err) reject(err);
            else resolve(results);
          });
      });
    });
  };
}

module.exports = new db();
