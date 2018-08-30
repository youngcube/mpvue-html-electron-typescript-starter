# mpvue-html-electron-typescript-starter

## Features：

- 使用 `TypeScript`（感谢 [@WingGao](https://github.com/WingGao)）[mpvue-ts-demo](https://github.com/WingGao/mpvue-ts-demo)
- 集成 `mpvue-router-patch` （感谢 [@F-loat](https://github.com/F-loat])）[mpvue-router-patch](https://github.com/F-loat/mpvue-router-patch)，支持以 `vue-router` 的官方 Router 写法书写路由配置
- 集成 `wxp`，支持以 Promise async await 书写 小程序回调 API
- 支持直接打包输出为 小程序 与 HTML、支持热更新
- 支持相对路径，打包后的 HTML 可以放置在服务器的任意位置
- 支持打包成 Electron
- 可在项目内使用 `TypeScript` 和 `JavaScript`，且已预配置好 ESLint 与 TSLint，支持自动保存，保存后自动格式化代码
- 配置完善的 `Visual Studio Code` 参数，可直接在 `Visual Studio Code` 内点击运行并在 `Visual Studio Code` 内断点调试 HTML
- 支持最新的 `mpvue-loader` 1.1.4 版本
- 大部分的依赖已经升级到目前（截止 2018.08.30）的最新版

## 编译

- 推荐使用 `yarn`

```bash
yarn
```

或者

```bash
npm install
```

## 运行

> 支持在命令行运行，或直接 `Visual Studio Code` 点击运行

### 命令行运行方法

- 浏览器

  > `npm run dev:web`

- 小程序
  > `npm run dev:wechat`

### 打包

- 浏览器（打包 red 项目）

  > `npm run build:web`

- 小程序（打包 blue 项目）
  > `npm run build:wechat`

## IDE

- 推荐使用 `Visual Studio Code`，并安装本工程推荐的所有依赖，这样可以直接按指定的（`ESLint`）标准格式进行保存，同时可以直接在 `Visual Studio Code` 内进行调试 Web 页面

### Visual Studio Code 运行方法

- 可以在 `Visual Studio Code` 的 `Debug` 侧边栏直接点击运行 `Run & Debug Web` / `Run Wechat` 等
- 其中 `Run & Debug Web` 支持直接运行需要的 `npm` 命令，并在服务启动后自动打开 `Chrome` 并在 `Visual Studio Code` 内直接进行调试；此时运行的 Chrome 为隐私模式，无任何 Chrome 插件
- 其中 `Attach Chrome Port 9222` 需要手工在 Terminal 运行 Chrome:`/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222`；此时运行的 Chrome 会带有 Chrome 自己的所有插件。
- 小程序必须使用它的框架开发者工具包，不支持上述简便调试方法。必须在`微信开发者工具`内调试
- 其中 `Launch Webpack ...` 可用于调试 `Webpack` 的打包问题

## Vue Single File Components (SFC)

- 不要在 SFC 内的 `<script>` 标签 和 `<style>` 标签直接写 TypeScript / JavaScript / LESS，请新建文件然后用 `src` 引入。因为内部的`<script>`标签不支持直接写 TypeScript（写了以后无法渲染 components）；IDE 目前也不支持 \*.vue 内的 TypeScript 检查组件属性类型。因此尽可能使用 `src`/ `@import` 引入。这样也方便重构。

## 入口

- 浏览器：`app-web.vue`,`main-web.ts`
- 小程序：`app-web.vue`,`main.ts`

## Webpack

由于原有 mpvue-cli 中，有部分配置是和 HTML 可以互通的，因此将大部分通用配置都集合到一处，放到 `build_common`中。而不一样的地方则通过 `webpack-merge` 来进行最终的整合。因此，后续升级维护时，可以根据需求，直接改变需要的配置，而不需要将同样的配置写入

## 图片、音频等静态资源

- 资源文件全部放入 `static` 目录，其中 `common` 目录存放 HTML 与 小程序的通用资源。`web`和`wechat`分别存放平台独有的资源。这样可以使打包后的文件更小
- 使用`UIUtils.getAssetFile()`来进行调用，内部已经写好不同平台的调取逻辑。这样写的目的是为了方便日后  将 HTML 放入服务器时能够以相对路径  访问

## 其他注意事项

- 目前(2018.08) mpvue 不支持 webpack 4 [issue98](https://github.com/Meituan-Dianping/mpvue/issues/98)。请勿随意使用 yarn 升级，可能导致小程序或 H5 端编不过或其他奇怪的问题

- 使用 `wx`，或者 `process.env.PLATFORM` 来判断是否在小程序环境内，目前的环境有 `web`/`wechat`/`electron`

- 请注意 HTML 与 小程序有较多不同之处
