// Hook que irá buscar as perguntas do banco de dados, junto com o nome da sala.
import { useEffect, useState } from 'react';
import { database, ref, onValue, off} from '../services/firebase';
import { useAuth } from './useAuth';

// tipando um objeto que vem do firebase pra usar de forma correta.
type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>

}>

type QuestionProps = {
    id: string,
    author: {
        name: string;
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
}

export function useRoom(roomId: string){
    const { user } = useAuth();
    const [ questions, setQuestions ] = useState<QuestionProps[]>([]); // array de perguntas
    const [ title, setTitle ] = useState();

    // carregar as perguntas que estão no firebase
    useEffect(() => {
        const db = database;
        const roomRef = ref(db, `rooms/${roomId}`);

        onValue(roomRef, (room) => {
            const databaseRoom = room.val();
            // juntar todos os objetos de perguntas que estão separados em um array com os dados do objeto no formato array
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
            // o map, tira a necessidade de usar o [0],[1],[2],[3] ...
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isAnswered: value.isAnswered,
                    isHighlighted: value.isHighlighted,
                    // Contador de likes
                    likeCount: Object.values(value.likes ?? {}).length,
                    // ver se o user logado deu like
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions);
        })
        // parar com o listener
        return () => {
            off(roomRef, 'value')
        }

        // user?.id também está porque caso o user seja alterado, ele irá atualizar.
    }, [roomId, user?.id])

    return { questions, title }

}