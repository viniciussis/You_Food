import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const RestaurantForm = () => {
  const params = useParams()
  const [restaurantName, setRestaurantName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (params.id) {
      axios.get(`http://localhost:8000/api/v2/restaurantes/${params.id}/`)
        .then(resp => setRestaurantName(resp.data.nome))
    }
  }, [params])

  const onSubmittingForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (params.id) {
      axios
        .put(`http://localhost:8000/api/v2/restaurantes/${params.id}/`, {
          nome: restaurantName,
        })
        .then(() => {
          navigate("/admin/restaurantes/")
        })
    } else {
      axios
        .post('http://localhost:8000/api/v2/restaurantes/', {
          nome: restaurantName,
        })
        .then(() => {
          navigate("/admin/restaurantes/")
        })
    }
  }

  return (
    <form
      style={{
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}
      onSubmit={(event) => onSubmittingForm(event)}
    >
      <TextField
        value={restaurantName}
        onChange={(event) => setRestaurantName(event.target.value)}
        label="Nome do restaurante..."
        variant="standard"
      />
      <Button type="submit" variant="outlined">
        Enviar
      </Button>
    </form>
  )
}
