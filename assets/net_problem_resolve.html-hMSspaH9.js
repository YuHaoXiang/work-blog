import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as n,b as e}from"./app-OsMfPJQ0.js";const t={},l=e(`<h1 id="网络问题排查思路" tabindex="-1"><a class="header-anchor" href="#网络问题排查思路"><span>网络问题排查思路</span></a></h1><h2 id="排查流程" tabindex="-1"><a class="header-anchor" href="#排查流程"><span>排查流程</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>1. 物理层 → 2. 数据链路层 → 3. 网络层 → 4. 传输层 → 5. 应用层
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="常用工具" tabindex="-1"><a class="header-anchor" href="#常用工具"><span>常用工具</span></a></h2><table><thead><tr><th>层级</th><th>工具</th></tr></thead><tbody><tr><td>物理/链路</td><td>ip link, ethtool</td></tr><tr><td>网络层</td><td>ping, traceroute, ip addr, ip route</td></tr><tr><td>传输层</td><td>netstat, ss, ncat</td></tr><tr><td>应用层</td><td>curl, telnet, dig</td></tr><tr><td>抓包</td><td>tcpdump, tshark, wireshark</td></tr></tbody></table><hr><h1 id="抓包实战" tabindex="-1"><a class="header-anchor" href="#抓包实战"><span>抓包实战</span></a></h1><h2 id="tcpdump" tabindex="-1"><a class="header-anchor" href="#tcpdump"><span>tcpdump</span></a></h2><h3 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法"><span>基础用法</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 监听指定网卡</span>
tcpdump <span class="token parameter variable">-i</span> eth0

<span class="token comment"># 监听指定端口</span>
tcpdump <span class="token parameter variable">-i</span> eth0 port <span class="token number">80</span>

<span class="token comment"># 监听指定主机</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token function">host</span> <span class="token number">192.168</span>.1.100

<span class="token comment"># 监听特定协议</span>
tcpdump <span class="token parameter variable">-i</span> eth0 tcp
tcpdump <span class="token parameter variable">-i</span> eth0 udp
tcpdump <span class="token parameter variable">-i</span> eth0 icmp

<span class="token comment"># 组合条件</span>
tcpdump <span class="token parameter variable">-i</span> eth0 port <span class="token number">80</span> and <span class="token function">host</span> <span class="token number">192.168</span>.1.100
tcpdump <span class="token parameter variable">-i</span> eth0 port <span class="token number">80</span> or port <span class="token number">443</span>

<span class="token comment"># 保存到文件</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-w</span> capture.pcap
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-w</span> capture.pcap <span class="token parameter variable">-C</span> <span class="token number">100</span>  <span class="token comment"># 100MB 轮转</span>

<span class="token comment"># 读取文件</span>
tcpdump <span class="token parameter variable">-r</span> capture.pcap

<span class="token comment"># 显示更多详情 (-v, -vv, -vvv)</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-vv</span>

<span class="token comment"># 显示时间戳</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-tttt</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常用过滤表达式" tabindex="-1"><a class="header-anchor" href="#常用过滤表达式"><span>常用过滤表达式</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 源/目标端口</span>
tcpdump <span class="token parameter variable">-i</span> eth0 src port <span class="token number">80</span>
tcpdump <span class="token parameter variable">-i</span> eth0 dst port <span class="token number">80</span>

<span class="token comment"># 源/目标 IP</span>
tcpdump <span class="token parameter variable">-i</span> eth0 src <span class="token number">192.168</span>.1.100
tcpdump <span class="token parameter variable">-i</span> eth0 dst <span class="token number">10.0</span>.0.1

<span class="token comment"># TCP 标志位</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token string">&#39;tcp[tcpflags] &amp; tcp-syn != 0&#39;</span>    <span class="token comment"># SYN 包</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token string">&#39;tcp[tcpflags] &amp; tcp-ack != 0&#39;</span>    <span class="token comment"># ACK 包</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token string">&#39;tcp[tcpflags] &amp; tcp-fin != 0&#39;</span>    <span class="token comment"># FIN 包</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token string">&#39;tcp[tcpflags] &amp; tcp-rst != 0&#39;</span>    <span class="token comment"># RST 包</span>

<span class="token comment"># 包大小</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token function">less</span> <span class="token number">100</span>    <span class="token comment"># 小于 100 字节</span>
tcpdump <span class="token parameter variable">-i</span> eth0 greater <span class="token number">1000</span> <span class="token comment"># 大于 1000 字节</span>

<span class="token comment"># 端口范围</span>
tcpdump <span class="token parameter variable">-i</span> eth0 portrange <span class="token number">80</span>-443

<span class="token comment"># 排除条件</span>
tcpdump <span class="token parameter variable">-i</span> eth0 not port <span class="token number">22</span>
tcpdump <span class="token parameter variable">-i</span> eth0 not <span class="token function">host</span> <span class="token number">192.168</span>.1.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="高级用法" tabindex="-1"><a class="header-anchor" href="#高级用法"><span>高级用法</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 抓取 HTTP 请求体</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-A</span> port <span class="token number">80</span>

<span class="token comment"># 抓取 HTTP 请求头</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-s</span> <span class="token number">0</span> <span class="token parameter variable">-A</span> port <span class="token number">80</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;GET\\|POST&#39;</span>

<span class="token comment"># 抓取 DNS 查询</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-s</span> <span class="token number">0</span> port <span class="token number">53</span>

<span class="token comment"># 抓取特定 VLAN</span>
tcpdump <span class="token parameter variable">-i</span> eth0 vlan <span class="token number">10</span>

<span class="token comment"># 抓取 TTL 异常包</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token string">&#39;ip[8] &lt; 64&#39;</span>

<span class="token comment"># 统计各协议流量</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-c</span> <span class="token number">1000</span> <span class="token parameter variable">-q</span> <span class="token operator">|</span> <span class="token function">tail</span> <span class="token parameter variable">-20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="tshark-命令行-wireshark" tabindex="-1"><a class="header-anchor" href="#tshark-命令行-wireshark"><span>tshark (命令行 Wireshark)</span></a></h2><h3 id="基础用法-1" tabindex="-1"><a class="header-anchor" href="#基础用法-1"><span>基础用法</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 实时抓包显示</span>
tshark <span class="token parameter variable">-i</span> eth0

<span class="token comment"># 只抓指定数量</span>
tshark <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-c</span> <span class="token number">100</span>

<span class="token comment"># 保存到文件</span>
tshark <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-w</span> capture.pcap

<span class="token comment"># 读取文件</span>
tshark <span class="token parameter variable">-r</span> capture.pcap

<span class="token comment"># 只显示指定字段</span>
tshark <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-T</span> fields <span class="token parameter variable">-e</span> ip.src <span class="token parameter variable">-e</span> ip.dst <span class="token parameter variable">-e</span> tcp.port

<span class="token comment"># 过滤语法</span>
tshark <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-f</span> <span class="token string">&quot;tcp port 80&quot;</span>
tshark <span class="token parameter variable">-r</span> capture.pcap <span class="token parameter variable">-Y</span> <span class="token string">&quot;http.request.method == GET&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常用过滤" tabindex="-1"><a class="header-anchor" href="#常用过滤"><span>常用过滤</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># HTTP 请求</span>
tshark <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-Y</span> <span class="token string">&quot;http.request&quot;</span>

<span class="token comment"># HTTP 响应</span>
tshark <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-Y</span> <span class="token string">&quot;http.response&quot;</span>

<span class="token comment"># DNS 查询</span>
tshark <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-Y</span> <span class="token string">&quot;dns&quot;</span>

<span class="token comment"># TCP 重传</span>
tshark <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-Y</span> <span class="token string">&quot;tcp.retransmission&quot;</span>

<span class="token comment"># TCP 握手/挥手</span>
tshark <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-Y</span> <span class="token string">&quot;tcp.flags.syn == 1&quot;</span>
tshark <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-Y</span> <span class="token string">&quot;tcp.flags.fin == 1&quot;</span>

<span class="token comment"># HTTP 2xx/4xx/5xx</span>
tshark <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-Y</span> <span class="token string">&quot;http.response.code == 200&quot;</span>
tshark <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-Y</span> <span class="token string">&quot;http.response.code &gt;= 400&quot;</span>

<span class="token comment"># 显示 JSON 格式</span>
tshark <span class="token parameter variable">-r</span> capture.pcap <span class="token parameter variable">-T</span> json <span class="token parameter variable">-Y</span> <span class="token string">&quot;http&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="wireshark-gui" tabindex="-1"><a class="header-anchor" href="#wireshark-gui"><span>Wireshark GUI</span></a></h2><h3 id="常用显示过滤器" tabindex="-1"><a class="header-anchor" href="#常用显示过滤器"><span>常用显示过滤器</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># IP 相关</span>
ip.src <span class="token operator">==</span> <span class="token number">192.168</span>.1.100
ip.dst <span class="token operator">==</span> <span class="token number">10.0</span>.0.1
ip.addr <span class="token operator">==</span> <span class="token number">192.168</span>.1.100    <span class="token comment"># 源或目标</span>

<span class="token comment"># 端口</span>
tcp.port <span class="token operator">==</span> <span class="token number">80</span>
tcp.srcport <span class="token operator">==</span> <span class="token number">8080</span>
udp.dstport <span class="token operator">==</span> <span class="token number">53</span>

<span class="token comment"># 协议</span>
http
dns
tcp
arp

<span class="token comment"># HTTP</span>
http.request.method <span class="token operator">==</span> <span class="token string">&quot;GET&quot;</span>
http.request.uri contains <span class="token string">&quot;/api/&quot;</span>
http.response.code <span class="token operator">==</span> <span class="token number">200</span>

<span class="token comment"># TCP 标志</span>
tcp.flags.syn <span class="token operator">==</span> <span class="token number">1</span>
tcp.flags.ack <span class="token operator">==</span> <span class="token number">1</span>
tcp.flags.reset <span class="token operator">==</span> <span class="token number">1</span>

<span class="token comment"># 组合</span>
ip.src <span class="token operator">==</span> <span class="token number">192.168</span>.1.100 <span class="token operator">&amp;&amp;</span> tcp.port <span class="token operator">==</span> <span class="token number">80</span>
http.request <span class="token operator">&amp;&amp;</span> ip.addr <span class="token operator">==</span> <span class="token number">192.168</span>.1.100
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常用技巧" tabindex="-1"><a class="header-anchor" href="#常用技巧"><span>常用技巧</span></a></h3><ul><li><strong>Follow TCP Stream</strong>: 右键 → Follow → TCP Stream，看完整会话</li><li><strong>Expert Information</strong>: 分析 → Expert Information，查看异常</li><li><strong>Statistics</strong>: 统计菜单，流量分析</li><li><strong>Endpoints</strong>: 统计 → Endpoints，查看端点</li><li><strong>IO Graphs</strong>: 统计 → IO Graphs，流量可视化</li></ul><hr><h1 id="常见场景" tabindex="-1"><a class="header-anchor" href="#常见场景"><span>常见场景</span></a></h1><h2 id="场景-1-连接超时" tabindex="-1"><a class="header-anchor" href="#场景-1-连接超时"><span>场景 1：连接超时</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 1. 检查链路连通性</span>
<span class="token function">ping</span> <span class="token parameter variable">-c</span> <span class="token number">5</span> 目标IP

<span class="token comment"># 2. 路由是否正确</span>
<span class="token function">traceroute</span> 目标IP
<span class="token function">ip</span> route get 目标IP

<span class="token comment"># 3. 端口是否可达</span>
telnet 目标IP 端口
<span class="token function">nc</span> <span class="token parameter variable">-zv</span> 目标IP 端口

<span class="token comment"># 4. 抓包分析</span>
<span class="token comment"># 客户端抓包</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token function">host</span> 目标IP <span class="token parameter variable">-w</span> client.pcap
<span class="token comment"># 服务端抓包</span>
tcpdump <span class="token parameter variable">-i</span> eth0 port 端口 <span class="token parameter variable">-w</span> server.pcap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>可能原因</strong>：</p><ul><li>防火墙阻断</li><li>服务未启动</li><li>路由错误</li><li>NAT 问题</li><li>SYN backlog 满</li></ul><h2 id="场景-2-tcp-连接失败" tabindex="-1"><a class="header-anchor" href="#场景-2-tcp-连接失败"><span>场景 2：TCP 连接失败</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 查看握手过程</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token function">host</span> 目标IP <span class="token parameter variable">-S</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>常见问题</strong>：</p><table><thead><tr><th>阶段</th><th>问题</th><th>原因</th></tr></thead><tbody><tr><td>SYN</td><td>无响应</td><td>防火墙、服务未监听</td></tr><tr><td>SYN-ACK</td><td>未到达</td><td>路由/NAT 问题</td></tr><tr><td>ACK</td><td>无响应</td><td>防火墙、性能问题</td></tr></tbody></table><h2 id="场景-3-http-响应慢" tabindex="-1"><a class="header-anchor" href="#场景-3-http-响应慢"><span>场景 3：HTTP 响应慢</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 抓取 HTTP 请求响应</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-A</span> port <span class="token number">80</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">&#39;HTTP|Host|Content-Length&#39;</span>

<span class="token comment"># 使用 tshark 提取响应时间</span>
tshark <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-Y</span> <span class="token string">&quot;http.response&quot;</span> <span class="token parameter variable">-T</span> fields <span class="token parameter variable">-e</span> http.request.uri <span class="token parameter variable">-e</span> http.time
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>可能原因</strong>：</p><ul><li>DNS 解析慢</li><li>SSL 握手慢 (HTTPS)</li><li>服务端处理慢</li><li>网络延迟</li><li>带宽不足</li></ul><h2 id="场景-4-dns-解析异常" tabindex="-1"><a class="header-anchor" href="#场景-4-dns-解析异常"><span>场景 4：DNS 解析异常</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 抓取 DNS 查询</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-s</span> <span class="token number">0</span> port <span class="token number">53</span> <span class="token parameter variable">-n</span>

<span class="token comment"># 查看具体查询内容</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-s</span> <span class="token number">0</span> port <span class="token number">53</span> <span class="token parameter variable">-n</span> <span class="token parameter variable">-v</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>常见问题</strong>：</p><ul><li>DNS 服务器不可达</li><li>缓存污染</li><li>递归查询超时</li><li>CNAME 循环</li></ul><h2 id="场景-5-ssl-tls-问题" tabindex="-1"><a class="header-anchor" href="#场景-5-ssl-tls-问题"><span>场景 5：SSL/TLS 问题</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 抓取 TLS 握手</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token function">host</span> 目标IP <span class="token parameter variable">-w</span> tls.pcap

<span class="token comment"># Wireshark 中配置 SSL 解密</span>
<span class="token comment"># Edit → Preferences → Protocols → TLS → (设置密钥)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>常见问题</strong>：</p><ul><li>证书过期/无效</li><li>协议版本不匹配</li><li>加密套件不兼容</li><li>SNI 问题</li></ul><h2 id="场景-6-大量-time-wait" tabindex="-1"><a class="header-anchor" href="#场景-6-大量-time-wait"><span>场景 6：大量 TIME_WAIT</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 查看状态统计</span>
ss <span class="token parameter variable">-ant</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $1}&#39;</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-rn</span>

<span class="token comment"># 抓包确认</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token string">&#39;tcp[tcpflags] &amp; tcp-fin != 0&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优化方案</strong>：</p><ul><li>开启 <code>tcp_tw_reuse</code></li><li>调整 <code>tcp_max_tw_buckets</code></li><li>使用连接池</li><li>HTTP Keep-Alive</li></ul><h2 id="场景-7-arp-问题" tabindex="-1"><a class="header-anchor" href="#场景-7-arp-问题"><span>场景 7：ARP 问题</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 抓取 ARP 包</span>
tcpdump <span class="token parameter variable">-i</span> eth0 arp

<span class="token comment"># 查看 ARP 表</span>
arp <span class="token parameter variable">-a</span>
<span class="token function">ip</span> neigh show
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>常见问题</strong>：</p><ul><li>ARP 欺骗</li><li>ARP 缓存过期</li><li>网关配置错误</li></ul><h2 id="场景-8-网络负载高" tabindex="-1"><a class="header-anchor" href="#场景-8-网络负载高"><span>场景 8：网络负载高</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 统计流量</span>
iftop <span class="token parameter variable">-i</span> eth0

<span class="token comment"># 查看连接数</span>
ss <span class="token parameter variable">-s</span>

<span class="token comment"># 抓取包大小分布</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-c</span> <span class="token number">1000</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print length($0)}&#39;</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-n</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span>

<span class="token comment"># 统计各 IP 流量</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-n</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $3}&#39;</span> <span class="token operator">|</span> <span class="token function">cut</span> -d: <span class="token parameter variable">-f1</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-rn</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h1 id="性能分析" tabindex="-1"><a class="header-anchor" href="#性能分析"><span>性能分析</span></a></h1><h2 id="关键指标" tabindex="-1"><a class="header-anchor" href="#关键指标"><span>关键指标</span></a></h2><table><thead><tr><th>指标</th><th>含义</th><th>正常值</th></tr></thead><tbody><tr><td>RTT</td><td>往返延迟</td><td>&lt; 50ms (同城)</td></tr><tr><td>Bandwidth-Delay Product</td><td>带宽延迟积</td><td>-</td></tr><tr><td>Retransmission</td><td>重传率</td><td>&lt; 1%</td></tr><tr><td>Out-of-Order</td><td>乱序率</td><td>&lt; 1%</td></tr></tbody></table><h2 id="tcpdump-统计" tabindex="-1"><a class="header-anchor" href="#tcpdump-统计"><span>tcpdump 统计</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 统计包数量</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-c</span> <span class="token number">1000</span> <span class="token parameter variable">-q</span>

<span class="token comment"># 统计协议分布</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-q</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $5}&#39;</span> <span class="token operator">|</span> <span class="token function">cut</span> -d. <span class="token parameter variable">-f1</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-rn</span>

<span class="token comment"># 统计 IP 流量</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-n</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $3}&#39;</span> <span class="token operator">|</span> <span class="token function">cut</span> -d. -f1-4 <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-rn</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h1 id="最佳实践" tabindex="-1"><a class="header-anchor" href="#最佳实践"><span>最佳实践</span></a></h1><ol><li><strong>先抓包再分析</strong> - 不要凭猜测下结论</li><li><strong>客户端和服务端同时抓</strong> - 对比分析</li><li><strong>过滤条件要精确</strong> - 减少噪音</li><li><strong>保存原始 pcap</strong> - 方便回溯分析</li><li><strong>注意文件大小</strong> - 大文件用轮转</li><li><strong>生产环境谨慎</strong> - 避免影响性能</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 生产环境推荐用法</span>
tcpdump <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-w</span> /tmp/capture.pcap <span class="token parameter variable">-C</span> <span class="token number">50</span> <span class="token parameter variable">-W</span> <span class="token number">10</span> <span class="token parameter variable">-s</span> <span class="token number">0</span> <span class="token operator">&amp;</span>
<span class="token comment"># -C 50: 每个文件 50MB</span>
<span class="token comment"># -W 10: 最多 10 个文件轮转</span>
<span class="token comment"># -s 0: 抓完整包</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,66),i=[l];function p(r,c){return s(),n("div",null,i)}const m=a(t,[["render",p],["__file","net_problem_resolve.html.vue"]]),v=JSON.parse('{"path":"/work/net_problem_resolve.html","title":"网络问题排查思路","lang":"zh-CN","frontmatter":{"title":"网络问题排查思路","description":"Linux上问题排查思路","tag":["Network"],"head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/work/net_problem_resolve.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"网络问题排查思路"}],["meta",{"property":"og:description","content":"Linux上问题排查思路"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-04-24T03:42:55.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:tag","content":"Network"}],["meta",{"property":"article:modified_time","content":"2026-04-24T03:42:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"网络问题排查思路\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-04-24T03:42:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"排查流程","slug":"排查流程","link":"#排查流程","children":[]},{"level":2,"title":"常用工具","slug":"常用工具","link":"#常用工具","children":[]},{"level":2,"title":"tcpdump","slug":"tcpdump","link":"#tcpdump","children":[{"level":3,"title":"基础用法","slug":"基础用法","link":"#基础用法","children":[]},{"level":3,"title":"常用过滤表达式","slug":"常用过滤表达式","link":"#常用过滤表达式","children":[]},{"level":3,"title":"高级用法","slug":"高级用法","link":"#高级用法","children":[]}]},{"level":2,"title":"tshark (命令行 Wireshark)","slug":"tshark-命令行-wireshark","link":"#tshark-命令行-wireshark","children":[{"level":3,"title":"基础用法","slug":"基础用法-1","link":"#基础用法-1","children":[]},{"level":3,"title":"常用过滤","slug":"常用过滤","link":"#常用过滤","children":[]}]},{"level":2,"title":"Wireshark GUI","slug":"wireshark-gui","link":"#wireshark-gui","children":[{"level":3,"title":"常用显示过滤器","slug":"常用显示过滤器","link":"#常用显示过滤器","children":[]},{"level":3,"title":"常用技巧","slug":"常用技巧","link":"#常用技巧","children":[]}]},{"level":2,"title":"场景 1：连接超时","slug":"场景-1-连接超时","link":"#场景-1-连接超时","children":[]},{"level":2,"title":"场景 2：TCP 连接失败","slug":"场景-2-tcp-连接失败","link":"#场景-2-tcp-连接失败","children":[]},{"level":2,"title":"场景 3：HTTP 响应慢","slug":"场景-3-http-响应慢","link":"#场景-3-http-响应慢","children":[]},{"level":2,"title":"场景 4：DNS 解析异常","slug":"场景-4-dns-解析异常","link":"#场景-4-dns-解析异常","children":[]},{"level":2,"title":"场景 5：SSL/TLS 问题","slug":"场景-5-ssl-tls-问题","link":"#场景-5-ssl-tls-问题","children":[]},{"level":2,"title":"场景 6：大量 TIME_WAIT","slug":"场景-6-大量-time-wait","link":"#场景-6-大量-time-wait","children":[]},{"level":2,"title":"场景 7：ARP 问题","slug":"场景-7-arp-问题","link":"#场景-7-arp-问题","children":[]},{"level":2,"title":"场景 8：网络负载高","slug":"场景-8-网络负载高","link":"#场景-8-网络负载高","children":[]},{"level":2,"title":"关键指标","slug":"关键指标","link":"#关键指标","children":[]},{"level":2,"title":"tcpdump 统计","slug":"tcpdump-统计","link":"#tcpdump-统计","children":[]}],"git":{"createdTime":1777002175000,"updatedTime":1777002175000,"contributors":[{"name":"余浩翔","email":"1x2_ou6tn9m4r4@dingtalk.com","commits":1}]},"readingTime":{"minutes":4.99,"words":1496},"filePathRelative":"work/net_problem_resolve.md","localizedDate":"2026年4月24日"}');export{m as comp,v as data};
