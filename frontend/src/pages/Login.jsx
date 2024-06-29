import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Route } from 'react-router-dom';

export default function Login({ handleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Get the history object
    const navigate = useNavigate();

    const handleButtonClick = async () => {
        try {
            const response = await axios.post('http://localhost:5600/auth/login', {
                email: email,
                password: password,
            });

            // Assuming your backend responds with some kind of success indicator
            if (response.data.success) {
                // Redirect the user to the dashboard component
                navigate('/dashboard');
            } else {
                setError('Invalid email or password'); // Set an error message for unsuccessful login
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error:', error.message);
            }
            setError('An error occurred during login');
        }

        handleLogin();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#C6EFF1]">
            <div className="bg-white rounded-lg shadow-xl p-8 lg:w-1/3 md:w-96 sm:w-full">
                <div className='text-center text-3xl font-bold pb-8'>
                    Log In
                </div>
                <div>
                    <form action="">
                        <label htmlFor="email">Enter Registered Email/Phone</label>
                        <br />
                        <input
                            className='w-full mb-5'
                            type="text"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <br />
                        <label htmlFor="password">Enter password</label>
                        <br />
                        <input
                            className='w-full mb-5'
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <br />
                        <div className='w-full text-center'>
                            <button
                                className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                                onClick={handleButtonClick} // Call handleButtonClick when clicked
                                type="button"
                            >
                                Submit
                            </button>
                        </div>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}
