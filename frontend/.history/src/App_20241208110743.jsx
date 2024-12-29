import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MyFooter  from './components/MyFooter';
import { Outlet } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <main>
      <div className="grid grid-cols-4 h-screen">
        <Sidebar />
        <Outlet />
      </main>
      <MyFooter />

    </>
  )
}

export default App
