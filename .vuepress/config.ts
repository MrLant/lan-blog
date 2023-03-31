import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "lan blog",
  description: "Personal Learning Blog",
  base: '/lan-blog/',
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "lan",
    authorAvatar: "/head.png",
    docsRepo: "https://github.com/MrLant/lan-blog.git",
    docsBranch: "main",
    docsDir: "example",
    lastUpdatedText: "",
    // series 为原 sidebar
    series: {
      "/docs/react/": ['base', 'jsx', 'component'],
    },
    navbar: [
      { text: "Home", link: "/" },
      {
        text: "前端框架学习",
        children: [
          { text: "react", link: "/docs/react/base" },
        ],
      },
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
  }),
  // debug: true,
});
