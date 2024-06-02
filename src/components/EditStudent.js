import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchStudentQuery, useUpdateStudentMutation } from '../api/studentApiSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditStudent = () => {
  const { id } = useParams();
  const { data: student, error, isLoading } = useFetchStudentQuery(id);
  const [updateStudent] = useUpdateStudentMutation();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [languages, setLanguages] = useState('');

  useEffect(() => {
    if (student) {
      setName(student.name);
      setGender(student.gender);
      setDob(student.dob);
      setAddress(student.address);
      setLanguages(student.languages.join(','));
    }
  }, [student]);

  const handleSubmit = async () => {
    try {
      await updateStudent({ id, student: { name, gender, dob, address, languages: languages.split(',') } }).unwrap();
      navigate('/studentList');
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading student</p>;

  return (
    <div className="container mt-5">
      <h2>Edit Student</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="form-control my-2"
      />
      <input
        type="text"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        placeholder="Gender"
        className="form-control my-2"
      />
      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="form-control my-2"
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        className="form-control my-2"
      />
      <input
        type="text"
        value={languages}
        onChange={(e) => setLanguages(e.target.value)}
        placeholder="Languages (comma separated)"
        className="form-control my-2"
      />
      <button onClick={handleSubmit} className="btn btn-primary">Update</button>
    </div>
  );
};

export default EditStudent;