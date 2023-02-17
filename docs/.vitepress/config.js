import { head, nav, markdown, sidebar } from './config/index'

/**
 * @type {import('vitepress').UserConfig}
 */
export default {
  base: '/vitepress-starter/',
  title: '开发笔记',
  description: '记录开发时遇到的问题1',
  head,
  markdown,
  appearance: true, // 是否显示dark | light 模式切换如果设置false只有light模式
  lastUpdated: true,
  outDir: './.vitepress/dist', // 站点的生成输出位置，相对于项目根目录（如果运行的是vitepress生成文档，则为docs文件夹）。(../public)
  srcDir: '.', // 存储markdown页面的目录相对于项目根目录 ./src
  themeConfig: {
    logo: {
      light: { src: '/assets/images/logo.svg' },
      dark: { src: '/assets/images/logo.svg' }
    },
    siteTitle: '开发笔记',
    nav,
    sidebar,
    // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
    lastUpdatedText: '上次更新',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      { icon: 'twitter', link: '...' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Visionwu'
    },
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: '在github上编辑次页面'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  }
}