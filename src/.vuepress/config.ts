import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/work-blog/",

  lang: "zh-CN",
  title: "大杂烩",
  description: "工作中的一些记录。",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
