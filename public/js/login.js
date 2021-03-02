window.onload = function () {
  let timer = setInterval(function () {
    wid += 1;
    pgs.style.width = wid + "%";
    if (wid >= 100) {
      setTimeout(function () {
        pgs.style.display = "none";
        clearInterval(timer);
      }, 30);
    }
  }, 30);
  ("use strict");
  let divs = document.forms[0];
  (function () {
    //多页效果
    //账号登陆验证
    let as = document.querySelectorAll("#stn a");
    as[1].onclick = function () {
      as[1].className = "me";
      as[0].className = "";
      divs.firstElementChild.nextElementSibling.style.zIndex = 1;
      divs.lastElementChild.previousElementSibling.style.zIndex = 10;
    };

    //手机登陆验证
    as[0].onclick = function () {
      as[0].className = "me";
      as[1].className = "";
      divs.firstElementChild.nextElementSibling.style.zIndex = 10;
      divs.lastElementChild.previousElementSibling.style.zIndex = 1;
    };

    //二维码扫描登陆
    as[2].onclick = function () {
      if (as[2].className !== "code_c1") {
        as[2].className = "code_c1";
        divs.lastElementChild.style.display = "block";
      } else {
        as[2].className = "code_c";
        divs.lastElementChild.style.display = "none";
      }
    };
  })();
  (function () {
    //用reg测试当前文本框类容】
    let txtName = divs.username;
    let txtPwd = divs.pwd;
    let txtPhone = divs.phones;
    let txtUser = divs.user;
    let t = 0,
      l = 0;
    let code = [];

    //--- 生成动态密码
    let get = document.querySelector(".get");
    //--- 获取验证码
    get.onclick = function () {
      console.warn(txtPhone.value);
      if (txtPhone.value) {
        if (l === 1) {
          createCode();
        }
      } else {
        alert("请输入手机号！");
        return;
      }

      //验证码验证
      txtUser.onblur = function () {
        validateCode(this);
      };
      //验证码验证
      function validateCode(txt) {
        let inputCode = txt.value;
        let span = txt.parentElement.parentElement.firstElementChild;
        span.style.opacity = "0";
        if (inputCode.length <= 0) {
          span.style.opacity = "1";
          span.innerHTML = "请输入验证码！";
          t = 0;
        } else if (inputCode.toUpperCase() != code.join("").toUpperCase()) {
          span.className = "info";
          span.style.opacity = "1";
          span.innerHTML = "验证码错误";
          t = 0;
        } else {
          span.style.opacity = "0";
          t = 1;
        }
      }
    };

    let createCode = function () {
      code = [];
      let codeLength = 4; //验证码的长度
      let codeChars = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ); //所有候选组成验证码的字符，当然也可以用中文的
      for (let i = 0; i < codeLength; i++) {
        let charNum = Math.floor(Math.random() * 52);
        code.push(codeChars[charNum]);
      }
      console.log("验证码:" + code.join(""));
      alert("验证码:" + code.join(""));
      return code;
    };

    //魅族账户验证
    let val = function (txt, reg) {
      let span = txt.parentElement.parentElement.firstElementChild;
      span.style.opacity = "0";
      if (reg.test(txt.value)) {
        span.style.opacity = "0";
      } else {
        span.className = "info";
        span.style.opacity = "1";
        span.innerHTML = "账户格式错误";
      }
    };

    //魅族密码验证
    let pwd = function (txt, reg) {
      let span = txt.parentElement.parentElement.firstElementChild;
      span.style.opacity = "0";
      if (reg.test(txt.value)) {
        span.style.opacity = "0";
      } else {
        span.className = "info";
        span.style.opacity = "1";
        span.innerHTML = "密码格式错误";
      }
    };
    //手机号验证
    let phone = function (txt, reg) {
      let span = txt.parentElement.parentElement.firstElementChild;
      span.style.opacity = "0";
      if (reg.test(txt.value)) {
        span.style.opacity = "0";
        l = 1;
      } else {
        span.className = "info";
        span.style.opacity = "1";
        span.innerHTML = "手机号格式错误";
        l = 0;
      }
    };
    //手机号验证
    txtPhone.onblur = function () {
      phone(this, /^(\+86|0086)?\s*1[34578]\d{9}$/);
    };
    //魅族账号验证
    txtName.onblur = function () {
      val(
        this,
        /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$|^(\+86|0086)?\s*1[34578]\d{9}$/
      );
    };
    //账户密码验证
    txtPwd.onblur = function () {
      pwd(this, /^\w{6,8}$/);
    };

    let btn2 = document.querySelectorAll(".form_bottom")[1];
    let btn = document.querySelectorAll(".form_bottom")[0];
    //找到提交按钮,绑定单击事件
    btn2.onclick = function (e) {
      console.warn(t, l);
      if (t == 1 && l == 1) {
        location.href = "mz_shop.html";
      } else {
        e.preventDefault();
      }
    };
    btn.onclick = function (e) {
      //2.1:获取用户名，密码
      let n = $("[name='username']").val();
      let p = $("[name='pwd']").val();
      //2.2:发送ajax $.ajax();
      if (val && pwd) {
        $.ajax({
          type: "POST",
          url: "user_login_01",
          data: {
            uname: n,
            upwd: p,
          },
          success: function (data) {
            data = JSON.parse(data);
            console.warn(data);
            if (!data || data.code < 0) {
              //失败阻止提交
              e.preventDefault();
              $(".info").html(data.msg).css({
                opacity: "1",
              });
            } else {
              if ($('[name="checkbox1"]')[0].checked) {
                localStorage["loginName"] = n;
                localStorage.setItem("loginUid", data["uid"]);
              } else {
                sessionStorage["loginName"] = n;
                sessionStorage.setItem("loginUid", data["uid"]);
              }
              location.href = "mz_shop.html";
            }
          },
        });
      } else {
        e.preventDefault();
      }
    };

    // 隐藏或展示密码
    let demoImg = document.querySelectorAll(".section_form_pass_icon")[0];
    let demoInput = document.querySelectorAll(".form_pass")[0];
    demoImg.onclick = function (e) {
      if (demoInput.type == "password") {
        demoInput.type = "text";
      } else {
        demoInput.type = "password";
      }
    };
  })();
};
