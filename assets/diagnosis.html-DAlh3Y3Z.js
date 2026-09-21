import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,b as e}from"./app-OsMfPJQ0.js";const t={},i=e(`<h1 id="网络诊断工具" tabindex="-1"><a class="header-anchor" href="#网络诊断工具"><span>网络诊断工具</span></a></h1><h2 id="ping-连通性测试" tabindex="-1"><a class="header-anchor" href="#ping-连通性测试"><span>ping - 连通性测试</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 基本用法</span>
<span class="token function">ping</span> <span class="token number">8.8</span>.8.8
<span class="token function">ping</span> example.com

<span class="token comment"># 指定次数</span>
<span class="token function">ping</span> <span class="token parameter variable">-c</span> <span class="token number">4</span> <span class="token number">8.8</span>.8.8

<span class="token comment"># 指定间隔</span>
<span class="token function">ping</span> <span class="token parameter variable">-i</span> <span class="token number">2</span> <span class="token number">8.8</span>.8.8

<span class="token comment"># 记录路由</span>
<span class="token function">ping</span> <span class="token parameter variable">-R</span> <span class="token number">8.8</span>.8.8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>TTL 含义</strong>：</p><ul><li>TTL=64：Linux/Mac</li><li>TTL=128：Windows</li><li>TTL=255：网络设备</li></ul><h2 id="traceroute-tracert-路由追踪" tabindex="-1"><a class="header-anchor" href="#traceroute-tracert-路由追踪"><span>traceroute/tracert - 路由追踪</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># Linux</span>
<span class="token function">traceroute</span> <span class="token number">8.8</span>.8.8
<span class="token function">traceroute</span> <span class="token parameter variable">-I</span> <span class="token number">8.8</span>.8.8  <span class="token comment"># 使用 ICMP</span>

<span class="token comment"># Windows</span>
tracert <span class="token number">8.8</span>.8.8

<span class="token comment"># 跳过 DNS 解析</span>
<span class="token function">traceroute</span> <span class="token parameter variable">-n</span> <span class="token number">8.8</span>.8.8

<span class="token comment"># 指定最大跳数</span>
<span class="token function">traceroute</span> <span class="token parameter variable">-m</span> <span class="token number">15</span> <span class="token number">8.8</span>.8.8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="netstat-网络状态" tabindex="-1"><a class="header-anchor" href="#netstat-网络状态"><span>netstat - 网络状态</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 查看所有连接</span>
<span class="token function">netstat</span> <span class="token parameter variable">-an</span>

<span class="token comment"># 查看监听端口</span>
<span class="token function">netstat</span> <span class="token parameter variable">-tuln</span>

<span class="token comment"># 查看进程关联</span>
<span class="token function">netstat</span> <span class="token parameter variable">-tulnp</span>

<span class="token comment"># 查看路由表</span>
<span class="token function">netstat</span> <span class="token parameter variable">-rn</span>

<span class="token comment"># 查看网卡统计</span>
<span class="token function">netstat</span> <span class="token parameter variable">-i</span>

<span class="token comment"># 查看 TCP 连接</span>
<span class="token function">netstat</span> <span class="token parameter variable">-tn</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ss-socket-统计" tabindex="-1"><a class="header-anchor" href="#ss-socket-统计"><span>ss - Socket 统计</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 查看监听端口</span>
ss <span class="token parameter variable">-tuln</span>

<span class="token comment"># 查看 TCP 连接</span>
ss <span class="token parameter variable">-tn</span>

<span class="token comment"># 查看进程关联</span>
ss <span class="token parameter variable">-tnp</span>

<span class="token comment"># 查看详细统计</span>
ss <span class="token parameter variable">-s</span>

<span class="token comment"># 过滤状态</span>
ss <span class="token parameter variable">-tn</span> state established
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="telnet-端口测试" tabindex="-1"><a class="header-anchor" href="#telnet-端口测试"><span>telnet - 端口测试</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 测试端口连通性</span>
telnet <span class="token number">192.168</span>.1.1 <span class="token number">80</span>

<span class="token comment"># SMTP 测试</span>
telnet mail.example.com <span class="token number">25</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nc-netcat-网络瑞士军刀" tabindex="-1"><a class="header-anchor" href="#nc-netcat-网络瑞士军刀"><span>nc (netcat) - 网络瑞士军刀</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 端口扫描</span>
<span class="token function">nc</span> <span class="token parameter variable">-zv</span> <span class="token number">192.168</span>.1.1 <span class="token number">1</span>-1000

<span class="token comment"># 简单聊天</span>
<span class="token function">nc</span> <span class="token parameter variable">-l</span> <span class="token number">9999</span>        <span class="token comment"># 服务端</span>
<span class="token function">nc</span> <span class="token number">192.168</span>.1.1 <span class="token number">9999</span>  <span class="token comment"># 客户端</span>

<span class="token comment"># 文件传输</span>
<span class="token function">nc</span> <span class="token parameter variable">-l</span> <span class="token number">9999</span> <span class="token operator">&lt;</span> file.txt    <span class="token comment"># 发送</span>
<span class="token function">nc</span> <span class="token number">192.168</span>.1.1 <span class="token number">9999</span> <span class="token operator">&gt;</span> file.txt  <span class="token comment"># 接收</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="curl-http-请求" tabindex="-1"><a class="header-anchor" href="#curl-http-请求"><span>curl - HTTP 请求</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># GET 请求</span>
<span class="token function">curl</span> https://example.com

<span class="token comment"># 显示头部</span>
<span class="token function">curl</span> <span class="token parameter variable">-I</span> https://example.com

<span class="token comment"># POST 请求</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token parameter variable">-d</span> <span class="token string">&quot;data&quot;</span> https://example.com

<span class="token comment"># 带认证</span>
<span class="token function">curl</span> <span class="token parameter variable">-u</span> user:pass https://example.com

<span class="token comment"># 保存响应</span>
<span class="token function">curl</span> <span class="token parameter variable">-o</span> filename https://example.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mtr-网络诊断组合" tabindex="-1"><a class="header-anchor" href="#mtr-网络诊断组合"><span>mtr - 网络诊断组合</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 实时路由追踪</span>
<span class="token function">mtr</span> <span class="token number">8.8</span>.8.8

<span class="token comment"># 生成报告</span>
<span class="token function">mtr</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-c</span> <span class="token number">10</span> <span class="token number">8.8</span>.8.8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ip-ip-命令" tabindex="-1"><a class="header-anchor" href="#ip-ip-命令"><span>ip - IP 命令</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 查看 IP 地址</span>
<span class="token function">ip</span> addr

<span class="token comment"># 查看路由表</span>
<span class="token function">ip</span> route

<span class="token comment"># 查看网卡状态</span>
<span class="token function">ip</span> <span class="token function">link</span>

<span class="token comment"># 添加 IP</span>
<span class="token function">ip</span> addr <span class="token function">add</span> <span class="token number">192.168</span>.1.100/24 dev eth0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),l=[i];function c(r,p){return s(),a("div",null,l)}const m=n(t,[["render",c],["__file","diagnosis.html.vue"]]),v=JSON.parse('{"path":"/network/diagnosis.html","title":"网络诊断工具","lang":"zh-CN","frontmatter":{"title":"网络诊断工具","description":"网络诊断工具 ping - 连通性测试 TTL 含义： TTL=64：Linux/Mac TTL=128：Windows TTL=255：网络设备 traceroute/tracert - 路由追踪 netstat - 网络状态 ss - Socket 统计 telnet - 端口测试 nc (netcat) - 网络瑞士军刀 curl - HTTP ...","head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/network/diagnosis.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"网络诊断工具"}],["meta",{"property":"og:description","content":"网络诊断工具 ping - 连通性测试 TTL 含义： TTL=64：Linux/Mac TTL=128：Windows TTL=255：网络设备 traceroute/tracert - 路由追踪 netstat - 网络状态 ss - Socket 统计 telnet - 端口测试 nc (netcat) - 网络瑞士军刀 curl - HTTP ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-04-24T03:42:55.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:modified_time","content":"2026-04-24T03:42:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"网络诊断工具\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-04-24T03:42:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"ping - 连通性测试","slug":"ping-连通性测试","link":"#ping-连通性测试","children":[]},{"level":2,"title":"traceroute/tracert - 路由追踪","slug":"traceroute-tracert-路由追踪","link":"#traceroute-tracert-路由追踪","children":[]},{"level":2,"title":"netstat - 网络状态","slug":"netstat-网络状态","link":"#netstat-网络状态","children":[]},{"level":2,"title":"ss - Socket 统计","slug":"ss-socket-统计","link":"#ss-socket-统计","children":[]},{"level":2,"title":"telnet - 端口测试","slug":"telnet-端口测试","link":"#telnet-端口测试","children":[]},{"level":2,"title":"nc (netcat) - 网络瑞士军刀","slug":"nc-netcat-网络瑞士军刀","link":"#nc-netcat-网络瑞士军刀","children":[]},{"level":2,"title":"curl - HTTP 请求","slug":"curl-http-请求","link":"#curl-http-请求","children":[]},{"level":2,"title":"mtr - 网络诊断组合","slug":"mtr-网络诊断组合","link":"#mtr-网络诊断组合","children":[]},{"level":2,"title":"ip - IP 命令","slug":"ip-ip-命令","link":"#ip-ip-命令","children":[]}],"git":{"createdTime":1777002175000,"updatedTime":1777002175000,"contributors":[{"name":"余浩翔","email":"1x2_ou6tn9m4r4@dingtalk.com","commits":1}]},"readingTime":{"minutes":1.26,"words":378},"filePathRelative":"network/diagnosis.md","localizedDate":"2026年4月24日","autoDesc":true}');export{m as comp,v as data};
