import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchStudentsQuery, useDeleteStudentMutation } from '../api/studentApiSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentList = () => {
  const { data: students, error, isLoading, refetch } = useFetchStudentsQuery();
  const [deleteStudent] = useDeleteStudentMutation();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id).unwrap();
        refetch();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading students</p>;

  return (
    <div className="container mt-5">
      <h2>Student List</h2>
      {students && students.length > 0 ? (
        <ul className="list-group">
          {students.map((student) => (
            <li key={student.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <p>Name: {student.name}</p>
                <p>Gender: {student.gender}</p>
                <p>DOB: {student.dob}</p>
                <p>Address: {student.address}</p>
                <p>Languages: {student.languages.join(', ')}</p>
              </div>
              <div>
                <button onClick={() => navigate(`/editStudent/${student.id}`)} className="btn btn-primary me-2">Edit</button>
                <button onClick={() => handleDelete(student.id)} className="btn btn-danger">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No students found</p>
      )}
      <button onClick={() => navigate('/registerStudent')} className="btn btn-success mt-3">Register Student</button>
    </div>
  );
};

export default StudentList;