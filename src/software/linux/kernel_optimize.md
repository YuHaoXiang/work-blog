---
title: 内核参数优化参考
catalog: Linux
---

```bash
vi /etc/sysctl.conf
# add by digoal.zhou
fs.aio-max-nr = 1048576
fs.file-max = 76724600
kernel.core_pattern= /data01/corefiles/core_%e_%u_%t_%s.%p   # /data01/corefiles事先建好，权限777
kernel.sem = 4096 2147483647 2147483646 512000    # 信号量, ipcs -l 或 -u 查看，每16个进程一组，每组信号量需要17个信号量。
kernel.shmall = 107374182      # 所有共享内存段相加大小限制(建议内存的80%)
kernel.shmmax = 274877906944   # 最大单个共享内存段大小(建议为内存一半), >9.2的版本已大幅降低共享内存的使用
kernel.shmmni = 819200         # 一共能生成多少共享内存段，每个PG数据库集群至少2个共享内存段
net.core.netdev_max_backlog = 10000
net.core.rmem_default = 262144       # The default setting of the socket receive buffer in bytes.
net.core.rmem_max = 4194304          # The maximum receive socket buffer size in bytes
net.core.wmem_default = 262144       # The default setting (in bytes) of the socket send buffer.
net.core.wmem_max = 4194304          # The maximum send socket buffer size in bytes.
net.core.somaxconn = 4096
net.ipv4.tcp_max_syn_backlog = 4096
net.ipv4.tcp_keepalive_intvl = 20
net.ipv4.tcp_keepalive_probes = 3
net.ipv4.tcp_keepalive_time = 60
net.ipv4.tcp_mem = 8388608 12582912 16777216
net.ipv4.tcp_fin_timeout = 5
net.ipv4.tcp_synack_retries = 2
net.ipv4.tcp_syncookies = 1    # 开启SYN Cookies。当出现SYN等待队列溢出时，启用cookie来处理，可防范少量的SYN攻击
net.ipv4.tcp_timestamps = 1    # 减少time_wait
net.ipv4.tcp_tw_recycle = 0    # 如果=1则开启TCP连接中TIME-WAIT套接字的快速回收，但是NAT环境可能导致连接失败，建议服务端关闭它
net.ipv4.tcp_tw_reuse = 1      # 开启重用。允许将TIME-WAIT套接字重新用于新的TCP连接
net.ipv4.tcp_max_tw_buckets = 262144
net.ipv4.tcp_rmem = 8192 87380 16777216
net.ipv4.tcp_wmem = 8192 65536 16777216
net.nf_conntrack_max = 1200000
net.netfilter.nf_conntrack_max = 1200000
vm.dirty_background_bytes = 4096000000       #  系统脏页到达这个值，系统后台刷脏页调度进程 pdflush（或其他） 自动将(dirty_expire_centisecs/100）秒前的脏页刷到磁盘
vm.dirty_expire_centisecs = 6000             #  比这个值老的脏页，将被刷到磁盘。6000表示60秒。
vm.dirty_ratio = 80                          #  如果系统进程刷脏页太慢，使得系统脏页超过内存 80 % 时，则用户进程如果有写磁盘的操作（如fsync, fdatasync等调用），则需要主动把系统脏页刷出。
vm.dirty_writeback_centisecs = 50            #  pdflush（或其他）后台刷脏页进程的唤醒间隔， 50表示0.5秒。
vm.extra_free_kbytes = 4096000
vm.min_free_kbytes = 2097152
vm.mmap_min_addr = 65536
vm.overcommit_memory = 0     #  在分配内存时，允许少量over malloc
vm.overcommit_ratio = 90     #  当overcommit_memory = 2 时，用于参与计算允许指派的内存大小。
vm.swappiness = 0            #  关闭交换分区
vm.zone_reclaim_mode = 0     # 禁用 numa, 或者在vmlinux中禁止.
net.ipv4.ip_local_port_range = 40000 65535    # 本地自动分配的TCP, UDP端口号范围
#  vm.nr_hugepages = 102352    #  建议shared buffer设置超过64GB时 使用大页，页大小 /proc/meminfo Hugepagesize
```