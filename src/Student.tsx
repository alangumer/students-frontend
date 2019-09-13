import React from 'react';

export interface StudentInterface {
  id: number
  name: string
  birthdate: string
}

interface Props {
  onDelete: (id: number) => void
}

const Student: React.FC<StudentInterface & Props> = ({ id, name, birthdate, onDelete }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{new Date(birthdate).toLocaleDateString()}</td>
      <td>
        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete(id);
          }}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Student;