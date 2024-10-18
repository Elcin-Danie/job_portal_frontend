import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './assets/css/index.css'; 
// import { ContextProvider } from './Components/Contaxts/ContaxtsProvider.jsx'
import router from './router.jsx'
import App from './App.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ContextProvider> */}
        <RouterProvider router={router} />
    {/* </ContextProvider> */}
  </React.StrictMode>
)