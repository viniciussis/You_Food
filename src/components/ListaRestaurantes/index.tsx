import { useEffect, useState } from 'react'
import IRestaurante from '../../interfaces/IRestaurante'
import style from './ListaRestaurantes.module.scss'
import Restaurante from './Restaurante'
import axios from 'axios'
import { IPaginacao } from '@/interfaces/IPaginacao'

const ListaRestaurantes = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([])
  const [nextPage, setNextPage] = useState('')

  useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>(
        'http://localhost:8000/api/v1/restaurantes/',
      )
      .then((response) => {
        setRestaurants(response.data.results)
        setNextPage(response.data.next)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  function viewMore() {
    axios
      .get<IPaginacao<IRestaurante>>(nextPage
      )
      .then((response) => {
        setRestaurants([...restaurants, ...response.data.results],)
        setNextPage(response.data.next)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurants?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {nextPage && (
        <button
          className={style.ListaRestaurantes__viewMore}
          onClick={() => viewMore()}
        >
          Ver mais
        </button>
      )}
    </section>
  )
}

export default ListaRestaurantes
