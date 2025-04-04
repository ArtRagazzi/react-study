import { Link } from "react-router-dom";
import './erro.css'
function NotFound() {

    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>Não encontramos essa rota!</h2>
            <Link to='/'>Veja todos os filmes</Link>
        </div>
    )
}


export default NotFound;