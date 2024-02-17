"use client"

import Sidebar from "../navbar/navbar";
import { Button, Card, Box,  Grid, Typography,} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


const Posts = () => {

  const router = useRouter();
  const [mgaUsers, setMgaUsers ] = useState([]);
  const [mgaPosts, setMgaPosts ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mgaUsersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const mgaUsersData = await mgaUsersResponse.json();
        setMgaUsers(mgaUsersData);

        const mgaPostsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const mgaPostsData = await mgaPostsResponse.json();
        setMgaPosts(mgaPostsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      
    };

    fetchData();
    
  }, []);


    return ( <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Sidebar />
        <Box component="main" mt={6} sx={{ p: 5 }}>
          <h2>Posts</h2>
          <Grid container spacing={2}>
            {mgaPosts.map((post, index) => {
              return(
                <>
                 <Grid item key={index} xs={12}>
                <Card
                  sx={{
                    maxWidth: 1200,
                    p: 7,
                    mx: "auto",
                    borderRadius: 6,
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.5s ease, box-shadow 0.5s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    <b>Title:</b> {post.title}<br/>
                    <small>Posted by: {
                        mgaUsers.map((user)=>{
                          if(user.id === post.userId){
                            return(user.name)
                          }
                        })
                      }</small>
                  </Typography>
                  <Typography paragraph>{post.body}</Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      router.push(`/postspage/${post.id}`);
                    }}
                    sx={{
                      mt: 2,
                      backgroundColor: '#08b4ac',
                      color: "#FFF",
                      "&:hover": {
                        backgroundColor: "#057e80", 
                      },
                    }}
                  >
                    See comments
                  </Button>
                </Card>
              </Grid>
                </>
              )
            }
            )}
          </Grid>
        </Box>
      </Box>
    </> );
}
 
export default Posts;