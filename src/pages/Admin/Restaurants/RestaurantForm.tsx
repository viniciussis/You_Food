import http from '@/http'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const RestaurantForm = () => {
  const params = useParams()
  const [restaurantName, setRestaurantName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (params.id) {
      http
        .get(`restaurantes/${params.id}/`)
        .then((resp) => setRestaurantName(resp.data.nome))
    }
  }, [params])

  function onSubmittingForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (params.id) {
      http
        .put(`restaurantes/${params.id}/`, {
          nome: restaurantName,
        })
        .then(() => {
          navigate('/admin/restaurantes/')
        })
    } else {
      http
        .post('restaurantes/', {
          nome: restaurantName,
        })
        .then(() => {
          navigate('/admin/restaurantes/')
        })
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        gap: '1rem',
      }}
      component={Paper}
      elevation={10}
    >
      <Typography component="h1" variant="h5">
        Formulário de Restaurantes
      </Typography>
      <Box
        component="form"
        style={{
          display: 'flex',
          gap: '1rem',
        }}
        onSubmit={(event) => onSubmittingForm(event)}
      >
        <TextField
          value={restaurantName}
          onChange={(event) => setRestaurantName(event.target.value)}
          label="Nome do restaurante..."
          variant="outlined"
          required
        />
        <Button type="submit" variant="outlined">
          Enviar
        </Button>
      </Box>
    </Box>
  )
}
