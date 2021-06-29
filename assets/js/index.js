$(() => {
  $(".log a").on("click", function () {
    $(this)
      .parents(".log")
      .css("display", "none")
      .siblings(".reg")
      .css("display", "block");
    $(".layui-form")[0].reset();
  });
  $(".reg a").on("click", function () {
    $(this)
      .parents(".reg")
      .css("display", "none")
      .siblings(".log")
      .css("display", "block");
    $(".layui-form")[0].reset();
  });
  let form = layui.form;

  form.verify({
    psw: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    reg: function (value) {
      let pwd = $(".reg [name=password]").val();
      if (pwd !== value) {
        return "两次密码不一致";
      }
    },
  });
  $(".reg .layui-form").on("submit", function (e) {
    e.preventDefault();
    let name = $(".reg [name=title]").val();
    let pwd = $(".reg [name=password]").val();
    $.ajax({
      method: "POST",
      url: "/api/reguser",
      data: {
        username: name,
        password: pwd,
      },
      success: function (res) {
        if (res.status !== 0) {
          layer.msg(res.message, function () {});
        } else {
          layer.msg(res.message);
          $(".reg a").click();
        }
      },
    });
  });
  $(".log .layui-form").on("submit", function (e) {
    e.preventDefault();
    let name = $(".log [name=title]").val();
    let pwd = $(".log [name=password]").val();
    $.ajax({
      method: "POST",
      url: "/api/login",
      data: {
        username: name,
        password: pwd,
      },
      success: function (res) {
        if (res.status !== 0) {
          layer.msg(res.message, function () {});
        }
        layer.msg(res.message);
        localStorage.setItem("token", res.token);
        // console.log(res.token);
        location.href = "index.html";
      },
    });
  });
});
/*
 * Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE4NDksInVzZXJuYW1lIjoiTW9sb24iLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTYyNDk1ODA0MiwiZXhwIjoxNjI0OTk0MDQyfQ.lNN6c7qEIS6vrcGxv-imZ_BiIlbi7FR9xdNghZO-H6o
 * */
