import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export const RestaurantForm = () => {
  const params = useParams()
  const [restaurantName, setRestaurantName] = useState('')

  function addRestaurant(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!params) {
      axios
        .post(`http://localhost:8000/api/v2/restaurantes/${params}`, {
          nome: restaurantName,
        })
        .then(() => {
          setRestaurantName('')
        })
    } else {
      axios
        .post('http://localhost:8000/api/v2/restaurantes/', {
          nome: restaurantName,
        })
        .then(() => {
          setRestaurantName('')
        })
    }
  }

  return (
    <form onSubmit={(event) => addRestaurant(event)}>
      <TextField
        value={restaurantName}
        onChange={(event) => setRestaurantName(event.target.value)}
        id="standard-basic"
        label="Nome do restaurante..."
        variant="standard"
      />
      <Button type="submit" variant="outlined">
        Enviar
      </Button>
    </form>
  )
}
