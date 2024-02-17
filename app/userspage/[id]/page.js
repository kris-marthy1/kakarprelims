"use client"

import Sidebar from "@/app/navbar/navbar";
import { Card, Box} from "@mui/material";
import { useState, useEffect } from "react";


const ToDos = ({ params }) => {

  const userId = params.id
  const [mgaToDos, setMgaToDos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mgaTodosResponse = await fetch('https://jsonplaceholder.typicode.com/users/'+userId+'/todos');
        const mgaTodosData = await mgaTodosResponse.json();
        setMgaToDos(mgaTodosData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      
    };

    fetchData();
    
    
  }, []);





    return ( 
    <>
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        mt={9}
        sx={{
          p: 5,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {mgaToDos.map((todo, index) => (
          <Card
            key={index}
            sx={{
              flexBasis: 'calc(33.33% - 16px)',
              marginBottom: 16,
              py: 5,
              px: 5,
              borderRadius: 6,
              height: '300px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.5s ease, box-shadow 0.5s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            {todo.completed === false ? (
              <>
                <h5>{todo.title}</h5>
                <span style={{ color: 'green' }}>
                  <b>Completed</b>
                </span>
              </>
            ) : (
              <>
                <h5>{todo.title}</h5>
                <span style={{ color: 'red' }}>
                  <b>Unfinished</b>
                </span>
              </>
            )}
          </Card>
        ))}
      </Box>
    </Box>
    </> 
    
    );
}
 
export default ToDos;