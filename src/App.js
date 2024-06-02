import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Login from './components/Login';
import StudentList from './components/StudentList';
import RegisterStudent from './components/RegisterStudent';
import EditStudent from './components/EditStudent';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/studentList"
            element={
              <PrivateRoute>
                <StudentList />
              </PrivateRoute>
            }
          />
          <Route
            path="/registerStudent"
            element={
              <PrivateRoute>
                <RegisterStudent />
              </PrivateRoute>
            }
          />
          <Route
            path="/editStudent/:id"
            element={
              <PrivateRoute>
                <EditStudent />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;