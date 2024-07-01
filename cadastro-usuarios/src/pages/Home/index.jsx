import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/lixeira.png'
import api from '../../services/api'

// useState = modifica variáveis na tela emtempo real
// useEffect = usado aqui para chamar a função getUsers() assim que a página carrega.
// useRef = serve para pegar valor de um campo de input EX: declara a variável - const inputName = useRef() e depois coloca o atributo ref no input - <input placeholder='Nome' name='nome' type='text' ref={inputName}/> 

function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()


  async function getUsers() {

    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)

    console.log(users)

  }

  async function deleteUsers(id) {

    await api.delete(`/usuarios/${id}`)

    getUsers()

  }

  async function createUsers() {

    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers()

  }

  useEffect(() => {
    getUsers()
  }, [])


  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputName}/>
        <input placeholder='Idade' name='idade' type='number' ref={inputAge}/>
        <input placeholder='Email' name='email' type='email' ref={inputEmail}/>
        <button onClick={createUsers} type='button'>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: {user.name}</p>
            <p>Idade: {user.age}</p>
            <p>Email: {user.email}</p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="" />
          </button>
        </div>
      ))}


    </div>
  )
}

export default Home
