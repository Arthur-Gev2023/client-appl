
"use client"; // this is a client component 👈🏽
import RequestContent from "@/app/component/dashboard-request.component/dasboard-request-content.component";
import DashboardFilter from "@/app/component/dashboard-filter.component/dashboard-filter.component";
import { useEffect, useState } from "react";
import { callApiToDeleteById } from "@/app/service/request.service";

const DashboardPage = () => {
  const [selectedRequestId, setSelectedRequestId] = useState<number | undefined>(undefined);
  const [deletedRequestId, setDeletedRequestId] = useState<number | undefined>(undefined);

  const handleDeleteRequest = async (idRequest: number | undefined) => {
    try {
      await callApiToDeleteById(idRequest);
      setDeletedRequestId(idRequest);
      setSelectedRequestId(undefined);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
  }, [selectedRequestId])


  return (
    <>
      <div className="dashboard-body">
        <h1>Dashboard</h1>
        <DashboardFilter onSelectedRequestIdChange={setSelectedRequestId} deletedRequestId={deletedRequestId} />
        <RequestContent requestId={selectedRequestId} />
        <button className="delete-btn" onClick={() => handleDeleteRequest(selectedRequestId)}>Supprimé la requête</button>

      </div>
    </>
  );
};

export default DashboardPage;





