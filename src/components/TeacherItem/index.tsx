import React from "react";
import whatsappIcon from "../../images/icons/whatsapp.svg";
import "./styles.css";
import api from "../../services/apí";

export interface Teacher {
  id: number;
  subject: string;
  cost: number;
  created_at: string;
  updated_at: string;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

export interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createNewConnection() {
    api
      .post("/connections", {
        user_id: teacher.id,
      })
      .then((response) => {
        alert("Contato criado");
      });
  }
  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/hora <strong>R$ {teacher.cost}</strong>
        </p>
        <a
          onClick={createNewConnection}
          href={`https://wa.me/${teacher.whatsapp}`}
          target="__blank"
        >
          <img src={whatsappIcon} alt="whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
