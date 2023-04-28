
"use client"; // this is a client component 👈🏽
import RequestContent from "@/app/component/dashboard-request.component/dasboard-request-content.component";
import DashboardFilter from "@/app/component/dashboard-filter.component/dashboard-filter.component";
import {useState} from "react";

const DashboardPage = () => { 
  const [selectedRequestId, setSelectedRequestId]=useState<number | undefined>(undefined);
  const setID: (id: number) => void = (id: number) => setSelectedRequestId(id); 

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <DashboardFilter onSelectedRequestIdChange={setID} />
        {selectedRequestId !== undefined && <RequestContent requestId={selectedRequestId}/>}
        </div>
      {/* Ajouter le reste du contenu de la page ici */}
    </div>
  );
};

export default DashboardPage;





