---
title: Git配置推送
icon: laptop-code
order: 1
category: Git
tag:
  - Git
  - shell
---

## Git 全局设置
```bash
git config --global user.name "余浩翔"
git config --global user.email "haoxiang.yu@sectrend.com.cn"
```
## Git 创建仓库
```bash
git clone git@192.168.100.10:haoxiang.yu/sca-ci-java.git
cd sca-ci-java
git switch -c main
touch README.md
git add README.md
git commit -m "add README"
git push -u origin main
```

## Git 推送文件夹
```bash
cd existing_folder
git init --initial-branch=main
git remote add origin git@192.168.100.10:haoxiang.yu/sca-ci-java.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

## Git 推送已有仓库
```bash
cd existing_repo
git remote rename origin old-origin
git remote add origin git@192.168.100.10:haoxiang.yu/sca-ci-java.git
git push -u origin --all
git push -u origin --tags
```
