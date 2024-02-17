'use client'

import Sidebar from "../navbar/navbar";
import { Card, Box, Grid } from "@mui/material";
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from "react";
import { LineChart } from '@mui/x-charts/LineChart';

export default function Home() {

  const [mgaUsers, setMgaUsers ] = useState([]);
  const [mgaPosts, setMgaPosts ] = useState([]);
  const [mgaComments, setMgaComments] = useState([]);
  const [mgaToDos, setMgaToDos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mgaUsersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const mgaUsersData = await mgaUsersResponse.json();
        setMgaUsers(mgaUsersData);

        const mgaPostsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const mgaPostsData = await mgaPostsResponse.json();
        setMgaPosts(mgaPostsData);

        const mgaCommentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
        const mgaCommentsData = await mgaCommentsResponse.json();
        setMgaComments(mgaCommentsData);

        const mgaTodosResponse = await fetch('https://jsonplaceholder.typicode.com/todos');
        const mgaTodosData = await mgaTodosResponse.json();
        setMgaToDos(mgaTodosData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const chartData = [
    mgaUsers.length,
    mgaPosts.length,
    mgaComments.length,
    mgaToDos.length,
  ];





  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" mt={6} sx={{ flexGrow: 1, p: 5 }}>
          <h2>Dashboard</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
            <Card
                mt={9}
                sx={{
                  px: 10,
                  borderRadius: 6,
                  height: 'auto',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                  transition: 'transform 0.5s ease, box-shadow 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >


                  <BarChart
                    xAxis={[{ scaleType: 'band', data: ['Users', 'Posts', 'Comments', 'Todos'] }]}
                    series={[
                      {
                        data: chartData
                      },
                    ]}
                    barRoundness={0.5}
                    height={400}
                  />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Card
                mt={9}
                sx={{
                  px: 10,
                  borderRadius: 6,
                  height: 'auto',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                  transition: 'transform 0.5s ease, box-shadow 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
