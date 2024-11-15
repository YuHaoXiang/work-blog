---
title: Centos7初始化脚本
catalog: Shell
icon: centos
---

## rsync自动交互
```bash
#!/bin/bash
# init centos7  ./centos7-init.sh 主机名

# 检查是否为root用户，脚本必须在root权限下运行
if [[ "$(whoami)" != "root" ]]; then
    echo "please run this script as root !" >&2
    exit 1
fi
echo -e "\033[31m the script only Support CentOS_7 x86_64 \033[0m"
echo -e "\033[31m system initialization script, Please Seriously. press ctrl+C to cancel \033[0m"

# 检查是否为64位系统，这个脚本只支持64位脚本
platform=`uname -i`
if [ $platform != "x86_64" ];then
    echo "this script is only for 64bit Operating System !"
    exit 1
fi

if [ "$1" == "" ];then
    echo "The host name is empty."
    exit 1
else
	hostnamectl  --static set-hostname  $1
	hostnamectl  set-hostname  $1
fi

cat << EOF
+---------------------------------------+
|   your system is CentOS 7 x86_64      |
|           start optimizing            |
+---------------------------------------+
EOF
sleep 1

# 安装必要支持工具及软件工具
yum_update(){
yum update -y
yum install -y nmap unzip wget vim lsof xz net-tools iptables-services ntpdate ntp-doc psmisc
}

# 设置时间同步 set time
zone_time(){
timedatectl set-timezone Asia/Shanghai
/usr/sbin/ntpdate 0.cn.pool.ntp.org > /dev/null 2>&1
/usr/sbin/hwclock --systohc
/usr/sbin/hwclock -w
cat > /var/spool/cron/root << EOF
10 0 * * * /usr/sbin/ntpdate 0.cn.pool.ntp.org > /dev/null 2>&1
* * * * */1 /usr/sbin/hwclock -w > /dev/null 2>&1
EOF
chmod 600 /var/spool/cron/root
/sbin/service crond restart
sleep 1
}

# 修改文件打开数 set the file limit
limits_config(){
cat > /etc/rc.d/rc.local << EOF
#!/bin/bash

touch /var/lock/subsys/local
ulimit -SHn 1024000
EOF

sed -i "/^ulimit -SHn.*/d" /etc/rc.d/rc.local
echo "ulimit -SHn 1024000" >> /etc/rc.d/rc.local

sed -i "/^ulimit -s.*/d" /etc/profile
sed -i "/^ulimit -c.*/d" /etc/profile
sed -i "/^ulimit -SHn.*/d" /etc/profile

cat >> /etc/profile << EOF
ulimit -c unlimited
ulimit -s unlimited
ulimit -SHn 1024000
EOF

source /etc/profile
ulimit -a
cat /etc/profile | grep ulimit

if [ ! -f "/etc/security/limits.conf.bak" ]; then
    cp /etc/security/limits.conf /etc/security/limits.conf.bak
fi

cat > /etc/security/limits.conf << EOF
* soft nofile 1024000
* hard nofile 1024000
* soft nproc  1024000
* hard nproc  1024000
hive   - nofile 1024000
hive   - nproc  1024000
EOF

if [ ! -f "/etc/security/limits.d/20-nproc.conf.bak" ]; then
    cp /etc/security/limits.d/20-nproc.conf /etc/security/limits.d/20-nproc.conf.bak
fi

cat > /etc/security/limits.d/20-nproc.conf << EOF
*          soft    nproc     409600
root       soft    nproc     unlimited
EOF

sleep 1
}

# 优化内核参数 tune kernel parametres
sysctl_config(){
if [ ! -f "/etc/sysctl.conf.bak" ]; then
    cp /etc/sysctl.conf /etc/sysctl.conf.bak
fi

#add
cat > /etc/sysctl.conf << EOF
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv4.tcp_syn_retries = 1
net.ipv4.tcp_synack_retries = 1
net.ipv4.tcp_keepalive_time = 600
net.ipv4.tcp_keepalive_probes = 3
net.ipv4.tcp_keepalive_intvl =15
net.ipv4.tcp_retries1 = 3
net.ipv4.tcp_retries2 = 5
net.ipv4.tcp_fin_timeout = 10
net.ipv4.tcp_tw_recycle = 1
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_window_scaling = 1
net.ipv4.tcp_max_tw_buckets = 60000
net.ipv4.tcp_max_orphans = 32768
net.ipv4.tcp_max_syn_backlog = 16384
net.ipv4.tcp_mem = 94500000 915000000 927000000
net.ipv4.tcp_wmem = 4096 16384 13107200
net.ipv4.tcp_rmem = 4096 87380 17476000
net.ipv4.ip_local_port_range = 1024 65000
net.ipv4.ip_forward = 1
net.ipv4.route.gc_timeout = 100
net.core.somaxconn = 32768
net.core.netdev_max_backlog = 32768
net.nf_conntrack_max = 6553500
net.netfilter.nf_conntrack_max = 6553500
net.netfilter.nf_conntrack_tcp_timeout_established = 180
vm.overcommit_memory = 1
vm.swappiness = 1
fs.file-max = 1024000
EOF

#reload sysctl
/sbin/sysctl -p
sleep 1
}

# 设置UTF-8   LANG="zh_CN.UTF-8"
LANG_config(){
echo "LANG=\"en_US.UTF-8\"">/etc/locale.conf
source  /etc/locale.conf
}


#关闭SELINUX disable selinux
selinux_config(){
sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config
setenforce 0
sleep 1
}

#日志处理
log_config(){
setenforce 0
systemctl start systemd-journald
systemctl status systemd-journald
}


# 关闭防火墙
firewalld_config(){
/usr/bin/systemctl stop  firewalld.service
/usr/bin/systemctl disable  firewalld.service
}


# SSH配置优化 set sshd_config
sshd_config(){
if [ ! -f "/etc/ssh/sshd_config.bak" ]; then
    cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
fi

cat >/etc/ssh/sshd_config<<EOF
Port 22
AddressFamily inet
ListenAddress 0.0.0.0
Protocol 2
HostKey /etc/ssh/ssh_host_rsa_key
HostKey /etc/ssh/ssh_host_ecdsa_key
HostKey /etc/ssh/ssh_host_ed25519_key
SyslogFacility AUTHPRIV
PermitRootLogin yes
MaxAuthTries 6
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile	.ssh/authorized_keys
PasswordAuthentication yes
ChallengeResponseAuthentication no
UsePAM yes
UseDNS no
X11Forwarding yes
UsePrivilegeSeparation sandbox
AcceptEnv LANG LC_CTYPE LC_NUMERIC LC_TIME LC_COLLATE LC_MONETARY LC_MESSAGES
AcceptEnv LC_PAPER LC_NAME LC_ADDRESS LC_TELEPHONE LC_MEASUREMENT
AcceptEnv LC_IDENTIFICATION LC_ALL LANGUAGE
AcceptEnv XMODIFIERS
Subsystem       sftp    /usr/libexec/openssh/sftp-server
EOF
/sbin/service sshd restart
}


# 关闭ipv6  disable the ipv6
ipv6_config(){
echo "NETWORKING_IPV6=no">/etc/sysconfig/network
echo 1 > /proc/sys/net/ipv6/conf/all/disable_ipv6
echo 1 > /proc/sys/net/ipv6/conf/default/disable_ipv6
echo "127.0.0.1   localhost   localhost.localdomain">/etc/hosts
#sed -i 's/IPV6INIT=yes/IPV6INIT=no/g' /etc/sysconfig/network-scripts/ifcfg-enp0s8


for line in $(ls -lh /etc/sysconfig/network-scripts/ifcfg-* | awk -F '[ ]+' '{print $9}')
do
if [ -f  $line ]
        then
        sed -i 's/IPV6INIT=yes/IPV6INIT=no/g' $line
                echo $i
fi
done
}


# 设置历史命令记录格式 history
history_config(){
export HISTFILESIZE=10000000
export HISTSIZE=1000000
export PROMPT_COMMAND="history -a"
export HISTTIMEFORMAT="%Y-%m-%d_%H:%M:%S "
##export HISTTIMEFORMAT="{\"TIME\":\"%F %T\",\"HOSTNAME\":\"\$HOSTNAME\",\"LI\":\"\$(who -u am i 2>/dev/null| awk '{print \$NF}'|sed -e 's/[()]//g')\",\"LU\":\"\$(who am i|awk '{print \$1}')\",\"NU\":\"\${USER}\",\"CMD\":\""
cat >>/etc/bashrc<<EOF
alias vi='vim'
HISTDIR='/var/log/command.log'
if [ ! -f \$HISTDIR ];then
touch \$HISTDIR
chmod 666 \$HISTDIR
fi
export HISTTIMEFORMAT="{\"TIME\":\"%F %T\",\"IP\":\"\$(ip a | grep -E '192.168|172' | head -1 | awk '{print \$2}' | cut -d/ -f1)\",\"LI\":\"\$(who -u am i 2>/dev/null| awk '{print \$NF}'|sed -e 's/[()]//g')\",\"LU\":\"\$(who am i|awk '{print \$1}')\",\"NU\":\"\${USER}\",\"CMD\":\""
export PROMPT_COMMAND='history 1|tail -1|sed "s/^[ ]\+[0-9]\+  //"|sed "s/$/\"}/">> /var/log/command.log'
EOF
source /etc/bashrc
}

# 服务优化设置
service_config(){
/usr/bin/systemctl enable NetworkManager-wait-online.service
/usr/bin/systemctl start NetworkManager-wait-online.service
/usr/bin/systemctl stop postfix.service
/usr/bin/systemctl disable postfix.service
chmod +x /etc/rc.local
chmod +x /etc/rc.d/rc.local
#ls -l /etc/rc.d/rc.local
}

# VIM设置
vim_config(){
cat > /root/.vimrc << EOF
set history=1000

EOF

#autocmd InsertLeave * se cul
#autocmd InsertLeave * se nocul
#set nu
#set bs=2
#syntax on
#set laststatus=2
#set tabstop=4
#set go=
#set ruler
#set showcmd
#set cmdheight=1
#hi CursorLine   cterm=NONE ctermbg=blue ctermfg=white guibg=blue guifg=white
#set hls
#set cursorline
#set ignorecase
#set hlsearch
#set incsearch
#set helplang=cn
}


# done
done_ok(){
touch /var/log/init-ok
cat << EOF
+-------------------------------------------------+
|               optimizer is done                 |
|   it's recommond to restart this server !       |
|             Please Reboot system                |
+-------------------------------------------------+
EOF
}

# main
main(){
    yum_update
    zone_time
    limits_config
    sysctl_config
    LANG_config
    selinux_config
    log_config
    firewalld_config
    sshd_config
    ipv6_config
    history_config
    service_config
    vim_config
    done_ok
}
main

```


```
# vim:ft=sh

#本文定义通用函数, 与业务逻辑无关的通用函数(任意任务均可使用)
#所有函数, 返回值为1表示异常

get_lan_ip  () {
   #
   ip addr | \
       awk -F'[ /]+' '/inet/{
               split($3, N, ".")
               if ($3 ~ /^192.168/) {
                   print $3
               }
               if (($3 ~ /^172/) && (N[2] >= 16) && (N[2] <= 31)) {
                   print $3
               }
               if ($3 ~ /^10\./) {
                   print $3
               }
          }'

   return $?
}

CURR_PID=$$
LAN_IP=$(get_lan_ip | head -1)
if [ -z "$HASTTY" ]; then
    HASTTY=$(ps -ef | awk -v P=$CURR_PID '$2==P && $6 == "?" {print 0}')
fi

emphasize () {
   local timestamp=$(date +%Y%m%d-%H%M%S)
   local level=INFO
   local func_seq=$(echo ${FUNCNAME[@]} | sed 's/ /-/g')
   local logfile=${LOG_FILE:=/tmp/bkc.log}

   echo "[$(blue_echo $LAN_IP)]$timestamp $BASH_LINENO   $(bblue_echo $@)"
   echo "[$(blue_echo $LAN_IP)]$timestamp $level|$BASH_LINENO|${func_seq} $@" >> $logfile

   return 0
}

log () {
   # 打印消息, 并记录到日志, 日志文件由 LOG_FILE 变量定义
   local retval=$?
   local timestamp=$(date +%Y%m%d-%H%M%S)
   local level=INFO
   local func_seq=$(echo ${FUNCNAME[@]} | sed 's/ /-/g')
   local logfile=${LOG_FILE:=/tmp/bkc.log}

   echo "[$(blue_echo $LAN_IP)]$timestamp $BASH_LINENO   $@"
   echo "[$(blue_echo $LAN_IP)]$timestamp $level|$BASH_LINENO|${func_seq} $@" >>$logfile
   return $retval
}

err () {
   # 打印错误消息, 并返回非0
   # 屏幕输出使用红色字体
   local timestamp=$(date +%Y%m%d-%H%M%S)
   local level=ERROR
   local func_seq=$(echo ${FUNCNAME[@]} | sed 's/ /-/g')
   local logfile=${LOG_FILE:=/tmp/bkc.log}

   
   echo "[$(red_echo $LAN_IP)]$timestamp $BASH_LINENO   $(red_echo $@)"
   echo "[$(red_echo $LAN_IP)]$timestamp $level|$BASH_LINENO|${func_seq} $@" >> $logfile

   return 1
}

warn () {
   # 打印警告消息, 并返回0
   # 屏幕输出使用黄色字体
   local timestamp=$(date +%Y%m%d-%H%M%S)
   local level=WARN
   local func_seq=$(echo ${FUNCNAME[@]} | sed 's/ /-/g;')
   local logfile=${LOG_FILE:=/tmp/bkc.log}

   echo "[$(yellow_echo $LAN_IP)]$timestamp $BASH_LINENO   $(yellow_echo $@)"
   echo "[$(yellow_echo $LAN_IP)]$timestamp $level|$BASH_LINENO|${func_seq} $@" >> $logfile
   
   return 0
}

fail () {
   # 打印错误消息,并以非0值退出程序
   # 参数1: 消息内容
   # 参数2: 可选, 返回值, 若不提供默认返回1
   local timestamp=$(date +%Y%m%d-%H%M%S)
   local level=FATAL
   local retval=${2:-1}
   local func_seq=$(echo ${FUNCNAME[@]} | sed 's/ /-/g')
   local logfile=${LOG_FILE:=/tmp/bkc.log}

   echo "[$(red_echo $LAN_IP)]$timestamp $BASH_LINENO   $(red_echo $@)"
   echo "[$(red_echo $LAN_IP)]$timestamp $level|$BASH_LINENO|${func_seq} $@" >> $logfile

   exit $retval
}

ok () {
   # 打印标准输出(绿色消息), 说明某个过程执行成功, 状态码为0
   local timestamp=$(date +%Y%m%d-%H%M%S)
   local level=INFO
   local func_seq=$(echo ${FUNCNAME[@]} | sed 's/ /-/g')
   local logfile=${LOG_FILE:=/tmp/bkc.log}

   echo "[$(green_echo $LAN_IP)]$timestamp $BASH_LINENO   $(green_echo $@)"
   echo "[$(green_echo $LAN_IP)]$timestamp $level|$BASH_LINENO|${func_seq} $@" >> $logfile
   
   return 0
}

assert () {
    local check_ret=$?
    local msg="$1"
    local err="$2"

    if [ $check_ret -eq 0 ]; then
        ok "$msg"
    else
        fail "$err"
    fi
}

wassert () {
    local check_ret=$?
    local msg="$1"
    local err="$2"

    if [ $check_ret -eq 0 ]; then
        ok "$msg"
    else
        warn "$err"
    fi
}

nassert () {
    local check_ret=$?
    local msg="$1"
    local err="${2:-$1}"

    if [ $check_ret -eq 0 ]; then
        log "$msg.  $(green_echo OK)"
    else
        log "$err.  $(red_echo FAILED)"
        exit 1
    fi
}

step () {
   # 打印步骤信息, 并记录当前步骤节点
   # 输出使用带背景的红色
   echo ""
   l=$(( (70 - $(wc -c <<<"$@"))/2 ))
   str="$(printf "%${l}s$@%${l}s" ' ' ' ')"
   bblue_echo "$str"
}

syscmd_byos () {
    local action=$1 
    local name=$2

    if which systemctl >/dev/null 2>&1; then
        systemctl $action $name
    else
        service $name $action
    fi
}

red_echo ()      { [ "$HASTTY" == 0 ] && echo "$@" || echo -e "\033[031;1m$@\033[0m"; }
green_echo ()    { [ "$HASTTY" == 0 ] && echo "$@" || echo -e "\033[032;1m$@\033[0m"; }
yellow_echo ()   { [ "$HASTTY" == 0 ] && echo "$@" || echo -e "\033[033;1m$@\033[0m"; }
blue_echo ()     { [ "$HASTTY" == 0 ] && echo "$@" || echo -e "\033[034;1m$@\033[0m"; }
purple_echo ()   { [ "$HASTTY" == 0 ] && echo "$@" || echo -e "\033[035;1m$@\033[0m"; }
bred_echo ()     { [ "$HASTTY" == 0 ] && echo "$@" || echo -e "\033[041;1m$@\033[0m"; }
bgreen_echo ()   { [ "$HASTTY" == 0 ] && echo "$@" || echo -e "\033[042;1m$@\033[0m"; }
byellow_echo ()  { [ "$HASTTY" == 0 ] && echo "$@" || echo -e "\033[043;1m$@\033[0m"; }
bblue_echo ()    { [ "$HASTTY" == 0 ] && echo "$@" || echo -e "\033[044;1m$@\033[0m"; }
bpurple_echo ()  { [ "$HASTTY" == 0 ] && echo "$@" || echo -e "\033[045;1m$@\033[0m"; }
bgreen_echo ()   { [ "$HASTTY" == 0 ] && echo "$@" || echo -e "\033[042;34;1m$@\033[0m"; }

rcmd () {
    # usage:
    #   rcmd USER@HOST:PORT "command"
    # 输出命令结果
    # 记录执行情况到日志中
    local rhost=$1; shift

    #if echo "$rhost" | grep -q "@$LAN_IP$"; then
    #    # 这不是一个安全的做法.
    #    cd $CTRL_DIR
    #    load_env
    #    eval "$@"
    #else
       ssh $rhost "bash -lc 'source $CTRL_DIR/.rcmdrc; export HASTTY=1; $@'"
    #fi
}

_rsync () {
    # 安装部署,固定使用 root 执行文件传输
    # 若是本机之间文件传输, 则去掉登陆验证步骤
    opts=$(sed "s/root@$LAN_IP://" <<<"$@")
    log ">> rsync $opts"
    rsync $opts || fail "copy files to remote failed."
}

total_mem () {
    free | awk '/Mem/{print int($2/1000/1000)}'
}

process_is_running () {
    # 模糊匹配, 检测时输入更精确匹配进程的模式表达式
    local pattern="$1"
    
    ps -ef | grep "$pattern" \
           | grep -vE '(grep |bash -l)' \
           | awk '{print $2;a++}END{if (a>0) {exit 0} else {exit 1}}'
}

process_paired () {
    local pids=($@)

    [ "${#pids[@]}" -ne 2 ] && return 1

    local pattern1="$(echo ${pids[1]}  *${pids[0]})
    local pattern2="$(echo ${pids[0]}  *${pids[1]})

    if process_is_running "$pattern1" >/dev/null 2>&1 || \
        process_is_running "$pattern2" >/dev/null 2>&1; then
        if ps xao pid,ppid | grep -w ${pids[0]} >/dev/null 2>&1 || \
            ps xao pid,ppid | grep -w ${pids[1]} >/dev/null 2>&1; then
            return 0
        fi
    fi

    return 1
}

random_string () {
    local length=${1:-51}

    python -c "import random,string; print ''.join(random.sample(string.ascii_letters + '$%&()+,-.:<=?@[]_{}' + string.digits, $length))"
}

check_ns_alive () {
    local ns=$1

    [ ! -z "$(dig +short $ns)" ]
}

wait_ns_alive () {
    local timeout=23
    local ns=$1

    for i in $(seq 1 $timeout); do
        if check_ns_alive "$ns"; then
            return 0
        fi
        sleep 1
    done

    return 1
}

check_port_alive () {
    local port=$1

    lsof -i:$port -sTCP:LISTEN 1>/dev/null 2>&1

    return $?
}

wait_port_alive () {
    local port=$1
    local timeout=${2:-10}

    for i in $(seq $timeout); do
        check_port_alive $port && return 0
        sleep 1
    done
    return 1
}

wait_for_done_bylog () {
	local logfile="$1"
	local keywords="$2"
	local timeout=${3:-60}

    start_line=$(wc -l <$logfile)

	for i in $(seq $timeout); do
		tail -n +$((start_line++)) $logfile | grep -q "$keywords"
		if [ $? -ne 0 ]; then
			sleep 1
			start_line=$(wc -l $logfile | cut -d ' ' -f1)
		else
			return 0
		fi
	done

	return 1
}

check_agreement () {
    cd $CTRL_DIR

    if [ ! -f .agreed ]; then
        read -p "$(< agreement.txt)" reply
        if [ "$reply" != "yes" ]; then
            red_echo "Abort"
            return 1
        else
            touch .agreed
        fi
    fi

    return 0
}

replace_control_script () {
    local module=$1
    local project=$2
    local location=$3
}

```