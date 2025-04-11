import { BiSearch } from 'react-icons/bi'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <main className='flex flex-col justify-center m-5'>
            <form className='flex w-full gap-4'>
                <input
                    type="text"
                    className='w-full bg-white rounded-md h-[44px] px-4 py-2 text-black'
                    placeholder="Digite o símbolo da moeda: BTC..." />
                <button
                    type="submit"
                    className='bg-blue-600 font-bold text-white px-4  h-[44px] rounded-md flex items-center gap-2'
                >
                    Buscar <BiSearch />
                </button>
            </form>

            <table className='mt-8 w-full table-fixed border-collapse rounded-md overflow-hidden'>
                <thead>
                    <tr>
                        <th className='text-xl tracking-widest uppercase text-white'>Moeda</th>
                        <th className='text-xl tracking-widest uppercase text-white'>Valor Mercado</th>
                        <th className='text-xl tracking-widest uppercase text-white'>Preço</th>
                        <th className='text-xl tracking-widest uppercase text-white'>Volume</th>
                    </tr>
                </thead>
                <tbody className='bg-zinc-800'>
                    <tr>
                        <td className='text-center p-2 rounded-s-md'>
                            <Link to='/detail/#' className='hover:bg-sky-700 text-white p-1 rounded-md'>
                                <span className='text-white font-bold'>Bitcoin</span> | BTC
                            </Link>
                        </td>
                        <td className='text-[#BBB] text-center p-2'>R$:42392</td>
                        <td className='text-[#BBB] text-center p-2'>R$:40293</td>
                        <td className='text-green-500 text-center p-2 rounded-se-md'>
                            {5}
                        </td>
                    </tr>
                </tbody>
            </table>

        </main>
    )
}
