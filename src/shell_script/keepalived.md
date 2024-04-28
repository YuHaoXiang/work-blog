---
title: Keepalivd容器健康检测脚本
catalog: Shell
icon: keepalived
---

## Keepalivd容器健康检测脚本
```bash
#! /usr/bin/env bash
#容器启动脚本
NEXUS_SH_PATH=/home/yhx/nexus-docker-start.sh

NEXUS_NUM=$(sudo docker ps -a | grep nexus | wc -l)
echo $NEXUS_NUM
if [ $NEXUS_NUM -eq 0 ];then
        sudo bash $NEXUS_SH_PATH
elif [ $NEXUS_NUM -eq 1  ];then
        curl -v http://192.168.100.10:8081
        if [ $? -ne 0 ];then
                sudo docker restart nexus
        fi
fi
```