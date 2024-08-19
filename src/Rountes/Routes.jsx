
import {  Route, Routes } from 'react-router-dom'
import Home from '../Components/Home/Home'
import Login from '../Components/auth/Login'
import { Register } from '../Components/auth/Register'

import Cart from '../Components/Cart/Cart'
import ByProducts from '../Components/ByProdeact/ByProducts'
import Paymnet from '../Components/Payment/Paymnet'
import  { ContactUs } from '../Components/Contact/Contact'
import MoreCategories from '../Components/CategoriesPage/MoreCtegory/MoreCategories'
import AlllCatogory from '../Components/CategoriesPage/MoreCtegory/AlllCatogory'
import BrandsPage from '../Components/CategoriesPage/MoreCtegory/Brands'
import FullCategory from '../Components/CategoriesPage/BrandCategrory/FullCategory'

import Filter from '../Components/CategoriesPage/BrandCategrory/Filter'
import TrackOrder from '../Components/Payment/TrackOrder/TrackOrder'
import Default from '../Components/Defailt'

// import HomeAdmin from '../Admin/AdminUser/Home/Home'






const RoutesPage = () => {
  
  return (

    <Routes>
        
        <Route path='/' element={<Home/>}/>
        <Route path='*' element={<Default/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/byProducts/:id' element={<ByProducts/>}/>
          <Route path='/paymnet/:id' element={<Paymnet/>}/>
          <Route path='/contact' element={<ContactUs/>}/>
          <Route path='/moreCategories' element={<MoreCategories/>}/>
          <Route path='/allCategories' element={<AlllCatogory/>}/>
          <Route path='/brandsPage' element={<BrandsPage/>}/>
           <Route path='/Categories/:id' element={<FullCategory/>}/>
           <Route path='/filterCategories/:id' element={<Filter/>}/>
           <Route path='/trackOrder' element={<TrackOrder/>}/>
        <Route path='register' element={<Register/>}/> 
        {/* Admin routees */}
        {/* <React.Suspense fallback={<div>Loading...</div>}>
        <Route path='/AdminHome' element={<HomeAdmin/>}/>
         
                </React.Suspense> */}
       

    </Routes>


  )
}

export default RoutesPage