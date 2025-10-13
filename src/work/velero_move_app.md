---
title: 集群应用迁移
tag:
  - Kubernetes
---

## 配置RAM账户权限策略
```json
{
    "Version": "1",
    "Statement": [
        {
            "Action": [
                "ecs:DescribeSnapshots",
                "ecs:CreateSnapshot",
                "ecs:DeleteSnapshot",
                "ecs:DescribeDisks",
                "ecs:CreateDisk",
                "ecs:Addtags",
                "oss:PutObject",
                "oss:GetObject",
                "oss:DeleteObject",
                "oss:GetBucket",
                "oss:ListObjects",
                "oss:ListBuckets"
            ],
            "Resource": [
                "*"
            ],
            "Effect": "Allow"
        }
    ]
}
```
## 安装velero和velero-plugin
### 设置环境变量
```bash
BUCKET=<YOUR_BUCKET>
REGION=<YOUR_REGION>
```
### 安装阿里云ACK的velero插件
```bash
velero install \
  --provider alibabacloud \
  --image registry-ap-northeast-1.ack.aliyuncs.com/acs/velero:v1.14.1-ack.3-36677874-aliyun \
  --bucket $BUCKET \
  --secret-file ./credentials-velero \
  --use-volume-snapshots=false \
  --backup-location-config region=$REGION \
  --plugins registry-ap-northeast-1.ack.aliyuncs.com/acs/velero-plugin-alibabacloud:v1.0.0-2d33b89 \
  --wait

```
#### 删除velero(需要的话执行)
```bash
kubectl delete namespace/velero clusterrolebinding/velero 
kubectl delete crds -l component=velero
```

### 备份
备份role-play,role-play-admin两个命名空间   
```bash
velero backup create aimi-backup --include-namespaces role-play,role-play-admin --wait
```
### 恢复应用到新集群
1. 切换集群安装阿里云ACK的velero插件
2. 恢复应用
```bash
velero  restore create --from-backup aimi-backup --wait
```
