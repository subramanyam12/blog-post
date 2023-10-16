import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Login from './components/Login.jsx'
import {CookiesProvider} from 'react-cookie'


const Main = () => {
  return (
    <CookiesProvider>
   <BrowserRouter>
   <Routes>
   <Route path='blogs' Component={App} />
   <Route exact path='/' Component={Login} />
   </Routes>
   </BrowserRouter>
   </CookiesProvider>
  )
}






ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)
