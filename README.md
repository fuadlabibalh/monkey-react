# monkey-react

- React Router Provider with Protection Router


#### install with npm

`npm i monkey-react`

#### install with yarn

`yarn add monkey-react`


#### BrowserRouterProvider
- using BrowserRouterProvider to authorization and filtering with role or level user, this simple solution with react

```js
import { useEffect } from 'react'
import {BrowserRouter} from 'monkey-react'

function MainContainer(): JSX.Element {

  return (
    <BrowserRouter routers={listRouter()} 
    // default without all public router
    // or isPermit means to authorization like any router to login mecanism with value boolean, example require token value
    // isPermit={isToken? true : false}
    isPermit={true}
    levelOrRole={(_e) => {
        // _e representation router entity
        // if(e_.level === "ADMIN") 
        // or custom field if(e_.field === "ADMIN") 
        return true;
    }}
    />
  )
}

export default MainContainer
```
#### HashRouterProvider
- using HashRouterProvider

```js
import { useEffect } from 'react'
import {HashRouterProvider} from 'monkey-react'

function MainContainer(): JSX.Element {

  return (
    <HashRouterProvider routers={listRouter()} 
    // default without all public router
    // or isPermit means to authorization like any router to login mecanism with value boolean, example require token value
    // isPermit={isToken? true : false}
    isPermit={true}
    levelOrRole={(_e) => {
        // _e representation router entitas 
        // if(e_.level === "ADMIN") 
        // or custom field if(e_.field === "ADMIN") 
        return true;
    }}
    />
  )
}

export default MainContainer
```


### RouterProvider Example
```js
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouterProvider } from '../../src'
import App from './App'
import * as React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'


interface LayoutHomeProps extends React.HTMLAttributes<HTMLDivElement> {

}

const LayoutHome = ({ children: _children }: LayoutHomeProps) => {
  const navigate = useNavigate()
  return (
    <div style={{ display: "flex", width: "100%", height: "90vh", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", width: "100%" }}>
        <div>layout Preview</div>
        <button onClick={() => navigate("/home")}>to HOME</button>
        <button onClick={() => navigate("/home/page")}>to PAGE</button>
      </div>
      <div style={{ width: "100%", height: "40vh", display: "flex", justifyContent: 'center', alignItems: "center" }}>
        <Outlet />
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouterProvider routers={[
      {
        index: true,
        basename: "main",
        routers: [
          {
            index: true,
            element: <App />
          },
          {
            path: "home",
            element: <LayoutHome />,
            children: [
              {
                index: true,
                element: <div>Component Home</div>
              },
              {
                path: "page",
                element: <div>Component Page</div>
              },
            ]
          }
        ]
      }
    ]}
      isPermit={true} // true for public or boolean value if any protection router like require login
      levelOrRole={() => true} // filter role definition in basename router
      
    />
  </StrictMode>,
)

```