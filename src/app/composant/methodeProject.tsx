"use client"; // this is a client component 👈🏽
import React, { useState, useEffect } from 'react';
import { callApiToGetAllProjects } from '../service/serviceProject';
import { from } from 'rxjs';

const GetAllProject = () => {
    const [numberList, setNumberList] = useState<number[]>([]);
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const subscription = callApiToGetAllProjects().subscribe({
                next: data => {
                  console.log(data)
                },
                error: err => {
                  // Handle any errors that occur during the API call
                  console.error(err);
                },
                complete: () => {
                  // Handle any completion logic here
                  console.log('API call completed successfully');
             
              }
            });
    
            return () => subscription.unsubscribe();
          } catch (error) {
            console.log(error);
            setNumberList([]);
          }
        };
    
        fetchData();
      }, []);
    

    return (
      <div>
        <h1>Yo</h1>
        <ul>
        </ul>
      </div>
    );
  };
  
  export default GetAllProject;
