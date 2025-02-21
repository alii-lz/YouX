import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationCard from "../components/ApplicationCard";

const DashboardPage = () => {
    const [applications, setApplications] = useState([]);
    const [selectedApplicationId, setSelectedApplicationId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    "http://localhost:3001/application/all",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Server error");
                }

                const data = await response.json();
                setApplications(data);
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };

        fetchApplications();
    }, []);

    const handleDelete = async () => {
        if (!selectedApplicationId) {
            alert("Please select an application to delete.");
            return;
        }

        if (
            !window.confirm("Are you sure you want to delete this application?")
        )
            return;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://localhost:3001/application/delete/${selectedApplicationId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete application");
            }

            setApplications(
                applications.filter((app) => app._id !== selectedApplicationId)
            );
        } catch (error) {
            console.error("Error deleting application:", error);
        }
    };

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
                    <button
                        onClick={() => {
                            if (selectedApplicationId) {
                                navigate(
                                    `/update-application/${selectedApplicationId}`
                                );
                            } else {
                                alert("Select an application first please");
                            }
                        }}
                        className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center'
                    >
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
                    <button
                        onClick={handleDelete}
                        className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center'
                    >
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
                {applications.map((application) => (
                    <button
                        key={application.id}
                        onClick={() => {
                            if (selectedApplicationId === application._id) {
                                setSelectedApplicationId(null);
                            } else {
                                setSelectedApplicationId(application._id);
                            }
                        }}
                    >
                        <ApplicationCard
                            key={application.id}
                            application={application}
                            isSelected={
                                selectedApplicationId === application._id
                            }
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;
