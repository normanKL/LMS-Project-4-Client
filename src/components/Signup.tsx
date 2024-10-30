// - ./src/components/Signup.tsx

import { useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IUser } from "../interfaces/user";  // Assuming IUser includes _id and image
import { baseUrl } from '../config';
import './Signup.css'

// Define a complete interface for the signup form data
interface SignupFormData extends IUser {
    password: string;
    password_confirmation: string;
    first_name: string;
    last_name: string;
    image_url: string;   // **Added image_url**
    country: string;     // **Added country**
    quote: string;       // **Added quote**
}

// Define a type for error messages
interface ErrorData {
    email?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    password_confirmation?: string;
    image_url?: string;   // **Added image_url to error data**
    country?: string;      // **Added country to error data**
    quote?: string;        // **Added quote to error data**
    general?: string;      // For general error messages

}

function Signup() {
    const [formData, setFormData] = useState<SignupFormData>({
        _id: "", // Include _id with an initial value
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        password_confirmation: "",
        image_url: "",      // **Added image_url**
        country: "",        // **Added country**
        quote: "",          // **Added quote**

    });

    const [errorData, setErrorData] = useState<ErrorData>({}); // Use ErrorData type for error messages

    const navigate = useNavigate();

    function handleChange(e: SyntheticEvent) {
        const targetElement = e.target as HTMLInputElement;
        const newFormData = {
            ...formData,
            [targetElement.name]: targetElement.value,
        };
        setFormData(newFormData);
    }

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();

        // Validate required fields
        const requiredFields = ['email', 'username','password', 'password_confirmation', 'image_url', 'country', 'quote']; 
        const newErrorData: ErrorData = {};

        requiredFields.forEach(field => {
            if (!formData[field as keyof SignupFormData]) {
                newErrorData[field as keyof ErrorData] = `${field} is required.`;
            }
        });

        // Validate password match
        if (formData.password !== formData.password_confirmation) {
            newErrorData.password_confirmation = "Passwords do not match.";
        }

        if (Object.keys(newErrorData).length > 0) {
            setErrorData(newErrorData);
            return;
        }

        // Clear previous error messages
        setErrorData({});

        try {
            const response = await axios.post(`${baseUrl}/auth/register/`, formData);
            console.log(response.data);
            navigate("/auth/login/");
        } catch (error: any) {
            // Update state with error messages if the response contains them
            if (error.response && error.response.data) {
                setErrorData(error.response.data.errors || {});
            } else {
                // Fallback error message
                setErrorData({ general: "An unexpected error occurred. Please try again." });
            }
        }
    }

    return (
        <div className="signup-section">
            <div className="container" style={{ paddingBottom: '80px' }}>
                <form onSubmit={handleSubmit}>
                    <h2 style={{ fontSize: '23px', fontWeight: 'bold' }}>Section A: Signup Details</h2>
                    <br />

                    {/* First Name Field */}
                    <div className="field">
                        <label htmlFor="first_name" className="label">
                            First Name
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                            {errorData.first_name && (
                                <small className="has-text-danger">{errorData.first_name}</small>
                            )}
                        </div>
                    </div>

                    {/* Last Name Field */}
                    <div className="field">
                        <label htmlFor="last_name" className="label">
                            Last Name
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                            {errorData.last_name && (
                                <small className="has-text-danger">{errorData.last_name}</small>
                            )}
                        </div>
                    </div>

                    {/* Username Field */}
                    <div className="field">
                        <label htmlFor="username" className="label">
                            Username
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            {errorData.username && (
                                <small className="has-text-danger">{errorData.username}</small>
                            )}
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="field" style={{ marginTop: '25px', marginBottom: '15px' }}>
                        <label htmlFor="email" className="label">
                            Email
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errorData.email && (
                                <small className="has-text-danger">{errorData.email}</small>
                            )}
                        </div>
                    </div>

                    {/* Image URL Field */}
                    <div className="field" style={{ marginTop: '25px', marginBottom: '15px' }}>
                        <label htmlFor="image_url" className="label">
                            Image URL
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                name="image_url"
                                value={formData.image_url}  // **Added value for image_url**
                                onChange={handleChange}
                            />
                            {errorData.image_url && (
                                <small className="has-text-danger">{errorData.image_url}</small>
                            )}
                        </div>
                    </div>

                    {/* Country Field */}
                    <div className="field" style={{ marginTop: '25px', marginBottom: '15px' }}>
                        <label htmlFor="country" className="label">
                            Country
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                name="country"
                                value={formData.country}  // **Added value for country**
                                onChange={handleChange}
                            />
                            {errorData.country && (
                                <small className="has-text-danger">{errorData.country}</small>
                            )}
                        </div>
                    </div>

                    {/* Quote Field */}
                    <div className="field" style={{ marginTop: '25px', marginBottom: '15px' }}>
                        <label htmlFor="quote" className="label">
                            Quote
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                name="quote"
                                value={formData.quote}  // **Added value for quote**
                                onChange={handleChange}
                            />
                            {errorData.quote && (
                                <small className="has-text-danger">{errorData.quote}</small>
                            )}
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="field" style={{ marginTop: '25px', marginBottom: '15px' }}>
                        <label htmlFor="password" className="label">
                            Password
                        </label>
                        <div className="control">
                            <input
                                type="password"
                                className="input"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errorData.password && (
                                <small className="has-text-danger">{errorData.password}</small>
                            )}
                        </div>
                    </div>

                    {/* Password Confirmation Field */}
                    <div className="field" style={{ marginTop: '25px', marginBottom: '15px' }}>
                        <label htmlFor="passwordConfirmation" className="label">
                            Password Confirmation
                        </label>
                        <div className="control">
                            <input
                                type="password"
                                className="input"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                            />
                            {errorData.password_confirmation && (
                                <small className="has-text-danger">
                                    {errorData.password_confirmation}
                                </small>
                            )}
                        </div>
                    </div>

                    {/* General Error Message */}
                    {errorData.general && (
                        <small className="has-text-danger">{errorData.general}</small>
                    )}

                    <button type="submit" className="button is-primary" style={{ marginTop: '25px' }}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;

