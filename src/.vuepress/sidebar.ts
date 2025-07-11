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
    "mysql/",
    "container/",
    "jenkins/",
    
  ],
  "/software/git/": "structure",
  "/software/linux/": "structure",
  "/software/mysql/": "structure",
  "/software/nginx/": "structure",
  "/software/programming/": "structure",
  "/software/container/": "structure",
  "/software/jenkins/": "structure",
  "/shell_script/": "structure",
});
