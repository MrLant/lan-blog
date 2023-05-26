---
title: react-router（v6版本）
date: 2023/05/19
---

## 定义路由以及路由重定向

使用 Navigate

```js
<HashRouter>
  <Routes>
    <Route path="/films" element={<Films />}></Route>
    <Route path="/cinemas" element={<Cinemas />}></Route>
    <Route path="/center" element={<Center />}></Route>
    <Route path="/" element={<Navigate to="/films" />}></Route>
    <Route path="*" element={<NotFound />}></Route>
  </Routes>
</HashRouter>
```

自定义 Redirect

```js
;<HashRouter>
  <Routes>
    <Route path="/films" element={<Films />}></Route>
    <Route path="/cinemas" element={<Cinemas />}></Route>
    <Route path="/center" element={<Center />}></Route>
    <Route path="/" element={<Redirect to="/films" />}></Route>
    <Route path="*" element={<NotFound />}></Route>
  </Routes>
</HashRouter>

export default function Redirect({ to }) {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(to, { replace: true })
  })
  return null
}
```

## 导航式路由 & Navlink 选中高亮

```js
<ul className="link-content">
  <li>
    <NavLink to="/films" className={({ isActive }) => (isActive ? 'active-link' : '')}>
      电影
    </NavLink>
  </li>
  <li>
    <NavLink to="/cinemas" className={({ isActive }) => (isActive ? 'active-link' : '')}>
      影院
    </NavLink>
  </li>
  <li>
    <NavLink to="/center" className={({ isActive }) => (isActive ? 'active-link' : '')}>
      我的
    </NavLink>
  </li>
</ul>
```

## 二级路由

```js
<Route path="/films" element={<Films />}>
  <Route index element={<Navigate to="/films/nowplaying" />}></Route>
  <Route path="/films/nowplaying" element={<Nowplaying />}></Route>
  <Route path="/films/Commingsoon" element={<Commingsoon />}></Route>
</Route>


// 在对应的父级页面使用<Outlet />组件
<Outlet />
```

## 路由传参

```js
// navigate(`/detail?id=${filmId}`) 形式
import { useSearchParams } from 'react-router-dom'

export default function Detail() {
  let [searchParams, setSearchParams] = useSearchParams()
  console.log(searchParams.get('id'))
  return (
    <div>
      Detail
      <button
        onClick={() => {
          setSearchParams({ id: 123 })
        }}
      >
        change
      </button>
    </div>
  )
}
// navigate(`/detail1/${filmId}`) 形式
import { useParams, useNavigate } from 'react-router-dom'
export default function Detail1() {
  let { id } = useParams()
  console.log(id)
  const navigate = useNavigate()
  return (
    <div>
      Detail1
      <button onClick={() => {
        navigate('/detail1/123')
      }}>change</button>
    </div>
  )
}
```
## 路由拦截
```js
<Route path="/center" element={<AuthComponent><Center /></AuthComponent>} />

function AuthComponent(props) {
  const isLogin = localStorage.getItem('token')
  return isLogin ? props.children : <Navigate to="/login" />
}
```

## 路由懒加载

```js
const LazyLoad = (path) => {
  const Comp = React.lazy(() => import(`../views/${path}`))
  retrun (
    <React.Suspense fallback={<>加载中。。。</>}>
      <Comp />
    </React.Suspense>
  )
}
```

## useRoutes 路由配置
```js
export default function Router() {
  const element = useRoutes([{
    path: '/films',
    element: <Films />,
    children: [{
      path: '',
      element: <Navigate to="/films/nowplaying" />
    },{
      path: 'nowplaying',
      element: <Nowplaying />
    },{
      path: 'commingsoon',
      element: <Commingsoon />
    }]
  }, {
    path: '/cinemas',
    element: <Cinemas />
  }, {
    path: '/center',
    element: <AuthComponent><Center /></AuthComponent>
  }, {
    path: '/detail',
    element: <Detail />
  }, {
    path: '/detail1/:id',
    element: <Detail1 />
  }, {
    path: '/login',
    element: <Login />
  }, {
    path: '/',
    element: <Navigate to="/films" />
  }]);
  return element
}


function AuthComponent(props) {
  const isLogin = localStorage.getItem('token')
  return isLogin ? props.children : <Navigate to="/login" />
}

// App.js
function App() {
  return (
    <div>
      <HashRouter>
        <Router/>
      </HashRouter>
    </div>
  )
}
```

## createHashRouter 路由配置

```js
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Navigate to="/films" />
      },
      {
        path: '/films',
        element: <Films />,
        children: [
          {
            path: '',
            element: <Navigate to="/films/nowplaying" />
          },
          {
            path: 'nowplaying',
            element: <Nowplaying />
          },
          {
            path: 'commingsoon',
            element: <Commingsoon />
          }
        ]
      },
      {
        path: '/cinemas',
        element: <Cinemas />
      },
      {
        path: '/center',
        element: (
          <AuthComponent>
            <Center />
          </AuthComponent>
        )
      },
      {
        path: '/detail',
        element: <Detail />
      },
      {
        path: '/detail1/:id',
        element: <Detail1 />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])
// main.js
<RouterProvider router={router} />

// App.js

function App() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
```