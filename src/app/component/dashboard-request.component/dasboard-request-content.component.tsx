"use client"; // this is a client component 👈🏽
import { useEffect, useState } from "react";
import { RequestResponse } from "../../types/request.response";
import { callApiToGetRequestById } from "@/app/service/request.service";


function RequestContent(props: { requestId: number | undefined }) {
  const [selectedRequest, setSelectedRequest] = useState<RequestResponse | undefined>(undefined)

  useEffect(() => {
    if (props.requestId !== undefined) {
      callApiToGetRequestById(props.requestId).subscribe({
        next: result => {
          setSelectedRequest(result);


          console.log(result)
          console.log(props.requestId)
          console.log(selectedRequest)
        },
        error: () => setSelectedRequest(undefined)
      })
    } else {
      setSelectedRequest(undefined)
    }
  }, [props.requestId])

  if (props.requestId === undefined || !selectedRequest) {
    return <div>Pas de requête sélectionnée</div>
  }

  return (
    <div className="container">
      <div className="query">
        <h3>
          Requests Name
        </h3>
        <p>
          {selectedRequest!.name}


        </p>
      </div>
      <div className="resolution">
        <h2>
          Résolution de la requête
        </h2>
        <p>
          {selectedRequest.resolution}
        </p>
      </div>
      <div className="examples">
        <div className="response-fr">
          <h2>Réponse Français</h2>
          <p>
            {selectedRequest.frenchAnswer}
          </p>
        </div>
        <div className="response-en">
          <h2>Réponse Anglais</h2>
          <p> {selectedRequest.englishAnswer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default RequestContent;