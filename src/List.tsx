import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Student, { StudentInterface } from './Student';
import NewStudent from './NewStudent';
import { API_URL } from './App';

const List: React.FC = () => {

  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const response = await fetch(API_URL + 'students');
    const data = await response.json();
    setStudents(data);
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (id: number) => {
    const response = await fetch(API_URL + 'students/' + id, {
      method: 'DELETE'
    });
    if (response.ok) {
      fetchStudents();
    }
  }

  return (
    <div>
      <NewStudent onStudentCreated={fetchStudents} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Birthdate</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {
            students.map((student: StudentInterface) => {
              return (
                <Student
                  key={student.id}
                  id={student.id}
                  name={student.name}
                  birthdate={student.birthdate}
                  onDelete={deleteStudent} />
              );
            })
          }
        </tbody>
      </Table>
    </div>
  );
}

export default List;