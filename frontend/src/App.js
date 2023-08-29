import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios"
import Login from './Pages/Login';
import Home from './Pages/Home';


function App() {

  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `http://localhost:8080/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);


  return (
    <Routes>
      <Route path='/' element={user ? <Home user={user} /> : <Navigate to='/login' />} />
      <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
    </Routes>
  );
}

export default App;
