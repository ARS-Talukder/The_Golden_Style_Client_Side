import React from 'react';

const AllUsersRow = ({ user, index }) => {
    const { role, position } = user;

    return (
        <tr key={index} className='bg-gray-300 hover border-red-500 border-2 rounded'>
            <td className='py-3 border-2 border-red-500 text-center'>{index + 1}</td>
            <td className='py-3 border-2 border-red-500 text-center'>{user.email}</td>
            <td className='py-3 border-2 border-red-500 text-center'>
                {
                    position === 'chairman' ? <p className='font-bold text-danger'>Chairman</p>
                        :
                        (role === 'manager' ? <p className='font-bold text-success'>Manager</p>
                            : (role === 'barber' ? <p className='font-bold text-primary'>Barber</p>
                                : <p className='font-bold text-info'>Customer</p>))

                }
            </td>

        </tr>
    );
};

export default AllUsersRow;