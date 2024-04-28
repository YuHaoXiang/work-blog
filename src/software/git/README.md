---
title: Git教程
icon: git
---
<Catalog />

## 常用命令
```bash
git status     #上次提交后是否对文件再做了修改项目
git add .         #添加所有的变动
git checkout -b 文件夹名称         #创建本地分支并切换分支 git checkout -b pr/ffr
git commit -m "描述"             #提交修改 git commit -m "修改什么"
git merge origin/develop "本地分支"  #合并origin/develop上别人所做的修改到自己的本地分支 git merge origin/develop pr/ffr
git push origin "本地分支" #推送本地分支到远程，并建立联系 git push origin pr/ffr
git rebase -i 编号 #合并多次提交，将前几次的提交合并为一次
git checkout 分支名 #切换分支 git checkout pr/FFR-color git cherckout develop
git pull #更新当前分支的状态
git branch #列出本地分支
git branch -a #列出本地分支与远程分支
git branch -D 分支名 #删除分支（目前仅用于删除本地分支）
git remote -v #可以查看远程仓库信息
git branch 分支名 #仅仅创建 一个新分支，并不会自动切换到新分支中去
git rebase --abort #退出git rebase
git reset 提交编号 #git rebase -i 提交编号，之后出现错误，可以回退到之前未合并时的日志状态
git commit --amend -m "描述" #修改上一次的提交的描述
git stash #暂存上一次的修改，准备切换到其他的分支
git stash pop #还原上一次的修改，将暂存的修改加入到新的分支
```