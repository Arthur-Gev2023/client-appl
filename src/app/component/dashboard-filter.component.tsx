"use client"; // this is a client component 👈🏽
import { callApiToGetAllProjects, callApiToGetRequestsByProjectId } from '../service/project.service';
import { useState, useEffect } from 'react';
import { ProjectResponse } from '../types/project.response';



function DashboardFilter() {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number>();
  const [requests, setRequests] = useState<{ id: number; name: string }[]>([]);
  const [selectedRequestId , setSelectedRequestId]= useState<number>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscription = callApiToGetAllProjects().subscribe({
          next: (projects) => {
            // Handle the response data here
 
            setProjects(projects);
            // mettre dans la liste déroulate des requests la liste des requests contenue dans ton 1er project
            if(projects && projects.length > 0) {
              const firstProject: ProjectResponse = projects[0];
              setSelectedProjectId(firstProject.id)
              setRequests(firstProject.requests)
            }
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

  

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId: number = Number(event.target.value);
    setSelectedProjectId(projectId);
    const selectedProject: ProjectResponse | undefined = projects.find(project => project.id === projectId );
    if(selectedProject)
      setRequests(selectedProject?.requests)
      else
      setRequests([]);
  };

  
  const handleRequestChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Do something with the selected request ID
    setSelectedRequestId(Number(event.target.value));
    console.log('Selected request ID:', event.target.value);
  };

 

  return (
    <div>
      <label htmlFor="project">Projet :</label>
      <select id="project" name="project" value={selectedProjectId} onChange={handleProjectChange}>
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
      <select id="requests" name="requests" value={selectedRequestId} onChange={handleRequestChange}>
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


