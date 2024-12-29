import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MyFooter  from './components/MyFooter';
import { Outlet } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import Layout from './components/DashboardLayout';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Outlet />
    </>
  )
}

export default App
