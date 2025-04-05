import { db } from './firebaseConnection'
import './app.css';
import { useState } from 'react';
import { doc, setDoc, collection, addDoc, getDoc } from 'firebase/firestore'


function App() {

  const [titulo, setTitulo] = useState("")
  const [autor, setAutor] = useState("")

  async function buscarPost() {
    
    const postRef = doc(db, "posts", "1234")
    await getDoc(postRef).then((snapshot) => {
      setAutor(snapshot.data().autor)
      setTitulo(snapshot.data().titulo)
    }).catch((error) => {
      console.log("Erro: " + error)
    })
  }

  async function handleAdd() {

    //Para Setar dados (Subscreve)

    // await setDoc(doc(db, "posts", "1234"),{
    //   titulo:titulo,
    //   autor:autor
    // })
    // .then(()=>{
    //   alert("Cadastrado com sucesso!")
    // }).catch((error)=>{
    //   console.log("Erro: "+error)
    // })

    // Para adicionar com ID aleatorio

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor
    }).then(() => {
      alert("Cadastrado com sucesso!")
    }).catch((error) => {
      console.log("Erro: " + error)
    })

  }

  return (
    <div>
      <h1>ReactJS + Firebase</h1>
      <div className='container'>
        <label >Titulo: </label>
        <textarea type="text" placeholder='Digite seu titulo' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <label >Autor: </label>
        <input type="text" placeholder='Digite o autor' value={autor} onChange={(e) => setAutor(e.target.value)} />
        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar posts</button>

      </div>
    </div>
  )
}

export default App
