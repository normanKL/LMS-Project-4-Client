//- ./src/components/CreateSpecialist.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateSpecialist: React.FC = () => {
    const [newSpecialist, setNewSpecialist] = useState({
        image: '',
        name: '',
        email: '',
        designation: '',
        region: '',
        branch: '',
    });
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setNewSpecialist(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            await axios.post('/api/create-specialist', newSpecialist, {
                headers: { Authorization: `Bearer ${token}` }
            })
            navigate('/user')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error creating specialist', error.response?.data)
                setError('Error creating specialist. Please try again.')
            } else {
                console.error('Unexpected error', error)
                setError('Unexpected error. Please try again.')
            }
        }
    };

    return (
        <div className="container" style={{ marginTop: '40px', marginBottom: '100px' }}>
            <h2 className="title has-text-centered" style={{ marginBottom: '20px' }}>
                Create New Specialist </h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleFormSubmit} className="box">
                <div className="field" style={{ marginBottom: '20px' }}>
                    <label className="label">Image URL</label>
                    <div className="control">
                        <input className="input" type="text" name="image" value={newSpecialist.image} onChange={handleInputChange} required />
                    </div>
                </div>
                <div className="field" style={{ marginBottom: '20px' }}>
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" name="name" value={newSpecialist.name} onChange={handleInputChange} required />
                    </div>
                </div>
                <div className="field" style={{ marginBottom: '20px' }}>
                    <label className="label">Designation</label>
                    <div className="control">
                        <input className="input" type="text" name="designation" value={newSpecialist.designation} onChange={handleInputChange} required />
                    </div>
                </div>
                <div className="field" style={{ marginBottom: '20px' }}>
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="text" name="email" value={newSpecialist.email} onChange={handleInputChange} required />
                    </div>
                </div>
                <div className="field" style={{ marginBottom: '20px' }}>
                    <label className="label">Region</label>
                    <div className="control">
                        <input className="input" type="text" name="region" value={newSpecialist.region} onChange={handleInputChange} required />
                    </div>
                </div>
                <div className="field" style={{ marginBottom: '20px' }}>
                    <label className="label">Branch</label>
                    <div className="control">
                        <input className="input" type="text" name="branch" value={newSpecialist.branch} onChange={handleInputChange} required />
                    </div>
                </div>
                <br/>
                <div className="field is-grouped">
                    <div className="control">
                        <button type="submit" className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                        <button type="button" className="button is-light" onClick={() => navigate('/user')}>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateSpecialist;
