import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from '../../services/api'
import './movie.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieIcon from '@mui/icons-material/Movie';

function Movie() {

    const { id } = useParams()
    const [movie, setMovie] = useState()
    const [loading, setLoading] = useState(true)

    const navigation = useNavigate();

    useEffect(() => {
        async function loadingMovie() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '101c465972e4c705928faefbf19c468d',
                    language: 'pt-BR',
                }
            })
                .then((response) => {
                    setMovie(response.data)
                    setLoading(false)
                })
                .catch(() => {
                    navigation("/", { replace: true })
                    return
                })
        }

        loadingMovie()

    }, [navigation, id])

    function saveMovie() {
        const myList = localStorage.getItem("@primeflix")
        let savedMovies = JSON.parse(myList) || [];

        const hasMovie = savedMovies.some((savedMovie) =>
            savedMovie.id === movie.id
        )

        if (hasMovie) {
            alert("Este filme ja esta na lista de favoritos =)")
            return;
        }

        savedMovies.push(movie);
        localStorage.setItem("@primeflix", JSON.stringify(savedMovies))
        alert("Filme Salvo com Sucesso!")

    }



    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando detalhes...</h2>
            </div>
        )
    }
    return (
        <div className="movie-info">
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
            <h3>Sinopse</h3>
            <span>{movie.overview}</span>
            <strong>Avaliação: {movie.vote_average} / 10</strong>

            <div className="button-container">
                <button onClick={saveMovie}>
                    Salvar
                    <FavoriteIcon />
                </button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${movie.title} Treiler`}>Trailer <MovieIcon /></a>
                </button>
            </div>
        </div>
    )
}

export default Movie;