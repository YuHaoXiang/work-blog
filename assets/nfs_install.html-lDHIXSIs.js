import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as t,b as n}from"./app-DNUCjrWT.js";const s={},i=n(`<h2 id="centos7安装nfs服务" tabindex="-1"><a class="header-anchor" href="#centos7安装nfs服务"><span>centos7安装NFS服务</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> nfs-utils rpcbind <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="配置说明" tabindex="-1"><a class="header-anchor" href="#配置说明"><span>配置说明</span></a></h2><p>配置文件路径<code>/etc/exports</code></p><div class="language-config line-numbers-mode" data-ext="config" data-title="config"><pre class="language-config"><code>/path/to/somedir 172.16.0.0/16(ro,async) 192.16.0.0/24(rw,sync) *(ro)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">权限说明</p><p>ro:只读</p><p>rw:读写</p><p>sync:同步，数据同步写到内存与硬盘中</p><p>async:异步，数据先暂存内存</p><p>root_squash: 将root用户映射为来宾账号</p><p>no_root_squash: 有root的权限，不建议使用</p><p>all_squash: 全部映射为来宾账号</p><p>anonuid, anongid: 指定映射的来宾账号的UID和GID</p></div><h2 id="挂载" tabindex="-1"><a class="header-anchor" href="#挂载"><span>挂载</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">mount</span> <span class="token parameter variable">-t</span> nfs <span class="token number">192.168</span>.1.222:/var/nfs /mnt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="热更新挂载" tabindex="-1"><a class="header-anchor" href="#热更新挂载"><span>热更新挂载</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>exportfs <span class="token parameter variable">-arv</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,10),o=[i];function r(l,c){return a(),t("div",null,o)}const h=e(s,[["render",r],["__file","nfs_install.html.vue"]]),m=JSON.parse('{"path":"/work/nfs_install.html","title":"NFS安装步骤","lang":"zh-CN","frontmatter":{"title":"NFS安装步骤","description":"centos7安装NFS服务","tag":["NFS"],"head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/work/nfs_install.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"NFS安装步骤"}],["meta",{"property":"og:description","content":"centos7安装NFS服务"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-28T08:47:19.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:tag","content":"NFS"}],["meta",{"property":"article:modified_time","content":"2024-04-28T08:47:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"NFS安装步骤\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-28T08:47:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"centos7安装NFS服务","slug":"centos7安装nfs服务","link":"#centos7安装nfs服务","children":[]},{"level":2,"title":"配置说明","slug":"配置说明","link":"#配置说明","children":[]},{"level":2,"title":"挂载","slug":"挂载","link":"#挂载","children":[]},{"level":2,"title":"热更新挂载","slug":"热更新挂载","link":"#热更新挂载","children":[]}],"git":{"createdTime":1714294039000,"updatedTime":1714294039000,"contributors":[{"name":"haoxiang.yu@sectrend.com.cn","email":"ZLJw5dEMQLaVgsP","commits":1}]},"readingTime":{"minutes":0.5,"words":149},"filePathRelative":"work/nfs_install.md","localizedDate":"2024年4月28日"}');export{h as comp,m as data};