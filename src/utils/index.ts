
/**
 * @author meng
 * @version 1.0
 * @file logo跳转函数
 */
export default function resetRoute() {
  window.location.href = window.location.origin;
  return (
    window.location.href
  );
}

/**
 *如果你需要获取网站的 URL 信息，那么 window.location 对象就是为你准备的
 * window.location.origin是协议 + 主机名 + 端口号
 * window.location.href是完整网址
 * self.location.href;//当前页面打开URL页面
 * window.location.href;//当前页面打开URL页面
 * this.location.href;//当前页面打开URL页面
 * location.href;// 当前页面打开URL页面
 * parent.location.href;//在父页面打开新页面
 * top.location.href;//在顶层页面打开新页面
 */

