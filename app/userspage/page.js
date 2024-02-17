"use client"

import Sidebar from "../navbar/navbar";
import { Button, Card, Box, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


const Users = () => {

  const router = useRouter();
  const [mgaUsers, setMgaUsers ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mgaUsersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const mgaUsersData = await mgaUsersResponse.json();
        setMgaUsers(mgaUsersData);

        const mgaTodosResponse = await fetch('https://jsonplaceholder.typicode.com/todos');
        const mgaTodosData = await mgaTodosResponse.json();
        setMgaToDos(mgaTodosData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      
    };

    fetchData();
    
  }, []);





    return ( <>
      
      <Box
        sx={{
          display: "flex",
          marginLeft: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sidebar />
        <Box component="main" mt={6} sx={{ p: 5 }}>
          <h2>Users' List</h2>
          <Grid container spacing={2}>
            {mgaUsers.map((user, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    px: 5,
                    py: 2,
                    borderRadius: 6,
                    height: "250px",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.5s ease, box-shadow 0.5s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >

                  <div p={9}>
                    
                  <Typography variant="h5"><b>{user.name}</b></Typography>
                  <Typography variant="body2" sx={{ fontSize: 12 }}>{user.email}</Typography>
                  <Typography variant="body2" sx={{ fontSize: 12 }}>Username: {user.username}</Typography>
                  <br />
                  <Typography>Phone No: {user.phone}</Typography>
                  <Typography>Website: {user.website}</Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      router.push(`/userspage/${user.id}`);
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
                    See Users ToDos
                  </Button>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};
 
export default Users;