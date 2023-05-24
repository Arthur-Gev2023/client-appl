
"use client"; // this is a client component 👈🏽
import NavBar from "@/app/component/NavBar/NavBar.component";
import DashboardFilter from "@/app/component/dashboard-filter.component/dashboard-filter.component";
import RequestContent from "@/app/component/dashboard-request.component/dasboard-request-content.component";
import { callApiToDeleteById } from "@/app/service/request.service";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [selectedRequestId, setSelectedRequestId] = useState<number | undefined>(undefined);
  const [deletedRequestId, setDeletedRequestId] = useState<number | undefined>(undefined);



  // const handleDeleteRequest = (idRequest: number | undefined) => {
  //   callApiToDeleteById(idRequest).subscribe({
  //     next: () => {
  //       setDeletedRequestId(idRequest);
  //       setSelectedRequestId(undefined);
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // };

  const handleDeleteRequest = async (idRequest: number | undefined) => {
    try {
      callApiToDeleteById(idRequest);
      setDeletedRequestId(idRequest);
      setSelectedRequestId(undefined);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
  }, [selectedRequestId])




  return (
    <>
      <NavBar />
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





