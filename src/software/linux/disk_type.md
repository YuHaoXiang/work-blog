---
title: 查看磁盘类型
catalog: Linux
icon: disk
---

在Linux中，可以通过以下三种方法来判断一个磁盘是SSD还是HDD。

## 1. lsblk
使用lsblk命令进行判断，参数-d表示显示设备名称，参数-o表示仅显示特定的列。如果ROTA是1的表示可以旋转，反之则不能旋转。
```bash
lsblk -d -o name,rota 
```
## 2. fdisk
通过fdisk命令查看，参数-l表示列出磁盘详情。在输出结果中，以Disk开头的行表示磁盘简介，下面是一些详细参数，可以试着在这些参数中寻找一些HDD特有的关键字，比如：heads（磁头）、track（磁道）和cylinders（柱面）。
其中，```sda```是要查看的磁盘名称，根据实际情况调整命令中的设备名称。如果输出结果中有这三个关键字中的任何一个或多个，就说明这个磁盘是HDD；如果没有或者这三个关键字中的任何一个不满足，就说明这个磁盘很可能是SSD。
```bash
sudo fdisk -l /dev/sda | grep -E 'heads|track|cylinders'
```

## 查看系统文件
判断/sys/block//queue/rotational的返回值。
```bash
#如果输出结果为1，那么这个磁盘是HDD；如果输出结果为0，那么这个磁盘很可能是SSD。
cat /sys/block/sda/queue/rotational
```