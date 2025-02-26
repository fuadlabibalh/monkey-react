import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouterProvider } from '../../src'
import App from './App'
import * as React from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'


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
			basename: "cargos",
			authPath: "login",
			index: true,
			routers: [
				{
					index: true,
					element: <Navigate to="/dashboards" />,
				},
				{
					path: "dashboards/*",
					permit: true,
					element: <>dashboards</>,
					children: [
						{
							index: true,
							element: <Navigate to="/dashboards/demands" />,
						},
						{
							path: "demands",
							element: <>demands</>
							
						},
						
					],
				},
				{
					path: "login",
					element: <>Login</>,
				},
				{
					path: "*",
					element: (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "100vw",
								height: "100vh",
								fontSize: "2rem",
								color: "#000000",
							}}
						>
							<Link to={"/"}>Back Home</Link>
						</div>
					),
				},
			],
		},
		{
			basename: "passengers",
			// index: true,
			authPath: "login",
			routers: [
				{
					index: true,
					element: <div>test</div>
				},
				{
					path: "dashboards/*",
					permit: true,
					element: (
						<>dash</>
					),
					children: [
						{
							index: true,
							element: <>dashboards</>,
						},
						{
							path: "schedule",
							element: <>schedule</>,
						},
						{
							path: "jamaah",
							element: <>Jamaah</>,
						},
						{
							path: "masters",
							children: [
								{
									index: true,
									element: <Navigate to="/passengers/dashboards/masters/airline" />,
								},
								{
									path: "airline",
									element: <>maskapai</>,
								},
								{
									path: "airport",
									element: <>shc</>,
								},
								{
									path: "aircraft",
									element: <>pesawat</>,
								},
								{
									path: "users",
									element: <>users</>,
								},
							],
						},
					],
				},
				{
					path: "login",
					element: <>login</>,
				},
				{
					path: "/*",
					element: (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "100vw",
								height: "100vh",
								fontSize: "2rem",
								color: "#000000",
							}}
						>
							<Link to={"/passengers"}>Back Home</Link>
						</div>
					),
				},
			],
		}
	]}
      isPermit={true}
      levelOrRole={(e) => true}
      
    />
  </StrictMode>,
)
