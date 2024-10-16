//- ./src/compenents/Navbar.tsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IUser } from "../interfaces/user";

interface NavbarProps {
    user: null | IUser
    setUser: Function
}

function Navbar({ user, setUser }: NavbarProps) {
    const navigate = useNavigate()
    const location = useLocation()
    const [showWelcome, setShowWelcome] = useState(true)
    const [currentTime, setCurrentTime] = useState<string>("")

    function logout() {
        localStorage.removeItem("token")
        setUser(null)
        navigate("/")
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setShowWelcome(false) // Hide welcome message on scroll
            } else {
                setShowWelcome(true) // Show welcome message at the top
            }
        };

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
            const formattedDate = now.toLocaleDateString('en-GB', dateOptions);
            const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
            const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
            setCurrentTime(`📅 Date: ${formattedDate} ⏰ Time: ${formattedTime}`);
        };

        updateTime(); 
        const intervalId = setInterval(updateTime, 60000); // Update every minute

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <header>
                {/* Fixed Navbar */}
                <nav
                    className="navbar is-dark"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        zIndex: 1000, // Ensure it's above other content
                    }}
                >
                    <div className="container">
                        <div className="navbar-brand">
                            {/* Only show Home link when the user is not logged in */}
                            {!user && (
                                <Link to="/" className="navbar-item">
                                    Home
                                </Link>
                            )}
                            {location.pathname !== "/" && !user && (
                                <>
                                    <Link to="auth/register" className="navbar-item">
                                        Signup
                                    </Link>
                                    <Link to="auth/login" className="navbar-item">
                                        Login
                                    </Link>
                                </>
                            )}
                            {user && (
                                <>
                                    <Link to="auth/user" className="navbar-item">
                                        Your Profile
                                    </Link>
                                    <Link to="courses/" className="navbar-item">
                                        Courses
                                    </Link>
                                    <Link to="authors/" className="navbar-item">
                                        Authors
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="navbar-end">
                            {user && (
                                <button
                                    onClick={logout}
                                    className="button navbar-item is-ghost"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Fixed Welcome Message Below Navbar */}
                {user && showWelcome && ( 
                    <div
                        className="container is-flex"
                        style={{
                            position: 'fixed',
                            top: '50px', // Just below the navbar
                            left: 0,
                            width: '100%',
                            color: '#fff', // White text color
                            padding: '30px 0',
                            zIndex: 999, // Below the navbar but above the content
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '200px'
                        }}
                    >
                        <p>{`🔆 Welcome ${user.username}`}</p>
                        <p>{currentTime}</p> 
                    </div>
                )}
            </header>

            {/* Add a margin-top to content below to avoid overlap */}
            <div style={{ marginTop: user ? '120px' : '60px' }}>
            </div>
        </>
    )
}

export default Navbar;



