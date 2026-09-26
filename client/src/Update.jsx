import { useState } from 'react';
import './App.css';
import { API_BASE_URL } from './config';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Update() {
  const baseUrl = API_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();

  // The user's current values are passed via router state from the list page.
  // It is missing when this URL is opened directly or the page is reloaded.
  const initial = location.state ?? {};
  const sentName = initial.name;
  const sentEmail = initial.email;
  const sentAge = initial.age;

  const [name, setName] = useState(sentName ?? '');
  const [email, setEmail] = useState(sentEmail ?? '');
  const [age, setAge] = useState(sentAge ?? '');

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
    axios
      .put(`${baseUrl}/users/updateuser/${id}`, {
        name: name || sentName,
        age: age || sentAge,
        email: email || sentEmail,
      })
      .then(() => {
        alert('User Updated');
        navigate('/');
      })
      .catch(() => {
        alert('Error');
      });
  };

  if (!location.state) {
    return (
      <div className="App">
        <h1>Update User</h1>
        <p>
          Please choose a user to edit from the <Link to="/">users list</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Update User</h1>

      <input
        type="text"
        name="name"
        placeholder="Name"
        aria-label="Name"
        value={name}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        aria-label="Email"
        onChange={handleInputChange}
      />
      <input
        type="number"
        min="0"
        name="age"
        value={age}
        placeholder="Age"
        aria-label="Age"
        onChange={handleInputChange}
      />
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
}
