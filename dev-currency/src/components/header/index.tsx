
import { Link } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'

export function Header() {
    return (

        <header className='flex items-center justify-center h-[120px] max-w-[1080px] mx-auto'>
            <div>   
                <Link to='/'>
                    <img src={logoImg} alt="Logo Cripto" />
                </Link>
            </div>
        </header>
    )
}