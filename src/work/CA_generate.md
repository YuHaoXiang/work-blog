---
title: CA证书生成
description: CA证书制作
tag:
  - Linux
  - Harbor
  - CA
---

## 生成CA证书私钥
```shell
openssl genrsa -out ca.key 4096
```

## 生成CA证书
::: info 
 调整-subj选项中的值以反映您的组织。如果使用FQDN连接Harbor主机，
 则必须将其指定为通用名称（CN）属性。
:::
```shell
openssl req -x509 -new -nodes -sha512 -days 3650 \
 -subj "/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=192.168.100.10" \
 -key ca.key \
 -out ca.crt
```

## 生成CA证书
生成私钥
```shell
openssl genrsa -out 192.168.100.10.key 4096
```
## 生成证书签名请求（CSR）
```shell
openssl req -sha512 -new \
    -subj "/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=192.168.100.10" \
    -key 192.168.100.10.key \
    -out 192.168.100.10.csr
```
## 生成一个x509 v3扩展文件
```shell
# 域名的形式
cat > v3.ext <<-EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1=harbor.od.com
DNS.2=harbor.od.com
DNS.3=harbor.od.com
EOF

# IP访问
cat > v3.ext <<-EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = IP:192.168.100.10
EOF
```
## 使用该v3.ext文件为您的Harbor主机生成证书
```shell
openssl x509 -req -sha512 -days 3650 \
    -extfile v3.ext \
    -CA ca.crt -CAkey ca.key -CAcreateserial \
    -in harbor.od.com.csr \
    -out harbor.od.com.crt
```
生成后ca.crt，harbor.od.com.crt和harbor.od.com.key文件，必须将它们提供给Harbor和docker，重新配置它们
## 将服务器证书和密钥复制到Harbor主机上的/data/cert/文件夹中
```shell
mkdir -p /data/cert/
cp harbor.od.com.crt /data/cert/
cp harbor.od.com.key /data/cert/
```
## 转换harbor.od.com.crt为harbor.od.com.cert，供Docker使用
```shell
# Docker守护程序将.crt文件解释为CA证书，并将.cert文件解释为客户端证书
openssl x509 -inform PEM -in harbor.od.com.crt -out harbor.od.com.cert
```
## 将服务器证书，密钥和CA文件复制到Harbor主机上的Docker证书文件夹中。您必须首先创建适当的文件夹
```shell
mkdir -p /etc/docker/certs.d/harbor.od.com/
cp harbor.od.com.cert /etc/docker/certs.d/harbor.od.com/
cp harbor.od.com.key /etc/docker/certs.d/harbor.od.com/
cp ca.crt /etc/docker/certs.d/harbor.od.com/
# 如果将默认
# nginx端口443 映射到其他端口，请创建文件夹
# /etc/docker/certs.d/yourdomain.com:port或
# /etc/docker/certs.d/harbor_IP:port
```
## 重新启动Docker Engine
```shell
systemctl restart docker
```
## 证书的目录结构
```text
/etc/docker/certs.d/
└── harbor.od.com
    ├── ca.crt
    ├── harbor.od.com.cert
    └── harbor.od.com.key
```
