import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"








interface CoinProps {
    name: string;
    delta_24h: string;
    price: string;
    symbol: string;
    volume_24h: string;
    market_cap: string;
    low_24h: string;
    high_24h: string;
    formatedPrice: string;
    formatedMarket: string;
    formatedLowPrice: string;
    formatedHighPrice: string;
    error?: string;
}


export default function Detail() {



    const { cripto } = useParams();

    const [detail, setDetail] = useState<CoinProps>()
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        async function getData() {

            await fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=8fbc382da8cbd0c9&symbol=${cripto}`)
                .then(response => response.json())
                .then((data: CoinProps) => {
                    const price = Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })

                    const resultData = {
                        ...data,
                        formatedPrice: price.format(Number(data.price)),
                        formatedMarket: price.format(Number(data.market_cap)),
                        formatedLowPrice: price.format(Number(data.low_24h)),
                        formatedHighPrice: price.format(Number(data.high_24h)),
                    }
                    setDetail(resultData)
                    setLoading(false);


                    console.log(resultData)

                }).catch((error) => {
                    alert("Erro na api: " + error)
                })
        }

        getData()
    }, [])


    if (loading) {
        return (
            <>
                <main className='flex flex-col justify-center m-5'>
                    <h4 className="text-center text-white">Carregando Informações...</h4>
                </main>
            </>
        )
    }

    if (!detail) {
        return <p className="text-white text-center">Nenhum dado encontrado.</p>
    }

    return (

        <>
            <div className='flex flex-col items-center justify-center m-5 text-white '>
                <h1 className="text-3xl font-bold uppercase">{detail.name}</h1>
                <p>{detail.symbol}</p>
                <section className="flex flex-col justify-center p-4 rounded-lg bg-zinc-700 min-w-[400px]">
                    <p className="flex justify-between">
                        <strong>Preço: </strong>{detail.formatedPrice}
                    </p>
                    <p className="flex justify-between">
                        <strong>Maior Preço 24h: </strong>{detail.formatedHighPrice}
                    </p>
                    <p className="flex justify-between">
                        <strong>Menor Preço 24h: </strong>{detail.formatedLowPrice}
                    </p>
                    <p className="flex justify-between">
                        <strong>Delta 24h: </strong>
                        <span className={`${parseFloat(detail.delta_24h.toString().replace(',', '.')) >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {detail.delta_24h}
                        </span>
                    </p>
                    <p className="flex justify-between">
                        <strong>Mercado: </strong>{detail.formatedMarket}
                    </p>
                </section>
            </div>

        </>
    )
}