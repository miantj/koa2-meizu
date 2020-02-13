const Router = require('koa-router')
const local_router = require('../router')
const db = require('./db')
const router = new Router();

//配置路由
module.exports = (app) => {

  // 数据库
  router.post('/user_add', async (ctx) => {
    let parmas = ctx.request.body
    let data = await db.find(`SELECT * FROM mz_user WHERE uname='${parmas.phones}'`)

    if (data.length === 0) {
      let data = await db.find(`INSERT INTO mz_user VALUES(null,'${parmas.phones}','${parmas.pwd}')`)
      if (data) {
        ctx.body = JSON.stringify({
          "code": 1,
          "msg": "添加成功"
        });
      } else {
        ctx.body = JSON.stringify({
          "code": -1,
          "msg": "添加失败"
        });
      }
    } else {
      ctx.body = JSON.stringify({
        "code": -2,
        "msg": "用户名已存在，请重新输入！"
      });
    }
  })

  router.post('/user_login_01', async (ctx) => {
    let parmas = ctx.request.body
    let data = await db.find(`select * from mz_user where uname='${parmas.uname}' and upwd='${parmas.upwd}'`)
    if (data.length === 1) {
      ctx.body = JSON.stringify(data);
    } else {
      ctx.body = JSON.stringify({
        "code": -2,
        "msg": "用户名或密码错误！"
      });
    }
  })

  router.get('/product_pagetotal_01', async (ctx) => {
    let data = await db.find(`SELECT count(pid) FROM mz_product`)
    let page = JSON.parse(JSON.stringify(data))[0]['count(pid)'] / 10
    ctx.body = JSON.stringify(page);
  })

  router.post('/product_list_02', async (ctx) => {
    let pageNo = (ctx.request.body.pageNo - 1) * 10
    let data = await db.find(`SELECT * FROM mz_product limit ${pageNo},10`)
    ctx.body = JSON.stringify(data);
  })

  router.post('/product_list_03', async (ctx) => {
    let count = ctx.request.body.pro_count
    let data = await db.find(`SELECT pname,pic FROM mz_left_product where style=${count}`)
    ctx.body = JSON.stringify(data);
  })

  router.post('/product_list_04', async (ctx) => {
    let pro_count = ctx.request.body.pro_count
    let data = await db.find(`SELECT pname,pic,price FROM mz_top_product where style=${pro_count}`)
    ctx.body = JSON.stringify(data);
  })

  router.get('/lottery_info', async (ctx) => {
    let data = await db.find(`select lottery_ID,uname,lottery_gift_name from lottery,mz_user where mz_user.uid=lottery.lottery_uid order by lottery_ID desc`)
    ctx.body = JSON.stringify(data);
  })

  router.get('/getLotteryTimes', async (ctx) => {
    let ctx_query = ctx.query;
    let data = await db.find(`select cLeaveTimes from lottery_count where cTime='${ctx_query.date}'and cUserID='${ctx_query.loginUid}'`)
    ctx.body = JSON.stringify(data);
  })

  router.post('/updateLotteryTimes', async (ctx) => {
    let parmas = ctx.request.body;
    let data = await db.find(`select * from lottery_count where cTime='${parmas.date}'and cUserID='${parmas.loginUid}'`)
    if (!data[0]) {
      data = await db.find(`insert into lottery_count values(null,'${parmas.date}','${parmas.loginUid}','${parmas.count}')`)
    } else {
      data = await db.find(`update lottery_count set cLeaveTimes='${parmas.count}' where cTime='${parmas.date}' and cUserID='${parmas.loginUid}'`)
    }
    ctx.body = JSON.stringify(data);
  })

  router.post('/updateLottery', async (ctx) => {
    let parmas = ctx.request.body;
    let data = await db.find(`insert into lottery values(null,'${parmas.uid}','${parmas.level}')`)
    ctx.body = JSON.stringify(data);
  })


  // 路由实例化
  local_router(app, router)
}