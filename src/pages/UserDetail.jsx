import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./UserDetail.css";


//FIRULA PARA CONSEGUIR USAR MINHAS PRÓPRIAS IMAGENS COMO AVATARES
import rhazielImg from "../assets/rhaz.jpg";
import eduardaImg from "../assets/duda.jpg";
import valentinaImg from "../assets/vava.jpg";
import daviImg from "../assets/theo.jpg";

// Objeto para sobrescrever o avatar dos 4 primeiros usuários
const avatarOverrides = {
  1: rhazielImg,
  2: eduardaImg,
  3: valentinaImg,
  4: daviImg,
};
//ATÉ AQUI

// Componente de detalhe do usuário (modal centralizado)
export default function UserDetail() {
  // Pega o id da URL
  const { id } = useParams();
  const navigate = useNavigate();
  // Estado para armazenar o usuário buscado
  const [user, setUser] = useState(null);

  // Busca o usuário pelo id ao montar o componente ou mudar o id
  useEffect(() => {
    fetch(`http://localhost:3001/peoples/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [id]);

  // Mostra "Carregando..." enquanto busca o usuário
  if (!user) return <div>Carregando...</div>;

  // Garante que user.id é número para acessar avatarOverrides
  const avatar = avatarOverrides[Number(user.id)] || user.avatar;

  // Renderiza o modal com as informações detalhadas do usuário
  return (
    <div className="user-detail-modal">
      <div className="user-detail-content">
        <img src={avatar} alt={user.name} style={{ width: 180, borderRadius: "50%" }} />
        <h2>{user.name}</h2>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Endereço:</b> {user.address}</p>
        <p><b>Descrição:</b> {user.description || "Sem descrição."}</p>
        <button onClick={() => navigate(-1)}>Fechar</button>
      </div>
    </div>
  );
}