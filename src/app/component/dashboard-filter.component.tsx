"use client"; // this is a client component 👈🏽
import { callApiToGetAllProjects, callApiToGetRequestsByProjectId } from '../service/project.service';
import { useState, useEffect } from 'react';
import { ProjectResponse } from '../types/project.response';
import { RequestResponse } from '../types/request.response';



function DashboardFilter() {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [selectedProject, setSelectedProject] = useState<number>();
  const [requests, setRequests] = useState<RequestResponse[]>([]);
  const [selectedRequest , setSelectedRequest]= useState<number>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscription = callApiToGetAllProjects().subscribe({
          next: (data) => {
            // Handle the response data here
            setProjects(data);
            setSelectedProject(data[0].id); // Sélectionner le premier projet par défaut
          },
          error: (err) => {
            // Handle any errors that occur during the API call
            console.error(err);
          },
          complete: () => {
            // Handle any completion logic here
            console.log('API call completed successfully');
          },
        });

        return () => subscription.unsubscribe();
      } catch (error) {
        console.log(error);
        setProjects([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      const fetchRequests = async () => {
        try {
          const subscription = callApiToGetRequestsByProjectId(selectedProject).subscribe({
            next: (data) => {
              // Handle the response data here
              setRequests(data.requests);
              console.log(data.requests)
            },
            error: (err) => {
              // Handle any errors that occur during the API call
              console.error(err);
            },
            complete: () => {
              // Handle any completion logic here
              console.log('API call completed successfully');
            },
          });
  
          return () => subscription.unsubscribe();
        } catch (error) {
          console.log(error);
          setRequests([]);
        }
      };
  
      fetchRequests();
    }
  }, [selectedProject]);

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(Number(event.target.value));
  };

  const handleRequestChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Do something with the selected request ID
    setSelectedRequest(Number(event.target.value));
    console.log('Selected request ID:', event.target.value);
  };

 

  return (
    <div>
      <label htmlFor="project">Projet :</label>
      <select id="project" name="project" value={selectedProject} onChange={handleProjectChange}>
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))
        ) : (
          <option value="">Chargement des projets...</option>
        )}
      </select>
      <br />
      <label htmlFor="requests">Requête :</label>
      <select id="requests" name="requests" value={selectedRequest} onChange={handleRequestChange}>
        {Array.isArray(requests) && requests.length > 0 ? (
          requests.map((requests) => (
            <option key={requests.id} value={requests.id}>
              {requests.name}
            </option>
          ))
        ) : (
          <option value="">Sélectionner un projet pour charger les requêtes...</option>
        )}
      </select>
    </div>
  );
}

export default DashboardFilter;


