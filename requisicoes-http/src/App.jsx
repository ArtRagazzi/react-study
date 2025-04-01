import { useEffect, useState } from 'react'
import './styles.css';

function App() {
  const [nutri, setNutri] = useState([])

  useEffect(()=>{

    function loadApi(){
      let url = 'https://sujeitoprogramador.com/rn-api/?api=posts';
      fetch(url)
      .then((r)=>r.json)
      .then((json)=>{
        setNutri(json)
      })
    }

    loadApi()
  },[])

  return (
   
      <div className='container'>

        <header>
          <strong>React Nutri</strong>
        </header>

        {nutri.map((cadaItem)=>{
          return(
            <article key={cadaItem.id} className='post'>
              <strong className='titulo'>{cadaItem.titulo}</strong>
              <img src={cadaItem.capa} alt='Imagem' className='capa'></img>
              <p className='subtitulo'>{cadaItem.subtitulo}</p>
              <a className='botao'>Acessar</a>

            </article>
          )
        })}
      </div>

  )
}

export default App
