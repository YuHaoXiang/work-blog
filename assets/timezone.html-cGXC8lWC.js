import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,b as i}from"./app-DrsE8OIX.js";const t={},l=i(`<h2 id="修改环境变量" tabindex="-1"><a class="header-anchor" href="#修改环境变量"><span>修改环境变量</span></a></h2><p><code>TZ=Asia/Shanghai</code></p><h2 id="使用挂载点时区" tabindex="-1"><a class="header-anchor" href="#使用挂载点时区"><span>使用挂载点时区</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>apiVersion: v1
kind: Pod
metadata:
  name: xalpine-pod
  namespace: default
  labels:
    app: xalpine-pod
spec:
  containers:
  - name: xalpine-pod
    image: 37213690/xalpine:1.0
    command:
    - &quot;/bin/sh&quot;
    - &quot;-c&quot;
    - &quot;sleep 3600&quot;
    imagePullPolicy: IfNotPresent
    volumeMounts:
      - name: host-time
        mountPath: /etc/localtime
        readOnly: true
  volumes:
    - name: host-time
      hostPath:
        path: /etc/localtime
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="制作时修改" tabindex="-1"><a class="header-anchor" href="#制作时修改"><span>制作时修改</span></a></h2><h3 id="centos" tabindex="-1"><a class="header-anchor" href="#centos"><span>centos</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \\
    &amp;&amp; echo &#39;Asia/Shanghai&#39; &gt;/etc/timezone
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="debian-ubuntu" tabindex="-1"><a class="header-anchor" href="#debian-ubuntu"><span>debian / ubuntu</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime &amp;&amp; echo $TZ &gt; /etc/timezone
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="alpine" tabindex="-1"><a class="header-anchor" href="#alpine"><span>alpine</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>RUN apk --no-cache add  tzdata
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime &amp;&amp; echo &#39;Asia/Shanghai&#39; &gt;/etc/timezone
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,11),s=[l];function d(r,c){return n(),a("div",null,s)}const u=e(t,[["render",d],["__file","timezone.html.vue"]]),h=JSON.parse('{"path":"/software/container/timezone.html","title":"容器修改时区","lang":"zh-CN","frontmatter":{"title":"容器修改时区","description":"修改环境变量 TZ=Asia/Shanghai 使用挂载点时区 制作时修改 centos debian / ubuntu alpine","head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/software/container/timezone.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"容器修改时区"}],["meta",{"property":"og:description","content":"修改环境变量 TZ=Asia/Shanghai 使用挂载点时区 制作时修改 centos debian / ubuntu alpine"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-28T08:47:19.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:modified_time","content":"2024-04-28T08:47:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"容器修改时区\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-28T08:47:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"修改环境变量","slug":"修改环境变量","link":"#修改环境变量","children":[]},{"level":2,"title":"使用挂载点时区","slug":"使用挂载点时区","link":"#使用挂载点时区","children":[]},{"level":2,"title":"制作时修改","slug":"制作时修改","link":"#制作时修改","children":[{"level":3,"title":"centos","slug":"centos","link":"#centos","children":[]},{"level":3,"title":"debian / ubuntu","slug":"debian-ubuntu","link":"#debian-ubuntu","children":[]},{"level":3,"title":"alpine","slug":"alpine","link":"#alpine","children":[]}]}],"git":{"createdTime":1714294039000,"updatedTime":1714294039000,"contributors":[{"name":"haoxiang.yu@sectrend.com.cn","email":"ZLJw5dEMQLaVgsP","commits":1}]},"readingTime":{"minutes":0.38,"words":114},"filePathRelative":"software/container/timezone.md","localizedDate":"2024年4月28日","autoDesc":true}');export{u as comp,h as data};
