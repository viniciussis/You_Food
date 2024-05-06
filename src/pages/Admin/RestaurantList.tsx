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
import axios from 'axios'
import { Link } from 'react-router-dom'

export const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([])

  useEffect(() => {
    axios
      .get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
      .then((response) => {
        setRestaurants(response.data)
      })
  }, [])

  const deleteRestaurant = (restaurantBeingExcluded: IRestaurante) => {
    axios.delete(`http://localhost:8000/api/v2/restaurantes/${restaurantBeingExcluded.id}/`)
      .then(() => {
        const restaurantList = restaurants.filter(restaurant => restaurant.id !== restaurantBeingExcluded.id)
        setRestaurants([...restaurantList])
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: "bold"}}>NOME DO RESTAURANTE</TableCell>
            <TableCell sx={{textAlign: "center", fontWeight: "bold"}}>EDITAR</TableCell>
            <TableCell sx={{textAlign: "center", fontWeight: "bold"}}>EXCLUIR</TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          {restaurants.map((restaurant) => (
            <TableRow key={restaurant.id}>
              <TableCell>{restaurant.nome}</TableCell>
              <TableCell sx={{textAlign: "center"}}>
                <Link to={`/admin/restaurantes/${restaurant.id}/`}>
                  <Button variant="outlined" color="secondary">
                    Editar
                  </Button>
                </Link>
              </TableCell>
              <TableCell sx={{textAlign: "center"}}>
                <Button onClick={() => deleteRestaurant(restaurant)} variant="outlined" color="error">
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
