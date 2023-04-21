"use client"; // this is a client component 👈🏽
import React, { useState, useEffect } from 'react';
import { getData } from '../service/serviceProject';
import { from } from 'rxjs';

const GetAllProject = () => {
    const [data, setData] = useState([]);
  
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await getDataAsArray();
            const dataObservable = from(result);
            const subscription = getData().subscribe({
                next: data => {
                  // Handle the response data here
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
            setData([]);
          }
        };
    
        fetchData();
      }, []);
    
      const getDataAsArray = async () => {
        const data = await getData();
        return [data];
      };

    return (
      <div>
        <h1>Yo</h1>
        <ul>
        </ul>
      </div>
    );
  };
  
  export default GetAllProject;
