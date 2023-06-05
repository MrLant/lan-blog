import{_ as n,p as s,q as a,Y as t}from"./framework-e1bed10d.js";const p={},e=t(`<p>nestjs 提供了方法参数装饰器 用来帮助我们快速获取参数 如下</p><table><thead><tr><th>装饰器</th><th>参数</th></tr></thead><tbody><tr><td>@Request()</td><td>req</td></tr><tr><td>@Response()</td><td>res</td></tr><tr><td>@Next()</td><td>next</td></tr><tr><td>@Session()</td><td>req.session</td></tr><tr><td>@Param(key?: string)</td><td>req.params/req.params[key]</td></tr><tr><td>@Body(key?: string)</td><td>req.body/req.body[key]</td></tr><tr><td>@Query(key?: string)()</td><td>req.query/req.query[key]</td></tr><tr><td>@Headers(name?: string)</td><td>req.headers/req.headers[name]</td></tr><tr><td>@HttpCode</td><td></td></tr></tbody></table><h2 id="获取-get-请求传参" tabindex="-1"><a class="header-anchor" href="#获取-get-请求传参" aria-hidden="true">#</a> 获取 get 请求传参</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>@<span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">find</span><span class="token punctuation">(</span><span class="token parameter">@<span class="token function">Request</span><span class="token punctuation">(</span><span class="token punctuation">)</span> req</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>query<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">200</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

@<span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">find</span><span class="token punctuation">(</span>@<span class="token function">Query</span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">200</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="获取-post-请求传参" tabindex="-1"><a class="header-anchor" href="#获取-post-请求传参" aria-hidden="true">#</a> 获取 post 请求传参</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>@<span class="token function">Post</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">create</span><span class="token punctuation">(</span><span class="token parameter">@<span class="token function">Request</span><span class="token punctuation">(</span><span class="token punctuation">)</span> req</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>body<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">200</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

@<span class="token function">Post</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">create</span><span class="token punctuation">(</span><span class="token parameter">@<span class="token function">Body</span><span class="token punctuation">(</span><span class="token punctuation">)</span> body</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">200</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="获取动态路由参数" tabindex="-1"><a class="header-anchor" href="#获取动态路由参数" aria-hidden="true">#</a> 获取动态路由参数</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>@<span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&#39;:id&#39;</span><span class="token punctuation">)</span>
<span class="token function">find</span><span class="token punctuation">(</span><span class="token parameter">@<span class="token function">Request</span><span class="token punctuation">(</span><span class="token punctuation">)</span> req</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">200</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

@<span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&#39;:id&#39;</span><span class="token punctuation">)</span>
<span class="token function">find</span><span class="token punctuation">(</span>@<span class="token function">Param</span><span class="token punctuation">(</span><span class="token string">&#39;id&#39;</span><span class="token punctuation">)</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">200</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="读取-header信息" tabindex="-1"><a class="header-anchor" href="#读取-header信息" aria-hidden="true">#</a> 读取 header信息</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>@<span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&#39;:id&#39;</span><span class="token punctuation">)</span>
<span class="token function">find</span><span class="token punctuation">(</span><span class="token parameter">@<span class="token function">Headers</span><span class="token punctuation">(</span><span class="token punctuation">)</span> header</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>header<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">200</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),o=[e];function c(i,u){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","controller.html.vue"]]);export{r as default};
