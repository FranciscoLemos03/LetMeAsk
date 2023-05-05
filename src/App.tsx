// import da função de login
import { AuthContextProvider } from './contexts/AuthContext';

// imports do react-router-dom para fazer a paginação
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import das paginas
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';


function App() {
  
  
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
          <Route path="/rooms/:id" element={<Room />} />
          <Route path="/admin/rooms/:id" element={<AdminRoom />} />
        </Routes>
      </AuthContextProvider>  
    </BrowserRouter>
    
  );
}

export default App;
