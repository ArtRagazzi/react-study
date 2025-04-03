import { useParams } from "react-router-dom";

function Produtos(){

    const {id} = useParams();

    return(
        <div>
            <h2>Meu produto é 123</h2>
            <span>
                Meu produto é {id}
            </span>
        </div>
    )
}

export default Produtos;