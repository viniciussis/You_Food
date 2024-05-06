import { useEffect, useState } from 'react'
import IRestaurante from '../../interfaces/IRestaurante'
import style from './ListaRestaurantes.module.scss'
import Restaurante from './Restaurante'
import axios from 'axios'
import { IPaginacao } from '@/interfaces/IPaginacao'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { TextField } from '@mui/material'

const ListaRestaurantes = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([])
  const [nextPage, setNextPage] = useState('')
  const [lastPage, setLastPage] = useState('')
  const [search, setSearch] = useState('')

  function uploadRestautants(url: string) {
    axios
      .get<IPaginacao<IRestaurante>>(url)
      .then((response) => {
        setRestaurants(response.data.results)
        setNextPage(response.data.next)
        setLastPage(response.data.previous)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    uploadRestautants('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <div>
        <TextField 
          type='search' 
          label='Pesquisar restaurantes' 
          variant='outlined'
          value={search} 
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
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
