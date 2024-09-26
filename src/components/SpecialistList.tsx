// - ./src/components/SpecialistList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Specialist from './Specialist'; 
import { ISpecialist } from '../interfaces/specialist'; 
import { Link } from 'react-router-dom'; // Import Link for navigation

const SpecialistList: React.FC = () => {
    const [specialists, setSpecialists] = useState<ISpecialist[]>([])

    useEffect(() => {
        const fetchSpecialists = async () => {
            try {
                const response = await axios.get<ISpecialist[]>('http://localhost:8000/api/specialists')
                setSpecialists(response.data)
            } catch (error) {
                console.error("Error fetching specialists:", error)
            }
        }

        fetchSpecialists()
    }, [])

    return (
        <>
            <h1 className="title has-text-centered" style={{ margin: '40px' }}>HBBC Specialist List</h1>
            <div className="has-text-centered" style={{ marginBottom: '30px' }}>
                <Link to="/search" className="button is-primary">Search Specialists</Link>
            </div>
            <div style={{ backgroundColor: '#f5f5f5', padding: '20px', marginBottom: '100px' }}>
                <div className="columns is-multiline box">
                    {specialists.map((specialist) => (
                        <Specialist key={specialist._id} {...specialist} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default SpecialistList
