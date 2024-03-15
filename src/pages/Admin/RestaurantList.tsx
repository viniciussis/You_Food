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

  return (
    <TableContainer component={Paper}>
      
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome do Restaurante</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          {restaurants.map((restaurants) => (
            <TableRow key={restaurants.id}>
              <TableCell>{restaurants.nome}</TableCell>
              <TableCell>
                [
                <Link
                  to={`/admin/restaurantes/${restaurants.id}/`}
                >
                  Editar
                </Link>
                ]
              </TableCell>
              <TableCell>
                <Button variant="outlined" color="warning">
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
