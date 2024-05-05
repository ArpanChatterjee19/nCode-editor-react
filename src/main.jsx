import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx';
import Sandbox from './pages/Sandbox.jsx';
import { AuthLayout } from './components/index.js';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            
            element: (
                <AuthLayout authentication>
                    <Home />
                </AuthLayout>
            ),
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/sandbox",
            element: (
                <AuthLayout authentication>
                    <Sandbox />
                </AuthLayout>
            ),
        },
        
    ],
},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
