
"use client"; // this is a client component 👈🏽
import DashboardFilter from "@/app/component/dashboard-filter.component/dashboard-filter.component";
import { callApiToDeleteById } from "@/app/service/request.service";
import { useEffect, useState } from "react";
import { Observable } from 'rxjs';

const DashboardPage = () => {
  const [selectedRequestId, setSelectedRequestId] = useState<number | undefined>(undefined);
  const [deletedRequestId, setDeletedRequestId] = useState<number | undefined>(undefined);



  const handleDeleteRequest = (idRequest: number | undefined) => {
    const deleteRequest$ = new Observable<void>((observer) => {
      callApiToDeleteById(idRequest);
      observer.next();
      observer.complete();
    });

    deleteRequest$.subscribe(
      () => {
        setDeletedRequestId(idRequest);
        setSelectedRequestId(undefined);
      },
      (error) => {
        console.log(error);
      }
    );
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





