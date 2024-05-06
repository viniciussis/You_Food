import { useEffect, useState } from 'react'
import IRestaurante from '../../interfaces/IRestaurante'
import style from './ListaRestaurantes.module.scss'
import Restaurante from './Restaurante'
import axios, { AxiosRequestConfig } from 'axios'
import { IPaginacao } from '@/interfaces/IPaginacao'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import ISearchParams from '@/interfaces/ISearchParams'

const ListaRestaurantes = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([])
  const [nextPage, setNextPage] = useState('')
  const [lastPage, setLastPage] = useState('')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')

  function uploadRestautants(url: string, options: AxiosRequestConfig = {}) {
    axios
      .get<IPaginacao<IRestaurante>>(url, options)
      .then((resp) => {
        setRestaurants(resp.data.results)
        setNextPage(resp.data.next)
        setLastPage(resp.data.previous)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function onSearching(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const options = {
      params: {} as ISearchParams,
    }
    if (search) {
      options.params.search = search
    }
    if (sort) {
      options.params.ordering = sort
    }
    uploadRestautants('http://localhost:8000/api/v1/restaurantes/', options)
  }

  function onSorting(event: SelectChangeEvent) {
    setSort(event.target.value)
  }

  useEffect(() => {
    uploadRestautants('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <FormControl
        sx={{ gap: '1rem', flexDirection: 'row' }}
        component="form"
        onSubmit={onSearching}
      >
        <InputLabel id="ordenacao" color="secondary">
          Ordenar
        </InputLabel>
        <Select
          value={sort}
          labelId="ordenacao"
          label="Ordenar"
          color="secondary"
          sx={{ minWidth: '7rem' }}
          autoWidth
          onChange={onSorting}
        >
          <MenuItem value="id">Id</MenuItem>
          <MenuItem value="nome">Nome</MenuItem>
        </Select>
        <TextField
          type="search"
          label="Pesquisar restaurantes"
          color="secondary"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          sx={{ flexGrow: '0.2' }}
        />
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          sx={{ padding: '0 2rem' }}
        >
          Buscar
        </Button>
      </FormControl>
      {restaurants?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {
        <div>
          <button
            className={style.ListaRestaurantes__viewMore}
            onClick={() => uploadRestautants(lastPage)}
            disabled={!lastPage}
          >
            <FaArrowLeft size={20} /> Última Página
          </button>
          <button
            className={style.ListaRestaurantes__viewMore}
            onClick={() => uploadRestautants(nextPage)}
            disabled={!nextPage}
          >
            Proxíma Página <FaArrowRight size={20} />
          </button>
        </div>
      }
    </section>
  )
}

export default ListaRestaurantes
