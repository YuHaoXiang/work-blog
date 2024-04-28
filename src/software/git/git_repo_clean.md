---
title: Git清理仓库大文件
icon: laptop-code
order: 2
category: Git
tag:
  - Git
  - shell
---

## filter-repo
::: warning 注意
重写仓库历史是一种破坏性操作。在开始之前，请确保备份您的仓库。备份仓库的最佳方法是导出项目。
:::
项目主页：`https://github.com/newren/git-filter-repo`

教程地址：

`https://docs.gitlab.cn/jh/user/project/repository/reducing_the_repo_size_using_git.html`

要减少极狐GitLab 中存储库的大小，您必须首先从由极狐GitLab 自动创建的分支、标签和其他内部引用 (refs) 中删除对大文件的引用。这些 refs 包括：

`refs/merge-requests/*`：合并请求。  
`refs/pipelines/*`：流水线。  
`refs/environments/`*：环境。  
`refs/keep-around/*` 被创建为隐藏的 refs，以防止数据库中引用的提交被删除。  
这些 ref 不会自动下载，也不会公布隐藏的 ref，但我们可以使用项目导出删除这些 ref。