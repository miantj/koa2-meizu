window.onload = function () {
  let timer = setInterval(function () {
    wid += 1;
    pgs.style.width = wid + "%";
    if (wid >= 100) {
      setTimeout(function () {
        pgs.style.display = "none";
        clearInterval(timer);
      }, 500);
    }
  }, 30);
  (function () {})();
  let from = document.forms[0],
    txtPwd = from.pwd,
    txtPhone = from.phones,
    checkbox = $("#check")[0],
    $span = $("#err_html"),
    $code = $("#reg_vcode")[0],
    $reg = $(".dd"),
    p = [],
    t = 0;

  //邮箱验证
  let phone = (txt, reg) => {
    let span =
      txt.parentElement.parentElement.firstElementChild.nextElementSibling;
    span.style.visibility = "hidden";
    if (reg.test(txt.value)) {
      span.style.visibility = "hidden";
    } else {
      span.className = "info";
      span.style.visibility = "visible";
      span.innerHTML =
        '账户格式错误！<img src="Images/close-ico.png" class="op"/>';
    }
  };
  //魅族密码验证
  let pwd = (txt, reg) => {
    let span =
      txt.parentElement.parentElement.firstElementChild.nextElementSibling;
    span.style.visibility = "hidden";
    if (reg.test(txt.value)) {
      span.style.visibility = "hidden";
    } else {
      span.className = "info";
      span.style.visibility = "visible";
      span.innerHTML =
        '请输入6-8位数密码！ <img src="Images/close-ico.png" class="op">';
    }
  };

  //验证码

  let pool = function () {
    let cw = 80; //画布的总宽度
    let ch = 30; //画布的总高度
    p = [];
    c9.width = cw;
    c9.height = ch;
    let ctx = c9.getContext("2d");
    /**1.绘制背景颜色——填充矩形**/
    ctx.fillStyle = rc(100, 255);
    ctx.fillRect(0, 0, cw, ch);
    /**2.循环绘制4个随机字符**/
    ctx.textBaseline = "top";
    let pol = "ABCDEFGHJKLMNPQRSTUVWXY3456789";
    for (let i = 0; i < 4; i++) {
      let c = pol[rn(0, pol.length)]; //一个随机字符
      let fs = rn(20, 30); //字体大小
      ctx.font = fs + "px  SimHei";
      let fc = rc(50, 150); //字体颜色
      ctx.strokeStyle = fc;
      let deg = rn(-15, 35); //旋转角度
      let x = -fs / 2; //每个字符左上角的坐标
      let y = -fs / 2;
      //绘制一个字符: 保存状态->平移->旋转->绘制->恢复状态
      ctx.save();
      ctx.translate(20 * i + 15, 15);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.strokeText(c, x, y);
      ctx.restore();
      p.push(c);
    }

    /**3.绘制5条干扰线——直线路径**/
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(rn(0, cw), rn(0, ch));
      ctx.lineTo(rn(0, cw), rn(0, ch));
      ctx.strokeStyle = rc(0, 255);
      ctx.stroke();
    }
    //random number，返回指定范围内的随机整数
    function rn(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    //random color，返回指定范围内的随机颜色
    function rc(min, max) {
      let r = rn(min, max);
      let g = rn(min, max);
      let b = rn(min, max);
      return `rgb(${r}, ${g}, ${b})`;
    }
    return p;
  };
  //调用一次验证码
  pool();
  //点击刷新验证码
  $reg.on("click", function () {
    pool();
  });
  //账户密码验证
  txtPwd.onblur = function () {
    pwd(this, /^\w{6,8}$/);
  };
  //邮箱验证
  txtPhone.onblur = function () {
    phone(
      this,
      /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$|^(\+86|0086)?\s*1[34578]\d{9}$/
    );
  };
  //验证码验证
  $code.onblur = function () {
    if ($code.value.toLowerCase() !== p.join("").toLowerCase()) {
      $span.css({ visibility: "visible" });
      $span.html('验证码错误！ <img src="Images/close-ico.png" class="op"/>');
      t = 0;
    } else {
      $span.css({ visibility: "hidden" });
      t = 1;
    }
  };
  $("#reg_btn")
    .on("click", function () {
      //摸态框
      let time = document.querySelector("#time");
      let count = 2;
      //判断正则是否为真
      if (pwd && phone && t == 1 && checkbox.checked && pool) {
        let $uname = $(".form_text").val();
        let $upwd = $(".form_pass").val();
        //添加到数据库
        $.post("user_add", { phones: $uname, pwd: $upwd }, function (data) {
          data = JSON.parse(data);
          if (data.code > 0) {
            $(".modal").show();
            let timrs = setInterval(function () {
              time.innerHTML = count + "秒后跳转到登陆页面！";
              count--;
              clearTimeout(timrs);
            }, 1000);
            setInterval(function () {
              location.href = "login.html";
            }, 3000);
          } else {
            $span.css({ visibility: "visible" });
            $span.html(data.msg);
          }
        });
      } else {
        //失败阻止提交
        event.preventDefault();
        $span.css({ visibility: "visible" });
        $span.html(
          '请完善你的注册信息！<img src="Images/close-ico.png" class="op"/>'
        );
      }
    })
    .mousedown(function () {
      //鼠标点击是样式
      $("#reg_btn").css({ background: "#2b8cc5" });
    })
    .mouseup(function () {
      //鼠标松开时
      $("#reg_btn").css({ background: "#32a5e7" });
    });
  //关闭警示栏
  $(document).on("click", ".op", function () {
    $span.css({ visibility: "hidden" });
  });

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
};
