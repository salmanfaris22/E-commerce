
import {  Route, Routes } from 'react-router-dom'
import Home from '../Components/Home/Home'
import Login from '../Components/auth/Login'
import { Register } from '../Components/auth/Register'
import Men from '../Components/CategoriesPage/Men'
import Women from '../Components/CategoriesPage/Women'
import Cart from '../Components/Cart/Cart'




const RoutesPage = () => {
  
  return (

    <Routes>
        
        <Route path='/' element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path="mens" element={<Men/>}/>
          <Route path='/womens' element={<Women/>}/>
          <Route path='/cart' element={<Cart/>}/>
        <Route path='register' element={<Register/>}/> 

    </Routes>


  )
}

export default RoutesPage