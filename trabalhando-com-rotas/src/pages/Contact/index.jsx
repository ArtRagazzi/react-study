import { Link } from "react-router-dom";


function Contato(){
    return(
        <div>
            <h1>Pagina de contato</h1>
            <Link to="/">Home</Link>
            <Link to="/sobre">Sobre</Link>

        </div>
    )
}


export default Contato;