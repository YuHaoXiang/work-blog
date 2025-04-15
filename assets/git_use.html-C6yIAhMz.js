import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as e,b as s}from"./app-CYLvwJnH.js";const t={},i=s(`<h2 id="git-全局设置" tabindex="-1"><a class="header-anchor" href="#git-全局设置"><span>Git 全局设置</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">&quot;余浩翔&quot;</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email <span class="token string">&quot;haoxiang.yu@sectrend.com.cn&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="git-创建仓库" tabindex="-1"><a class="header-anchor" href="#git-创建仓库"><span>Git 创建仓库</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">git</span> clone git@192.168.100.10:haoxiang.yu/sca-ci-java.git
<span class="token builtin class-name">cd</span> sca-ci-java
<span class="token function">git</span> switch <span class="token parameter variable">-c</span> main
<span class="token function">touch</span> README.md
<span class="token function">git</span> <span class="token function">add</span> README.md
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;add README&quot;</span>
<span class="token function">git</span> push <span class="token parameter variable">-u</span> origin main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="git-推送文件夹" tabindex="-1"><a class="header-anchor" href="#git-推送文件夹"><span>Git 推送文件夹</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> existing_folder
<span class="token function">git</span> init --initial-branch<span class="token operator">=</span>main
<span class="token function">git</span> remote <span class="token function">add</span> origin git@192.168.100.10:haoxiang.yu/sca-ci-java.git
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;Initial commit&quot;</span>
<span class="token function">git</span> push <span class="token parameter variable">-u</span> origin main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="git-推送已有仓库" tabindex="-1"><a class="header-anchor" href="#git-推送已有仓库"><span>Git 推送已有仓库</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> existing_repo
<span class="token function">git</span> remote <span class="token function">rename</span> origin old-origin
<span class="token function">git</span> remote <span class="token function">add</span> origin git@192.168.100.10:haoxiang.yu/sca-ci-java.git
<span class="token function">git</span> push <span class="token parameter variable">-u</span> origin <span class="token parameter variable">--all</span>
<span class="token function">git</span> push <span class="token parameter variable">-u</span> origin <span class="token parameter variable">--tags</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),l=[i];function o(c,r){return n(),e("div",null,l)}const u=a(t,[["render",o],["__file","git_use.html.vue"]]),g=JSON.parse('{"path":"/software/git/git_use.html","title":"Git配置推送","lang":"zh-CN","frontmatter":{"title":"Git配置推送","icon":"laptop-code","order":1,"category":"Git","tag":["Git","shell"],"description":"Git 全局设置 Git 创建仓库 Git 推送文件夹 Git 推送已有仓库","head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/software/git/git_use.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"Git配置推送"}],["meta",{"property":"og:description","content":"Git 全局设置 Git 创建仓库 Git 推送文件夹 Git 推送已有仓库"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-28T08:47:19.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:tag","content":"Git"}],["meta",{"property":"article:tag","content":"shell"}],["meta",{"property":"article:modified_time","content":"2024-04-28T08:47:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Git配置推送\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-28T08:47:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"Git 全局设置","slug":"git-全局设置","link":"#git-全局设置","children":[]},{"level":2,"title":"Git 创建仓库","slug":"git-创建仓库","link":"#git-创建仓库","children":[]},{"level":2,"title":"Git 推送文件夹","slug":"git-推送文件夹","link":"#git-推送文件夹","children":[]},{"level":2,"title":"Git 推送已有仓库","slug":"git-推送已有仓库","link":"#git-推送已有仓库","children":[]}],"git":{"createdTime":1714294039000,"updatedTime":1714294039000,"contributors":[{"name":"haoxiang.yu@sectrend.com.cn","email":"ZLJw5dEMQLaVgsP","commits":1}]},"readingTime":{"minutes":0.46,"words":138},"filePathRelative":"software/git/git_use.md","localizedDate":"2024年4月28日","autoDesc":true}');export{u as comp,g as data};
