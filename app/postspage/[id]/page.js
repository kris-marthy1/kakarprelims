'use client' 
import { useState, useEffect } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import Sidebar from "@/app/navbar/navbar";


export default function Page({ params }) {
    const PostID = params.id
    const [targetPost, setTargetPost ] = useState([]);
    const [targetComments, setTargetComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const mgaPostsResponse = await fetch('https://jsonplaceholder.typicode.com/posts/'+PostID);
            const mgaPostsData = await mgaPostsResponse.json();
            setTargetPost(mgaPostsData);
    
            const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments?postId='+PostID);
            const commentsData = await commentsResponse.json();
            setTargetComments(commentsData);
    
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
        
    }, []);

    return (
      <>
      <Box
      sx={{
        display: "flex",
        marginLeft: "auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sidebar />
      <Box component="main" mt={3} sx={{ p: 5 }}>
      {targetPost && (
                        <Card
                            sx={{
                                px: 3,
                                py: 2,
                                borderRadius: 6,
                                height: '200px',
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.5s ease, box-shadow 0.5s ease',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                }
                            }}
                        >
                            <h2>{targetPost.title}</h2>
                            <Typography paragraph>
                                {targetPost.body}
                            </Typography>
                        </Card>
                    )}
        <h2>Comments</h2>
        <Grid container spacing={2}>
          {Array.isArray(targetComments) ? (
            targetComments.map((comment, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    px: 3,
                    py: 2,
                    borderRadius: 6,
                    height: '200px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.5s ease, box-shadow 0.5s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    }
                  }}
                >
                  
                  <h3>{comment.name}</h3>
                  <Typography paragraph>
                    {comment.email}
                  </Typography>
                  <p>{comment.body}</p>
                </Card>
              </Grid>
            ))
          ) : (
            <p>No comments available.</p>
          )}
        </Grid>
      </Box>
    </Box>
      </>
    );
}
