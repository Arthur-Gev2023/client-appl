"use client"; // this is a client component 👈🏽
import { useEffect, useState } from "react";
import { RequestResponse } from "../../types/request.response";
import { callApiToGetRequests } from "@/app/service/request.service";
import { request } from "http";


function RequestContent(props: { requestId: number | undefined }) {
  const [requests, setRequests] = useState<RequestResponse[]>([])
  const [selectedRequest, setSelectedRequest] = useState<RequestResponse>()

  const fetchData = async () => {
    try {
      const subscription = callApiToGetRequests().subscribe({
        next: (requests) => {
          setRequests(requests)
          setSelectedRequest(requests.find(req => req.id === props.requestId));

        },
        error: (err) => {
          console.log(err)
        },
        complete: () => {
          console.log('API call completed sucessfully')
        },
      })

      return () => subscription.unsubscribe();
    } catch (error) {
      console.log(error)
      setRequests([])

    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedRequest]);


  return (
    <div className="container">
      <div className="query">
        <h3>
          Requests Name
        </h3>
        <p>
          {selectedRequest?.name}


        </p>
      </div>
      <div className="resolution">
        <h2>
          Résolution de la requête
        </h2>
        <p>
          {selectedRequest?.resolution}
        </p>
      </div>
      <div className="examples">
        <div className="response-fr">
          <h2>Réponse Français</h2>
          <p>
            {selectedRequest?.frenchAnswer}
          </p>
        </div>
        <div className="response-en">
          <h2>Réponse Anglais</h2>
          <p> {selectedRequest?.englishAnswer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default RequestContent;