import { useEffect, useState } from "react";
import api from "../../services/api";


function Home(){


    const [movies, setMovies] = useState([]);

    useEffect (()=>{
        async function loadMovies() {
            const response = await api.get("/movie/now_playing", {
                params:{
                    api_key:'101c465972e4c705928faefbf19c468d',
                    language:'pt-BR',
                    page:1
                }
            })
            setMovies(response.data) 
        }

        loadMovies()
    }, [])

    return(
        <div>
            {movies.map((filme)=>{
                <h1>{filme}</h1>
            })}
        </div>
    )
}

export default Home;