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