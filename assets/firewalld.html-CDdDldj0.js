import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as s,b as n}from"./app-DNUCjrWT.js";const r={},l=n(`<h1 id="端口" tabindex="-1"><a class="header-anchor" href="#端口"><span>端口</span></a></h1><h2 id="单个端口" tabindex="-1"><a class="header-anchor" href="#单个端口"><span>单个端口</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">80</span>/tcp <span class="token parameter variable">--permanent</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="多个端口" tabindex="-1"><a class="header-anchor" href="#多个端口"><span>多个端口</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>firewall-cmd <span class="token parameter variable">--permanent</span> --add-port<span class="token operator">=</span><span class="token number">6379</span>/tcp --add-port<span class="token operator">=</span><span class="token number">8080</span>/tcp --add-port<span class="token operator">=</span><span class="token number">80</span>/tcp --add-port<span class="token operator">=</span><span class="token number">433</span>/tcp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="批量端口" tabindex="-1"><a class="header-anchor" href="#批量端口"><span>批量端口</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">4400</span>-4600/tcp <span class="token parameter variable">--permanent</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="关闭端口" tabindex="-1"><a class="header-anchor" href="#关闭端口"><span>关闭端口</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --remove-port<span class="token operator">=</span><span class="token number">3306</span>/tcp <span class="token parameter variable">--permanent</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="在不断开的情况下重新加载" tabindex="-1"><a class="header-anchor" href="#在不断开的情况下重新加载"><span>在不断开的情况下重新加载</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="查看已开放的端口" tabindex="-1"><a class="header-anchor" href="#查看已开放的端口"><span>查看已开放的端口</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>firewall-cmd --list-ports
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="开启、关闭、重启防火墙" tabindex="-1"><a class="header-anchor" href="#开启、关闭、重启防火墙"><span>开启、关闭、重启防火墙</span></a></h1><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>systemctl start firewalld
systemctl stop firewalld
systemctl restart firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="重载配置" tabindex="-1"><a class="header-anchor" href="#重载配置"><span>重载配置</span></a></h1><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="放行dns" tabindex="-1"><a class="header-anchor" href="#放行dns"><span>放行DNS</span></a></h1><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">53</span>/udp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="放行samba" tabindex="-1"><a class="header-anchor" href="#放行samba"><span>放行Samba</span></a></h1><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">139</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">445</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">137</span>/udp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">138</span>/udp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="放行nfs" tabindex="-1"><a class="header-anchor" href="#放行nfs"><span>放行NFS</span></a></h1><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>firewall-cmd <span class="token parameter variable">--permanent</span> <span class="token parameter variable">--zone</span> public --add-service mountd
firewall-cmd <span class="token parameter variable">--permanent</span> <span class="token parameter variable">--zone</span> public --add-service rpc-bind
firewall-cmd <span class="token parameter variable">--permanent</span> <span class="token parameter variable">--zone</span> public --add-service nfs
firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23),t=[l];function i(d,p){return e(),s("div",null,t)}const m=a(r,[["render",i],["__file","firewalld.html.vue"]]),h=JSON.parse('{"path":"/software/linux/firewalld.html","title":"firewalld","lang":"zh-CN","frontmatter":{"title":"firewalld","catalog":"Linux","description":"端口 单个端口 多个端口 批量端口 关闭端口 在不断开的情况下重新加载 查看已开放的端口 开启、关闭、重启防火墙 重载配置 放行DNS 放行Samba 放行NFS","head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/software/linux/firewalld.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"firewalld"}],["meta",{"property":"og:description","content":"端口 单个端口 多个端口 批量端口 关闭端口 在不断开的情况下重新加载 查看已开放的端口 开启、关闭、重启防火墙 重载配置 放行DNS 放行Samba 放行NFS"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-28T08:47:19.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:modified_time","content":"2024-04-28T08:47:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"firewalld\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-28T08:47:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"单个端口","slug":"单个端口","link":"#单个端口","children":[]},{"level":2,"title":"多个端口","slug":"多个端口","link":"#多个端口","children":[]},{"level":2,"title":"批量端口","slug":"批量端口","link":"#批量端口","children":[]},{"level":2,"title":"关闭端口","slug":"关闭端口","link":"#关闭端口","children":[]},{"level":2,"title":"在不断开的情况下重新加载","slug":"在不断开的情况下重新加载","link":"#在不断开的情况下重新加载","children":[]},{"level":2,"title":"查看已开放的端口","slug":"查看已开放的端口","link":"#查看已开放的端口","children":[]}],"git":{"createdTime":1714294039000,"updatedTime":1714294039000,"contributors":[{"name":"haoxiang.yu@sectrend.com.cn","email":"ZLJw5dEMQLaVgsP","commits":1}]},"readingTime":{"minutes":0.69,"words":208},"filePathRelative":"software/linux/firewalld.md","localizedDate":"2024年4月28日","autoDesc":true}');export{m as comp,h as data};