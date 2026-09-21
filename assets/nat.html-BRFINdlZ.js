import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as n,b as s}from"./app-OsMfPJQ0.js";const t={},l=s(`<h1 id="nat-网络地址转换" tabindex="-1"><a class="header-anchor" href="#nat-网络地址转换"><span>NAT (网络地址转换)</span></a></h1><h2 id="类型" tabindex="-1"><a class="header-anchor" href="#类型"><span>类型</span></a></h2><table><thead><tr><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>静态 NAT</td><td>1:1 映射，固定公网 IP</td></tr><tr><td>动态 NAT</td><td>池中分配，1:1 映射</td></tr><tr><td>PAT</td><td>端口地址转换，多:1 (最常用)</td></tr></tbody></table><h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理"><span>原理</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>内网主机 (192.168.1.100:8080) 
    ↓ 发起请求
NAT 设备 (公网 IP:1.1.1.1:10000)
    ↓ 转发
目标服务器
    ↓ 响应
NAT 设备 → 内网主机
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="iptables-nat" tabindex="-1"><a class="header-anchor" href="#iptables-nat"><span>iptables NAT</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 开启 IP 转发</span>
<span class="token builtin class-name">echo</span> <span class="token number">1</span> <span class="token operator">&gt;</span> /proc/sys/net/ipv4/ip_forward

<span class="token comment"># SNAT (源地址转换)</span>
iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> POSTROUTING <span class="token parameter variable">-s</span> <span class="token number">192.168</span>.1.0/24 <span class="token parameter variable">-j</span> MASQUERADE

<span class="token comment"># DNAT (目的地址转换)</span>
iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-d</span> <span class="token number">1.1</span>.1.1 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">80</span> <span class="token parameter variable">-j</span> DNAT --to-destination <span class="token number">192.168</span>.1.100:80

<span class="token comment"># 查看 NAT 表</span>
iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-L</span> <span class="token parameter variable">-n</span> <span class="token parameter variable">-v</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="端口映射" tabindex="-1"><a class="header-anchor" href="#端口映射"><span>端口映射</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 映射内网 Web 服务</span>
iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">80</span> <span class="token parameter variable">-j</span> DNAT --to-destination <span class="token number">192.168</span>.1.10:80

<span class="token comment"># 映射 SSH</span>
iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">2222</span> <span class="token parameter variable">-j</span> DNAT --to-destination <span class="token number">192.168</span>.1.10:22
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h1 id="acl-访问控制列表" tabindex="-1"><a class="header-anchor" href="#acl-访问控制列表"><span>ACL (访问控制列表)</span></a></h1><h2 id="常见场景" tabindex="-1"><a class="header-anchor" href="#常见场景"><span>常见场景</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 禁止特定 IP 访问 80 端口</span>
iptables <span class="token parameter variable">-A</span> INPUT <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-s</span> <span class="token number">192.168</span>.1.100 <span class="token parameter variable">--dport</span> <span class="token number">80</span> <span class="token parameter variable">-j</span> DROP

<span class="token comment"># 仅允许特定网段</span>
iptables <span class="token parameter variable">-A</span> INPUT <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-s</span> <span class="token number">192.168</span>.1.0/24 <span class="token parameter variable">--dport</span> <span class="token number">22</span> <span class="token parameter variable">-j</span> ACCEPT

<span class="token comment"># 禁止 ping</span>
iptables <span class="token parameter variable">-A</span> INPUT <span class="token parameter variable">-p</span> icmp --icmp-type echo-request <span class="token parameter variable">-j</span> DROP

<span class="token comment"># 限制连接数 (防 CC)</span>
iptables <span class="token parameter variable">-A</span> INPUT <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">80</span> <span class="token parameter variable">-m</span> connlimit --connlimit-above <span class="token number">20</span> <span class="token parameter variable">-j</span> DROP

<span class="token comment"># 端口白名单</span>
iptables <span class="token parameter variable">-A</span> INPUT <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">8080</span> <span class="token parameter variable">-s</span> <span class="token number">10.0</span>.0.0/8 <span class="token parameter variable">-j</span> ACCEPT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常用参数" tabindex="-1"><a class="header-anchor" href="#常用参数"><span>常用参数</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>-A   追加规则
-I   插入规则
-D   删除规则
-L   列出规则
-n   数字显示
-v   详细信息
-t   指定表 (filter/nat/mangle)
-j   跳转目标 (ACCEPT/DROP/REJECT/LOG)
-p   协议 (tcp/udp/icmp)
-s   源地址
-d   目的地址
--dport  目的端口
--sport  源端口
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),i=[l];function r(p,c){return e(),n("div",null,i)}const m=a(t,[["render",r],["__file","nat.html.vue"]]),v=JSON.parse('{"path":"/network/nat.html","title":"NAT 与 ACL","lang":"zh-CN","frontmatter":{"title":"NAT 与 ACL","description":"NAT (网络地址转换) 类型 原理 iptables NAT 端口映射 ACL (访问控制列表) 常见场景 常用参数","head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/network/nat.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"NAT 与 ACL"}],["meta",{"property":"og:description","content":"NAT (网络地址转换) 类型 原理 iptables NAT 端口映射 ACL (访问控制列表) 常见场景 常用参数"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-04-24T03:42:55.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:modified_time","content":"2026-04-24T03:42:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"NAT 与 ACL\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-04-24T03:42:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"类型","slug":"类型","link":"#类型","children":[]},{"level":2,"title":"原理","slug":"原理","link":"#原理","children":[]},{"level":2,"title":"iptables NAT","slug":"iptables-nat","link":"#iptables-nat","children":[]},{"level":2,"title":"端口映射","slug":"端口映射","link":"#端口映射","children":[]},{"level":2,"title":"常见场景","slug":"常见场景","link":"#常见场景","children":[]},{"level":2,"title":"常用参数","slug":"常用参数","link":"#常用参数","children":[]}],"git":{"createdTime":1777002175000,"updatedTime":1777002175000,"contributors":[{"name":"余浩翔","email":"1x2_ou6tn9m4r4@dingtalk.com","commits":1}]},"readingTime":{"minutes":1.21,"words":362},"filePathRelative":"network/nat.md","localizedDate":"2026年4月24日","autoDesc":true}');export{m as comp,v as data};
