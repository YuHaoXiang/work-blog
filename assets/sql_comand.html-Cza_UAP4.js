import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as n,b as s}from"./app-CYLvwJnH.js";const e={},o=s(`<h2 id="生成批量清理表sql语句" tabindex="-1"><a class="header-anchor" href="#生成批量清理表sql语句"><span>生成批量清理表sql语句</span></a></h2><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">select</span> CONCAT<span class="token punctuation">(</span><span class="token string">&#39;truncate TABLE &#39;</span><span class="token punctuation">,</span>table_schema<span class="token punctuation">,</span><span class="token string">&#39;.&#39;</span><span class="token punctuation">,</span>TABLE_NAME<span class="token punctuation">,</span> <span class="token string">&#39;;&#39;</span><span class="token punctuation">)</span> <span class="token keyword">from</span> INFORMATION_SCHEMA<span class="token punctuation">.</span><span class="token keyword">TABLES</span> <span class="token keyword">where</span> table_schema <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token string">&#39;数据库1&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;数据库2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,2),p=[o];function c(l,r){return a(),n("div",null,p)}const d=t(e,[["render",c],["__file","sql_comand.html.vue"]]),u=JSON.parse('{"path":"/software/mysql/sql_comand.html","title":"MySQL脚本","lang":"zh-CN","frontmatter":{"title":"MySQL脚本","catalog":"mysql","description":"生成批量清理表sql语句","head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/software/mysql/sql_comand.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"MySQL脚本"}],["meta",{"property":"og:description","content":"生成批量清理表sql语句"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-15T01:10:45.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:modified_time","content":"2024-11-15T01:10:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL脚本\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-11-15T01:10:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"生成批量清理表sql语句","slug":"生成批量清理表sql语句","link":"#生成批量清理表sql语句","children":[]}],"git":{"createdTime":1731633045000,"updatedTime":1731633045000,"contributors":[{"name":"余浩翔","email":"1x2_ou6tn9m4r4@dingtalk.com","commits":1}]},"readingTime":{"minutes":0.12,"words":37},"filePathRelative":"software/mysql/sql_comand.md","localizedDate":"2024年11月15日","autoDesc":true}');export{d as comp,u as data};
