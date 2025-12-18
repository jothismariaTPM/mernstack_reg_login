import { useState } from 'react'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Home from './pages/Home';

function App() {

  return (
    <div>
        <Toaster/>
       <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/dashboard' element={<Home/>}/>
        </Routes>
    </div>
  )
}

export default App
