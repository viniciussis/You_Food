import estilos from './Rodape.module.scss'
import {
  FaDribbble,
  FaFacebook,
  FaLinkedin,
  FaRssSquare,
  FaTwitter,
} from 'react-icons/fa'

const NavBar = () => {
  return (
    <footer className={estilos.Rodape}>
      <div>
        <p>Copyright &copy; {new Date().getFullYear()} Alfood</p>
      </div>
      <div>
        <ul className="social-icons">
          <li>
            <FaFacebook size={40} />
          </li>
          <li>
            <FaTwitter size={40} />
          </li>
          <li>
            <FaLinkedin size={40} />
          </li>
          <li>
            <FaRssSquare size={40} />
          </li>
          <li>
            <FaDribbble size={40} />
          </li>
        </ul>
      </div>
      <div>
        <p>
          Uma alegria <em>a cada prato</em>
        </p>
      </div>
    </footer>
  )
}

export default NavBar
