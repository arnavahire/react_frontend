import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
    const [caption, setCaption] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(sessionStorage.getItem('user'));
        try {
            const response = await axios.post('/posts', {
                user,
                caption,
                imageUrl
            });
            console.log('Post created:', response.data);
            // Optionally reset the form or show success message
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Caption" 
                value={caption} 
                onChange={(e) => setCaption(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                placeholder="Image URL" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                required 
            />
            <button type="submit">Create Post</button>
        </form>
    );
};

export default CreatePost;
