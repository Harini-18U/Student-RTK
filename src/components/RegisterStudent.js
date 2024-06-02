import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddStudentMutation } from '../api/studentApiSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterStudent = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [languages, setLanguages] = useState('');
  const [addStudent] = useAddStudentMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await addStudent({ name, gender, dob, address, languages: languages.split(',') });
      navigate('/studentList');
    } catch (error) {
      console.error('Error registering student:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register Student</h2>
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
      <button onClick={handleSubmit} className="btn btn-primary">Register</button>
    </div>
  );
};

export default RegisterStudent;