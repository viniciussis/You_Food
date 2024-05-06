import './main.scss'
import './assets/styles/normalize.scss'
import './assets/styles/reset.scss'
import './assets/styles/typography.scss'
import Home from '@/pages/Home'
import { Route, Routes } from 'react-router-dom'
import { RestaurantsList } from './pages/Admin/Restaurants/RestaurantsList'
import { RestaurantForm } from './pages/Admin/Restaurants/RestaurantForm'
import { MealsList } from './pages/Admin/Meals/MealsList'
import VitrineRestaurantes from '@/pages/VitrineRestaurantes'
import AdminLayout from './pages/Admin/AdminLayout'
import { MealForm } from './pages/Admin/Meals/MealForm'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="restaurantes" element={<RestaurantsList />} />
        <Route path="restaurantes/novo" element={<RestaurantForm />} />
        <Route path="restaurantes/:id" element={<RestaurantForm />} />
        <Route path="pratos" element={<MealsList />} />
        <Route path="pratos/novo" element={<MealForm />} />
        <Route path="pratos/:id" element={<MealForm />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
