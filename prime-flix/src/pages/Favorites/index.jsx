import { useEffect, useState } from 'react';
import './favorites.css'
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

function Favorites() {

    const [movies, setMovies] = useState([])

    useEffect(() => {

        const myList = localStorage.getItem("@primeflix")
        setMovies(JSON.parse(myList) || [])



    }, [])

    function removeMovie(id) {
        // Pegando os filmes salvos
        let savedMovies = JSON.parse(localStorage.getItem("@primeflix")) || [];

        // Filtrando para remover o filme com o ID correspondente
        let updatedMovies = savedMovies.filter(movie => movie.id !== id);

        // Atualizando o localStorage
        localStorage.setItem("@primeflix", JSON.stringify(updatedMovies));

        // Atualizando o estado para refletir a remoção
        setMovies(updatedMovies);
        alert("Filme Removido com Sucesso!")

    }


    return (
        <div className='my-movies'>
            <h1>Meus Filmes</h1>
            <ul>
                {movies.map((movie) => {
                    return (
                        <li key={movie.id}>
                            <span>{movie.title}</span>
                            <div className='button'>
                                <Link to={`/movie/${movie.id}`}>Ver Detalhes <InfoIcon /></Link>
                                <button onClick={()=>removeMovie(movie.id)}>Excluir
                                    <DeleteIcon /> </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favorites;