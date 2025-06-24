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
sudo useradd -s /bin/bash -d /home/yhx -m yhx -p '$1$LFF9VyfP$K6YKfqSFjRgrlHLTWE1DO.'
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

## 找出占用CPU最多的进程
```bash
ps aux --sort=-%cpu | head -n 10
```

## 找出占用内存最多的进程
```bash
ps aux --sort=-%mem | head -n 10  # %mem是进程使用的物理内存百分比
ps aux --sort=-rss | head -n 10  # 进程占用的实际内存大小（以KB为单位）

top 然后 shift+M
```


## Cetenos 获取ip地址
```bash
ifconfig | grep -A 3 'eth0' | grep inet | grep -v inet6 | awk -F' ' '{print $2}' | awk '{sub(/addr:/,""); print}'

``` 
## dig 域名解析
```
dig @1.1.1.1 facebook.com
```

## truncate 
```bash
truncate <OPTION>... <FILE>...
  -c, --no-create
    不创建任何文件。
  -o, --io-blocks
    将 SIZE 视为 IO 块数而不是字节数。Linux 文件系统的 IO 块大小通过为 4096 字节。
  -r, --reference=<RFILE>
    以 RFILE 为基础尺寸。
  -s, --size=<SIZE>
    设置或调整文件大小为指定字节。
    其中 SIZE 参数是一个整数和可选单位，如 10K（10*1024）。单位 K、M、G、T、P、E、Z、Y 都是 1024 的幂。KB,MB,… 为 1000 的幂。 也可以使用二进制前缀：KiB=K，MiB=M，以此类推。
    SIZE 也可以添加前缀字符：‘+’ 扩展，‘-’ 减少，‘<’ 最多，‘>’ 至少，‘/’ 向下舍入为 SIZE 的倍数，‘%’ 向上舍入为 SIZE 的倍数。
  --help
    显示帮助信息并退出。
  --version
    显示版本信息并退出。
 example: truncate -s 1G foo.txt
```

## jenkins 获取密匙
在命令行脚本界面输入如下代码
```java
com.cloudbees.plugins.credentials.SystemCredentialsProvider.getInstance().getCredentials().forEach{
  it.properties.each { prop, val ->
    println(prop + ' = "' + val + '"')
  }
  println("-----------------------")
}
``` 

## curl

## nc传输文件
### 发送方
如果你要发送一个文件，首先确定你的nc版本支持-p参数来指定监听端口。然后，在发送方机器上运行如下命令：
```bash
cat 文件名 | nc -l -p 端口号
```
或者直接指定要发送的文件：
```bash
nc -l -p 端口号 < 文件名
```
### 接收方

```bash
nc 发送方_IP地址 端口号 > 文件名
```
或者如果你想要将接收到的内容直接保存为文件，可以这样写：
```bash
nc 发送方_IP地址 端口号 > 输出文件名
```