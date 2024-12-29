import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//create router
import HomeScreen from './screens/HomeScreen';

const router = (
  <Router>
    <Route path="/" element={<App />} />
    <Route index={true} path="/" element={<HomeScreen />} />
  </Router>

)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {router}
  </StrictMode>,
)
