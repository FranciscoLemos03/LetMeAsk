// imports do firebase
import { auth } from '../services/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// imports do react
import { createContext, ReactNode, useState, useEffect } from 'react';

// tipagem do User
type User = {
    id: string,
    name: string,
    avatar: string,
  }
  
  // tipagem do AuthContextType
  type AuthContextType = {
    user: User | undefined,
    signInWithGoogle: () => Promise<void>,
  }

  type AuthContextProviderProps = {
    children: ReactNode,
  }

export const AuthContext = createContext({} as AuthContextType);;



export function AuthContextProvider(props: AuthContextProviderProps){

  const [user, setUser] = useState<User>();

  //Função que verifica se o user está logado
  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          const { displayName, photoURL, uid } = user;

          if (!displayName ||!photoURL) {
              throw new Error('Missing information from Google account'); 
          }

          setUser({ 
            id: uid,
            name: displayName,
            avatar: photoURL
          });
        }
      })

      return () => {
        unsubscribe();
      }

    },
  []);

  // função para fazer login com a conta Google, caso o user nao tenha nome ou fotografia, dá erro
  async function signInWithGoogle() {

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

   
      if (result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName ||!photoURL) {
            throw new Error('Missing information from Google account'); 
        }

        setUser({ 
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }
  }  
  
    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
          {props.children}
        </AuthContext.Provider>
    );
}