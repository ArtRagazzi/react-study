import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function Detail(){

    const {cripto} = useParams();

    const [detail,setDetail]= useState<CoinPorp>()
    const [loading, setLoading] = useState(true);

    interface CoinProps{
        name:string;
        delta_24h:string;
        price:string;
        symbol:string;
        volume_24h:string;
        market_cap:string;
        low_24h:string;
        high_24h:string;
        formatedPrice:string;
        formatedMarket:string;
        formatedLowPrice:string;
        formatedHighPrice:string;
        error?:string;
    }

    useEffect(()=>{
        async function getData(){
            await fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=8fbc382da8cbd0c9&symbol=${cripto}`)
            .then(response => response.json())
            .then((data:CoinProps)=>{
                const price = Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency:"BRL"
                })

                const resultData = {
                    ...data,
                    formatedPrice: price.format(Number(data.price)),
                    formatedMarket:price.format(Number(data.market_cap)),
                    formatedLowPrice:price.format(Number(data.low_24h)),
                    formatedHighPrice:price.format(Number(data.high_24h)),
                }
                setDetail(resultData)
                setLoading(false);


                console.log(resultData)

            }).catch((error)=>{
                alert("Erro na api: "+error)
            })
        }

         getData()  
    },[])


    if(loading){
        return(
            <>
                <h4 className="text-center">Carregando Informações...</h4>
            </>
        )
    }
    return(

        <>

            <h1 className="text-center">{detail.name}</h1>

        
        </>
    )
}