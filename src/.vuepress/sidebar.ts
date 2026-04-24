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
    "docker/",
    "k8s/",
    "ci-cd/",
    "performance/",
  ],
  "/software/git/": "structure",
  "/software/linux/": "structure",
  "/software/mysql/": "structure",
  "/software/nginx/": "structure",
  "/software/programming/": "structure",
  "/software/docker/": "structure",
  "/software/k8s/": "structure",
  "/software/ci-cd/": "structure",
  "/software/performance/": "structure",
  "/shell_script/": "structure",
  "/network/": "structure",
});
