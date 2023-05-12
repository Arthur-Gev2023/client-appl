"use client"; // this is a client component 👈🏽
import { useEffect, useState } from "react";
import { RequestResponse } from "../../types/request.response";
import { callApiToGetRequestById } from "@/app/service/request.service";
import './dashboard-request.component.css'



function RequestContent(props: { requestId: (number | undefined) }) {
  // Initialisation de l'état local `selectedRequest` avec `undefined`
  const [selectedRequest, setSelectedRequest] = useState<RequestResponse | undefined>(undefined);


  // Utilisation de useEffect pour exécuter une action lorsque `props.requestId` change
  useEffect(() => {
    // Vérifie si `props.requestId` n'est pas `undefined`
    if (props.requestId !== undefined) {
      // Appel de l'API pour obtenir une requête par ID en utilisant `callApiToGetRequestById`
      // `subscribe` permet d'observer les résultats de l'appel
      callApiToGetRequestById(props.requestId).subscribe({
        // Exécution de cette fonction lorsque l'appel réussit
        next: result => {
          // Met à jour l'état local `selectedRequest` avec le résultat de l'appel
          setSelectedRequest(result);
        },
        // Exécution de cette fonction lorsqu'il y a une erreur lors de l'appel
        error: () => setSelectedRequest(undefined)
      })
    } else {
      // Si `props.requestId` est `undefined`, met à jour l'état local `selectedRequest` avec `undefined`
      setSelectedRequest(undefined);
    }
  }, [props.requestId]); // La dépendance de l'effet est `props.requestId`

  if (props.requestId === undefined || !selectedRequest) {
    return (
      <>
        <div className="global-container">
          <div className="container">
            <div className="headcontainer">
              <div className="query">
                <h2>Request Name</h2>
                <p></p>
              </div>
              <div className="resolution">
                <h2>Résolution de la requête</h2>
                <p></p>
              </div>
            </div>
            <div className="examples">
              <div className="response-fr">
                <h2>Réponse Français</h2>
                <p></p>
              </div>
              <div className="response-en">
                <h2>Réponse Anglais</h2>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </>
    );

  }



  return (
    <>
      <div className="global-container">
        <div className="container">
          <div className="headcontainer" key={selectedRequest.id}>
            <div className="query">
              <h2>Request Name</h2>
              <p>{selectedRequest.name}</p>
            </div>
            <div className="resolution">
              <h2>Résolution de la requête</h2>
              <p>{selectedRequest.resolution}</p>
            </div>
          </div>
          <div className="examples">
            <div className="response-fr">
              <h2>Réponse Français</h2>
              <p>{selectedRequest.frenchAnswer}</p>
            </div>
            <div className="response-en">
              <h2>Réponse Anglais</h2>
              <p>{selectedRequest.englishAnswer}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default RequestContent;