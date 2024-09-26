import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Convert from './server/convert'
import Login from './client/login'
import { AuthProvider } from './authentication/AuthContext'
import Register from './client/register'
import Navbar from './Navbar'
import  PrivateRoute from './authentication/PrivateRoute'
import { Home } from './home/home'

function App() {
  return (
<AuthProvider>
<Router>
  
  <Navbar />
  <Routes>
  <Route path="/" element={ <Home />} />

    <Route path="/convert" element={
      <PrivateRoute>
        <Convert />
      </PrivateRoute>
    } />
    
    <Route path="/login" element={ <Login />} />
    <Route path="/register" element={ <Register />} />
   
  </Routes>
  </Router>
  </AuthProvider>
  )
}

export default App
