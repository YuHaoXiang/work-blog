---
title: 常用命令
icon: linux
order: 1
category: Linux
tag:
  - Git
  - shell
---

## centos7安装redhat源
```bash
yum install -y centos-release-scl centos-release-scl-rh
```
## 查看端口占用进程号
```bash
netstat -atunlp |grep 10010
```

## 添加用户
```bash
openssl passwd -1 
sudo useradd -s /bin/bash -d /home/yhx -m yhx -p '$1$vazWhjwT$P03LZFw5FkazWYLoIaPcz0'
```
## alternatives修改命令链接
```bash
sudo update-alternatives --config 命令
```

## logrotate日志切割
https://blog.csdn.net/qq_32743235/article/details/105934490

## 添加Docker权限
```bash
sudo usermod -aG docker $USER && newgrp docker
```

## axel多线程断点续传
```bash
axel -n 10 -o /tmp/ http://www.jsdig.com/lnmp.tar.gz
```
::: info 参数说明
--max-speed=x , -s x         最高速度x  
--num-connections=x , -n x   连接数x  
--output=f , -o f            下载为本地文件f  
--search[=x] , -S [x]        搜索镜像  
--header=x , -H x            添加头文件字符串x（指定 HTTP header）  
--user-agent=x , -U x        设置用户代理（指定 HTTP user agent）  
--no-proxy ， -N             不使用代理服务器  
--quiet ， -q                静默模式  
--verbose ，-v               更多状态信息  
--alternate ， -a            Alternate progress indicator  
--help ，-h                  帮助  
--version ，-V               版本信息  
:::

## 查看系统运行负载（TCP,SOCKET,Memory）
```bash
watch -n 1 "ss -s && uptime &&free -m"
```
## firewalld
### 防火墙快速开放端口
```bash
firewall-cmd --list-port  #查看开发端口
firewall-cmd --zone=public --add-port=8203/tcp --permanent
firewall-cmd --reload
```
## 大量文件转移/复制
```bash
find 源文件路径 -type f -name '*.jpg' -exec mv {} 目标路径 \;
```

## curl

## nc