import{_ as n,p as s,q as a,Y as t}from"./framework-e1bed10d.js";const p={},e=t(`<p>装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。 装饰器使用 @expression 这种形式，expression 求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。</p><h2 id="类装饰器" tabindex="-1"><a class="header-anchor" href="#类装饰器" aria-hidden="true">#</a> 类装饰器</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token literal-property property">classDecotator</span><span class="token operator">:</span> <span class="token function-variable function">ClassDecorator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  target<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">&#39;hello world&#39;</span>
<span class="token punctuation">}</span>

@classDecotator
<span class="token keyword">class</span> <span class="token class-name">TestDecotator</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token literal-property property">obj</span><span class="token operator">:</span> any <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TestDecotator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>text<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="属性装饰器" tabindex="-1"><a class="header-anchor" href="#属性装饰器" aria-hidden="true">#</a> 属性装饰器</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token literal-property property">propertyDecotator</span><span class="token operator">:</span> <span class="token function-variable function">PropertyDecorator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span> any<span class="token punctuation">,</span> propertyKey</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  target<span class="token punctuation">[</span>propertyKey<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;123&#39;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">TestPropertyDecotator</span> <span class="token punctuation">{</span>
  @propertyDecotator
  <span class="token keyword">public</span> name <span class="token operator">=</span> <span class="token string">&#39;456&#39;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> obj1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TestPropertyDecotator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">TestPropertyDecotator</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// &#39;123&#39;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// &#39;456&#39;</span>



<span class="token keyword">const</span> <span class="token literal-property property">VisitDecorator</span><span class="token operator">:</span><span class="token function-variable function">PropertyDecorator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span> Object<span class="token punctuation">,</span> <span class="token literal-property property">propertyKey</span><span class="token operator">:</span> string <span class="token operator">|</span> symbol</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> <span class="token literal-property property">value</span><span class="token operator">:</span> string <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
    Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>propertyKey<span class="token punctuation">,</span><span class="token punctuation">{</span>
      <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value<span class="token operator">?.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">v</span><span class="token operator">:</span>string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
         value <span class="token operator">=</span> v<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">class</span> <span class="token class-name">Visit</span> <span class="token punctuation">{</span>
    @VisitDecorator
    <span class="token literal-property property">title</span><span class="token operator">:</span> string <span class="token operator">|</span> <span class="token keyword">undefined</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Visit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  obj<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string">&#39;JEKS;FKSLFSFS&#39;</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>title<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="方法装饰器" tabindex="-1"><a class="header-anchor" href="#方法装饰器" aria-hidden="true">#</a> 方法装饰器</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token literal-property property">methodDecotator</span><span class="token operator">:</span> <span class="token function-variable function">MethodDecorator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> propertyKey<span class="token punctuation">,</span> <span class="token literal-property property">descriptor</span><span class="token operator">:</span> PropertyDescriptor</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  descriptor<span class="token punctuation">.</span><span class="token function-variable function">value</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">789</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">TestMethodDecotator</span> <span class="token punctuation">{</span>
  @methodDecotator
  <span class="token keyword">public</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">new</span> <span class="token class-name">TestMethodDecotator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 779</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参数装饰器" tabindex="-1"><a class="header-anchor" href="#参数装饰器" aria-hidden="true">#</a> 参数装饰器</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token literal-property property">requiredDecorator</span><span class="token operator">:</span> <span class="token function-variable function">ParameterDecorator</span> <span class="token operator">=</span>  <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span> any<span class="token punctuation">,</span> propertyKey<span class="token punctuation">,</span> <span class="token literal-property property">parameterIndex</span><span class="token operator">:</span> number</span><span class="token punctuation">)</span>  <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> <span class="token literal-property property">requiredParams</span><span class="token operator">:</span> number<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  requiredParams<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>parameterIndex<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">ValidateUser</span> <span class="token punctuation">{</span>
  <span class="token function">find</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">name</span><span class="token operator">:</span> string<span class="token punctuation">,</span> @requiredDecorator id<span class="token operator">:</span> number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),o=[e];function c(l,i){return s(),a("div",null,o)}const u=n(p,[["render",c],["__file","decotator.html.vue"]]);export{u as default};