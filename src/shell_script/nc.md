---
title: nc端口健康检测
catalog: Shell
icon: tools
---

## nc端口健康检测
```bash
#!/bin/bash
until nc -zv 0.0.0.0 3306; do sleep 5; done
```