---
title: 容器修改时区
---

## 修改环境变量
```TZ=Asia/Shanghai```

## 使用挂载点时区
```text
apiVersion: v1
kind: Pod
metadata:
  name: xalpine-pod
  namespace: default
  labels:
    app: xalpine-pod
spec:
  containers:
  - name: xalpine-pod
    image: 37213690/xalpine:1.0
    command:
    - "/bin/sh"
    - "-c"
    - "sleep 3600"
    imagePullPolicy: IfNotPresent
    volumeMounts:
      - name: host-time
        mountPath: /etc/localtime
        readOnly: true
  volumes:
    - name: host-time
      hostPath:
        path: /etc/localtime
```

## 制作时修改
### centos
```text
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo 'Asia/Shanghai' >/etc/timezone
```
### debian / ubuntu
```text
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
```
### alpine
```text
RUN apk --no-cache add  tzdata
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
```

