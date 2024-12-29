import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyPage from './MyPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/MyPage" element={<MyPage />} />
          {/* 其他路由 */}
        </Routes>
      </Router>
    
    </>
  )
}

export default App
