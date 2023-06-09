import '../styles/popup.scss';
import { FiXCircle } from 'react-icons/fi';


type ModalProps = {
    question?: boolean,
    functionConfirm: () => void,
    functionCancel: () => void,
}

export function Popup(props : ModalProps){
    return(
        <div className="modal-popup">
                <div className="body">
                    <div className="header">
                        
                        {
                            props.question ? (
                                <>
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 5.99988H5H21" stroke="#E73F5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#E73F5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <h1>Apagar pergunta</h1>
                                    <p>Tem certeza que deseja apagar essa pergunta?</p>
                                </>
                            ) : (
                                <>
                                    <FiXCircle size={48} color="#E73F5D" />
                                    <h1>Encerrar sala</h1>
                                    <p>Tem certeza que deseja encerrar esta sala?</p>
                                </>
                            )
                        }

                    </div>
                    <div className="buttons">
                        <button 
                            className='button cancelar'
                            onClick={props.functionCancel}
                        >
                            Cancelar
                        </button>

                        <button 
                            className="button confirmar"
                            onClick={props.functionConfirm}
                        >
                            {props.question ? 'Apagar' : 'Encerrar'}
                        
                        </button>
                    </div>
                </div>
            </div> 
        
    )
}