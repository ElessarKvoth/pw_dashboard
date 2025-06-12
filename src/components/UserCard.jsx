import { useNavigate } from "react-router-dom";
import "./UserCard.css";

// Componente de cartão de usuário, mostra apenas foto e nome
export default function UserCard({ user }) {
  const navigate = useNavigate();

  // Ao clicar no card, navega para a página de detalhes do usuário
  return (
    <div className="user-card" onClick={() => navigate(`/user/${user.id}`)} style={{ cursor: "pointer" }}>
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
    </div>
  );
}