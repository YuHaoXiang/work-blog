---
title: 批量chery-pick
catalog: Shell
icon: cherry-pick
---

## 批量chery-pick
```bugMergeScript.sh```
```bash
#!/bin/bash

#Bug合并脚本
#参数1：Bug修复提交commitId，例：52d89297260b97ca7968e6feb5a556f95099f98c
#使用命令，例：bash bugMergeScript.sh 52d89297260b97ca7968e6feb5a556f95099f98c

# 通过正则匹配检索需要cherry-pick的分支
git branch -a | grep -E '^.*-release$' > bugMergeBranch.txt

# 将远程分支名修改为本地可使用的分支名
sed -i 's/remotes\/origin\///' bugMergeBranch.txt

# 遍历cherry-pick
if [ -f bugMergeBranch.txt ]; then
  while read line
  do
    if [[ x$line != 'x' ]]; then
      git checkout $line
      echo "--------------------切换分支：$line-----------------------------"
      git pull origin $line:$line
      echo "--------------------更新代码------------------------------------------------------"
      git cherry-pick $1
      echo "------------------- 迁移提交：$2------------"
      git push origin $line
      echo "--------------------推送到远程仓库------------------------------------------------"
      echo "-------------------------------------------------------------------------------------------------------------------------------------------------"
    fi

  done < bugMergeBranch.txt
  #移除分支文件以免后续覆盖
  #rm -rf bugMergeBranch.txt
fi

# 最后再切换回主分支
git checkout master
```