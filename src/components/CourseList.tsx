// - ./src/components/CourseList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Course from './Course';
import { ICourse } from '../interfaces/course';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { baseUrl } from '../config'
import './courseList.css'

const CoursetList: React.FC = () => {
    const [course, setCourse] = useState<ICourse[]>([])

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get<ICourse[]>(`${baseUrl}/courses/`)
                setCourse(response.data)
            } catch (error) {
                console.error("Error fetching specialists:", error)
            }
        }

        fetchCourse()
    }, [])

    return (
        <>
            <div className="course-list">
                <h1 className="title has-text-centered" style={{ marginTop: '150px' }}>Learning Courses</h1>
                <p style={{ margin: '30px', textAlign: 'center' }}>🌟 Click the courses for more details 🌟</p>
                <div style={{ backgroundColor: '#f5f5f5', padding: '20px', marginBottom: '50px', marginTop: '40px' }}>
                    <div className="columns is-multiline box">
                        {course.map((courseItem) => (
                            <Course key={courseItem.id} {...courseItem} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CoursetList