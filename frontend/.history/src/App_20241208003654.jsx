import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyPage from './components/Header';
import MyFooter  from './components/MyFooter';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MyPage />} />
          <Route path="/" element={<MyFooter />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
