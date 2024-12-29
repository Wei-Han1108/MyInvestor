import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MyFooter  from './components/MyFooter';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Router>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/" element={<MyFooter />} />
        </Routes>
      </Router> */}
      <Header />
      <main>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      </main>
      <MyFooter />

    </>
  )
}

export default App
