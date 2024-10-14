// src/components/Author.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface IAuthor {
    id: string;
    name: string;
    image_url: string;
    email: string;
}

const Author: React.FC<IAuthor> = ({ name, image_url, email, id }) => {
    return (
        <div className="column is-one-third">
            <Link to={`/authors/${id}/courses`} style={{ textDecoration: 'none' }}>
                <div className="box" style={{ padding: '20px', textAlign: 'center', cursor: 'pointer', width: '400px' }}>
                    <img src={image_url} alt={name} style={{ borderRadius: '10%', width: 'auto', height: '250px' }} />
                    <h2 className="has-text-centered" style={{ marginTop: '10px', fontSize: '1.3rem', color: 'white', fontWeight:'bolder'}}>{name}</h2>
                    <p style={{ marginTop: '20px', border:'2px solid orange', marginBottom:'15px'}}>
                        <a href={`mailto:${email}`} style={{ color: 'orange', fontSize:'20px' }}>
                            Email Me 📨
                        </a>
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default Author;
