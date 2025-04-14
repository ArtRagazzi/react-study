import { FormEvent, use, useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {


    interface CoinProps{
        name:string;
        delta_24h:string;
        price:string;
        symbol:string;
        volume_24h:string;
        market_cap:string;
        formatedPrice:string;
        formatedMarket:string;
    }

    interface DataProps{
        coins: CoinProps[];
    }

    const [coins, setCoins] = useState<CoinProps[]>([])
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();

    //https://coinlib.io/api/v1/coinlist?key=8fbc382da8cbd0c9&pref=BRL&page=1&order=volume_desc
    useEffect(()=>{
        async function getData(){
            await fetch('https://sujeitoprogramador.com/api-cripto/?key=8fbc382da8cbd0c9')
            .then(response=>response.json()
            ).then((data:DataProps)=>{
                const coinsData = data.coins.slice(0, 15);


                const price = Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency:"BRL"
                })

                const formatResult = coinsData.map((item)=>{
                    const formated ={
                        ...item,
                        formatedPrice:price.format(Number(item.price)),
                        formatedMarket:price.format(Number(item.market_cap))
                    }
                    return formated
                })

                setCoins(formatResult)

            }).catch((error)=>{
                alert("Erro na Requisição: "+ error)
            })
        }

        getData();
    },[])



    function handleSearch(e:FormEvent){
        e.preventDefault
        
        if(inputValue === ""){
            return ;
        }
        navigate(`/detail/${inputValue}`)

    }

    return (
        <main className='flex flex-col justify-center m-5'>
            <form className='flex w-full gap-4' onSubmit={handleSearch}>
                <input
                    type="text"
                    className='w-full bg-white rounded-md h-[44px] px-4 py-2 text-black'
                    value={inputValue}
                    onChange={(e)=>setInputValue(e.target.value)}
                    placeholder="Digite o símbolo da moeda: BTC..." />
                <button
                    type="submit"
                    className='bg-blue-600 font-bold text-white px-4  h-[44px] rounded-md flex items-center gap-2'
                >
                    Buscar <BiSearch />
                </button>
            </form>

            <table className='mt-8 w-full table-fixed border-separate border-spacing-y-4'>
                <thead>
                    <tr>
                        <th className='text-xl tracking-widest uppercase text-white'>Moeda</th>
                        <th className='text-xl tracking-widest uppercase text-white'>Valor Mercado</th>
                        <th className='text-xl tracking-widest uppercase text-white'>Preço</th>
                        <th className='text-xl tracking-widest uppercase text-white'>Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map(coin =>(
                        <tr key={coin.name} className='bg-zinc-800 rounded-md h-12'>
                            <td className='text-center p-2 rounded-s-md'>
                                <Link to={`/detail/${coin.symbol}`} className='hover:bg-sky-700 text-white p-1 rounded-md'>
                                    <span className='text-white font-bold'>{coin.name}</span> | {coin.symbol}
                                </Link>
                            </td>

                            <td className='text-[#BBB] text-center p-2'>{coin.formatedMarket}</td>

                            <td className='text-[#BBB] text-center p-2'>{coin.formatedPrice}</td>

                            <td className={`text-center p-2 rounded-e-md ${parseFloat(coin.delta_24h.toString().replace(',', '.')) >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {coin.delta_24h}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

        </main>
    )
}
