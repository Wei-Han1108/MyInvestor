import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

//create router
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route path="/" element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/details/:source/:id' element={<DetailScreen />} />
    // </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
