## 相关依赖
* React
* [ahooks](https://ahooks.js.org/)
* NextJS
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

## AIGC 
* [openai npm](https://www.npmjs.com/package/openai)
* [openai docs](https://platform.openai.com/docs/quickstart?context=node)
* [传统经典编程与AIGC的融合](https://juejin.cn/post/7371731578962493474)

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

## SEO
* [next-sitemap](https://www.npmjs.com/package/next-sitemap)
* [next-seo](https://www.npmjs.com/package/next-seo)
* [Nextjs SEO Docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
* [manifest.json](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest)

```
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

## node 版本切换
```
全局安装n: npm install -g n

安装最新稳定版 node: n stable

安装最新版本 node: n latest

安装某个具体node版本: n 14.16.1

删除某个版本: n rm 14.16.1

查看安装路径: n which 14.16.1

切换版本: 输入n回车 出现node版本列表，上下键移动选择切换的版本后回车(切换非n安装的node版本会报错，删掉，使用n安装即可)

以指定的版本来执行脚本: n use 14.16.1 test.js

查看已经安装的版本: n ls

查看服务器上所有可用的版本: n ls-remote --all
```

## CSS 选择器
* [重拾 CSS 伪类选择器 nth-of-type, nth-child](https://juejin.cn/post/6844904052220755975)
* [更强大的 :nth-child 选择器](https://juejin.cn/post/7385929329640177676) `.cc:nth-child(2 of .cc) {}` `.cc:not(.cc ~ .cc) {}`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
