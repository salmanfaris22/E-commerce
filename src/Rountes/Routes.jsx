
import {  Route, Routes } from 'react-router-dom'
import Home from '../Components/Home/Home'
import Login from '../Components/auth/Login'
import { Register } from '../Components/auth/Register'
import Men from '../Components/CategoriesPage/Men'
import Women from '../Components/CategoriesPage/Women'
import Cart from '../Components/Cart/Cart'
import ByProducts from '../Components/ByProdeact/ByProducts'
import Paymnet from '../Components/Payment/Paymnet'
import  { ContactUs } from '../Components/Contact/Contact'
import MoreCategories from '../Components/CategoriesPage/MoreCtegory/MoreCategories'
import AlllCatogory from '../Components/CategoriesPage/MoreCtegory/AlllCatogory'
import BrandsPage from '../Components/CategoriesPage/MoreCtegory/Brands'
import FullCategory from '../Components/CategoriesPage/BrandCategrory/FullCategory'
import CatrgroryFilter from '../Components/CategoriesPage/BrandCategrory/CatrgroryFilter'




const RoutesPage = () => {
  
  return (

    <Routes>
        
        <Route path='/' element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path="mens" element={<Men/>}/>
          <Route path='/womens' element={<Women/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/byProducts/:id' element={<ByProducts/>}/>
          <Route path='/paymnet/:id' element={<Paymnet/>}/>
          <Route path='/contact' element={<ContactUs/>}/>
          <Route path='/moreCategories' element={<MoreCategories/>}/>
          <Route path='/allCategories' element={<AlllCatogory/>}/>
          <Route path='/brandsPage' element={<BrandsPage/>}/>
           <Route path='/Categories/:id' element={<FullCategory/>}/>
           <Route path='/categoriesMore/:id' element={<CatrgroryFilter/>}/>
        <Route path='register' element={<Register/>}/> 

    </Routes>


  )
}

export default RoutesPage