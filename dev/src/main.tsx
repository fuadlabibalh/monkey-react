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
      isPermit={true}
      levelOrRole={() => true}
      
    />
  </StrictMode>,
)
