import { useEffect, useState } from "react";

function App() {


  const[nome,setNome] = useState("");
  const[email,setEmail] = useState("");
  const[senha,setSenha] = useState("");
 

  const[user,setUser] = useState({});

  const[input,setInput] = useState("");
  const[tarefas,setTarefas] = useState(['Pagar a conta de luz,', 'Estudar React'])



  useEffect(()=>{
    const tarefasStorage = localStorage.getItem('@tarefa')
    if(tarefasStorage){
      setTarefas(JSON.parse(tarefasStorage))
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('@tarefa', JSON.stringify(tarefas))
  },[tarefas]);

  function handleRegister(e){
    e.preventDefault();

    alert("Usuario registrado com sucesso!")
    setUser({
      nome:nome,
      email:email,
      senha:senha
    })

    setTarefas([...tarefas, input])
    setInput('')
  }

  return (
    <div>
      <h1>Cadastrando usuario</h1>
      <form onSubmit={handleRegister}>
        <label>Nome: </label>
        <input type="text" placeholder="Digite o seu nome" value={nome} onChange={(event)=> setNome(event.target.value)}/><br />

        <label>Email: </label>
        <input type="email" placeholder="Digite o seu Email" value={email} onChange={(event)=> setEmail(event.target.value)}/><br />

        <label>Senha: </label>
        <input type="password" placeholder="Digite o seu Senha" value={senha} onChange={(event)=> setSenha(event.target.value)}/><br />

        <label>Tarefa: </label>
        <input type="text" placeholder="Digite uma tarefa" value={input} onChange={(event)=> setInput(event.target.value)}/><br />

        <button type="submit">Registrar</button>

      </form>

      <br/>
      <hr />
      <div>
        <span>Bem vindo, {user.nome}</span><br />
        <span>Email: {user.email}</span>
        <span>Senha: {user.senha}</span>
      </div>

      <div>
        <ul>
          {tarefas.map(tarefa=>(
            <li key={tarefa}>{tarefa}</li>
          ))}
        </ul>
      </div>

    </div>
  )
}


export default App;