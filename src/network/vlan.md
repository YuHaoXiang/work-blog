---
title: VLAN 与交换机
---

# VLAN (虚拟局域网)

## 作用

- 广播域隔离
- 网络分段
- 安全隔离
- 灵活的网络设计

## 常见 VLAN ID

| VLAN ID | 用途 |
|---------|------|
| 1 | 默认 VLAN (不可删除) |
| 10 | 管理 VLAN |
| 20 | 办公 VLAN |
| 30 | 访客 VLAN |
| 99 | 保留 |

## 交换机类型

| 类型 | 特点 |
|------|------|
| 接入交换机 | 连接终端设备 |
| 汇聚交换机 | 连接接入交换机 |
| 核心交换机 | 高速转发 |
| 三层交换机 | 支持路由功能 |

## 命令示例

### Cisco VLAN

```bash
# 创建 VLAN
vlan 10
 name Office

# 将端口加入 VLAN
interface GigabitEthernet0/1
 switchport mode access
 switchport access vlan 10

# 端口聚合
interface Port-channel1
 switchport mode trunk

# 跨交换机 VLAN
interface GigabitEthernet0/24
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30
```

### Linux VLAN

```bash
# 创建 VLAN 接口
ip link add link eth0 name eth0.10 type vlan id 10

# 配置 IP
ip addr add 192.168.10.1/24 dev eth0.10

# 启用接口
ip link set eth0.10 up
```

---

# 交换机原理

## MAC 地址表

```
MAC 地址          端口    VLAN
00:11:22:33:44:55  Gi0/1   10
aa:bb:cc:dd:ee:ff  Gi0/2   20
```

## 转发决策

1. **泛洪**：目标 MAC 不在表中
2. **转发**：目标 MAC 在表中，且端口不同
3. **过滤**：目标 MAC 在表中，且端口相同

## 环路处理

- STP (生成树协议)
- RSTP (快速生成树)
- MSTP (多实例生成树)
