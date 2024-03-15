import './main.scss'
import './assets/styles/normalize.scss'
import './assets/styles/reset.scss'
import './assets/styles/typography.scss'
import { Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import VitrineRestaurantes from '@/pages/VitrineRestaurantes'
import { RestaurantList } from './pages/Admin/RestaurantList'
import { RestaurantForm } from './pages/Admin/RestaurantForm'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<RestaurantList />} />
      <Route path="/admin/restaurantes/:id" element={<RestaurantForm />} />
    </Routes>
  )
}

export default AppRoutes
