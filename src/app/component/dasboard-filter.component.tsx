"use client"; // this is a client component 👈🏽
import React, { useState, useEffect } from 'react';
import { callApiToGetAllProjects } from '../service/project.service';

function DashboardFilter() {
    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const subscription = callApiToGetAllProjects().subscribe({
                    next: data => {
                        // Handle the response data here
                        console.log(data);
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

    return (
        <div>
            <h1>Yo</h1>
        </div>
    );
}
  
  export default DashboardFilter;
