import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const AddNewManager = () => {
    const navigate = useNavigate();
    const handleMakeManager = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const mobile = event.target.mobile.value;
        const position = event.target.position.value;
        const img = event.target.img.value;
        const message = event.target.message.value;
        const manager = { name, email, mobile, position, img, message };
        if (position === 'Default') {
            toast.error('Select the Position')
            return;
        }
        else {
            let proceed = window.prompt("If you want want to make him manager, Please write 'manager'");
            if (proceed === null || proceed === "") {
                return
            }
            else if (proceed === 'manager') {
                fetch('http://localhost:5000/managers', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(manager)
                })
                    .then(res => {
                        if (res.status === 401 || res.status === 403) {
                            signOut(auth);
                            navigate('/');
                            toast.error("UnAuthorized Access. Please Login again");
                        }
                        return res.json()
                    })
                    .then(data => {
                        toast.success("New Manager Added Successfully");
                        navigate('/about')


                    })
            }
            else {
                return
            }

        }

    }
    return (
        <div className='why-main-div flex justify-center py-4'>
            <div className='w-1/2 py-8 bg-gray-700 rounded-3xl'>
                <h3 className='text-center text-success underline font-bold'>Add New Employee In Your Company</h3>
                <form name='review-form' onSubmit={handleMakeManager} action="" className='grid grid-cols-1 gap-4 justify-items-center my-8 px-5'>

                    <input type="text" name='name' placeholder='Name' className="input input-bordered input-success w-full " required />

                    <input type="email" name='email' placeholder='Email' className="input input-bordered input-success w-full" required />

                    <input type="number" name='mobile' placeholder='Mobile Number' className="input input-bordered input-success w-full" required />

                    <select defaultValue={'Default'} name='position' className="select select-success w-full">
                        <option value="Default" disabled>Select Position</option>
                        <option value="manager">Manager</option>
                        <option value="assistant_manager">Assistant Manager</option>


                    </select>


                    <input type="text" name='img' placeholder='Image Link' className="input input-bordered input-success w-full my-0" required />

                    <textarea name='message' className="textarea textarea-success w-full" placeholder="Message For the Customer" required></textarea>

                    <input type="submit" value="CONFIRM" className='btn btn-success w-full bg-red-300 text-xl' />


                </form>
            </div>
        </div>
    );
};

export default AddNewManager;