import { defineUserConfig } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'
import reactPages from '../docs/react/pages'
import nestPages from '../docs/nest/pages'
console.log(nestPages)
export default defineUserConfig({
  title: 'lan blog',
  description: 'Personal Learning Blog',
  base: '/lan-blog/',
  head: [['link', { rel: 'shortcut icon', type: 'image/x-icon', href: `/lan-blog/favicon.ico` }]],
  theme: recoTheme({
    style: '@vuepress-reco/style-default',
    logo: '/logo.png',
    author: 'lan',
    authorAvatar: '/head.png',
    docsRepo: 'https://github.com/MrLant/lan-blog.git',
    docsBranch: 'main',
    docsDir: 'example',
    lastUpdatedText: '',
    // series 为原 sidebar
    series: {
      ...reactPages,
      ...nestPages
    },
    navbar: [
      { text: 'Home', link: '/' },
      {
        text: '前端框架学习',
        children: [
          { text: 'react', link: '/docs/react/base' },
          { text: 'nest', link: '/docs/nest/introduce' }
        ]
      },
      {
        text: '工作中总结',
        link: '/docs/work/summary'
      }
    ]
    // valineConfig 配置与 1.x 一致
    // valineConfig: {
    //   appId: 'xxx',
    //   appKey: 'xxx',
    //   placeholder: '填写邮箱可以收到回复提醒哦！',
    //   verify: true, // 验证码服务
    //   // notify: true,
    //   recordIP: true,
    //   // hideComments: true // 隐藏评论
    // },
  })
  // debug: true,
})
