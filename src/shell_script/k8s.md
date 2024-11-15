---
title: k8s常用代码片段
catalog: Shell
---

```bash
# configmaps 批量到出
kubectl --kubeconfig=aaa get configmap -n sdkv9  | awk '{print $1}' | grep -v NAME | xargs -I {} bash -c "kubectl --kubeconfig=/root/.kube/config_newsdk get configmap -n sdkv9 {} -o yaml | yq eval 'del(.metadata.creationTimestamp, .metadata.resourceVersion, .metadata.uid, .metadata.annotations)' -  > {}.yaml"
```
