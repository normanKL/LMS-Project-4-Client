//- ./src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import User from './components/User';
import Footer from './components/Footer';
import Course from './components/Course';
import CourseList from './components/CourseList'
import CourseDetail from "./components/CourseDetail";
import AuthorCoursesList from "./components/AuthorCoursesList";

import {baseUrl} from './config'
import AuthorList from "./components/AuthorList";


function App() {
  const [user, setUser] = useState(null)

  async function fetchUser() {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${baseUrl}/auth/user`, {
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
        <Route path="auth/register" element={<Signup />} />
        <Route path="auth/login" element={<Login fetchUser={fetchUser} />} />
        <Route path="courses/" element={<CourseList />} />
        <Route path="courses/:id" element={<CourseDetail />} /> 
        <Route path="auth/user" element={<User />} />
        <Route path="authors/" element={<AuthorList />} />
        <Route path="authors/:authorId/courses" element={<AuthorCoursesList />} />
      </Routes>
    </Router>
    <Footer />
    </>
  )
}

export default App