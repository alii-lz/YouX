import React from "react";

const ApplicationCard = ({ application, isSelected }) => {
    return (
        <div
            className={`${
                isSelected ? "bg-yellow-200" : "bg-blue-100"
            } rounded-lg shadow-md p-4 border border-black`}
        >
            <div className='mb-2'>
                <h2 className='text-lg font-semibold'>
                    Name: {application.username}
                </h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <div>
                    <p className='font-semibold mb-1'>Financial Info</p>
                    <p className='text-gray-700'>
                        Income: ${application.income}
                    </p>
                    <p className='text-gray-700'>
                        Expenses: ${application.expenses}
                    </p>
                </div>
                <div>
                    <div className='mb-2'>
                        <p className='font-semibold mb-1'>Assets</p>
                        <ul className='list-disc list-inside text-gray-700'>
                            {application.assets.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className='mb-2'>
                        <p className='font-semibold mb-1'>Liabilities</p>
                        <ul className='list-disc list-inside text-gray-700'>
                            {application.liabilities.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationCard;
