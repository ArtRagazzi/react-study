import { Link } from "react-router-dom";
import { Currency } from 'lucide-react';

export default function NotFound() {
    return (
        <>
            <div className="flex flex-col justify-center items-center mt-32">
                <h2 className="text-white text-5xl ">Página não encontrada!</h2>
                <h1 className="text-red-500 text-7xl uppercase font-bold">404</h1>
                <Link to="/" className="mt-12 bg-white p-2 rounded-md font-bold flex gap-2 uppercase ">
                    Acessar cripto moedas
                    <Currency/>
                </Link>
            </div>
        </>
    )
}