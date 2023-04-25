"use client";
import { from } from "rxjs";
import { callApiToGetAllRequests } from "../service/serviceRequest";
import { useState, useEffect } from "react";


const GetAllRequest = () => {
    const [data, setData] = useState([]);
useEffect(() => {
    const fetchData = async () => {
      try {
        const subscription = callApiToGetAllRequests().subscribe({
            next: data => {
              // Handle the response data here
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
        setData([]);
      }
    };

    fetchData();
  }, []);








return (
    <div>
        <h1>YO YO</h1>
    </div>
);
};

export default GetAllRequest; 