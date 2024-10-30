// src/components/AuthorCoursesList.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Course from './Course';
import { ICourse } from '../interfaces/course';
import { baseUrl } from '../config';
import './AuthorCoursesList.css'


const AuthorCoursesList: React.FC = () => {
    const { authorId } = useParams<{ authorId: string }>(); // Get authorId from URL
    const [courses, setCourses] = useState<ICourse[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuthorCourses = async () => {
            try {
                const response = await axios.get<ICourse[]>(`${baseUrl}/authors/${authorId}/courses`);
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses for author:', error);
            }
        };

        fetchAuthorCourses();
    }, [authorId]);

    return (
        <div className='author-courses-list'>
            <button
                className="button is-link"
                onClick={() => navigate(-1)} // Go back to the previous page
                style={{ marginTop: '30px', marginLeft: '40px' }}
            >
                Back To Previous
            </button>

            <h1 className="title has-text-centered" style={{marginTop:'10px', margin:'30px'}}>Courses by Author</h1>
            <p style={{ margin: '30px', textAlign: 'center' }}>🌟 Click the courses for more details 🌟</p>
            <div className="columns is-multiline box" style={{ marginTop: '10px', marginBottom: '100px', marginLeft:'30px', marginRight:'30px' }}>
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <Course key={course.id} {...course} />
                    ))
                ) : (
                    <p>No courses found for this author.</p>
                )}

            </div>
        </div>
    );
};

export default AuthorCoursesList;
