
import {  Route, Routes } from 'react-router-dom'
import Home from '../Admin/AdminUser/Home/Home'
import UserDetails from '../Admin/AdminUser/Detaile/UserDetails'







const RoutesPage = () => {
  
  return (

    <Routes>
        
        <Route path='/' element={<Home/>}/>
         <Route path='/userDetails' element={<UserDetails/>}/>
         

    </Routes>


  )
}

export default RoutesPage