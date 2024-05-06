import { useEffect, useState } from 'react'
import IMeal from '@/interfaces/IMeal'
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

export const MealsList = () => {
  const [meals, setMeals] = useState<IMeal[]>([])

  useEffect(() => {
    http.get<IMeal[]>('pratos/').then((response) => {
      setMeals(response.data)
    })
  }, [])

  function deleteMeal(mealBeingExcluded: IMeal) {
    http.delete(`pratos/${mealBeingExcluded.id}/`).then(() => {
      const mealsList = meals.filter(
        (meal) => meal.id !== mealBeingExcluded.id,
      )
      setMeals([...mealsList])
    })
  }

  return (
    <TableContainer component={Paper} elevation={10}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>
              NOME DO PRATO
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>
              TAG
            </TableCell>
            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>
              IMAGEM
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
          {meals.map((meal) => (
            <TableRow key={meal.id}>
              <TableCell>{meal.nome}</TableCell>
              <TableCell>{meal.tag}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <a href={meal.imagem} target="_blank" rel="noopener noreferrer">
                  <Button variant="outlined" color="success">
                    Ver Imagem
                  </Button>
                </a>
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <Link to={`/admin/pratos/${meal.id}/`}>
                  <Button variant="outlined" color="warning">
                    Editar
                  </Button>
                </Link>
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <Button
                  onClick={() => deleteMeal(meal)}
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
