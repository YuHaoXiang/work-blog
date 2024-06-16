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
    }
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
