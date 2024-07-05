### Tech Stack
1. [React](https://react.dev/reference/react)
2. [NextJS](https://nextjs.org/docs)
3. [Vercel AI](https://sdk.vercel.ai/docs/getting-started)
4. [web3js](https://docs.web3js.org)
5. [webpack](https://webpack.docschina.org/concepts/) or [vite](https://cn.vitejs.dev/guide/)
6. [axios](https://axios-http.com/docs/intro)
7. [chatgpt key](https://platform.openai.com/settings/profile?tab=api-keys)
8. [Open AI Quickstart](https://platform.openai.com/docs/quickstart?context=node)
```
npm install axios
```
7. [ahooks](https://ahooks.js.org/zh-CN/hooks/use-request/index)
8. [ant-design](https://ant-design.antgroup.com/components/overview-cn)
9. country-locale-map: 多语言
10. crypto-js: 加密
11. dayjs or moment
12. mqtt
13. swiper


### 构建工具
- [webpack](https://webpack.docschina.org/concepts/)
- [vite](https://cn.vitejs.dev/guide/)
- [turbo](https://turbo.build)

### 前端框架
- [React](https://react.dev/reference/react)
- [Vue](https://cn.vuejs.org)
- [NextJS](https://nextjs.org/docs)

### UI 框架
- [Ant Design - React](https://ant-design.antgroup.com/components/overview-cn)
- [Element - Vue](https://element.eleme.cn/#/zh-CN/component/installation)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)

### SEO 
```
<title>XXX</title>
<meta name="robots" content="index,follow">
<meta name="googlebot" content="index,follow">
<meta name="description" content="">
...一堆，参考苹果官网


xxx.com/robots.txt
xxx.com/sitemap.xml

https://www.apple.com/robots.txt

h1 标签
```

### SSO 埋点
```
埋点 GA
https://analytics.google.com/analytics/web/provision/#/provision/create
Clarity
https://clarity.microsoft.com/projects

顶栏弹窗 ptengine
https://www.ptengine.com/app/47j8ocnn/home
https://www.ptengine.cn/

Cookies 授权 & 扫描
https://app-apac.onetrust.com/cookies/websites
```

### app route
```
// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
  return <h1>Hello, Dashboard Page!</h1>
}
```

### CSS
* CSS margin-trim、initial-letter
* @container容器查询，@scope规则，CSS嵌套，CSS数学函数，CSS滚动
* @starting-style规则、transition-behavior属性
* 锚点定位里面的@position-try, anchor-size(), inset-area, position-try-options, position-visibility等特性
* DOM里面的WebCodecs API，popover特性，Screen Wake Lock API，PerformanceObserver API、Background Sync API、Payment Handler API、Periodic Background Sync API、Reporting API等。
* [CSS的6个新特性](https://blog.csdn.net/qq_37916164/article/details/129302240)

```
CSS 新特性 [https://developer.chrome.com/blog/anchor-positioning-api?hl=zh-cn]
1.仅使用transition属性，实现元素从 display:inline ↔ none 的过渡效果
img {
 transition: .25s allow-discrete;
 opacity: 1;
}

img[hidden] {
 opacity: 0;
}

2.@starting-style顾名思义就是声明起始样式，专门用在transition过渡效果中
img {
 transition: .25s allow-discrete;
 opacity: 1;
 @starting-style {
 opacity: 0;
 }
}

3.CSS 锚点定位 position-anchor
.trigger {
 anchor-name: --my-anchor; 
}
.target {
 position: absolute;
 position-anchor: --my-anchor;
 left: anchor(left);
 top: anchor(bottom);
 margin-top: .5rem;
}

居中对齐
.trigger2 {
 anchor-name: --anchor2; 
}
.target2 {
 position: absolute;
 position-anchor: --anchor2;
 left: anchor(center);
 top: anchor(bottom);
 justify-self: anchor-center;
}

4.使用 anchor-size() 设置元素大小
button {
 anchor-name: --anchor-select;
 position: relative;
 width: fit-content; 
}
menu:popover-open {
 position: absolute;
 position-anchor: --anchor-select;
 left: anchor(left);
 top: anchor(bottom);
 width: anchor-size(width);
 margin-top: -1px;
}

5.使用 @position-try 调整锚点位置
.trigger {
 anchor-name: --my-anchor; 
}
.target {
 position: absolute;
 position-anchor: --my-anchor;
 inset-area: right span-bottom;
 /* 候补位置选项 */
 position-try-options: --bottom-left;
}
/* 候补位置 */
@position-try --bottom-left {
 inset-area: bottom span-left;
}

6.position-visibility与滚动溢出显隐
position-visibility: always;
position-visibility: anchors-visible;
position-visibility: no-overflow;
```
```
https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-snap-type
scroll-snap-type
css 滚动吸附

content-visibility是CSS新增的属性，用来提高页面渲染性能，可以控制一个元素是否渲染其内容，并且允许浏览器跳过这些元素的布局与渲染。

韩文换行加 word-break: auto-phrase;

color()是 CSS 中颜色函数，提供了一种统一的方式来指定任何 RGB 颜色空间中的颜色值。
background-color: color(prophoto-rgb 0 1 0);
```
