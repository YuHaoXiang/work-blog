---
title: wrk HTTP压力测试
icon: software
---

## 基本使用
```wrk -t12 -c400 -d30s http://127.0.0.1:8080/index.html```  
运行基准测试30秒，使用12个线程，并保持400个HTTP连接

## 命令行参数
```bash

    -c, --connections: total number of HTTP connections to keep open with
                    each thread handling N = connections/threads

    -d, --duration:    duration of the test, e.g. 2s, 2m, 2h

    -t, --threads:     total number of threads to use

    -s, --script:      LuaJIT script, see SCRIPTING

    -H, --header:      HTTP header to add to request, e.g. "User-Agent: wrk"

        --latency:     print detailed latency statistics

        --timeout:     record a timeout if a response is not received within
                    this amount of time.
```