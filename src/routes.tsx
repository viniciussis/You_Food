import './main.scss'
import './assets/styles/normalize.scss'
import './assets/styles/reset.scss'
import './assets/styles/typography.scss'
import { Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import VitrineRestaurantes from '@/pages/VitrineRestaurantes'
import { RestaurantList } from './pages/Admin/Restaurants/RestaurantList'
import { RestaurantForm } from './pages/Admin/Restaurants/RestaurantForm'
import AdminLayout from './pages/Admin/AdminLayout'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="restaurantes" element={<RestaurantList />} />
        <Route path="restaurantes/novo" element={<RestaurantForm />} />
        <Route path="restaurantes/:id" element={<RestaurantForm />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
