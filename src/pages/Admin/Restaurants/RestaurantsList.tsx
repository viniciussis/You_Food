import { useEffect, useState } from 'react'
import IRestaurante from '@/interfaces/IRestaurante'
import {
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Link } from 'react-router-dom'
import http from '@/http'

export const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([])

  useEffect(() => {
    http.get<IRestaurante[]>('restaurantes/').then((response) => {
      setRestaurants(response.data)
    })
  }, [])

  function deleteRestaurant(restaurantBeingExcluded: IRestaurante) {
    http.delete(`restaurantes/${restaurantBeingExcluded.id}/`).then(() => {
      const restaurantList = restaurants.filter(
        (restaurant) => restaurant.id !== restaurantBeingExcluded.id,
      )
      setRestaurants([...restaurantList])
    })
  }

  return (
    <TableContainer component={Paper} elevation={10}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>
              NOME DO RESTAURANTE
            </TableCell>
            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>
              EDITAR
            </TableCell>
            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>
              EXCLUIR
            </TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          {restaurants.map((restaurant) => (
            <TableRow key={restaurant.id}>
              <TableCell>{restaurant.nome}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <Link to={`/admin/restaurantes/${restaurant.id}/`}>
                  <Button variant="outlined" color="warning">
                    Editar
                  </Button>
                </Link>
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <Button
                  onClick={() => deleteRestaurant(restaurant)}
                  variant="outlined"
                  color="error"
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableHead>
      </Table>
    </TableContainer>
  )
}
