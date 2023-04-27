"use client"; // this is a client component 👈🏽
import { callApiToGetAllProjects, callApiToGetRequestsByProjectId } from '../service/project.service';
import { useState, useEffect } from 'react';
import { ProjectResponse } from '../types/project.response';



function DashboardFilter() {
  // Utilisation du Hook useState pour stocker l'état des projets récupérés depuis l'API
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  // Utilisation du Hook useState pour stocker l'ID du projet sélectionné dans le menu déroulant
  const [selectedProjectId, setSelectedProjectId] = useState<number>();
  // Utilisation du Hook useState pour stocker les requêtes associées au projet sélectionné
  const [requests, setRequests] = useState<{ id: number; name: string }[]>([]);
  // Utilisation du Hook useState pour stocker l'ID de la requête sélectionnée dans le menu déroulant
  const [selectedRequestId , setSelectedRequestId]= useState<number>()

  // Utilisation du Hook useEffect pour effectuer l'appel à l'API lors du montage du composant
  useEffect(() => {
    // Définition d'une fonction asynchrone pour appeler l'API
    const fetchData = async () => {
      try {
        // Appel de la fonction callApiToGetAllProjects qui retourne un Observable
        const subscription = callApiToGetAllProjects().subscribe({
          // Callback exécuté lorsque des données sont reçues
          next: (projects) => {
            // Mise à jour de l'état des projets
            setProjects(projects);
            // Si des projets ont été reçus, on sélectionne le premier projet et on met à jour la liste des requêtes associées
            if(projects && projects.length > 0) {
              const firstProject: ProjectResponse = projects[0];
              setSelectedProjectId(firstProject.id)
              setRequests(firstProject.requests)
            }
          },
          // Callback exécuté en cas d'erreur
          error: (err) => {
            console.error(err);
          },
          // Callback exécuté lorsque l'Observable est terminé
          complete: () => {
            console.log('API call completed successfully');
          },
        });

        // Retour d'une fonction de nettoyage pour annuler la souscription à l'Observable
        return () => subscription.unsubscribe();
      } catch (error) {
        console.log(error);
        setProjects([]);
      }
    };

    // Appel de la fonction fetchData
    fetchData();
  }, []);

  // Fonction exécutée lorsque la sélection du projet change
  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Récupération de l'ID du projet sélectionné
    const projectId: number = Number(event.target.value);
    // Mise à jour de l'ID du projet sélectionné
    setSelectedProjectId(projectId);
    // Récupération du projet sélectionné à partir de la liste des projets
    const selectedProject: ProjectResponse | undefined = projects.find(project => project.id === projectId );
    // Si un projet est sélectionné, on met à jour la liste des requêtes associées
    if(selectedProject)
      setRequests(selectedProject.requests)
      // Sinon, on vide la liste des requêtes
      else
      setRequests([]);
  };

  // Fonction exécutée lorsque la sélection de la requête change
  const handleRequestChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Mise à jour de l'ID de la requête sélectionnée
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


