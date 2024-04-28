---
title: 网络问题排查命令行
catalog: Shell
icon: tools
---

##  格式化某些 /proc文件输出
```bash
[root@localhost ~]# cat /proc/net/snmp 
Ip: Forwarding DefaultTTL InReceives InHdrErrors InAddrErrors ForwDatagrams InUnknownProtos InDiscards InDelivers OutRequests OutDiscards OutNoRoutes ReasmTimeout ReasmReqds ReasmOKs ReasmFails FragOKs FragFails FragCreates
Ip: 2 64 1112736 0 0 0 0 0 1112733 1112545 0 36 0 0 0 0 0 0 0
Icmp: InMsgs InErrors InCsumErrors InDestUnreachs InTimeExcds InParmProbs InSrcQuenchs InRedirects InEchos InEchoReps InTimestamps InTimestampReps InAddrMasks InAddrMaskReps OutMsgs OutErrors OutDestUnreachs OutTimeExcds OutParmProbs OutSrcQuenchs OutRedirects OutEchos OutEchoReps OutTimestamps OutTimestampReps OutAddrMasks OutAddrMaskReps
Icmp: 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
Tcp: RtoAlgorithm RtoMin RtoMax MaxConn ActiveOpens PassiveOpens AttemptFails EstabResets CurrEstab InSegs OutSegs RetransSegs InErrs OutRsts InCsumErrors
Tcp: 1 200 120000 -1 2207 2204 4 598 3803 1112646 1112462 0 0 303 0
Udp: InDatagrams NoPorts InErrors OutDatagrams RcvbufErrors SndbufErrors InCsumErrors IgnoredMulti
Udp: 176 0 0 91 0 0 0 0
UdpLite: InDatagrams NoPorts InErrors OutDatagrams RcvbufErrors SndbufErrors InCsumErrors IgnoredMulti
UdpLite: 0 0 0 0 0 0 0 0
```
第一行是字段，第二行是字段的值。这些输出每一行包含的字段太多，字段和值又没对齐，看着太费劲，遂用。  

awk命令格式化下这类输出，以后方便查看。
```bash
awk '{\
    if (NR % 2 == 0) print $1;\
    for(i = 2; i <= NF; i++) {\
        if (NR % 2 ) \
            count[i] = $i;\
        else if ($i > 0) \
            printf("    %-28s:%d\n",count[i], $i);\
    }\
}' \
/proc/net/snmp
```

上述命令按格式打印非0值的字段和值。该命令也适合`/proc/net/netstat`文件，结合`watch`命令就能定时得查看这些值的变化，命令如下：
```bash
watch -n 1 "awk '{if (NR % 2 == 0) print \$1;for(i = 2; i <= NF; i++) {if (NR % 2 ) count[i]=\$i; else if (\$i > 0 ) printf(\"    %-28s%d\n\",count[i], \$i);}}' /proc/net/netstat"
```

更进一步，watch 命令只能看到某个时间点的数值统计，如果想查看每秒钟数值的变化，就不那么容易了，我花了些时间写了如下命令来实现这个效果：
```bash
# 这个命令会每秒钟输出/proc/net/snmp 和 /proc/net/netstat文件中数值的变化
echo '' > tmp.txt; \
for((i = 1; ; i++)); do \
    awk '{for(i = 2; i <= NF; i++) {if (NR % 2 ) count[i] = $i; else if ($i > 0 ) print count[i], $i;}}' \
        /proc/net/snmp /proc/net/netstat >> tmp.txt; \
    if [ `expr $i % 2` == 0 ]; then \
        printf "\033c"; \
        awk '{if (a[$1]) {if ($2 != a[$1]) printf("%-28s%d\n", $1, $2 - a[$1])} else a[$1] = $2;}' tmp.txt; \
        echo '' > tmp.txt;\
    else \
        sleep 1;\
    fi; \
done
```
