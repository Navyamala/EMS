import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/add_category', { category })
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/category');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center min-vh-100'>
            <div className='p-4 rounded border shadow-lg w-100' style={{ maxWidth: '400px' }}>
                <h2 className='text-center mb-4'>Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='category' className='form-label'><strong>Category:</strong></label>
                        <input 
                            type='text' 
                            id='category' 
                            name='category' 
                            placeholder='Enter Category' 
                            onChange={(e) => setCategory(e.target.value)} 
                            className='form-control rounded-2' 
                            required 
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-2'>Add Category</button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;