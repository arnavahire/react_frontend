import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    // whatever we write in useEffect gets executed first.
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/posts');
                setPosts(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();

    }, []);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Post List
            </Typography>
            <Grid container spacing={3} align="center">
                {posts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={post.imageUrl || 'https://unsplash.com/photos/sunset-under-beach-JE01L3hB0GQ'} // Display an image or a placeholder
                                alt={post.caption}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {post.user.username}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {post.caption}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PostList;