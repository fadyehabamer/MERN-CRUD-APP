import React from 'react';
import Axios from 'axios';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function MainScreen() {
  
  const baseUrl = 'https://mern-crud-app-cig8.onrender.com';
  
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const [usersArray, setUsersArray] = useState([]);



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
    }).then((res) => {
      alert('User Created');
    });
    debugger;
    window.location.reload();

  };

  const deleteUser = (id) => {
    debugger;
    Axios.delete(`${baseUrl}/users/deleteuser/${id}`).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
    window.location.reload();
  };

  useEffect(() => {
    Axios.get(`${baseUrl}/users`).then((res) => {
      setUsersArray(res.data);
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
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          name="age"
          placeholder="age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <button type="submit" onClick={createUser}>
          Submit
        </button>
      </form>

      {usersArray.length === 0 && <h3>No Users</h3>}
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
