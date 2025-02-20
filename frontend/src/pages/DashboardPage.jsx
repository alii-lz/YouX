import React from "react";
import { useNavigate } from "react-router-dom";
import ApplicationCard from "../components/ApplicationCard";

// test data
const initialApplications = [
    {
        id: 1,
        name: "Person A",
        income: 5000,
        expenses: 2000,
        assets: ["asset1", "asset2", "asset3"],
        liabilities: ["liability1", "liability2", "liability3"],
    },
    {
        id: 2,
        name: "Person B",
        income: 6000,
        expenses: 2500,
        assets: ["asset1", "asset2", "asset3"],
        liabilities: ["liability1", "liability2", "liability3"],
    },
    {
        id: 3,
        name: "Person C",
        income: 7000,
        expenses: 3000,
        assets: ["asset1", "asset2", "asset3"],
        liabilities: ["liability1", "liability2", "liability3"],
    },
];

const DashboardPage = () => {
    const navigate = useNavigate();
    return (
        <div className='p-8'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold'>Application Dashboard</h1>
                <div className='space-x-4'>
                    <button
                        onClick={() => {
                            navigate("/create-application");
                        }}
                        className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-4 w-4 mr-2'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                        >
                            <line x1='12' y1='5' x2='12' y2='19'></line>
                            <line x1='5' y1='12' x2='19' y2='12'></line>
                        </svg>
                        Create Application
                    </button>
                    <button className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-4 w-4 mr-2'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                        >
                            <path d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z'></path>
                        </svg>
                        Update Selected
                    </button>
                    <button className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-4 w-4 mr-2'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                        >
                            <path d='M3 6h18'></path>
                            <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'></path>
                            <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'></path>
                        </svg>
                        Delete Selected
                    </button>
                </div>
            </div>

            <div className='grid gap-6'>
                {initialApplications.map((application) => (
                    <ApplicationCard
                        key={application.id}
                        application={application}
                    />
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;
