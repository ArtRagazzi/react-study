
import axios from "axios";

//base url = https://api.themoviedb.org/3
//url = https://api.themoviedb.org/3/movie/now_playing?api_key=101c465972e4c705928faefbf19c468d&language=pt-BR

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3',

});

export default api;