
import {  Route, Routes } from 'react-router-dom'
import Home from '../Components/Home/Home'
import Login from '../Components/auth/Login'
import { Register } from '../Components/auth/Register'


const RoutesPage = () => {
  return (

    <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/> 
    </Routes>


  )
}

export default RoutesPage