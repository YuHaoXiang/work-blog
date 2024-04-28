---
title: rebase
icon: laptop-code
order: 3
category: Git
tag:
  - Git
  - shell
---

## 合并最近两次提交
```bash
git rebase -i HEAD~2
```
::: info 选项说明
pick：保留该commit（缩写:p）

reword：保留该commit，但我需要修改该commit的注释（缩写:r）

edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）

squash：将该commit和前一个commit合并（缩写:s）用的比较多

fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）

exec：执行shell命令（缩写:x）

drop：我要丢弃该commit（缩写:d）
![rebase](./images/git-rebase.png) 
:::

