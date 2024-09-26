// ./src/components/SearchSpecialist.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Specialist from './Specialist';
import { ISpecialist } from '../interfaces/specialist';
import { useNavigate } from 'react-router-dom';

const SearchSpecialist: React.FC = () => {
    const [name, setName] = useState('')
    const [region, setRegion] = useState('')
    const [branch, setBranch] = useState('')
    const [results, setResults] = useState<ISpecialist[]>([])
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSearch = async () => {
        setError('') // Clear previous errors
        try {
            const params: { name?: string; region?: string; branch?: string } = {}

            if (name) params.name = name;
            if (region) params.region = region;
            if (branch) params.branch = branch;

            const token = localStorage.getItem('token')

            const response = await axios.get<ISpecialist[]>('http://localhost:8000/api/specialists/search', {
                params,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setResults(response.data);
        } catch (error) {
            setError('Failed to fetch specialists. Please try again.')
        }
    };

    const handleBack = () => {
        navigate('/specialists')
    }

    return (
        <div className="container">
            <h1 className="title has-text-centered" style={{ margin: '30px' }}>Search Specialists</h1>
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter specialist name"
                    />
                </div>
            </div>

            <div className="columns" style={{ marginTop: '5px' }}>
                <div className="column is-one-quarter">
                    <div className="field">
                        <label className="label">Region</label>
                        <div className="control">
                            <div className="select">
                                <select
                                    value={region}
                                    onChange={(e) => setRegion(e.target.value)}
                                >
                                    <option value="">Select a region</option>
                                    <option value="Northern 1">Northern 1</option>
                                    <option value="Northern 2">Northern 2</option>
                                    <option value="Central 1">Central 1</option>
                                    <option value="Central 2">Central 2</option>
                                    <option value="Southern">Southern</option>
                                    <option value="East Malaysia">East Malaysia</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="column is-three-quarters">
                    <div className="field">
                        <label className="label">Branch</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                                placeholder="Enter branch"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="buttons" style={{ marginBottom: '40px' }}>
                <button className="button is-primary" onClick={handleSearch}>Search</button>
                <button className="button is-light" onClick={handleBack}>Back</button>
            </div>

            {error && <p className="has-text-danger">{error}</p>}

            {results.length > 0 && (
                <div style={{ backgroundColor: '#f5f5f5', padding: '20px', marginBottom: '100px' }}>
                    <div className="columns is-multiline box">
                        {results.map((specialist) => (
                            <Specialist key={specialist._id} {...specialist} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchSpecialist






