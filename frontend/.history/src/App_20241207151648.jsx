import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyPage from './MyPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Switch>
          <Route path="/my-page" component={MyPage} />
          {/* 其他路由 */}
        </Switch>
      </Router>
    
    </>
  )
}

export default App
