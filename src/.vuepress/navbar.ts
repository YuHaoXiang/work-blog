import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/work/",
  {
    text: "脚本代码",
    icon: "code",
    link: "shell_script/",
  },
  {
    text: "软件教程",
    icon: "software",
    prefix: "/software/",
    children: [
      {
        text: "软件教程",
        icon: "software",
        link: "",
        activeMatch: "^/software/$"
      },
    "git/",
    "linux/",
    "nginx/",
    "programming/",
    "mysql/",
    "container/",
    "jenkins/",
    ]

  },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
