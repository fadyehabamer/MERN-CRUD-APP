import React from 'react';
import Axios from 'axios';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function MainScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const [usersArray, setUsersArray] = useState([]);

  const createUser = (e) => {
    window.location.reload();
    e.preventDefault();
    Axios.post('http://localhost:3001/createuser', {
      name: name,
      age: age,
      email: email,
    }).then((res) => {
      alert('User Created');
    });
  };

  const deleteUser = (id) => {
    window.location.reload();
    Axios.delete(`http://localhost:3001/deleteuser/${id}`).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    Axios.get('http://localhost:3001/users').then((res) => {
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
                      toast.success('User Deleted Successfully');
                      deleteUser(val._id);
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
