//- ./src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import User from './components/User';
import Footer from './components/Footer';
import CourseList from './components/CourseList'
import CourseDetail from "./components/CourseDetail";
import AuthorCoursesList from "./components/AuthorCoursesList";

import { baseUrl } from './config'
import AuthorList from "./components/AuthorList";
import 'font-awesome/css/font-awesome.min.css';
import cuteDog from '/assets/dog-glasses.jpg';


function App() {
  const [user, setUser] = useState(null);
  const [isLightMode, setIsLightMode] = useState(false);

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

  useEffect(() => {
    const lightModeMediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    setIsLightMode(lightModeMediaQuery.matches);
    lightModeMediaQuery.addEventListener('change', (e) => setIsLightMode(e.matches));
    return () => lightModeMediaQuery.removeEventListener('change', (e) => setIsLightMode(e.matches));
  }, []);

  useEffect(() => {
    const handleOrientationChange = () => {
      const rotateMessage = document.querySelector('.rotate-message') as HTMLElement | null;
      if (rotateMessage) {
        if (window.innerWidth <= 1200 && window.innerHeight > window.innerWidth) {
          rotateMessage.style.display = 'block';
        } else {
          rotateMessage.style.display = 'none';
        }
      }
    };

    handleOrientationChange();

    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);


  return (
    <>
      <div className="rotate-message">
        <p style={{ width: '90%' }}><i className="fas fa-sync-alt"></i> Please rotate your device to landscape mode.</p>
        <br />
        <img src={cuteDog} alt="rotate" style={{ width: '90%', border: '3px solid grey', borderRadius: '10px' }} />
      </div>
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