"use client"; // this is a client component 👈🏽
import { useState } from "react";
import { RequestResponse } from "../../types/request.response";


function RequestContent (props:{requestId: number}) {
  const [request, setRequest]= useState<RequestResponse[]>([])


  // useEffect(()=>{
  //   if
  // })


  return (
    <>
    {props.requestId}
   <div className="container">
  <div className="query">
    <h2>Nom des requêtes</h2>
    <div className="resolution">
      <h2>Résolutions</h2>
    </div>
  </div>
  <div className="examples">
    <h2>Réponse Français</h2>
    <div className="response-fr">
      ifsdsnisdjn
    </div>
    <div className="response-en">
    <h2>Réponse Anglais</h2>
      dnlsndnq
    </div>
  </div>
</div>
    </>
  )
 }

 export default RequestContent;