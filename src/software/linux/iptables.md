---
title: iptables详解
catalog: Linux
---

## iptables的基本原理
### 概念
我们通常所说的`iptables`严格来讲应该叫做`Netfilter`，`Netfilter`是一种内核防火墙框架，可以实现很多网络安全策略，包括数据包过滤、数据包处理、地址伪装、透明代理、网络地址转换等。`iptables`则是一个应用层的二进制工具，可以基于`Netfilter`接口设置内核中的`Netfilter`配置表。

`iptables`由表及构成表的链组成，每条链又由具体的规则组成。`iptables`内置4张表和5条链，4张表分别是`RAW`、`Mangle`、`NAT`、`Filter`表，5条链又叫作数据包的5个挂载点（Hook Point，可以理解为回调函数点，在数据包到达这些位置时，内核回主动调用回调函数，使得数据包在路由时可以改变方向或内容），分别是`PREROUTING`、`INPUT`、`OUTPUT`、`FORWORD`和`POSTROUTING`。对于不同表中相同类型的规则执行顺序，`iptabels`定义了优先级，该优先级由高到低排序为`raw`、`managle`、`nat`、`filter`。例如，对于`PREROUTING`链来说，首先执行`raw`表的规则，然后执行`mangle`表的规则，最后执行nat表的规则。

### iptables的表和链
Filter表表示iptables的默认表，如果在创建规则时未指定表，那么默认使用`Filter`表，主要用于数据包过滤，根据具体规则决定是否放行该数据包（`DROP`、`ACCEPT`、`REJECT`、`LOG`等）。
Filter表包含如下三种内建链：
- `INPUT`链：过滤目的地址是本机的所有数据包
- `OUTPUT`链：过滤本机产生的所有数据包
- `FORWARD`链：过滤经过本机的所有数据包（源地址和目的地址都不是本机）  

NAT表主要用于修改数据包的IP地址、端口号等信息，包含以下三种内建链
- `PREROUTING`链：`DNAT`，处理刚到达本机并在路由转发前转换数据包的目的地址
- `POSTROUTING`链：`SNAT`，处理即将离开本机的数据包，转换数据包的源地址
- `OUTPUT`链：`MASQUERADE`，改变本机产生的数据包的源地址
主要用于修改数据包的TOS、TTL，以及为数据包设置Mark标记，以实现QoS调整及策略路由等。它包含所有5条内置规则链：`PREROUTING`、`POSTROUTING`、`INPUT`、`OUTPUT`、`FORWORD`。

`RAW`表是`iptables`在1.2.9版本之后新增的表，主要用于决定数据包是否被状态跟踪机制处理。RAW表的优先级要优于其他表，包含两条规则链：`OUTPUT`和`PREROUTING`。

### iptables原理图
![iptables原理图](./images/iptables.png)

上图展示了`iptables`规则链处理数据包的顺序，网卡接收的数据包会进入内核协议栈被`PREROUTING`规则链处理（可能发生数据包的目的地址转换），之后由内核协议栈进行路由选择，如果数据包的目的地址是本机，则内核协议栈会将其传给`INPUT`链处理，`INPUT`链在允许通过后，数据包由内核空间进入用户空间，被主机进程处理；如果`PREROUTING`链处理后的数据报的目的地址不是本机地址，则将其传给`FORWARD`链进行处理，最后交给`POSTROUTING`链。本机进程发出的数据包首先进行路由选择，经过`OUTPUT`链后，到达`POSTROUTING`链（可能发生数据包的源地址转换）。

## iptables的基本使用
### 规则查询
```bash
[root@localhost ~]# iptables --line-number -t filter -nvxL INPUT
Chain INPUT (policy ACCEPT 750 packets, 50472 bytes)
num    pkts    bytes    target    prot    opt    in    out    source    destination          

# 选项
# --line-number 显示行号
# -t 指定表，默认为filter表
# -n 直接显示IP地址
# -v 显示详细信息
# -x 显示精确的收发包大小
# -L 指定链，不指定链名默认所有链
# 
# 结果
# policy 当前链的默认策略
# pkts 当前链默认策略匹配到的包的数量
# bytes 当前链默认策略匹配到的包的大小总和
# num 行号
# pkts 当前规则匹配到的数据包数量
# bytes 当前规则匹配到的数据包大小总和
# target 当前规则的效果
# prot 当前规则的匹配的数据包网络协议
# opt 
# in
# out
# source 源地址
# destination 目的地址

```

### 规则管理
```bash
[root@localhost ~]# iptables -t filter -I INPUT -s 192.168.1.146 -j REJECT
[root@localhost ~]# iptables -nvxL INPUT
Chain INPUT (policy ACCEPT 49 packets, 2900 bytes)
pkts  bytes  target  prot  opt  in  out  source         destination         
0     0      REJECT  all   --   *   *    192.168.1.146  0.0.0.0/0     reject-with icmp-port-unreachable

# -t 指定表名，默认为filter表
# 规则管理动作：-I 首部插入  -A 尾部追加  -D 删除  -F 刷新链(删除链中所有规则)  -R 修改规则(必须指定原匹配条件和匹配效果)
# 规则匹配条件: -s 源IP　-d 目的IP  
# -j 规则效果: ACCEPT通过  DROP丢弃  REJECT拒绝

# 修改链的默认规则效果
[root@localhost ~]# iptables -P FORWARD DROP
[root@localhost ~]# iptables -nvxL FORWARD
Chain FORWARD (policy DROP 0 packets, 0 bytes)
pkts    bytes    target    prot    opt    in    out    source    destination

# 保存规则
[root@localhost ~]# iptables-save > /etc/sysconfig/iptables
```
## 规则匹配条件
### 基本匹配条件
1. 源IP/目的IP地址
```bash
# 指定单个地址
iptables -t filter -I INPUT -s[d] 192.168.4.129 -j DROP
# 指定多个地址
iptables -t filter -I INPUT -s[d] 192.168.4.129,192.168.4.130 -j DROP
# 指定网段
iptables -t filter -I INPUT -s[d] 192.168.4.0.0/16 -j DROP
# 取反
iptables -t filter -I INPUT ! -s[d] 192.168.4.129 -j DROP
```
::: info 
假设在空的INPUT链中添加如下规则：
```bash
iptables -t filter -I INPUT ! -s 192.168.4.129 -j DROP
```

那么当IP为192.168.4.129的主机ping本机时，首先对比源IP和规则中的IP，发现不符合规则的匹配条件，会进入INPUT链的默认处理策略，即ACCEPT，因此IP为192.168.4.129的主机可以收到ICMP响应包。
:::
2. 协议类型
```bash
iptables -t filter -I INPUT -s 192.168.4.129 -p tcp -j REJECT
# iptables支持的协议类型
# tcp, udp, udplite, icmp, icmpv6,esp, ah, sctp, mh 不指定协议时默认匹配所有协议
```
3. 网卡接口
```bash
iptables -t filter -I INPUT -i eth0 -j REJECT
# -i 匹配数据包流入网卡，只能用于PREROUTING、INPUT、FORWARD链
# -o 匹配数据包流出网卡，只能用于OUTPUT、FORWARD、POSTROUTING链
```
### 扩展匹配条件
上面讲的都是iptables的基本匹配条件，端口号属于扩展匹配条件。对于基本匹配条件，如果需要使用扩展匹配条件，则需要一些扩展模块的支持。
1. tcp扩展
```bash
# 端口号
iptables -t filter -I INPUT -s 192.168.4.129 -p tcp [-m tcp] --dport 22 -j REJECT
iptables -t filter -I INPUT -s 192.168.4.129 -p udp [-m udp] --sport 30000:36655 -j REJECT
# -m 指定扩展模块名，如不指定，会默认使用-m 协议名
# --dport/--sport 指定端口范围
iptables -t filter -I INPUT -s 192.168.4.129 -p tcp -m mutiport --dport 22,23:25 -j REJECT
# -m mutiport 扩展模块可以同时指定多个离散的端口或端口范围

# TCP标志位
iptables -t filter -I INPUT -p tcp -m tcp --dport 22 --tcp-flags SYN,ACK,FIN,RST,URG,PSH[ALL] SYN -j REJCET
# --tcp-flags 指定了TCP报文中的标志位。第一个参数表示要匹配报文TCP头中的哪些标志位，第二个参数表示第一个参数列表中标志位必须为1的标志(其他标志必须为0)
```
2. udp扩展
```bash
iptables -t filter -I INPUT -p udp -m udp --dport 137 -j REJECT
```
3. icmp扩展
```bash
iptables -t filter -I INPUT -p icmp -m icmp --icmp-type 8/0 -j REJECT
# --icmp-type 指定icmp报文类型，8表示icmp type，0表示icmp code
#  https://tools.ietf.org/html/rfc792
#  https://zh.wikipedia.org/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E6%8E%A7%E5%88%B6%E6%B6%88%E6%81%AF%E5%8D%8F%E8%AE%AE
```
4. iprange扩展
```bash
iptables -t filter -I INPUT -m iprange --src-range 192.168.4.127-192.168.4.131 -j REJECT
# iprange模块匹配数据包的源IP或目的IP地址范围(--dst-range)
```
5. string扩展
```bash
iptables -t filter -I INPUT -m string --algo bm --string "OOXX" -j REJCET
# string模块用于匹配字符串
# --algo 指定算法，支持bm算法或kmp算法
# --string 指定待匹配的字符串
```
6. time扩展
```bash
iptables -t filter -I INPUT -m time --timestart 09:00:00 --timestop 11:00:00 --weekdays 1,2,3,4,5 --monthdays 22,23,24 --datestart 2020-07-01 --datestop 2020-09-01 -j REJCET
# time 模块用于匹配时间
# --timestart/--timestop 指定一天内的时间段
# --weekdays/--monthdays 指定一周/月内的哪几天
# --datestart/--datestop 指定起始和结束日期
```
7. connlimit扩展
```bash
iptables -t filter -I INPUT -p tcp --dport 22 -m connlimit --connlimit-above 2 --connlimit-mask 24 -j REJECT
# connlimit 模块用于设置连接数限制
# --connlimit-above 指定每个客户IP的并发连接数上限
# --connlimit-mask 指定客户IP的网段(掩码长度)
```
8. limit扩展
```bash
# 假设现在要设置这样一条规则：每6s响应1次(1min响应10次)icmp报文

# 方式一
iptables -t filter -I INPUT -p icmp -m limit --limit 10/minute -j ACCEPT
# limit 模块提供了速率限制功能
# --limit 指定匹配时间间隔
# 效果一：第6秒的报文匹配到了该规则，执行了放行操作；而第6秒前的报文没有匹配到该规则，会执行默认策略即ACCEPT，也就是说该规则实际上没有起到任何效果

# 方式二
iptables -t filter -I INPUT -p icmp -m limit --limit 10/minute -j ACCEPT
iptables -t filter -I INPIT -p icmp -j REJECT
# 效果二：只有被第一条规则匹配的到数据包会放行，其余的被REJECT掉，能够实现限流的功能。但实际测试会发现前5个报文没有被限流(都被放行了)，原因在于limit模块默认参数--limit-burst=5。该参数与令牌桶算法有关。
```
::: info 令牌桶算法
有一个木桶，木桶里面放了5块令牌（–limit-burst），所有报文如果想要出关入关，都必须要持有木桶中的令牌才行，这个木桶每隔6秒钟会生成一块新的令牌。如果木桶中的令牌不足5块，新生成的令牌会被放入木桶中，否则令牌被丢弃。如果此时有5个报文想要入关，恰好这5个报文能在木桶里找到一人一个令牌，于是报文被放行；此时木桶中已经没有令牌可以使用了，因此剩余的报文被拒绝。但每6秒钟，会生成新的令牌，新的报文获取到该令牌后，再此被放行。令牌可积累，但木桶最多能存放的令牌数只有5个。
:::

## 规则动作
规则动作也包括基础动作与扩展动作，与扩展匹配条件不同，扩展动作可以直接使用，而不需要指定特定模块。
### 基础动作
1. ACCEPT
2. DROP

### 扩展动作
1. REJECT
```bash
iptables -t filter -I INPUT -p tcp --dport 22 -j REJECT --reject-with icmp-host-unreachable
# --reject-with 指定拒绝提示信息，默认为icmp-host-unreachable
# 可用值如下：icmp-net-unreachable/icmp-host-unreachable/icmp-port-unreachable
# icmp-proto-unreachable/icmp-net-prohibited/icmp-host-pro-hibited/icmp-admin-prohibited
```
2. LOG
```bash
iptables -t filter - I INPUT -p tcp --dport 22 -j LOG --log-level info --log-prefix "log in from port 22"
# LOG动作会把符合条件的请求记录到日志中，默认的日志地址为/var/log/messages
# 修改日志地址：/etc/rsylog.conf文件中添加kern.warning /var/log/iptables.log，重起systemctl restart rsyslog
# --log-level 指定日志级别，可选值：emerg/alert/crit/error/warning/notice/info/debug
# --log-prefix 指定日志前缀(标签)
```
3. NAT
::: info 网络地址转换
假设网络内部有10台主机，它们有各自的IP地址，当网络内部的主机与其他网络中的主机通讯时，则会暴露自己的IP地址，如果我们想要隐藏这些主机的IP地址，该怎么办呢？

当网络内部的主机向网络外部主机发送报文时，报文会经过防火墙或路由器，当报文经过防火墙或路由器时，将报文的源IP修改为防火墙或者路由器的IP地址，当其他网络中的主机收到这些报文时，显示的源IP地址则是路由器或者防火墙的，而不是那10台主机的IP地址，这样，就起到隐藏网络内部主机IP的作用，当网络内部主机的报文经过路由器时，路由器会维护一张NAT表，表中记录了报文来自于哪个内部主机的哪个进程（内部主机IP+端口），当报文经过路由器时，路由器会将报文的内部主机源IP替换为路由器的IP地址，把源端口也映射为某个端口，NAT表会把这种对应关系记录下来。

示意关系如下：
![网络地址转换](./images/nat.png)
于是，外部主机收到报文时，源IP与源端口显示的都是路由的IP与端口，当外部网络中的主机进行回应时，外部主机将响应报文发送给路由器，路由器根据刚才NAT表中的映射记录，将响应报文中的目标IP与目标端口再改为内部主机的IP与端口号，然后再将响应报文发送给内部网络中的主机。整个过程中，外部主机都不知道内部主机的IP地址，内部主机还能与外部主机通讯，于是起到了隐藏网络内主机IP的作用。

内部网络的报文发送出去时，报文的源IP会被修改，也就是源地址转换：Source Network Address Translation，缩写为SNAT。

外部网络的报文响应时，响应报文的目标IP会再次被修改，也就是目标地址转换：Destinationnetwork address translation，缩写为DNAT。
```bash
iptables -t nat -A POSTROUTING -s 10.1.0.0/16 -j SNAT --to-source public-IP
# SNAT动作只能配置在POSTROUTING、OUTPUT、FORWARD链上
# --to-source 指定源IP(公网IP)

iptables -t nat -I PREROUTING -d public-IP -p tcp --dport public-PORT -j DNAT --to-destination private-IP:private-PORT
iptables -t nat -A POSTROUTING -s 10.1.0.0/16 -j SNAT --to-source public-IP
# DNAT动作只能配置在PREROUTING、INPUT、FORWARD链上
# --to-destination 指定目的IP(私网IP)
```
:::
4. MASQUERADE
```bash
iptables -t nat -A POSTROUTING -s 10.1.0.0/16 -o eth0 -j MASQUERADE
# MASQUERADE 动态获取有效IP
# -o 指定从那个网卡获取IP
```
5. REDIRECT
```bash
iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8080
# REDIRECT 端口映射，只能定义在PREROUTING链或者OUTPUT链中
```

6. 自定义链
当iptables链中的规则很多时，非常难以管理，比如在大量的规则中有些是针对httpd服务的，有些是针对sshd服务的，有针对私网IP的，有针对公网IP的。如果修改一条规则需要查看其他所有规则的话，将会大大降低效率，因此iptables提供了自定义链的能力。但自定义链并不能直接使用，而是需要被默认链引用才能够使用。
```bash
# 在filter表中创建IN_WEB自定义链
iptables -t filter -N IN_WEB
# 在INPUT链中引用自定义链
iptables -t filter -I INPUT -p tcp --dport 80 -j IN_WEB
# 重命名自定义链
iptables -E IN_WEB WEB
# 删除引用计数为0并且不包含任何规则的自定义链
iptables -X WEB
```


https://www.cnblogs.com/Gdavid/p/16718478.html