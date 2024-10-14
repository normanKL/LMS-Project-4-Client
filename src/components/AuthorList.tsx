// src/components/AuthorList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Author from './Author';
import { baseUrl } from '../config';

const AuthorList: React.FC = () => {
    const [authors, setAuthors] = useState<any[]>([]); // Adjust type if you have an interface for authors

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get<any[]>(`${baseUrl}/authors/`); // Adjust type if needed
                setAuthors(response.data);
            } catch (error) {
                console.error("Error fetching authors:", error);
            }
        };

        fetchAuthors();
    }, []);

    return (
        <>
            <h1 className="title has-text-centered" style={{ marginTop: '150px' }}>Our Authors</h1>
            <p style={{ margin: '30px', textAlign: 'center' }}>🏆 Click the auhtor's profile for their courses 🏆</p>
            <div style={{ backgroundColor: '#f5f5f5', padding: '20px', marginBottom: '100px' }}>
                <div className="columns is-multiline box is-centered">
                    {authors.map((author) => (
                        <div key={author.id}>
                            <Author {...author} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AuthorList;
