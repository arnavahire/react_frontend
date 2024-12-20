// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';

// const PostList = () => {
//     const [posts, setPosts] = useState([]);

//     // whatever we write in useEffect gets executed first.
//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const response = await axios.get('/posts');
//                 setPosts(response.data);
//                 console.log(response.data)
//             } catch (error) {
//                 console.error('Error fetching posts:', error);
//             }
//         };

//         fetchPosts();

//     }, []);

//     return (
//         <Box sx={{ p: 4 }}>
//             <Typography variant="h4" gutterBottom align="center">
//                 Post List
//             </Typography>
//             <Grid container spacing={3} align="center">
//                 {posts.map((post) => (
//                     <Grid item xs={12} sm={6} md={4} key={post.id}>
//                         <Card sx={{ maxWidth: 345 }}>
//                             <CardMedia
//                                 component="img"
//                                 height="140"
//                                 image={post.imageUrl || 'https://unsplash.com/photos/sunset-under-beach-JE01L3hB0GQ'} // Display an image or a placeholder
//                                 alt={post.caption}
//                             />
//                             <CardContent>
//                                 <Typography gutterBottom variant="h6" component="div">
//                                     {post.user.username}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     {post.caption}
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Box>
//     );
// };

// export default PostList;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardMedia, Grid, CircularProgress, Alert, Pagination } from '@mui/material';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const postsPerPage = 6;

    // Fetch posts when the component is mounted or page changes
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch posts from backend (using pagination)
                const response = await axios.get(`/posts?page=${page}&size=${postsPerPage}`);

                // Safely access posts and total in response
                if (response.data && response.data.posts) {
                    setPosts(response.data.posts);
                    setTotalPages(Math.ceil(response.data.total / postsPerPage)); // Calculate total pages based on backend response
                } else {
                    setError('No posts available.');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Error fetching posts. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page]);

    // Handle page change
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Post List
            </Typography>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            ) : (
                <>
                    <Grid container spacing={3} alignItems="stretch">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <Grid 
                                    item 
                                    xs={12} 
                                    sm={6} 
                                    md={4} 
                                    key={post.id} 
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Card 
                                        sx={{
                                            maxWidth: 345,
                                            width: '100%',
                                            boxShadow: 3,
                                            borderRadius: 2,
                                            transition: 'transform 0.3s, box-shadow 0.3s',
                                            '&:hover': {
                                                transform: 'scale(1.06)',
                                                boxShadow: 6,
                                            },
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={post.imageUrl || 'https://via.placeholder.com/345x200?text=No+Image'}
                                            alt={post.caption}
                                            sx={{
                                                objectFit: 'cover',
                                                borderTopLeftRadius: 2,
                                                borderTopRightRadius: 2,
                                            }}
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h6"
                                                component="div"
                                                sx={{ fontWeight: 'bold', textAlign: 'center' }}
                                            >
                                                {post.user.username}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    height: '4rem',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    textAlign: 'justify',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                }}
                                            >
                                                {post.caption}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Box sx={{ width: '100%', textAlign: 'center' }}>
                                <Typography variant="h6" color="text.secondary">
                                    No posts available.
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            variant="outlined"
                            shape="rounded"
                        />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default PostList;
