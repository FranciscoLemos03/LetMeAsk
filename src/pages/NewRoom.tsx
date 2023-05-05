import { useNavigate, Link } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { database, set, ref, push } from '../services/firebase';

export function NewRoom(){
    
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const navigate = useNavigate();

  async function handleCreateRoom(event: FormEvent){
      event.preventDefault();
      
      // se tiver vazio, retorna.
      if (newRoom.trim() === '') {
          return
      }
      
      // adicionar ao database realtime firebase V.9
      const db = database;
      const roomRef = ref(db, 'rooms');
      
      const newPostRef = push(roomRef);
      await set (newPostRef, {
          title: newRoom,
          authorId: user?.id
      })

      navigate(`/admin/rooms/${newPostRef.key}`);
  }

    return(
    <div id='page-auth'>
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
    )
}