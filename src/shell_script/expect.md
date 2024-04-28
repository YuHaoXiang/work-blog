---
title: expect自动交互
catalog: Shell
icon: tools
---

## rsync自动交互
```bash
#!/bin/bash
KB_PATH=$(sudo docker ps -a | grep sca-engine | awk '{print $1}' | xargs -I% sudo docker inspect % | grep -A 40 Mounts | grep -B 2 '/var/lib/ldb' | grep Source | cut -d: -f 2 | cut -d, -f 1 | cut -d\" -f 2)
echo "知识库路径：$KB_PATH"
rsynczd() {
    expect <<-EOF
        set timeout 10
        spawn rsync -av --progres $user@$ip:/home/sectrend/kb_updates $KB_PATH/kb_updates
        expect {
            "yes/no" { send "yes\n";exp_continue }
            "password" { send "$password\n" }
        }
        expect EOF
    EOF
}
ip=$1
user=$2
password=$3
rsynczd
```