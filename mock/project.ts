import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    // 前面的 /mock 为 mock 生效需要配置的根路径 后面会提到
    url: '/mock/api/projects',
    method: 'get',
    // 使用 body 可以获取请求体
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: [
          {
            userId: 1,
            id: 1,
            title: 'vue',
            introduction: 'vue是一个渐进式框架,用于构建用户界面,相比于其他框架,vue更容易上手',
          },
          {
            userId: 2,
            id: 2,
            title: 'react',
            introduction: 'react由facebook开发,强调组件化开发,适合构建大型应用,生态丰富,社区活跃,适合喜欢函数式编程的开发者',
          },
          {
            userId: 3,
            id: 3,
            title: 'angular',
            introduction: 'angular是谷歌推出的前端框架,采用TypeScript开发,适合大型企业级应用,学习曲线较陡峭,但功能非常强大',
          },
          {
            userId: 4,
            id: 4,
            title: 'svelte',
            introduction: 'svelte是一款新兴的前端框架,打包时将代码编译为原生js,无需虚拟DOM,性能优异,代码简洁',
          },
          {
            userId: 5,
            id: 5,
            title: 'node.js',
            introduction: 'node.js让js可以运行在服务端,适合开发高并发的网络应用,生态丰富,npm包管理器好用',
          },
          {
            userId: 6,
            id: 6,
            title: 'typescript',
            introduction: 'typescript是js的超集,增加了静态类型检查,提升了代码的可维护性和开发效率,被越来越多的项目采用',
          },
          {
            userId: 7,
            id: 7,
            title: 'webpack',
            introduction: 'webpack是前端资源打包工具,能将各种资源打包到一起,支持代码分割和懒加载,提升开发效率',
          },
          {
            userId: 8,
            id: 8,
            title: 'vite',
            introduction: 'vite是新一代前端构建工具,启动快,热更新快,配置简单,深受开发者喜爱',
          },
          {
            userId: 9,
            id: 9,
            title: 'element-plus',
            introduction: 'element-plus是基于vue3的UI组件库,风格简洁,组件丰富,适合后台管理系统开发',
          },
          {
            userId: 10,
            id: 10,
            title: 'ant-design-vue',
            introduction: 'ant-design-vue是蚂蚁金服推出的UI组件库,设计规范优秀,组件丰富,适合企业级应用',
          },
          {
            userId: 11,
            id: 11,
            title: 'express',
            introduction: 'express是node.js最流行的web框架,简单灵活,中间件丰富,适合快速开发API服务',
          },
          {
            userId: 12,
            id: 12,
            title: 'koa',
            introduction: 'koa是express团队打造的新一代node框架,基于async/await,更轻量,更现代',
          },
          {
            userId: 13,
            id: 13,
            title: 'pinia',
            introduction: 'pinia是vue3的状态管理库,API简洁,类型友好,替代vuex成为主流',
          },
          {
            userId: 14,
            id: 14,
            title: 'redux',
            introduction: 'redux是react生态最流行的状态管理库,理念简单,适合大型应用的状态管理',
          },
          {
            userId: 15,
            id: 15,
            title: 'axios',
            introduction: 'axios是一个基于Promise的HTTP库,支持浏览器和node.js,API简洁,使用方便',
          },
          {
            userId: 16,
            id: 16,
            title: 'jest',
            introduction: 'jest是Facebook推出的测试框架,零配置上手快,支持快照测试,社区活跃',
          },
          {
            userId: 17,
            id: 17,
            title: 'cypress',
            introduction: 'cypress是前端自动化测试工具,支持端到端测试,界面友好,调试方便',
          },
          {
            userId: 18,
            id: 18,
            title: 'uni-app',
            introduction: 'uni-app是一个使用vue语法开发多端应用的框架,一次开发,多端运行,适合小程序开发',
          },
          {
            userId: 19,
            id: 19,
            title: 'flutter',
            introduction: 'flutter是Google推出的跨平台开发框架,使用Dart语言,性能优异,适合开发高性能移动应用',
          },
          {
            userId: 20,
            id: 20,
            title: 'next.js',
            introduction: 'next.js是react服务端渲染框架,支持静态生成和服务端渲染,SEO友好,适合构建高性能网站',
          },
        ],
      }
    },
  },
] as MockMethod[]
