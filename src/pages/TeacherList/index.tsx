import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

import "./styles.css";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/apí";

function TeacherList() {
  const [subject, setSubjcet] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  const [teachers, setTeachers] = useState([]);

  async function handleSeachTeacher(e: FormEvent) {
    e.preventDefault();

    const response = await api.get("/classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);
  }
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponívels">
        <form id="search-teachers" onSubmit={handleSeachTeacher}>
          <Select
            label="Matéria"
            name="subject"
            value={subject}
            onChange={(e) => {
              setSubjcet(e.target.value);
            }}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Biologia ", label: "Biologia" },
              { value: "Ciências", label: "Ciências" },
              { value: "Educação Física", label: "Educação Física" },
              { value: "Matemática", label: "Matemática" },
              { value: "Física", label: "Física" },
            ]}
          />

          <Select
            label="Dia da semana"
            name="week_day"
            value={week_day}
            onChange={(e) => {
              setWeekDay(e.target.value);
            }}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1 ", label: "Segunda" },
              { value: "2", label: "Terça" },
              { value: "3", label: "Quarta" },
              { value: "4", label: "Quinta" },
              { value: "5", label: "Sexta" },
              { value: "6", label: "Sábado" },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
}

export default TeacherList;
