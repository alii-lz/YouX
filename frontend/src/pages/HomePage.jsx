import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className='flex justify-center items-center h-screen bg-gray-500'>
            <div className='bg-white p-8 rounded shadow-md text-center w-full max-w-sm'>
                <h1 className='text-3xl font-bold mb-6'>Welcome</h1>
                <p className='mb-6 text-gray-700'>
                    Please log in or register to continue.
                </p>
                <div>
                    <Link to='/login'>
                        <button className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300'>
                            Login
                        </button>
                    </Link>
                    <Link to='/register'>
                        <button className='mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300'>
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
