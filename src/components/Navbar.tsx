//- ./src/compenents/Navbar.tsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IUser } from "../interfaces/user";
import './Navbar.css';

interface NavbarProps {
    user: null | IUser;
    setUser: Function;
}

function Navbar({ user, setUser }: NavbarProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showWelcome, setShowWelcome] = useState(
        () => JSON.parse(localStorage.getItem("showWelcome") || "true")
    );
    const [currentTime, setCurrentTime] = useState<string>("");

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/auth/login");
    }

    // Inactivity timer function
    useEffect(() => {
        const INACTIVITY_LIMIT = 10 * 60 * 1000; // 15 minutes in milliseconds
        let inactivityTimer: ReturnType<typeof setTimeout>;

        const resetInactivityTimer = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(logout, INACTIVITY_LIMIT);
        };

        const activityEvents = ["mousemove", "mousedown", "keypress", "scroll", "touchstart"];

        // Set up event listeners
        activityEvents.forEach(event => window.addEventListener(event, resetInactivityTimer));

        // Set initial timer
        resetInactivityTimer();

        return () => {
            // Cleanup event listeners and timer on component unmount
            activityEvents.forEach(event => window.removeEventListener(event, resetInactivityTimer));
            clearTimeout(inactivityTimer);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem("showWelcome", JSON.stringify(showWelcome));
    }, [showWelcome]);

    useEffect(() => {
        const handleScroll = () => {
            setShowWelcome(window.scrollY <= 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        const intervalId = setInterval(updateTime, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <header>
                <nav className="navbar is-dark" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
                    <div className="navbar-container is-flex is-align-items-center" style={{ width: '100%' }}>
                        <div className="navbar-brand">
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
                                <button onClick={logout} className="button navbar-item is-ghost">
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </nav>

                {user && showWelcome && (
                    <div className="container is-flex" style={{ position: 'relative', top: '60px', color: '#fff', paddingTop: '30px', zIndex: 999, justifyContent: 'center', marginBottom: '-30px' }}>
                        <p className="welcome-message">{`🔆 Welcome ${user.username}`}</p>
                        <p className="welcome-time" style={{ marginLeft: 'auto' }}>{currentTime}</p>
                    </div>
                )}
            </header>

            <div style={{ marginTop: user ? '120px' : '60px' }}></div>
        </>
    );
}

export default Navbar;
