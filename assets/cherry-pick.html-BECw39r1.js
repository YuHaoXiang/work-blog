import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,b as e}from"./app-DrsE8OIX.js";const t={},i=e(`<h2 id="批量chery-pick" tabindex="-1"><a class="header-anchor" href="#批量chery-pick"><span>批量chery-pick</span></a></h2><p><code>bugMergeScript.sh</code></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token comment">#Bug合并脚本</span>
<span class="token comment">#参数1：Bug修复提交commitId，例：52d89297260b97ca7968e6feb5a556f95099f98c</span>
<span class="token comment">#使用命令，例：bash bugMergeScript.sh 52d89297260b97ca7968e6feb5a556f95099f98c</span>

<span class="token comment"># 通过正则匹配检索需要cherry-pick的分支</span>
<span class="token function">git</span> branch <span class="token parameter variable">-a</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">&#39;^.*-release$&#39;</span> <span class="token operator">&gt;</span> bugMergeBranch.txt

<span class="token comment"># 将远程分支名修改为本地可使用的分支名</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/remotes\\/origin\\///&#39;</span> bugMergeBranch.txt

<span class="token comment"># 遍历cherry-pick</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> bugMergeBranch.txt <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token keyword">while</span> <span class="token builtin class-name">read</span> line
  <span class="token keyword">do</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> x<span class="token variable">$line</span> <span class="token operator">!=</span> <span class="token string">&#39;x&#39;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
      <span class="token function">git</span> checkout <span class="token variable">$line</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;--------------------切换分支：<span class="token variable">$line</span>-----------------------------&quot;</span>
      <span class="token function">git</span> pull origin <span class="token variable">$line</span><span class="token builtin class-name">:</span><span class="token variable">$line</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;--------------------更新代码------------------------------------------------------&quot;</span>
      <span class="token function">git</span> cherry-pick <span class="token variable">$1</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;------------------- 迁移提交：<span class="token variable">$2</span>------------&quot;</span>
      <span class="token function">git</span> push origin <span class="token variable">$line</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;--------------------推送到远程仓库------------------------------------------------&quot;</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;-------------------------------------------------------------------------------------------------------------------------------------------------&quot;</span>
    <span class="token keyword">fi</span>

  <span class="token keyword">done</span> <span class="token operator">&lt;</span> bugMergeBranch.txt
  <span class="token comment">#移除分支文件以免后续覆盖</span>
  <span class="token comment">#rm -rf bugMergeBranch.txt</span>
<span class="token keyword">fi</span>

<span class="token comment"># 最后再切换回主分支</span>
<span class="token function">git</span> checkout master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),c=[i];function l(p,o){return s(),a("div",null,c)}const u=n(t,[["render",l],["__file","cherry-pick.html.vue"]]),m=JSON.parse('{"path":"/shell_script/cherry-pick.html","title":"批量chery-pick","lang":"zh-CN","frontmatter":{"title":"批量chery-pick","catalog":"Shell","icon":"cherry-pick","description":"批量chery-pick bugMergeScript.sh","head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/shell_script/cherry-pick.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"批量chery-pick"}],["meta",{"property":"og:description","content":"批量chery-pick bugMergeScript.sh"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-28T08:47:19.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:modified_time","content":"2024-04-28T08:47:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"批量chery-pick\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-28T08:47:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"批量chery-pick","slug":"批量chery-pick","link":"#批量chery-pick","children":[]}],"git":{"createdTime":1714294039000,"updatedTime":1714294039000,"contributors":[{"name":"haoxiang.yu@sectrend.com.cn","email":"ZLJw5dEMQLaVgsP","commits":1}]},"readingTime":{"minutes":0.59,"words":178},"filePathRelative":"shell_script/cherry-pick.md","localizedDate":"2024年4月28日","autoDesc":true}');export{u as comp,m as data};
