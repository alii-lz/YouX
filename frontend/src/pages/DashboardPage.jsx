import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationCard from "../components/ApplicationCard";
import axios from "axios";
import url from "../url.js";

const DashboardPage = () => {
    const [applications, setApplications] = useState([]);
    const [selectedApplicationId, setSelectedApplicationId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                const { data } = await axios.get(`${url}/application/all`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setApplications(data);
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };

        fetchApplications();
    }, [navigate]);

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
            if (!token) {
                navigate("/login");
                return;
            }

            await axios.delete(
                `${url}/application/delete/${selectedApplicationId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setApplications(
                applications.filter((app) => app._id !== selectedApplicationId)
            );
        } catch (error) {
            console.error("Error deleting application:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className='p-8'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold'>Application Dashboard</h1>
                <div className='space-x-4'>
                    <button
                        onClick={() => navigate("/create-application")}
                        className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200'
                    >
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
                        className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200'
                    >
                        Update Selected
                    </button>
                    <button
                        onClick={handleDelete}
                        className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200'
                    >
                        Delete Selected
                    </button>
                    <button
                        onClick={handleLogout}
                        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200'
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className='grid gap-6'>
                {applications.map((application) => (
                    <button
                        key={application.id}
                        onClick={() =>
                            setSelectedApplicationId(
                                application._id === selectedApplicationId
                                    ? null
                                    : application._id
                            )
                        }
                    >
                        <ApplicationCard
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
