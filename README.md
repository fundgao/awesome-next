## 相关依赖
* React
* [NextJS](https://nextjs.org/docs)
* TypeScript
* AIGC - openai 豆包
* ThreeJS
* Web3.0 [$ npm install --save @solana/web3.js](https://github.com/solana-labs/solana-web3.js)
* [Ant Design](https://ant-design.antgroup.com/index-cn)
* [Magic UI](https://magicui.design/docs/installation/react)
* [NextUI](https://nextui.org/docs/guide/installation)
* [tailwindcss](https://tailwindcss.com/docs/installation)
* [白嫖 - 图床](https://molunerfinn.com/PicGo/)
* [npm i dotenv](https://www.npmjs.com/package/dotenv) - next 自带环境切换
* [ahooks](https://ahooks.js.org/)
* [Lodash](https://github.com/lodash/lodash)
* [Radash - Lodash 轻量版](https://github.com/sodiray/radash)
* moment
* dayjs - moment 轻量版
* [Docker](https://hub.docker.com)


## AIGC 
* [openai npm](https://www.npmjs.com/package/openai)
* [openai docs](https://platform.openai.com/docs/quickstart?context=node)
* [传统经典编程与AIGC的融合](https://juejin.cn/post/7371731578962493474)

## Crypto
* [World Chain Developer](https://developer.worldcoin.org/teams/team_95a2c9a39a3cf2b803c9392ae3615f16)
* [World Coin Install](https://docs.worldcoin.org/quick-start/installation)

## ThreeJS
* [Threejs](https://threejs.org/)
* [Threejs Demo](https://github.com/xiaolidan00/my-earth)
* [Threejs 教程集合](https://juejin.cn/collection/7375807995392032777)
* [three.js 下雨特效（高级版本）](https://juejin.cn/post/7369784341465907240)

## DEMO
- [大文件切片上传](https://juejin.cn/post/7356817667574136884)
[通过file.slice将大文件chunks切成许多个大小相等的chunk](https://juejin.cn/post/7376690981858902050?searchId=20240629130525C281235DC0DDDFF3AB6A)
[使用Range实现网络文件下载的断点续传](https://juejin.cn/post/7381455296658751551?searchId=20240629130525C281235DC0DDDFF3AB6A)
- [前端工程化 Jenkins](https://juejin.cn/post/7354406980784504870)
- 图片压缩上传 [纯前端实现 JPG 图片压缩 | canvas - 掘金](https://juejin.cn/post/7349465019325661203)
- JS调用摄像头 [一个 API,带你打开前端摄像头之门🥳 - 掘金](https://juejin.cn/post/7382386471272218659)
- [Webpack常用优化手段](https://github.com/liuhp/fe-blog/issues/4)

## SEO
* [next-sitemap](https://www.npmjs.com/package/next-sitemap)
* [next-seo](https://www.npmjs.com/package/next-seo)
* [Nextjs SEO Docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
* [manifest.json](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest)

```
这些第三方依赖不用，因为有自带的
npm i next-sitemap
npm i next-seo
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# npm 换源

* 查看当前源 `npm config get registry`
* 更换淘宝源 `npm config set registry https://registry.npmmirror.com/`

## 使用 nrm 管理源
* 安装 nrm `npm install nrm -g --save`
* 查看源列表 `nrm ls`
* 切换淘宝源 `nrm use taobao`
* 源测速 `nrm test taobao`

## node 版本管理 [nvm](https://github.com/nvm-sh/nvm)

* nvm off // 禁用node.js版本管理(不卸载任何东西)
* nvm on // 启用node.js版本管理
* nvm install <version> // 安装node.js的命名 version是版本号 例如：nvm install 8.12.0
* nvm uninstall <version> // 卸载node.js是的命令，卸载指定版本的nodejs，当安装失败时卸载使用
* nvm ls // 显示所有安装的node.js版本
* nvm list available // 显示可以安装的所有node.js的版本
* nvm use <version> // 切换到使用指定的nodejs版本
* nvm v // 显示nvm版本
* nvm install stable // 安装最新稳定版

$ nvm use 16  
Now using node v16.9.1 (npm v7.21.1)  
$ node -v  
v16.9.1  
$ nvm use 14  
Now using node v14.18.0 (npm v6.14.15)  
$ node -v  
v14.18.0  
$ nvm install 12  
Now using node v12.22.6 (npm v6.14.5)  
$ node -v  
v12.22.6  

## CSS
* [Grid 布局](https://juejin.cn/post/7409110408991522827)
* [CSS 奇技淫巧](https://github.com/chokcoco/iCSS)
* [CSS 的灵感](https://github.com/chokcoco/CSS-Inspiration)
* [重拾 CSS 伪类选择器 nth-of-type, nth-child](https://juejin.cn/post/6844904052220755975)
* [更强大的 :nth-child 选择器](https://juejin.cn/post/7385929329640177676) `.cc:nth-child(2 of .cc) {}` `.cc:not(.cc ~ .cc) {}`
* [CSS工具资源汇总](https://github.com/liuhp/fe-blog/issues/2)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
