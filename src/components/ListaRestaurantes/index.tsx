import IRestaurante from '../../interfaces/IRestaurante'
import style from './ListaRestaurantes.module.scss'
import Restaurante from './Restaurante'

const ListaRestaurantes = () => {
  const restaurantes: IRestaurante[] = [
    {
      id: 1,
      nome: 'Lyllys Cafe',
      pratos: [
        {
          id: 1,
          descricao: 'Lasanha à Bolonhesa',
          imagem:
            'https://www.sabornamesa.com.br/media/k2/items/cache/13b5e0deaf19b06816d21e67ad4e211c_XL.jpg',
          nome: 'Lasanha',
          restaurante: 1,
          tag: 'Italiana',
        },
        {
          id: 2,
          descricao: 'Strogonoff de Frango à brasileira',
          imagem:
            'https://www.sabornamesa.com.br/media/k2/items/cache/753da7a1edb284e4c2d5ea8068e48c7c_XL.jpg',
          nome: 'Strogonoff',
          restaurante: 1,
          tag: 'Russa',
        },
        {
          id: 3,
          descricao: 'Empadão de Frango',
          imagem:
            'https://www.sabornamesa.com.br/media/k2/items/cache/42a35505dabe860dcdeb51f92d5be768_XL.jpg',
          nome: 'Empadão de Frango',
          restaurante: 1,
          tag: 'Portuguesa',
        },
      ],
    },
    {
      id: 2,
      nome: 'Sugiro Sushi',
      pratos: [
        {
          id: 1,
          descricao: 'Combinado de 8 peças',
          imagem:
            'https://www.sabornamesa.com.br/media/k2/items/cache/5031e263a4a258791d6306b2d3d9dbf6_XL.jpg',
          nome: 'Sushi',
          restaurante: 1,
          tag: 'Japonesa',
        },
        {
          id: 2,
          descricao: 'Sashimi de Salmão',
          imagem:
            'https://www.comidaereceitas.com.br/img/sizeswp/1200x675/2009/04/sashimi_facil.jpg',
          nome: 'Sashimi',
          restaurante: 1,
          tag: 'Japonesa',
        },
      ],
    },
    {
      id: 3,
      nome: 'Cantina da Escola',
      pratos: [
        {
          id: 1,
          descricao: 'Salgado de queijo com presunto',
          imagem:
            'https://www.sabornamesa.com.br/media/k2/items/cache/f5a85333d553b860310d6f60f5af8288_XL.jpg',
          nome: 'Quejunto',
          restaurante: 1,
          tag: 'Lanche',
        },
        {
          id: 2,
          descricao: 'Coxinha de Frango',
          imagem:
            'https://t1.rg.ltmcdn.com/pt/posts/1/9/1/coxinha_simples_191_600.jpg',
          nome: 'Coxinha',
          restaurante: 1,
          tag: 'Lanche',
        },
        {
          id: 3,
          descricao: 'Risole de Palmito',
          imagem:
            'https://www.sabornamesa.com.br/media/k2/items/cache/6fe1c589e796bff64c81da223cb0c48f_XL.jpg',
          nome: 'Risole',
          restaurante: 1,
          tag: 'Lanche',
        },
      ],
    },
  ]

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
    </section>
  )
}

export default ListaRestaurantes
