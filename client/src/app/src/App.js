import Home from './components/pages/Home'
import Login from './components/pages/Login'
import LoginFailed from './components/pages/LoginFailed'
import NotFound from './components/pages/NotFound'
import Register from './components/pages/Register'
import RegisterFailed from './components/pages/RegisterFailed'
import RegisterSucceeded from './components/pages/RegisterSucceeded'
import { LoginUserProvider } from './components/providers/LoginUserProvider'
import {Routes, Route} from 'react-router-dom'
import Footer from './components/templates/Footer'
import { useEffect } from 'react'
import axios from 'axios'

function App() {
  return (
    <>
      <LoginUserProvider>
        <div className="App">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/loginfailed' element={<LoginFailed />} />
            <Route path='/register' element={<Register />} />
            <Route path='/registersucceeded' element={<RegisterSucceeded />} />
            <Route path='/registerfailed' element={<RegisterFailed />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </LoginUserProvider>
    </>
  );
}

export default App
