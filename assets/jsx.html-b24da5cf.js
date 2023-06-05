import{_ as s,p as a,q as t,s as n,R as p,Y as e}from"./framework-e1bed10d.js";const c={},o=n("h2",{id:"jsx语法",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#jsx语法","aria-hidden":"true"},"#"),p(" JSX语法")],-1),l=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"TIP"),n("p",null,"JSX将HTML语法直接加入到JavaScript代码中，在通过编译器转换到纯JavaScript后由浏览器执行。在实际开发中，JSX在产品打包阶段已经编译成纯JavaScript，不会带来任何副作用， 反而会让代码更加直观并易于维护。编译过程由Babel的JSX编译器实现")],-1),i=e(`<p>要明白JSX的原理，需要先明白如何用 JavaScript 对象来表现一个 DOM 元素的结构?<br> 看下面的DOM结构</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>app<span class="token punctuation">&#39;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>appRoot<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span> 
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>title<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span>欢迎进入React的世界<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span> 
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>React.js 是一个帮助你构建页面 UI 的库 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span> 
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这个 HTML 所有的信息我们都可以用 JavaScript 对象来表示：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span> 
  tag<span class="token operator">:</span> &#39;div&#39;<span class="token punctuation">,</span> 
  attrs<span class="token operator">:</span> <span class="token punctuation">{</span> className<span class="token operator">:</span> &#39;app&#39;<span class="token punctuation">,</span> id<span class="token operator">:</span> &#39;appRoot&#39;<span class="token punctuation">}</span><span class="token punctuation">,</span> 
  children<span class="token operator">:</span> <span class="token punctuation">[</span> 
    <span class="token punctuation">{</span> 
      tag<span class="token operator">:</span> &#39;h1&#39;<span class="token punctuation">,</span> 
      attrs<span class="token operator">:</span> <span class="token punctuation">{</span> className<span class="token operator">:</span> &#39;title&#39; <span class="token punctuation">}</span><span class="token punctuation">,</span> 
      children<span class="token operator">:</span> <span class="token punctuation">[</span>&#39;欢迎进入React的世界&#39;<span class="token punctuation">]</span> 
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> 
      tag<span class="token operator">:</span> &#39;p&#39;<span class="token punctuation">,</span> 
      attrs<span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span> 
      children<span class="token operator">:</span> <span class="token punctuation">[</span>&#39;React.js 是一个构建页面 UI 的库&#39;<span class="token punctuation">]</span> 
    <span class="token punctuation">}</span> 
  <span class="token punctuation">]</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是用 JavaScript 写起来太长了，结构看起来又不清晰，用 HTML 的方式写起来就方便很多了。于是 React.js 就把 JavaScript 的语法扩展了一下，让 JavaScript 语言能够支持这种直接在 JavaScript 代码里面编写类似 HTML 标签结构的语法，这样写起来就方便很多了。编译的过程会把类似 HTML 的 JSX结构转换成 JavaScript 的对象结构。<br> 下面代码:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span> 
<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">&#39;react-dom&#39;</span> 
<span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span> 
  <span class="token function">render</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token keyword">return</span> <span class="token punctuation">(</span> 
      <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&#39;app&#39;</span> id<span class="token operator">=</span><span class="token string">&#39;appRoot&#39;</span><span class="token operator">&gt;</span> 
        <span class="token operator">&lt;</span>h1 className<span class="token operator">=</span><span class="token string">&#39;title&#39;</span><span class="token operator">&gt;</span>欢迎进入React的世界<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">&gt;</span> 
        <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>React<span class="token punctuation">.</span>js 是一个构建页面 <span class="token constant">UI</span> 的库 <span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span> 
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span> 
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>
ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span> <span class="token operator">&lt;</span>App <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译之后将得到这样的代码</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span> 
<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">&#39;react-dom&#39;</span>
<span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span> 
  <span class="token function">render</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token keyword">return</span> <span class="token punctuation">(</span> 
      React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span> 
        <span class="token string">&quot;div&quot;</span><span class="token punctuation">,</span> 
        <span class="token punctuation">{</span>
          <span class="token literal-property property">className</span><span class="token operator">:</span> <span class="token string">&#39;app&#39;</span><span class="token punctuation">,</span> 
          <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">&#39;appRoot&#39;</span> 
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span> 
          <span class="token string">&quot;h1&quot;</span><span class="token punctuation">,</span> 
          <span class="token punctuation">{</span> <span class="token literal-property property">className</span><span class="token operator">:</span> <span class="token string">&#39;title&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> 
          <span class="token string">&quot;欢迎进入React的世界&quot;</span> 
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
        React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span> 
          <span class="token string">&quot;p&quot;</span><span class="token punctuation">,</span> 
          <span class="token keyword">null</span><span class="token punctuation">,</span> 
          <span class="token string">&quot;React.js 是一个构建页面 UI 的库&quot;</span> 
        <span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span> 
  React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">,</span> 
  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span> 
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>React.createElement 会构建一个 JavaScript 对象来描述你 HTML 结构的信息，包括标签名、属性、 还有子元素等, 语法为</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span> 
  type<span class="token punctuation">,</span> 
  <span class="token punctuation">[</span>props<span class="token punctuation">]</span><span class="token punctuation">,</span> 
  <span class="token punctuation">[</span><span class="token operator">...</span>children<span class="token punctuation">]</span> 
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所谓的 JSX 其实就是 JavaScript 对象，所以使用 React 和 JSX 的时候一定要经过编译的过程:</p><blockquote><p>JSX —使用react构造组件，bable进行编译—&gt; JavaScript对象 — ReactDOM.render() —&gt;DOM元素 —&gt;插入页面</p></blockquote>`,12),u=[o,l,i];function r(d,k){return a(),t("div",null,u)}const m=s(c,[["render",r],["__file","jsx.html.vue"]]);export{m as default};