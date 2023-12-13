import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './ui/AppLayout'
import Profile from './pages/Profile'
import Products from './pages/Products'
import ProductLayout from './ui/ProductLayout'
import Favs from './pages/Favs'
import Login from './pages/Login'
import MyProfile from './ui/MyProfile'
import ShoppingCart from './pages/ShoppingCart'
import Orders from './pages/Orders'
import ProductDetail from './pages/ProductDetail'
import Overview2 from './pages/Overview-2'
import ProtectedRoute from './ProtectedRoute'
import Overview from './pages/Overview'
import LoginSuccessPage from './pages/LoginSuccess'

function App() {

  return (
    <>
      <Routes>
          <Route element={<ProtectedRoute><AppLayout /> </ProtectedRoute>} >
            <Route  path='/' element={<Overview2 />} />
            <Route  path='/a' element={<Overview />} />
            <Route  path='/products/:id' element={<ProductDetail/>} />
          <Route  path='/cart' element={<ShoppingCart />} />
            <Route element={<ProductLayout />}>
              <Route  path='/products/' element={<Products/>} />
            </Route>
            <Route path='/profile' element={<Profile />} >
                <Route  path='/profile/orders' element={<Orders/>} />
                <Route path='/profile/me' element={<MyProfile />} />
                <Route path='/profile/wishlist' element={<Favs />} />
            </Route>
          </Route>
          <Route  path='/login' element={<Login />} />
          <Route  path='/login-success' element={<LoginSuccessPage />} />
         
      </Routes>
    </>
  )
}

export default App
