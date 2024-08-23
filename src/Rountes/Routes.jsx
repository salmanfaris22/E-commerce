import  { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy load the components
const Home = lazy(() => import('../Components/Home/Home'));
const Login = lazy(() => import('../Components/auth/Login'));
const Register = lazy(() => import('../Components/auth/Register'));
const Cart = lazy(() => import('../Components/Cart/Cart'));
const ByProducts = lazy(() => import('../Components/ByProdeact/ByProducts'));
const Paymnet = lazy(() => import('../Components/Payment/Paymnet'));
const ContactUs = lazy(() => import('../Components/Contact/Contact'));
const MoreCategories = lazy(() => import('../Components/CategoriesPage/MoreCtegory/MoreCategories'));
const AlllCatogory = lazy(() => import('../Components/CategoriesPage/MoreCtegory/AlllCatogory'));
const BrandsPage = lazy(() => import('../Components/CategoriesPage/MoreCtegory/Brands'));
const FullCategory = lazy(() => import('../Components/CategoriesPage/BrandCategrory/FullCategory'));
const Filter = lazy(() => import('../Components/CategoriesPage/BrandCategrory/Filter'));
const TrackOrder = lazy(() => import('../Components/Payment/TrackOrder/TrackOrder'));
const Default = lazy(() => import('../Components/Defailt'));

// Optional: Admin routes with lazy loading (currently commented out)
// const HomeAdmin = lazy(() => import('../Admin/AdminUser/Home/Home'));

const RoutesPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Default />} />
        <Route path='login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/byProducts/:id' element={<ByProducts />} />
        <Route path='/paymnet/:id' element={<Paymnet />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/moreCategories' element={<MoreCategories />} />
        <Route path='/allCategories' element={<AlllCatogory />} />
        <Route path='/brandsPage' element={<BrandsPage />} />
        <Route path='/Categories/:id' element={<FullCategory />} />
        <Route path='/filterCategories/:id' element={<Filter />} />
        <Route path='/trackOrder' element={<TrackOrder />} />
        <Route path='register' element={<Register />} />
        {/* Admin routes */}
        {/* <Route path='/AdminHome' element={<HomeAdmin />} /> */}
      </Routes>
    </Suspense>
  );
}

export default RoutesPage;
