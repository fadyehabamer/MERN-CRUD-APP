import { React } from 'react';
import { useState } from 'react';
import './App.css';
import { useNavigate, useParams, useLocation } from 'react-router';
import axios from 'axios';

export default function Update() {
  const baseUrl = 'https://mern-crud-app-cig8.onrender.com';
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();

  const sentName = location.state.name;
  const sentEmail = location.state.email;
  const sentAge = location.state.age;

  const [name, setName] = useState(location.state.name);
  const [email, setEmail] = useState(location.state.email);
  const [age, setAge] = useState(location.state.age);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'age') {
      setAge(value);
    }
  };

  const handleSubmit = () => {
    debugger;
    axios
      .put(`${baseUrl}/users/updateuser/${id}`, {
        Headers: {
          'Content-Type': 'application/json',
        },
        name: name || sentName,
        age: age || sentAge,
        email: email || sentEmail,
      })
      .then(() => {
        alert('User Updated');
        navigate('/');
      })
      .catch((err) => {
        alert('Error');
      });
  };

  return (
    <div className="App">
      <h1>Update User</h1>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="email"
        value={email}
        placeholder="Email"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="age"
        value={age}
        placeholder="age"
        onChange={handleInputChange}
      />
      <button onClick={(e) => handleSubmit()}>Submit</button>
    </div>
  );
}
