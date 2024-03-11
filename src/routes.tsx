import './main.scss'
import './assets/styles/normalize.scss'
import './assets/styles/reset.scss'
import './assets/styles/typography.scss'
import { Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import VitrineRestaurantes from '@/pages/VitrineRestaurantes'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
    </Routes>
  )
}

export default AppRoutes
