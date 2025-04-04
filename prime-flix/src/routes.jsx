import {Routes, Route, BrowserRouter } from 'react-router-dom'

import Movie from './pages/Movie'
import Home from './pages/Home'
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Favorites from './pages/Favorites';


function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/movie/:id' element={<Movie/>}></Route>
                <Route path='/favorites' element={<Favorites/>}></Route>
                <Route path='*' element={<NotFound/>}></Route>
            </Routes>

        </BrowserRouter>
    )
}


export default RoutesApp;