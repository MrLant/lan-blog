import{_ as n,p as s,q as a,Y as t}from"./framework-e1bed10d.js";const e={},p=t(`<h2 id="透传-props" tabindex="-1"><a class="header-anchor" href="#透传-props" aria-hidden="true">#</a> 透传 props</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> styled <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;styled-components&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> StyledInput <span class="token operator">=</span> styled<span class="token punctuation">.</span>input<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
      color: red;
    </span><span class="token template-punctuation string">\`</span></span>
    <span class="token keyword">const</span> StyledButton <span class="token operator">=</span> styled<span class="token punctuation">.</span>button<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
      background: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> props<span class="token punctuation">.</span>bg<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;
    </span><span class="token template-punctuation string">\`</span></span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>StyledInput type<span class="token operator">=</span><span class="token string">&quot;text&quot;</span> placeholder<span class="token operator">=</span><span class="token string">&quot;请输入&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>StyledButton bg<span class="token operator">=</span><span class="token string">&quot;red&quot;</span><span class="token operator">&gt;</span>click<span class="token operator">&lt;</span><span class="token operator">/</span>StyledButton<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="样式化任意组件" tabindex="-1"><a class="header-anchor" href="#样式化任意组件" aria-hidden="true">#</a> 样式化任意组件</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> styled <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;styled-components&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> StyledChild <span class="token operator">=</span> <span class="token function">styled</span><span class="token punctuation">(</span>Child<span class="token punctuation">)</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
      background: red;
    </span><span class="token template-punctuation string">\`</span></span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>StyledChild <span class="token operator">/</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Child</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>className<span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token number">123</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="扩展样式" tabindex="-1"><a class="header-anchor" href="#扩展样式" aria-hidden="true">#</a> 扩展样式</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> styled <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;styled-components&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> StyledButton <span class="token operator">=</span> styled<span class="token punctuation">.</span>button<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    width: 100px;
    height: 100px;
  </span><span class="token template-punctuation string">\`</span></span>
  <span class="token keyword">const</span> ButtonRed <span class="token operator">=</span> <span class="token function">styled</span><span class="token punctuation">(</span>StyledButton<span class="token punctuation">)</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    background: red;
  </span><span class="token template-punctuation string">\`</span></span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>ButtonRed<span class="token operator">&gt;</span>Click<span class="token operator">&lt;</span><span class="token operator">/</span>ButtonRed<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="动画" tabindex="-1"><a class="header-anchor" href="#动画" aria-hidden="true">#</a> 动画</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> styled<span class="token punctuation">,</span> <span class="token punctuation">{</span> keyframes <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;styled-components&#39;</span>
<span class="token keyword">const</span> rotate360 <span class="token operator">=</span> keyframes<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string"> 
from { 
  transform: rotate(0deg); 
}
to {
  transform: rotate(360deg); 
} 
</span><span class="token template-punctuation string">\`</span></span>
<span class="token keyword">const</span> Rotate <span class="token operator">=</span> styled<span class="token punctuation">.</span>div<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  width: 100px;
  height: 100px;
  background: yellow;
  animation: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>rotate360<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 1s linear infinite;
</span><span class="token template-punctuation string">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),o=[p];function l(c,i){return s(),a("div",null,o)}const d=n(e,[["render",l],["__file","styled-components.html.vue"]]);export{d as default};
