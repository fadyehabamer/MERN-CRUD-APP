import React from 'react';
import Axios from 'axios';
import './App.css';
import { API_BASE_URL } from './config';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function MainScreen() {
  const baseUrl = API_BASE_URL;

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const [usersArray, setUsersArray] = useState([]);
  const [loadError, setLoadError] = useState('');

  const createUser = (e) => {
    e.preventDefault();
    if (
      name === '' ||
      email === '' ||
      age === '' ||
      isNaN(age) ||
      name.trim() === '' ||
      email.trim() === '' ||
      age.trim() === ''
    ) {
      alert('Please fill all the fields');
      return;
    }
    Axios.post(`${baseUrl}/users/createuser`, {
      name: name,
      email: email,
      age: age,
    })
      .then(() => {
        alert('User Created');
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Could not create user');
      });
  };

  const deleteUser = (id) => {
    // debugger;
    Axios.delete(`${baseUrl}/users/deleteuser/${id}`)
      .then((res) => {
        console.log(res);
        alert('User Deleted');
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    Axios.get(`${baseUrl}/users`)
      .then((res) => {
        setUsersArray(res.data);
      })
      .catch(() => {
        setLoadError('Could not load users. Please try again later.');
      });
  }, []);
  return (
    <div className="App">
      <h1>Users</h1>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Name"
          aria-label="Name"
          autoComplete="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="number"
          min="0"
          name="age"
          placeholder="Age"
          aria-label="Age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <button type="submit" onClick={createUser}>
          Submit
        </button>
      </form>

      {loadError && <p role="alert">{loadError}</p>}
      {!loadError && usersArray.length === 0 && <h3>No Users</h3>}
      <div className="users">
        {usersArray.length > 0 &&
          usersArray.map((val, key) => {
            return (
              <div className="user" key={val._id}>
                <h3>{val.name}</h3>
                <p>{val.email}</p>
                <p>{val.age}</p>

                <div className="controls">
                  <button
                    className="edit"
                    aria-label={`Edit ${val.name}`}
                    onClick={() =>
                      navigate(`/update/${val._id}`, {
                        state: {
                          name: val.name,
                          email: val.email,
                          age: val.age,
                        },
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    aria-label={`Delete ${val.name}`}
                    onClick={() => {
                      deleteUser(val._id);
                      // debugger;
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
