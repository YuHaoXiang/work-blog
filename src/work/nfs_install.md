---
title: NFS安装步骤
description: centos7安装NFS服务
tag:
  - NFS
---


## centos7安装NFS服务
```shell
yum install nfs-utils rpcbind -y
```
## 配置说明
配置文件路径`/etc/exports`
```config
/path/to/somedir 172.16.0.0/16(ro,async) 192.16.0.0/24(rw,sync) *(ro)
```
::: info 权限说明
ro:只读

rw:读写

sync:同步，数据同步写到内存与硬盘中

async:异步，数据先暂存内存

root_squash: 将root用户映射为来宾账号

no_root_squash: 有root的权限，不建议使用

all_squash: 全部映射为来宾账号

anonuid, anongid: 指定映射的来宾账号的UID和GID

:::

## 挂载
```shell
mount -t nfs 192.168.1.222:/var/nfs /mnt
```
## 热更新挂载
```shell
exportfs -arv
```
