import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "工作",
      icon: "laptop-code",
      prefix: "work/",
      link: "work/",
      children: "structure",
    },
    {
      text: "文档",
      icon: "book",
      prefix: "guide/",
      children: "structure",
    },
    {
      text: "幻灯片",
      icon: "person-chalkboard",
      link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    },
  ],
  "/software/": [
    "",
    "git/",
    "linux/",
    "nginx/",
    "programming/",
    
  ],
  "/software/git/": "structure",
  "/software/linux/": "structure",
  "/software/nginx/": "structure",
  "/software/programming/": "structure",
  "/software/container/": "structure",
  "/shell_script/": "structure",
});
