import './header.css'
import {Link} from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';

function Header(){
    return(
        <header>
            <Link className='logo' to="/">Prime Flix</Link>
            <Link className='favorites' to='/favorites'> 
                Favoritos
                <FavoriteIcon/>
            </Link>

        </header>
    )
}


export default Header;