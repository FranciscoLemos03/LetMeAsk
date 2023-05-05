import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { database, ref, child, get } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { GoogleAuthProvider } from 'firebase/auth';

export function Home(){
  
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  const provider = new GoogleAuthProvider();

  // Specify additional OAuth 2.0 scopes that you want to request from the authentication provider.
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  //Specify additional custom OAuth provider parameters that you want to send with the OAuth request.
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });

  async function handleCreateRoom(){

      if (!user){
        await signInWithGoogle();
      }

      navigate('/rooms/new')

  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === ''){
        return
    }

    // Pegar o código da sala no firebase v9
    const db = ref(database);
    const roomRef = await get(child(db, `rooms/${roomCode}`))
    
    // verificar se sala existe
    if (!roomRef.exists()) {
        alert('Sala não existe.');
        return
    }

    if (roomRef.val().authorId === user?.id){
      navigate(`admin/rooms/${roomCode}`);
    } else {
        navigate(`rooms/${roomCode}`);
    }
    
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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder='Digite o código da sala'
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
    )
}