import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import url from "../url.js";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                `${url}/auth/login`,
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = response.data;

            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (error) {
            setError("ERROR please try again");
        }
    };

    return (
        <div className='flex justify-center items-center h-screen bg-gray-500'>
            <div className='bg-white p-6 rounded shadow-md text-black w-full max-w-sm'>
                <h2 className='text-2xl font-bold mb-4'>Login</h2>
                {error && <p className='text-red-500 mb-4'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block mb-2'>Email</label>
                        <input
                            type='email'
                            className='w-full p-2 border border-gray-300 rounded'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2'>Password</label>
                        <input
                            type='password'
                            className='w-full p-2 border border-gray-300 rounded'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-500 text-white p-2 rounded'
                    >
                        Login
                    </button>
                    <Link to='/register'>
                        <button
                            type='button'
                            className='w-full bg-gray-500 text-white p-2 rounded mt-2'
                        >
                            Don't have an account? Register
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
