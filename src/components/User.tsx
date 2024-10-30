import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IUser } from '../interfaces/user';
import { ICourse } from '../interfaces/course';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../config';
import { Link } from "react-router-dom";
import './User.css'

const User: React.FC = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [courses, setCourses] = useState<ICourse[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("Authentication error: No token found");
                setLoading(false);
                return;
            }

            try {
                const userResponse = await axios.get(`${baseUrl}/auth/user/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(userResponse.data);

                // Check if user ID is defined before fetching courses
                const userId = userResponse.data._id;
                if (userId) {
                    await fetchCourses(userId, token);
                } else {
                    setError("User ID is undefined. Cannot fetch courses.");
                }
            } catch (err) {
                setError("Error fetching user data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const fetchCourses = async (userId: string, token: string) => {
        try {
            const coursesResponse = await axios.get(`${baseUrl}/courses/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCourses(coursesResponse.data);
        } catch (err) {
            console.error("Error fetching courses:", err);
        }
    };

    const handleRemoveCourse = async (courseId: string) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${baseUrl}/courses/${courseId}/remove/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
            alert("Course removed from your profile successfully!");
        } catch (err) {
            console.error("Error removing course:", err);
            alert("Failed to remove course from profile.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container" style={{ marginBottom: '150px', backgroundColor:'#363636'}}>
            <div className="profile-section" style={{ backgroundColor: '#f5f5f5', padding: '30px', marginBottom: '50px', textAlign: 'center', marginTop: '150px'}}>
                {user && (
                    <div className="box" >
                        <img
                            src={user.image_url}
                            alt="Profile"
                            style={{ borderRadius: '50%', width: '200px', height: '200px', objectFit: 'cover', marginBottom: '10px' }}
                        />
                        <h1 className="subtitle" style={{ marginTop: '10px', fontSize: '1.5em', fontWeight: 'bold' }}>{user.username}</h1>
                        {/* <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{user.email}</h3> */}
                        <p style={{ fontSize:'25px' }}>{user.country}</p>
                        <p style={{ marginTop: '10px', color: 'yellow', fontSize: '23px' }}>"{user.quote}"</p>
                    </div>
                )}
            </div>


            {/* Section for Courses Added by User */}
            <div className="courses-section">
                <h2 className="title has-text-centered" style={{ marginBottom: '50px' }}>My Learning Journey</h2>
                {courses.length > 0 ? (
                    <div className="columns is-multiline">
                        {courses.map(course => (
                            <div key={course.id} className="column is-one-third-desktop is-half-tablet">
                                <div className="card" style={{height: '580px'}}>
                                    <div className="card-content">
                                        <Link to={`/courses/${course.id}`} className="card-content">
                                            <div className="card-image">
                                                <figure className="image">
                                                    <img src={course.image_url} alt={course.title} style={{ objectFit: 'cover', width: '100%', height: '300px' }} />
                                                </figure>
                                            </div>
                                            <br/>
                                            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{course.title}</p>
                                        </Link>

                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                            <button
                                                className="button is-danger"
                                                onClick={() => handleRemoveCourse(course.id)}
                                                style={{ width: '80%' }} // Adjust button width if needed
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No courses added yet.</p>
                )}
            </div>
        </div>
    );
};

export default User;









