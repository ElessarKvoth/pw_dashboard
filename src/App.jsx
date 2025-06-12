import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserCard from "./components/UserCard";
import UserDetail from "./pages/UserDetail";
import { useEffect, useState } from "react";
import './App.css'


//FIRULA PARA CONSEGUIR USAR MINHAS PRÓPRIAS IMAGENS COMO AVATARES
import rhazielImg from "./assets/rhaz.jpg";
import eduardaImg from "./assets/duda.jpg";
import valentinaImg from "./assets/vava.jpg";
import daviImg from "./assets/theo.jpg";

const avatarOverrides = {
  1: rhazielImg,
  2: eduardaImg,
  3: valentinaImg,
  4: daviImg,
};
//ATÉ AQUI

// Componente principal da Home (lista de usuários e paginação)
function Home() {
  // Estado para armazenar todos os usuários
  const [users, setUsers] = useState([]);
  // Estado para controlar a página atual
  const [currentPage, setCurrentPage] = useState(1);
  // Quantos usuários mostrar por página
  const usersPerPage = 4;

  // Busca os usuários da API ao montar o componente
  useEffect(() => {
    fetch("http://localhost:3001/peoples")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // Cálculos para paginação
  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Funções para mudar de página
  const handleClick = (page) => setCurrentPage(page);
  const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Renderiza a lista de usuários e a paginação
  return (
    <div className="App">
      <h1>Total de Usuários: {users.length}</h1>
      <div className="user-list">
        {currentUsers.map((user) => (
          // Passa o avatar sobrescrito para os 4 primeiros usuários
          <UserCard
            key={user.id}
            user={{
              ...user,
              avatar: avatarOverrides[user.id] || user.avatar
            }}
          />
        ))}
      </div>
      <div className="pagination">
        <button onClick={goToPrevious} disabled={currentPage === 1}>
          Página Anterior
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={goToNext} disabled={currentPage === totalPages}>
          Próxima Página
        </button>
      </div>
    </div>
  );
}

// Define as rotas da aplicação: Home e Detalhe do Usuário
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}
