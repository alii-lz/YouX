import React from "react";

const ApplicationCard = ({ application }) => {
    return (
        <div className='bg-white rounded-lg shadow-md p-6 border border-gray-200'>
            <div className='mb-4'>
                <h2 className='text-xl font-semibold'>{application.name}</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                    <p className='font-semibold mb-2'>Financial Information</p>
                    <p className='text-gray-600'>
                        Income: ${application.income}
                    </p>
                    <p className='text-gray-600'>
                        Expenses: ${application.expenses}
                    </p>
                </div>
                <div>
                    <div className='mb-4'>
                        <p className='font-semibold mb-2'>Assets</p>
                        <ul className='list-disc list-inside text-gray-600'>
                            {application.assets.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className='mb-4'>
                        <p className='font-semibold mb-2'>Liabilities</p>
                        <ul className='list-disc list-inside text-gray-600'>
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
