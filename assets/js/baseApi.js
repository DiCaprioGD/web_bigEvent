// 在每次ajax发起请求之前 都会先调用一下ajaxPrefilter函数 可以在这里拿到我们配置的ajax信息
//所以可以在这里进行更改 发起真正的ajax请求之前 拼接统一的根路径

$.ajaxPrefilter(function (options) {
  let root = "http://api-breakingnews-web.itheima.net";
  options.url = root + options.url;
});
