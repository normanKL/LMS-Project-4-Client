// - ./src/components/Course.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { ICourse } from '../interfaces/course';
import axios from 'axios';
import { baseUrl } from '../config'
import './Course.css'

const Course: React.FC<ICourse> = ({ id, title, image_url, link, author, description, created_at, owner }) => {
    const isAuthorObject = (author: string | { name: string }): author is { name: string } => {
        return (author as { name: string }).name !== undefined;
    };

    const handleAddCourse = async (courseId: string) => {
        try {
            const token = localStorage.getItem('token')
            await axios.post(`${baseUrl}/courses/${courseId}/add/`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Course added to your profile successfully!");
        } catch (error) {
            console.error("Error adding course to profile:", error);
            alert("Failed to add course to profile.");
        }
    };

    return (
        <div className="column is-one-third-desktop is-one-third-tablet">
            <Link to={`/courses/${id}`} className="card" style={{
                border: 'none', // No border
                borderRadius: '10px', // Rounded corners
                // marginBottom: '30px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Subtle shadow
                transition: 'transform 0.2s',
                
            }}> 
            {/* Wrap in Link */}
                <div className="card-image">
                    <figure className="image is-1by1 box">
                        <img src={image_url} alt={title} style={{ objectFit: 'cover' }} />
                    </figure>
                </div>
                <div className="card-content" style={{ padding: '10px', height:'130px', color:'white' }}>
                    <p className="has-text-grey-lighter" style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '10px' }}>{title}</p>
                    {/* <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{link}</p> */}
                    {/* <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{description}</p> */}
                    <p className="has-text-grey-lighter" style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '10px' }}>Created by: {isAuthorObject(author) ? author.name : author}</p>
                    {/* <p style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}>{created_at}</p> */}
                    {/* Ensure you're displaying a valid string/field for owner */}
                    {/* <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Curator: {owner.username}</p> */}
                </div>
            </Link>
            <button
                className="button is-primary"
                onClick={() => handleAddCourse(id)}
                style={{ marginTop: '10px', width: '100%' }} // Adjust the style as needed
            >
                Add to Profile
            </button>
        </div>
    );
};

export default Course
