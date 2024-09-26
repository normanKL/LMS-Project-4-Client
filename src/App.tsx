//- ./src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import SpecialistList from "./components/SpecialistList"; 
import SpecialistDetail from "./components/SpecialistDetail";
import User from './components/User';
import Team from './components/Team';
import Footer from './components/Footer';
import CreateSpecialist from './components/CreateSpecialist';
import EditSpecialist from "./components/EditSpecialist";
import SearchSpecialist from './components/SearchSpecialist';


function App() {
  const [user, setUser] = useState(null)

  async function fetchUser() {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      fetchUser()
    }
  }, [])

  return (
    <>
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login fetchUser={fetchUser} />} />
        <Route path="/specialists" element={<SpecialistList />} /> 
        <Route path="/search" element={<SearchSpecialist />} /> 
        <Route path="/specialist/:id" element={<SpecialistDetail />} />
        <Route path="/create-specialist" element={<CreateSpecialist />} />
        <Route path="/edit-specialist/:id" element={<EditSpecialist />} />
        <Route path="/team" element={<Team />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
    <Footer />
    </>
  )
}

export default App