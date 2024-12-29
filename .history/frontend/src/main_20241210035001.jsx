import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

//create router
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import RecommendScreen from './screens/RecommendScreen';
import { Provider } from 'react-redux';
import { store } from './store';
const router = createBrowserRouter( 
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/details/:source/:id' element={<DetailScreen />} />
      <Route path='/recommend' element={<RecommendScreen />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
