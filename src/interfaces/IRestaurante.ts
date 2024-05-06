import IMeal from './IMeal'

export default interface IRestaurante {
  id: number
  nome: string
  pratos: IMeal[]
}
