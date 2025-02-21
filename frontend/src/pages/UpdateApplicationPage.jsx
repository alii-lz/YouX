import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateApplicationPage = () => {
    const { appId } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        income: "",
        expenses: "",
        assets: "",
        liabilities: "",
    });

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    `http://localhost:3001/application/get/${appId}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch application");
                }
                const data = await response.json();
                setForm({
                    name: data.username,
                    income: data.income,
                    expenses: data.expenses,
                    assets: data.assets.join(", "),
                    liabilities: data.liabilities.join(", "),
                });
            } catch (error) {
                console.error("Error fetching application:", error);
            }
        };

        fetchApplication();
    }, [appId]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://localhost:3001/application/update/${appId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        username: form.name,
                        income: Number(form.income),
                        expenses: Number(form.expenses),
                        assets: form.assets
                            .split(",")
                            .map((item) => item.trim())
                            .filter((item) => item !== ""),
                        liabilities: form.liabilities
                            .split(",")
                            .map((item) => item.trim())
                            .filter((item) => item !== ""),
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update application");
            }

            navigate("/dashboard");
        } catch (error) {
            console.error("Error updating application:", error);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
                <h2 className='text-2xl font-bold mb-6 text-center'>
                    Update Application
                </h2>
                <form onSubmit={handleUpdate}>
                    <input
                        name='name'
                        value={form.name}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded mb-4'
                        placeholder='Name'
                        required
                    />
                    <input
                        name='income'
                        type='number'
                        value={form.income}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded mb-4'
                        placeholder='Income'
                        required
                    />
                    <input
                        name='expenses'
                        type='number'
                        value={form.expenses}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded mb-4'
                        placeholder='Expenses'
                        required
                    />
                    <input
                        name='assets'
                        value={form.assets}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded mb-4'
                        placeholder='Assets'
                        required
                    />
                    <input
                        name='liabilities'
                        value={form.liabilities}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded mb-4'
                        placeholder='Liabilities'
                        required
                    />
                    <div className='flex justify-between'>
                        <button
                            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200'
                            type='button'
                            onClick={() => {
                                navigate("/dashboard");
                            }}
                        >
                            Back to Dashboard
                        </button>
                        <button
                            onClick={handleUpdate}
                            className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200'
                            type='save'
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateApplicationPage;
