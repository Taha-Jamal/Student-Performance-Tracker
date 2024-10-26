import axios from "axios";
import { useEffect, useState } from "react";
import MarksForm from "./MarksForm";
import { mark, student, head, grade } from "./types";

export default function RecapSheet() {
  const [students, setStudents] = useState<student[]>([]);
  const [editingStudent, setEditingStudent] = useState<student | null>(null);

  useEffect(() => {
    const getStudents = async () => {
      const response = await axios.get("/api/students");
      setStudents(response.data);
    };
    getStudents();
  }, []);

  const handleEdit = (student: student) => {
    setEditingStudent(student);
  };

  const closeForm = () => {
    setEditingStudent(null);
  };

  const saveMarks = async (marks: mark[], ) => {
    const response = await axios.post(`/api/students/${editingStudent?.regno}`, { marks });

    console.log(marks);    
    closeForm();
  };

  return (
    <>
      <h1>RecapSheet</h1>
      <div>
        {/* {student.length !== 0 && ( */}
        <table>
          <tbody>
            <tr key={1}>
              <td>SNo</td>
              <td>Name</td>
              <td>Reg no#</td>
              <td>Quiz 1</td>
              <td>Quiz 2</td>
              <td>Assig 1</td>
              <td>Assig 2</td>
              <td>Final 1</td>
              <td>Mid Term 1</td>
              <td>Project 1</td>
              <td>CP 1</td>
              <td>Total</td>
              <td>Percent</td>
              <td>Grade</td>
            </tr>
            <tr key={2}>
              <td></td>
              <td></td>
              <td></td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>35</td>
              <td>25</td>
              <td>15</td>
              <td>5</td>
              <td>100</td>
              <td>%</td>
              <td></td>
            </tr>
            {students.map((s,i) => (
              <tr key={s._id}>
                
                <td>{i}</td>
                <td style={{cursor: "pointer"}}onClick={() => handleEdit(s)}>{s.name}</td>
                <td>{s.regno}</td>
                {s.marks.map((m) => (
                  <td key={m.mid}>{m.marks}</td>
                ))}
                <td>{s.totalMarks}</td>
                <td>{Math.round((s.totalMarks / 100) * 100)}</td>
                <td>{s.grade}</td>
                {/* <td>
                  <button onClick={() => handleEdit(s)}>Edit</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
  
      <div className="col">
        {editingStudent && (
        <MarksForm
          student={editingStudent}
          saveMarks={saveMarks}
          closeForm={closeForm}

        />
      )}
      </div>
    </>
  );
}
