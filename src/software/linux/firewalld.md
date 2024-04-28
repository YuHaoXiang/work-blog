---
title: firewalld
catalog: Linux
---


# 端口
## 单个端口
```bash
firewall-cmd --zone=public --add-port=80/tcp --permanent
```
## 多个端口
```bash
firewall-cmd --permanent --add-port=6379/tcp --add-port=8080/tcp --add-port=80/tcp --add-port=433/tcp
```
## 批量端口
```bash
firewall-cmd --zone=public --add-port=4400-4600/tcp --permanent
```
## 关闭端口
```bash
firewall-cmd --zone=public --remove-port=3306/tcp --permanent
```
## 在不断开的情况下重新加载
```bash
firewall-cmd --reload
```
## 查看已开放的端口
```bash
firewall-cmd --list-ports
```

# 开启、关闭、重启防火墙
```bash
systemctl start firewalld
systemctl stop firewalld
systemctl restart firewalld
```
# 重载配置
```bash
firewall-cmd --reload
```

# 放行DNS
```bash
firewall-cmd --zone=public --add-port=53/udp --permanent
firewall-cmd --reload
```

# 放行Samba
```bash
firewall-cmd --zone=public --add-port=139/tcp --permanent
firewall-cmd --zone=public --add-port=445/tcp --permanent
firewall-cmd --zone=public --add-port=137/udp --permanent
firewall-cmd --zone=public --add-port=138/udp --permanent
firewall-cmd --reload
```

# 放行NFS
```bash
firewall-cmd --permanent --zone public --add-service mountd
firewall-cmd --permanent --zone public --add-service rpc-bind
firewall-cmd --permanent --zone public --add-service nfs
firewall-cmd --reload
```