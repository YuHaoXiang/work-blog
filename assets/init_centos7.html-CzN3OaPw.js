import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as e,b as i}from"./app-DrsE8OIX.js";const a={},l=i(`<h2 id="rsync自动交互" tabindex="-1"><a class="header-anchor" href="#rsync自动交互"><span>rsync自动交互</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># init centos7  ./centos7-init.sh 主机名</span>

<span class="token comment"># 检查是否为root用户，脚本必须在root权限下运行</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">whoami</span><span class="token variable">)</span></span>&quot;</span> <span class="token operator">!=</span> <span class="token string">&quot;root&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;please run this script as root !&quot;</span> <span class="token operator">&gt;</span><span class="token file-descriptor important">&amp;2</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>
<span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\033">\\033</span>[31m the script only Support CentOS_7 x86_64 <span class="token entity" title="\\033">\\033</span>[0m&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\033">\\033</span>[31m system initialization script, Please Seriously. press ctrl+C to cancel <span class="token entity" title="\\033">\\033</span>[0m&quot;</span>

<span class="token comment"># 检查是否为64位系统，这个脚本只支持64位脚本</span>
<span class="token assign-left variable">platform</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">uname</span> <span class="token parameter variable">-i</span><span class="token variable">\`</span></span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$platform</span> <span class="token operator">!=</span> <span class="token string">&quot;x86_64&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;this script is only for 64bit Operating System !&quot;</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token operator">==</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;The host name is empty.&quot;</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">else</span>
	hostnamectl  <span class="token parameter variable">--static</span> set-hostname  <span class="token variable">$1</span>
	hostnamectl  set-hostname  <span class="token variable">$1</span>
<span class="token keyword">fi</span>

<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
+---------------------------------------+
|   your system is CentOS 7 x86_64      |
|           start optimizing            |
+---------------------------------------+
EOF</span>
<span class="token function">sleep</span> <span class="token number">1</span>

<span class="token comment"># 安装必要支持工具及软件工具</span>
<span class="token function-name function">yum_update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
yum update <span class="token parameter variable">-y</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> nmap <span class="token function">unzip</span> <span class="token function">wget</span> <span class="token function">vim</span> <span class="token function">lsof</span> xz net-tools iptables-services ntpdate ntp-doc psmisc
<span class="token punctuation">}</span>

<span class="token comment"># 设置时间同步 set time</span>
<span class="token function-name function">zone_time</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
timedatectl set-timezone Asia/Shanghai
/usr/sbin/ntpdate <span class="token number">0</span>.cn.pool.ntp.org <span class="token operator">&gt;</span> /dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span>
/usr/sbin/hwclock <span class="token parameter variable">--systohc</span>
/usr/sbin/hwclock <span class="token parameter variable">-w</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /var/spool/cron/root <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
10 0 * * * /usr/sbin/ntpdate 0.cn.pool.ntp.org &gt; /dev/null 2&gt;&amp;1
* * * * */1 /usr/sbin/hwclock -w &gt; /dev/null 2&gt;&amp;1
EOF</span>
<span class="token function">chmod</span> <span class="token number">600</span> /var/spool/cron/root
/sbin/service crond restart
<span class="token function">sleep</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment"># 修改文件打开数 set the file limit</span>
<span class="token function-name function">limits_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/rc.d/rc.local <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/bin/bash

touch /var/lock/subsys/local
ulimit -SHn 1024000
EOF</span>

<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;/^ulimit -SHn.*/d&quot;</span> /etc/rc.d/rc.local
<span class="token builtin class-name">echo</span> <span class="token string">&quot;ulimit -SHn 1024000&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/rc.d/rc.local

<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;/^ulimit -s.*/d&quot;</span> /etc/profile
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;/^ulimit -c.*/d&quot;</span> /etc/profile
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;/^ulimit -SHn.*/d&quot;</span> /etc/profile

<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /etc/profile <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
ulimit -c unlimited
ulimit -s unlimited
ulimit -SHn 1024000
EOF</span>

<span class="token builtin class-name">source</span> /etc/profile
<span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-a</span>
<span class="token function">cat</span> /etc/profile <span class="token operator">|</span> <span class="token function">grep</span> <span class="token builtin class-name">ulimit</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;/etc/security/limits.conf.bak&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token function">cp</span> /etc/security/limits.conf /etc/security/limits.conf.bak
<span class="token keyword">fi</span>

<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/security/limits.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
* soft nofile 1024000
* hard nofile 1024000
* soft nproc  1024000
* hard nproc  1024000
hive   - nofile 1024000
hive   - nproc  1024000
EOF</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;/etc/security/limits.d/20-nproc.conf.bak&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token function">cp</span> /etc/security/limits.d/20-nproc.conf /etc/security/limits.d/20-nproc.conf.bak
<span class="token keyword">fi</span>

<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/security/limits.d/20-nproc.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
*          soft    nproc     409600
root       soft    nproc     unlimited
EOF</span>

<span class="token function">sleep</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment"># 优化内核参数 tune kernel parametres</span>
<span class="token function-name function">sysctl_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;/etc/sysctl.conf.bak&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token function">cp</span> /etc/sysctl.conf /etc/sysctl.conf.bak
<span class="token keyword">fi</span>

<span class="token comment">#add</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/sysctl.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
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
EOF</span>

<span class="token comment">#reload sysctl</span>
/sbin/sysctl <span class="token parameter variable">-p</span>
<span class="token function">sleep</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment"># 设置UTF-8   LANG=&quot;zh_CN.UTF-8&quot;</span>
<span class="token function-name function">LANG_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;LANG=<span class="token entity" title="\\&quot;">\\&quot;</span>en_US.UTF-8<span class="token entity" title="\\&quot;">\\&quot;</span>&quot;</span><span class="token operator">&gt;</span>/etc/locale.conf
<span class="token builtin class-name">source</span>  /etc/locale.conf
<span class="token punctuation">}</span>


<span class="token comment">#关闭SELINUX disable selinux</span>
<span class="token function-name function">selinux_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/SELINUX=enforcing/SELINUX=disabled/g&#39;</span> /etc/selinux/config
setenforce <span class="token number">0</span>
<span class="token function">sleep</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment">#日志处理</span>
<span class="token function-name function">log_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
setenforce <span class="token number">0</span>
systemctl start systemd-journald
systemctl status systemd-journald
<span class="token punctuation">}</span>


<span class="token comment"># 关闭防火墙</span>
<span class="token function-name function">firewalld_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
/usr/bin/systemctl stop  firewalld.service
/usr/bin/systemctl disable  firewalld.service
<span class="token punctuation">}</span>


<span class="token comment"># SSH配置优化 set sshd_config</span>
<span class="token function-name function">sshd_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;/etc/ssh/sshd_config.bak&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token function">cp</span> /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
<span class="token keyword">fi</span>

<span class="token function">cat</span> <span class="token operator">&gt;</span>/etc/ssh/sshd_config<span class="token operator">&lt;&lt;</span><span class="token string">EOF
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
EOF</span>
/sbin/service sshd restart
<span class="token punctuation">}</span>


<span class="token comment"># 关闭ipv6  disable the ipv6</span>
<span class="token function-name function">ipv6_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;NETWORKING_IPV6=no&quot;</span><span class="token operator">&gt;</span>/etc/sysconfig/network
<span class="token builtin class-name">echo</span> <span class="token number">1</span> <span class="token operator">&gt;</span> /proc/sys/net/ipv6/conf/all/disable_ipv6
<span class="token builtin class-name">echo</span> <span class="token number">1</span> <span class="token operator">&gt;</span> /proc/sys/net/ipv6/conf/default/disable_ipv6
<span class="token builtin class-name">echo</span> <span class="token string">&quot;127.0.0.1   localhost   localhost.localdomain&quot;</span><span class="token operator">&gt;</span>/etc/hosts
<span class="token comment">#sed -i &#39;s/IPV6INIT=yes/IPV6INIT=no/g&#39; /etc/sysconfig/network-scripts/ifcfg-enp0s8</span>


<span class="token keyword">for</span> <span class="token for-or-select variable">line</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">ls</span> <span class="token parameter variable">-lh</span> /etc/sysconfig/network-scripts/ifcfg-* <span class="token operator">|</span> <span class="token function">awk</span> <span class="token parameter variable">-F</span> <span class="token string">&#39;[ ]+&#39;</span> <span class="token string">&#39;{print $9}&#39;</span><span class="token variable">)</span></span>
<span class="token keyword">do</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span>  <span class="token variable">$line</span> <span class="token punctuation">]</span>
        <span class="token keyword">then</span>
        <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/IPV6INIT=yes/IPV6INIT=no/g&#39;</span> <span class="token variable">$line</span>
                <span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
<span class="token keyword">fi</span>
<span class="token keyword">done</span>
<span class="token punctuation">}</span>


<span class="token comment"># 设置历史命令记录格式 history</span>
<span class="token function-name function">history_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">HISTFILESIZE</span></span><span class="token operator">=</span><span class="token number">10000000</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">HISTSIZE</span></span><span class="token operator">=</span><span class="token number">1000000</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">PROMPT_COMMAND</span><span class="token operator">=</span><span class="token string">&quot;history -a&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">HISTTIMEFORMAT</span><span class="token operator">=</span><span class="token string">&quot;%Y-%m-%d_%H:%M:%S &quot;</span>
<span class="token comment">##export HISTTIMEFORMAT=&quot;{\\&quot;TIME\\&quot;:\\&quot;%F %T\\&quot;,\\&quot;HOSTNAME\\&quot;:\\&quot;\\$HOSTNAME\\&quot;,\\&quot;LI\\&quot;:\\&quot;\\$(who -u am i 2&gt;/dev/null| awk &#39;{print \\$NF}&#39;|sed -e &#39;s/[()]//g&#39;)\\&quot;,\\&quot;LU\\&quot;:\\&quot;\\$(who am i|awk &#39;{print \\$1}&#39;)\\&quot;,\\&quot;NU\\&quot;:\\&quot;\\\${USER}\\&quot;,\\&quot;CMD\\&quot;:\\&quot;&quot;</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span>/etc/bashrc<span class="token operator">&lt;&lt;</span><span class="token string">EOF
alias vi=&#39;vim&#39;
HISTDIR=&#39;/var/log/command.log&#39;
if [ ! -f \\<span class="token variable">$HISTDIR</span> ];then
touch \\<span class="token variable">$HISTDIR</span>
chmod 666 \\<span class="token variable">$HISTDIR</span>
fi
export HISTTIMEFORMAT=&quot;{<span class="token entity" title="\\&quot;">\\&quot;</span>TIME<span class="token entity" title="\\&quot;">\\&quot;</span>:<span class="token entity" title="\\&quot;">\\&quot;</span>%F %T<span class="token entity" title="\\&quot;">\\&quot;</span>,<span class="token entity" title="\\&quot;">\\&quot;</span>IP<span class="token entity" title="\\&quot;">\\&quot;</span>:<span class="token entity" title="\\&quot;">\\&quot;</span>\\<span class="token variable"><span class="token variable">$(</span><span class="token function">ip</span> a <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">&#39;192.168|172&#39;</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-1</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print \\$2}&#39;</span> <span class="token operator">|</span> <span class="token function">cut</span> -d/ <span class="token parameter variable">-f1</span><span class="token variable">)</span></span><span class="token entity" title="\\&quot;">\\&quot;</span>,<span class="token entity" title="\\&quot;">\\&quot;</span>LI<span class="token entity" title="\\&quot;">\\&quot;</span>:<span class="token entity" title="\\&quot;">\\&quot;</span>\\$(who -u am i 2&gt;/dev/null| awk &#39;{print \\<span class="token variable">$NF</span>}&#39;|sed -e &#39;s/[()]//g&#39;)<span class="token entity" title="\\&quot;">\\&quot;</span>,<span class="token entity" title="\\&quot;">\\&quot;</span>LU<span class="token entity" title="\\&quot;">\\&quot;</span>:<span class="token entity" title="\\&quot;">\\&quot;</span>\\<span class="token variable"><span class="token variable">$(</span><span class="token function">who</span> am i<span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print \\$1}&#39;</span><span class="token variable">)</span></span><span class="token entity" title="\\&quot;">\\&quot;</span>,<span class="token entity" title="\\&quot;">\\&quot;</span>NU<span class="token entity" title="\\&quot;">\\&quot;</span>:<span class="token entity" title="\\&quot;">\\&quot;</span>\\<span class="token variable">\${<span class="token environment constant">USER</span>}</span><span class="token entity" title="\\&quot;">\\&quot;</span>,<span class="token entity" title="\\&quot;">\\&quot;</span>CMD<span class="token entity" title="\\&quot;">\\&quot;</span>:<span class="token entity" title="\\&quot;">\\&quot;</span>&quot;
export PROMPT_COMMAND=&#39;history 1|tail -1|sed &quot;s/^[ ]\\+[0-9]\\+  //&quot;|sed &quot;s/$/<span class="token entity" title="\\&quot;">\\&quot;</span>}/&quot;&gt;&gt; /var/log/command.log&#39;
EOF</span>
<span class="token builtin class-name">source</span> /etc/bashrc
<span class="token punctuation">}</span>

<span class="token comment"># 服务优化设置</span>
<span class="token function-name function">service_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
/usr/bin/systemctl <span class="token builtin class-name">enable</span> NetworkManager-wait-online.service
/usr/bin/systemctl start NetworkManager-wait-online.service
/usr/bin/systemctl stop postfix.service
/usr/bin/systemctl disable postfix.service
<span class="token function">chmod</span> +x /etc/rc.local
<span class="token function">chmod</span> +x /etc/rc.d/rc.local
<span class="token comment">#ls -l /etc/rc.d/rc.local</span>
<span class="token punctuation">}</span>

<span class="token comment"># VIM设置</span>
<span class="token function-name function">vim_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /root/.vimrc <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
set history=1000

EOF</span>

<span class="token comment">#autocmd InsertLeave * se cul</span>
<span class="token comment">#autocmd InsertLeave * se nocul</span>
<span class="token comment">#set nu</span>
<span class="token comment">#set bs=2</span>
<span class="token comment">#syntax on</span>
<span class="token comment">#set laststatus=2</span>
<span class="token comment">#set tabstop=4</span>
<span class="token comment">#set go=</span>
<span class="token comment">#set ruler</span>
<span class="token comment">#set showcmd</span>
<span class="token comment">#set cmdheight=1</span>
<span class="token comment">#hi CursorLine   cterm=NONE ctermbg=blue ctermfg=white guibg=blue guifg=white</span>
<span class="token comment">#set hls</span>
<span class="token comment">#set cursorline</span>
<span class="token comment">#set ignorecase</span>
<span class="token comment">#set hlsearch</span>
<span class="token comment">#set incsearch</span>
<span class="token comment">#set helplang=cn</span>
<span class="token punctuation">}</span>


<span class="token comment"># done</span>
<span class="token function-name function">done_ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token function">touch</span> /var/log/init-ok
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
+-------------------------------------------------+
|               optimizer is done                 |
|   it&#39;s recommond to restart this server !       |
|             Please Reboot system                |
+-------------------------------------------------+
EOF</span>
<span class="token punctuation">}</span>

<span class="token comment"># main</span>
<span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
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
<span class="token punctuation">}</span>
main

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># vim:ft=sh

#本文定义通用函数, 与业务逻辑无关的通用函数(任意任务均可使用)
#所有函数, 返回值为1表示异常

get_lan_ip  () {
   #
   ip addr | \\
       awk -F&#39;[ /]+&#39; &#39;/inet/{
               split($3, N, &quot;.&quot;)
               if ($3 ~ /^192.168/) {
                   print $3
               }
               if (($3 ~ /^172/) &amp;&amp; (N[2] &gt;= 16) &amp;&amp; (N[2] &lt;= 31)) {
                   print $3
               }
               if ($3 ~ /^10\\./) {
                   print $3
               }
          }&#39;

   return $?
}

CURR_PID=$$
LAN_IP=$(get_lan_ip | head -1)
if [ -z &quot;$HASTTY&quot; ]; then
    HASTTY=$(ps -ef | awk -v P=$CURR_PID &#39;$2==P &amp;&amp; $6 == &quot;?&quot; {print 0}&#39;)
fi

emphasize () {
   local timestamp=$(date +%Y%m%d-%H%M%S)
   local level=INFO
   local func_seq=$(echo \${FUNCNAME[@]} | sed &#39;s/ /-/g&#39;)
   local logfile=\${LOG_FILE:=/tmp/bkc.log}

   echo &quot;[$(blue_echo $LAN_IP)]$timestamp $BASH_LINENO   $(bblue_echo $@)&quot;
   echo &quot;[$(blue_echo $LAN_IP)]$timestamp $level|$BASH_LINENO|\${func_seq} $@&quot; &gt;&gt; $logfile

   return 0
}

log () {
   # 打印消息, 并记录到日志, 日志文件由 LOG_FILE 变量定义
   local retval=$?
   local timestamp=$(date +%Y%m%d-%H%M%S)
   local level=INFO
   local func_seq=$(echo \${FUNCNAME[@]} | sed &#39;s/ /-/g&#39;)
   local logfile=\${LOG_FILE:=/tmp/bkc.log}

   echo &quot;[$(blue_echo $LAN_IP)]$timestamp $BASH_LINENO   $@&quot;
   echo &quot;[$(blue_echo $LAN_IP)]$timestamp $level|$BASH_LINENO|\${func_seq} $@&quot; &gt;&gt;$logfile
   return $retval
}

err () {
   # 打印错误消息, 并返回非0
   # 屏幕输出使用红色字体
   local timestamp=$(date +%Y%m%d-%H%M%S)
   local level=ERROR
   local func_seq=$(echo \${FUNCNAME[@]} | sed &#39;s/ /-/g&#39;)
   local logfile=\${LOG_FILE:=/tmp/bkc.log}

   
   echo &quot;[$(red_echo $LAN_IP)]$timestamp $BASH_LINENO   $(red_echo $@)&quot;
   echo &quot;[$(red_echo $LAN_IP)]$timestamp $level|$BASH_LINENO|\${func_seq} $@&quot; &gt;&gt; $logfile

   return 1
}

warn () {
   # 打印警告消息, 并返回0
   # 屏幕输出使用黄色字体
   local timestamp=$(date +%Y%m%d-%H%M%S)
   local level=WARN
   local func_seq=$(echo \${FUNCNAME[@]} | sed &#39;s/ /-/g;&#39;)
   local logfile=\${LOG_FILE:=/tmp/bkc.log}

   echo &quot;[$(yellow_echo $LAN_IP)]$timestamp $BASH_LINENO   $(yellow_echo $@)&quot;
   echo &quot;[$(yellow_echo $LAN_IP)]$timestamp $level|$BASH_LINENO|\${func_seq} $@&quot; &gt;&gt; $logfile
   
   return 0
}

fail () {
   # 打印错误消息,并以非0值退出程序
   # 参数1: 消息内容
   # 参数2: 可选, 返回值, 若不提供默认返回1
   local timestamp=$(date +%Y%m%d-%H%M%S)
   local level=FATAL
   local retval=\${2:-1}
   local func_seq=$(echo \${FUNCNAME[@]} | sed &#39;s/ /-/g&#39;)
   local logfile=\${LOG_FILE:=/tmp/bkc.log}

   echo &quot;[$(red_echo $LAN_IP)]$timestamp $BASH_LINENO   $(red_echo $@)&quot;
   echo &quot;[$(red_echo $LAN_IP)]$timestamp $level|$BASH_LINENO|\${func_seq} $@&quot; &gt;&gt; $logfile

   exit $retval
}

ok () {
   # 打印标准输出(绿色消息), 说明某个过程执行成功, 状态码为0
   local timestamp=$(date +%Y%m%d-%H%M%S)
   local level=INFO
   local func_seq=$(echo \${FUNCNAME[@]} | sed &#39;s/ /-/g&#39;)
   local logfile=\${LOG_FILE:=/tmp/bkc.log}

   echo &quot;[$(green_echo $LAN_IP)]$timestamp $BASH_LINENO   $(green_echo $@)&quot;
   echo &quot;[$(green_echo $LAN_IP)]$timestamp $level|$BASH_LINENO|\${func_seq} $@&quot; &gt;&gt; $logfile
   
   return 0
}

assert () {
    local check_ret=$?
    local msg=&quot;$1&quot;
    local err=&quot;$2&quot;

    if [ $check_ret -eq 0 ]; then
        ok &quot;$msg&quot;
    else
        fail &quot;$err&quot;
    fi
}

wassert () {
    local check_ret=$?
    local msg=&quot;$1&quot;
    local err=&quot;$2&quot;

    if [ $check_ret -eq 0 ]; then
        ok &quot;$msg&quot;
    else
        warn &quot;$err&quot;
    fi
}

nassert () {
    local check_ret=$?
    local msg=&quot;$1&quot;
    local err=&quot;\${2:-$1}&quot;

    if [ $check_ret -eq 0 ]; then
        log &quot;$msg.  $(green_echo OK)&quot;
    else
        log &quot;$err.  $(red_echo FAILED)&quot;
        exit 1
    fi
}

step () {
   # 打印步骤信息, 并记录当前步骤节点
   # 输出使用带背景的红色
   echo &quot;&quot;
   l=$(( (70 - $(wc -c &lt;&lt;&lt;&quot;$@&quot;))/2 ))
   str=&quot;$(printf &quot;%\${l}s$@%\${l}s&quot; &#39; &#39; &#39; &#39;)&quot;
   bblue_echo &quot;$str&quot;
}

syscmd_byos () {
    local action=$1 
    local name=$2

    if which systemctl &gt;/dev/null 2&gt;&amp;1; then
        systemctl $action $name
    else
        service $name $action
    fi
}

red_echo ()      { [ &quot;$HASTTY&quot; == 0 ] &amp;&amp; echo &quot;$@&quot; || echo -e &quot;\\033[031;1m$@\\033[0m&quot;; }
green_echo ()    { [ &quot;$HASTTY&quot; == 0 ] &amp;&amp; echo &quot;$@&quot; || echo -e &quot;\\033[032;1m$@\\033[0m&quot;; }
yellow_echo ()   { [ &quot;$HASTTY&quot; == 0 ] &amp;&amp; echo &quot;$@&quot; || echo -e &quot;\\033[033;1m$@\\033[0m&quot;; }
blue_echo ()     { [ &quot;$HASTTY&quot; == 0 ] &amp;&amp; echo &quot;$@&quot; || echo -e &quot;\\033[034;1m$@\\033[0m&quot;; }
purple_echo ()   { [ &quot;$HASTTY&quot; == 0 ] &amp;&amp; echo &quot;$@&quot; || echo -e &quot;\\033[035;1m$@\\033[0m&quot;; }
bred_echo ()     { [ &quot;$HASTTY&quot; == 0 ] &amp;&amp; echo &quot;$@&quot; || echo -e &quot;\\033[041;1m$@\\033[0m&quot;; }
bgreen_echo ()   { [ &quot;$HASTTY&quot; == 0 ] &amp;&amp; echo &quot;$@&quot; || echo -e &quot;\\033[042;1m$@\\033[0m&quot;; }
byellow_echo ()  { [ &quot;$HASTTY&quot; == 0 ] &amp;&amp; echo &quot;$@&quot; || echo -e &quot;\\033[043;1m$@\\033[0m&quot;; }
bblue_echo ()    { [ &quot;$HASTTY&quot; == 0 ] &amp;&amp; echo &quot;$@&quot; || echo -e &quot;\\033[044;1m$@\\033[0m&quot;; }
bpurple_echo ()  { [ &quot;$HASTTY&quot; == 0 ] &amp;&amp; echo &quot;$@&quot; || echo -e &quot;\\033[045;1m$@\\033[0m&quot;; }
bgreen_echo ()   { [ &quot;$HASTTY&quot; == 0 ] &amp;&amp; echo &quot;$@&quot; || echo -e &quot;\\033[042;34;1m$@\\033[0m&quot;; }

rcmd () {
    # usage:
    #   rcmd USER@HOST:PORT &quot;command&quot;
    # 输出命令结果
    # 记录执行情况到日志中
    local rhost=$1; shift

    #if echo &quot;$rhost&quot; | grep -q &quot;@$LAN_IP$&quot;; then
    #    # 这不是一个安全的做法.
    #    cd $CTRL_DIR
    #    load_env
    #    eval &quot;$@&quot;
    #else
       ssh $rhost &quot;bash -lc &#39;source $CTRL_DIR/.rcmdrc; export HASTTY=1; $@&#39;&quot;
    #fi
}

_rsync () {
    # 安装部署,固定使用 root 执行文件传输
    # 若是本机之间文件传输, 则去掉登陆验证步骤
    opts=$(sed &quot;s/root@$LAN_IP://&quot; &lt;&lt;&lt;&quot;$@&quot;)
    log &quot;&gt;&gt; rsync $opts&quot;
    rsync $opts || fail &quot;copy files to remote failed.&quot;
}

total_mem () {
    free | awk &#39;/Mem/{print int($2/1000/1000)}&#39;
}

process_is_running () {
    # 模糊匹配, 检测时输入更精确匹配进程的模式表达式
    local pattern=&quot;$1&quot;
    
    ps -ef | grep &quot;$pattern&quot; \\
           | grep -vE &#39;(grep |bash -l)&#39; \\
           | awk &#39;{print $2;a++}END{if (a&gt;0) {exit 0} else {exit 1}}&#39;
}

process_paired () {
    local pids=($@)

    [ &quot;\${#pids[@]}&quot; -ne 2 ] &amp;&amp; return 1

    local pattern1=&quot;$(echo \${pids[1]}  *\${pids[0]})
    local pattern2=&quot;$(echo \${pids[0]}  *\${pids[1]})

    if process_is_running &quot;$pattern1&quot; &gt;/dev/null 2&gt;&amp;1 || \\
        process_is_running &quot;$pattern2&quot; &gt;/dev/null 2&gt;&amp;1; then
        if ps xao pid,ppid | grep -w \${pids[0]} &gt;/dev/null 2&gt;&amp;1 || \\
            ps xao pid,ppid | grep -w \${pids[1]} &gt;/dev/null 2&gt;&amp;1; then
            return 0
        fi
    fi

    return 1
}

random_string () {
    local length=\${1:-51}

    python -c &quot;import random,string; print &#39;&#39;.join(random.sample(string.ascii_letters + &#39;$%&amp;()+,-.:&lt;=?@[]_{}&#39; + string.digits, $length))&quot;
}

check_ns_alive () {
    local ns=$1

    [ ! -z &quot;$(dig +short $ns)&quot; ]
}

wait_ns_alive () {
    local timeout=23
    local ns=$1

    for i in $(seq 1 $timeout); do
        if check_ns_alive &quot;$ns&quot;; then
            return 0
        fi
        sleep 1
    done

    return 1
}

check_port_alive () {
    local port=$1

    lsof -i:$port -sTCP:LISTEN 1&gt;/dev/null 2&gt;&amp;1

    return $?
}

wait_port_alive () {
    local port=$1
    local timeout=\${2:-10}

    for i in $(seq $timeout); do
        check_port_alive $port &amp;&amp; return 0
        sleep 1
    done
    return 1
}

wait_for_done_bylog () {
	local logfile=&quot;$1&quot;
	local keywords=&quot;$2&quot;
	local timeout=\${3:-60}

    start_line=$(wc -l &lt;$logfile)

	for i in $(seq $timeout); do
		tail -n +$((start_line++)) $logfile | grep -q &quot;$keywords&quot;
		if [ $? -ne 0 ]; then
			sleep 1
			start_line=$(wc -l $logfile | cut -d &#39; &#39; -f1)
		else
			return 0
		fi
	done

	return 1
}

check_agreement () {
    cd $CTRL_DIR

    if [ ! -f .agreed ]; then
        read -p &quot;$(&lt; agreement.txt)&quot; reply
        if [ &quot;$reply&quot; != &quot;yes&quot; ]; then
            red_echo &quot;Abort&quot;
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),t=[l];function c(o,d){return s(),e("div",null,t)}const r=n(a,[["render",c],["__file","init_centos7.html.vue"]]),p=JSON.parse('{"path":"/shell_script/init_centos7.html","title":"Centos7初始化脚本","lang":"zh-CN","frontmatter":{"title":"Centos7初始化脚本","catalog":"Shell","icon":"centos","description":"rsync自动交互","head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/shell_script/init_centos7.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"Centos7初始化脚本"}],["meta",{"property":"og:description","content":"rsync自动交互"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-15T01:10:45.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:modified_time","content":"2024-11-15T01:10:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Centos7初始化脚本\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-11-15T01:10:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"rsync自动交互","slug":"rsync自动交互","link":"#rsync自动交互","children":[]}],"git":{"createdTime":1714294039000,"updatedTime":1731633045000,"contributors":[{"name":"haoxiang.yu@sectrend.com.cn","email":"ZLJw5dEMQLaVgsP","commits":1},{"name":"余浩翔","email":"1x2_ou6tn9m4r4@dingtalk.com","commits":1}]},"readingTime":{"minutes":7.1,"words":2130},"filePathRelative":"shell_script/init_centos7.md","localizedDate":"2024年4月28日","autoDesc":true}');export{r as comp,p as data};
