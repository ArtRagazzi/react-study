import { db, auth } from './firebaseConnection'
import './app.css';
import { useEffect, useState } from 'react';
import { doc, setDoc, getDocs, collection, addDoc, getDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

function App() {

  const [titulo, setTitulo] = useState("")
  const [autor, setAutor] = useState("")
  const [posts, setPosts] = useState([])
  const [postId, setPostId] = useState("")

  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [user, setUser] = useState(false)


  useEffect(() => {
    async function loadPosts() {
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPost = []

        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor
          })
        })
        setPosts(listaPost)
      })
    }

    loadPosts();
  }, [])


  useEffect(()=>{
    async function checkLogin(){
      onAuthStateChanged(auth, (user)=>{
        //caso tenha usuario logado
        if(user){
          console.log(user)
          setUser(true)
        }else{
          //caso nao tenha usuario logado
          setUser(false)
        }
      })
    }

    checkLogin()
  },[])

  async function buscarPost() {

    // const postRef = doc(db, "posts", "1234")
    // await getDoc(postRef).then((snapshot) => {
    //   setAutor(snapshot.data().autor)
    //   setTitulo(snapshot.data().titulo)
    // }).catch((error) => {
    //   console.log("Erro: " + error)
    // })


    const postsRef = collection(db, "posts")
    await getDocs(postsRef)
      .then((snapshot) => {
        let lista = []


        snapshot.forEach((cadaDoc) => {
          lista.push({
            id: cadaDoc.id,
            titulo: cadaDoc.data().titulo,
            autor: cadaDoc.data().autor

          })
        })

        setPosts(lista);

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

  async function editarPost() {

    const docRef = doc(db, "posts", postId)
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
      .then(() => {
        console.log("Deu certo, atualizado")
        setPostId("")
        setTitulo("")
        setAutor("")

      })
      .catch((error) => {
        console.log("Deu erro ao atualizar" + error)
      })


  }

  async function excluirPost(id) {
    const docRef = doc(db, "posts", id)
    await deleteDoc(docRef).then(() => {
      alert("Deletado")
    }).catch((error) => {
      alert("Erro ao exlcuir" + error)
    })

  }

  async function novoUsuario() {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((value) => {
        alert("Usuario cadastrado" + value)
        setEmail("")
        setPassword("")

      }
      )
      .catch((error) => {
        alert(error.code)
      })
  }

  async function logarUsuario() {
    await signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        alert("Usuario logado com sucesso!" + value)
      
        setUser(true)
      }).catch((error) => {
        alert("Erro" + error)
      })
  }

  async function logout(){
    await signOut(auth)
      .then(()=>{
        setUser(false)
        alert("Usuario deslogado")
      })
      .catch((error)=>{
        alert("Error" + error)
      })
  }

  return (
    <div>
      <h1>ReactJS + Firebase</h1>



      <div className='container'>
        <label>Email: </label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Senha: </label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={novoUsuario}>Cadastrar</button>
        <button onClick={logarUsuario}>Logar</button>
      </div>
      <br />
      <br />
      <hr />

      {user && (
        <div className='container'>

          <label >Id Post: </label>
          <input type="text"
            placeholder='Digite o Id do post'
            value={postId}
            onChange={(e) => setPostId(e.target.value)} />

          <label >Titulo: </label>
          <textarea type="text" placeholder='Digite seu titulo' value={titulo} onChange={(e) => setTitulo(e.target.value)} />

          <label >Autor: </label>
          <input type="text" placeholder='Digite o autor' value={autor} onChange={(e) => setAutor(e.target.value)} />





          <button onClick={handleAdd}>Cadastrar</button>
          <button onClick={editarPost}>Atualizar Post</button>
          <button onClick={buscarPost}>Buscar posts</button>

          <ul>
            {posts.map((post) => {
              return (
                <li key={post.id}>
                  <strong>ID: {post.id}</strong><br />
                  <span>Titulo: {post.titulo}</span><br />
                  <span>Autor: {post.autor}</span><br />
                  <button onClick={() => excluirPost(post.id)}>Excluir Post</button>
                </li>
              )
            })}
          </ul>


          <button onClick={logout}>Deslogar</button>
        </div>
      )}


    </div>
  )
}

export default App
