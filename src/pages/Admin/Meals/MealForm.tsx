import http from '@/http'
import IMeal from '@/interfaces/IMeal'
import IRestaurante from '@/interfaces/IRestaurante'
import ITag from '@/interfaces/ITag'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  styled,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export const MealForm = () => {
  const params = useParams()
  const navigate = useNavigate()

  const [mealName, setMealName] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState('')
  const [restaurant, setRestaurant] = useState(0)
  const [image, setImage] = useState<File | null>(null)

  const [tags, setTags] = useState<ITag[]>([])
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([])

  useEffect(() => {
    if (params.id) {
      http.get<IMeal>(`pratos/${params.id}/`).then((resp) => {
        setMealName(resp.data.nome)
        setDescription(resp.data.descricao)
        setTag(resp.data.tag)
        setRestaurant(resp.data.restaurante)
      })
    }
  }, [params])

  useEffect(() => {
    http.get<{ tags: ITag[] }>('/tags/').then((resp) => setTags(resp.data.tags))
    http
      .get<IRestaurante[]>('/restaurantes/')
      .then((resp) => setRestaurants(resp.data))
  }, [])

  function submittingForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData()
    formData.append('nome', mealName)
    formData.append('tag', tag)
    formData.append('descricao', description)
    formData.append('restaurante', restaurant.toString())
    if (image && !params.id) {
      formData.append('imagem', image)
    }
    const url = params.id ? `pratos/${params.id}` : 'pratos/'
    const method = params.id ? 'PUT' : 'POST' 
    http
      .request({
        url,
        method,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
        navigate('/admin/pratos')
      })
      .catch((err) => console.error(err))
  }

  function selectImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      setImage(event.target.files[0])
    } else {
      setImage(null)
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
        Formulário de Pratos
      </Typography>
      <Box
        component="form"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '1rem',
          width: '80%',
        }}
        onSubmit={submittingForm}
      >
        <TextField
          value={mealName}
          onChange={(event) => setMealName(event.target.value)}
          label="Nome do prato..."
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          label="Descrição..."
          variant="outlined"
          fullWidth
          required
        />
        <FormControl fullWidth>
          <InputLabel id="tags">Tags</InputLabel>
          <Select
            value={tag}
            labelId="tags"
            label="Tags"
            required
            onChange={(event) => setTag(event.target.value)}
          >
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.value}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="restaurants">Restaurantes</InputLabel>
          <Select
            value={restaurant}
            labelId="restaurants"
            label="Restaurantes"
            required
            onChange={(event) => setRestaurant(Number(event.target.value))}
          >
            {restaurants.map((restaurant) => (
              <MenuItem key={restaurant.id} value={restaurant.id}>
                {restaurant.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {!params.id && (
          <FormControl sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<FaCloudUploadAlt />}
            >
              Upload file
              <VisuallyHiddenInput onChange={selectImage} type="file" />
            </Button>
            <FormHelperText sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
              {image?.name}
            </FormHelperText>
          </FormControl>
        )}
        <Button
          type="submit"
          variant="outlined"
          sx={{ padding: '0.5rem 2rem' }}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  )
}
