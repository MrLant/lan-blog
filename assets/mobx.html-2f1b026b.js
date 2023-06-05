import{_ as n,p as s,q as a,Y as p}from"./framework-e1bed10d.js";const t={},e=p(`<h2 id="mobx-基本使用" tabindex="-1"><a class="header-anchor" href="#mobx-基本使用" aria-hidden="true">#</a> mobx 基本使用</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> observable<span class="token punctuation">,</span> autorun <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;mobx&#39;</span>

<span class="token keyword">var</span> number <span class="token operator">=</span> observable<span class="token punctuation">.</span><span class="token function">box</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> name <span class="token operator">=</span> observable<span class="token punctuation">.</span><span class="token function">box</span><span class="token punctuation">(</span><span class="token string">&#39;张三&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// 观察对象 通过map</span>
<span class="token comment">// const map = observable.map({key: &#39;value&#39;})</span>
<span class="token comment">// map.set(&#39;key&#39;, &#39;new value&#39;)</span>
<span class="token comment">// map.get(&#39;key&#39;)</span>

<span class="token comment">// 观察对象，不通过map</span>
<span class="token comment">// const map = observable({key: &#39;value&#39;})</span>
<span class="token comment">// map.key = &#39;new value&#39;</span>

<span class="token comment">// 观察数组</span>
<span class="token comment">// const list = observable([1,2,3])</span>
<span class="token comment">// list[2] = 3</span>

<span class="token function">autorun</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>number<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">autorun</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  number<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>App<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mobx-使用-非装饰器" tabindex="-1"><a class="header-anchor" href="#mobx-使用-非装饰器" aria-hidden="true">#</a> mobx 使用（非装饰器）</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">observable</span><span class="token punctuation">(</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token function">changeShow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>show <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">changeHide</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>show <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">changeHide</span><span class="token operator">:</span> action<span class="token punctuation">,</span>
    <span class="token literal-property property">changeShow</span><span class="token operator">:</span> action <span class="token comment">//标记两个方法是action，专门修改可观测的value</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mobx-使用-装饰器-异步请求" tabindex="-1"><a class="header-anchor" href="#mobx-使用-装饰器-异步请求" aria-hidden="true">#</a> mobx 使用（装饰器 + 异步请求）</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Store</span> <span class="token punctuation">{</span>
  @observable show <span class="token operator">=</span> <span class="token boolean">true</span>
  @action <span class="token function">changeShow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>show <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
  @action <span class="token function">changeHide</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>show <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>

  @action <span class="token keyword">async</span> <span class="token function">getList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">&#39;https://m.maizuo.com/gateway?cityId=440300&amp;ticketFlag=1&amp;k=1166056&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">&#39;get&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// 异步请求</span>
    <span class="token function">runInAction</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>list <span class="token operator">=</span> res<span class="token punctuation">.</span>data<span class="token punctuation">.</span>data<span class="token punctuation">.</span>cinemas
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="支持装饰器" tabindex="-1"><a class="header-anchor" href="#支持装饰器" aria-hidden="true">#</a> 支持装饰器</h2><blockquote><p>npm i @babel/core @babel/plugin-proposal-decorators @babel/preset-env</p></blockquote><p>创建.babelrc</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;presets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;@babel/preset-env&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;plugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span>
      <span class="token string">&quot;@babel/plugin-proposal-decorators&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;legacy&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建 config-overrides.js</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> override<span class="token punctuation">,</span> addDecoratorsLegacy <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;customize-cra&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">function</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token parameter">dir</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> dir<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> <span class="token function-variable function">customize</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token parameter">config<span class="token punctuation">,</span> env</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  config<span class="token punctuation">.</span>resolve<span class="token punctuation">.</span>alias<span class="token punctuation">[</span><span class="token string">&#39;@&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>env <span class="token operator">===</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>externals <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">react</span><span class="token operator">:</span> <span class="token string">&#39;React&#39;</span><span class="token punctuation">,</span> <span class="token string-property property">&#39;react-dom&#39;</span><span class="token operator">:</span> <span class="token string">&#39;ReactDOM&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> config
<span class="token punctuation">}</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">override</span><span class="token punctuation">(</span><span class="token function">addDecoratorsLegacy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">customize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装依赖</p><blockquote><p>npm i customize-cra react-app-rewired</p></blockquote><p>修改 package.json</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;start&quot;</span><span class="token operator">:</span> <span class="token string">&quot;react-app-rewired start&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;react-app-rewired build&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token string">&quot;react-app-rewired test&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;eject&quot;</span><span class="token operator">:</span> <span class="token string">&quot;react-app-rewired eject&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改 vscode 配置</p><p>勾选 experimentalDecorators</p><h2 id="mobx-react" tabindex="-1"><a class="header-anchor" href="#mobx-react" aria-hidden="true">#</a> mobx-react</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// index.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Provider <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;mobx-react&#39;</span>
<span class="token keyword">import</span> store <span class="token keyword">from</span> <span class="token string">&#39;./08-mobx/mobx/store&#39;</span>
<span class="token keyword">const</span> root <span class="token operator">=</span> ReactDOM<span class="token punctuation">.</span><span class="token function">createRoot</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

root<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>Provider store<span class="token operator">=</span><span class="token punctuation">{</span>store<span class="token punctuation">}</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>App <span class="token operator">/</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>Provider<span class="token operator">&gt;</span>
<span class="token punctuation">)</span>

装饰器模式
@<span class="token function">inject</span><span class="token punctuation">(</span><span class="token string">&quot;store&quot;</span><span class="token punctuation">)</span>
@observer

函数式组件
<span class="token keyword">import</span> <span class="token punctuation">{</span> Observer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;mobx-react&#39;</span>
<span class="token operator">&lt;</span>Observer<span class="token operator">&gt;</span>
      <span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>
          <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
            <span class="token operator">&lt;</span>ul style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token string">&#39;600px&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">overflow</span><span class="token operator">:</span> <span class="token string">&#39;auto&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>
              <span class="token punctuation">{</span>store<span class="token punctuation">.</span>list<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
                <span class="token operator">&lt;</span>li style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token string">&#39;12px&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">paddingLeft</span><span class="token operator">:</span> <span class="token string">&#39;20px&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span> key<span class="token operator">=</span><span class="token punctuation">{</span>item<span class="token punctuation">.</span>cinemaId<span class="token punctuation">}</span><span class="token operator">&gt;</span>
                  <span class="token punctuation">{</span>item<span class="token punctuation">.</span>name<span class="token punctuation">}</span>
                <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">&gt;</span>
              <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">&gt;</span>
          <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>Observer<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","mobx.html.vue"]]);export{r as default};
