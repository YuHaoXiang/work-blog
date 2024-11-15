---
title: 文件删除空间不释放
icon: question
---

## 现象
磁盘满了，删除文件后，文件空间不释放

## 原因
某些进程占用文件句柄，导致空间无法释放。

## 处理方式
### lsof
通过`lsof | grep deleted`找到未能删除掉的文件，确定占用的进程号
通过 `ls -l /proc/PID/fd/* | grep`文件名，找到相应文件句柄
清除文件内容 `echo > /proc/PID/fd/FD_NUM`

### lsof替代命令
`find /proc/*/fd -ls|grep"(deleted)'`:这个命令使用 find 命令来查找 /proc 目录下的文件描述符，并列出被标记为"(deleted)"的文件。然后使用grep来过滤出包含"(deleted)"的行。

`lsof +L1`:这个命令使用lsof命令来列出被删除但仍然被打开的文件。+L1 参数告诉lsof 只显示被删除的文件。

`ls -l /proc/*/fd|grep'(deleted)'`:这个命令使用 ls命令来列出/proc 目录下的文件描述符，并使用 grep 过滤出包含"(deleted)"的行。