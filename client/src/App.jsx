import React from 'react'
import Register from './pages/public/Register'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/Register" element={<Register/>}/>
        {/* <Route path="/Login" element={<Register/>}/> */}
      </Routes>
    </>
  )
}

export default App
