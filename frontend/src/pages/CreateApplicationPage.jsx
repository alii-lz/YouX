import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateApplicationPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        income: "",
        expenses: "",
        assets: "",
        liabilities: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                "http://localhost:3001/application/create",
                {
                    method: "POST",
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
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Application created:", data);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error creating application:", error);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
                <h2 className='text-2xl font-bold mb-6 text-center'>
                    Create Application
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 font-bold mb-2'
                            htmlFor='name'
                        >
                            Name
                        </label>
                        <input
                            className='w-full px-3 py-2 border rounded'
                            type='text'
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            id='name'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 font-bold mb-2'
                            htmlFor='income'
                        >
                            Income
                        </label>
                        <input
                            className='w-full px-3 py-2 border rounded'
                            type='number'
                            name='income'
                            value={form.income}
                            onChange={handleChange}
                            id='income'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 font-bold mb-2'
                            htmlFor='expenses'
                        >
                            Expenses
                        </label>
                        <input
                            className='w-full px-3 py-2 border rounded'
                            type='number'
                            name='expenses'
                            value={form.expenses}
                            onChange={handleChange}
                            id='expenses'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 font-bold mb-2'
                            htmlFor='assets'
                        >
                            Assets (comma-separated)
                        </label>
                        <input
                            className='w-full px-3 py-2 border rounded'
                            type='text'
                            name='assets'
                            value={form.assets}
                            onChange={handleChange}
                            id='assets'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 font-bold mb-2'
                            htmlFor='liabilities'
                        >
                            Liabilities (comma-separated)
                        </label>
                        <input
                            className='w-full px-3 py-2 border rounded'
                            type='text'
                            name='liabilities'
                            value={form.liabilities}
                            onChange={handleChange}
                            id='liabilities'
                            required
                        />
                    </div>
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
                            className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200'
                            type='submit'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateApplicationPage;
