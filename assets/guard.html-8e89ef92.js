import{_ as s,p as a,q as t,s as n,Y as p}from"./framework-e1bed10d.js";const e={},o=n("p",null,"守卫有一个单独的责任。它们根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理。这通常称为授权。在传统的 Express 应用程序中，通常由中间件处理授权(以及认证)。中间件是身份验证的良好选择，因为诸如 token 验证或添加属性到 request 对象上与特定路由(及其元数据)没有强关联。",-1),c=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"TIP"),n("p",null,"守卫在每个中间件之后执行，但在任何拦截器或管道之前执行")],-1),l=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>@<span class="token function">Controller</span><span class="token punctuation">(</span><span class="token string">&#39;cats&#39;</span><span class="token punctuation">)</span>
@<span class="token function">UseGuards</span><span class="token punctuation">(</span>RolesGuard<span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CatsController</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>全局守卫</p><p>为了设置一个全局守卫，使用 Nest 应用程序实例的 useGlobalGuards() 方法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">await</span> NestFactory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>AppModule<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">useGlobalGuards</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RolesGuard</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Nest 提供了通过 @SetMetadata() 装饰器将定制元数据附加到路由处理程序的能力。这些元数据提供了我们所缺少的角色数据，而守卫需要这些数据来做出决策。让我们看看使用@SetMetadata():</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>@<span class="token function">Post</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
@<span class="token function">SetMetadata</span><span class="token punctuation">(</span><span class="token string">&#39;roles&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;admin&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token parameter">@<span class="token function">Body</span><span class="token punctuation">(</span><span class="token punctuation">)</span> createCatDto<span class="token operator">:</span> CreateCatDto</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>catsService<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>createCatDto<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">import</span> <span class="token punctuation">{</span> Injectable<span class="token punctuation">,</span> CanActivate<span class="token punctuation">,</span> ExecutionContext <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@nestjs/common&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Reflector <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@nestjs/core&#39;</span><span class="token punctuation">;</span>

@<span class="token function">Injectable</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">RolesGuard</span> <span class="token keyword">implements</span> <span class="token class-name">CanActivate</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token keyword">private</span> <span class="token literal-property property">reflector</span><span class="token operator">:</span> Reflector</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token function">canActivate</span><span class="token punctuation">(</span>context<span class="token operator">:</span> ExecutionContext<span class="token punctuation">)</span><span class="token operator">:</span> boolean <span class="token punctuation">{</span>
    <span class="token keyword">const</span> roles <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>reflector<span class="token punctuation">.</span>get<span class="token operator">&lt;</span>string<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token string">&#39;roles&#39;</span><span class="token punctuation">,</span> context<span class="token punctuation">.</span><span class="token function">getHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>roles<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> request <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">switchToHttp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> user <span class="token operator">=</span> request<span class="token punctuation">.</span>user<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">matchRoles</span><span class="token punctuation">(</span>roles<span class="token punctuation">,</span> user<span class="token punctuation">.</span>roles<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),i=[o,c,l];function u(r,k){return a(),t("div",null,i)}const v=s(e,[["render",u],["__file","guard.html.vue"]]);export{v as default};
