/* eslint-disable react-hooks/exhaustive-deps */
"use client"; // this is a client component 👈🏽
import { useEffect, useState } from 'react';
import { callApiToGetAllProjects } from '../../service/project.service';
import { useState, useEffect } from 'react';
import { ProjectResponse } from '../../types/project.response';
import { RequestResponse } from '@/app/types/request.response';



function DashboardFilter(props: {
  onSelectedRequestIdChange: Dispatch<SetStateAction<number | undefined>>,
  deletedRequestId: number | undefined
}) {
  // Utilisation du Hook useState pour stocker l'état des projets récupérés depuis l'API
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  // Utilisation du Hook useState pour stocker l'ID du projet sélectionné dans le menu déroulant
  const [selectedProjectId, setSelectedProjectId] = useState<number>();
  // Utilisation du Hook useState pour stocker les requêtes associées au projet sélectionné
  const [requests, setRequests] = useState<{ id: number; name: string }[]>([]);
  // Utilisation du Hook useState pour stocker l'ID de la requête sélectionnée dans le menu déroulant
  const [selectedRequestId, setSelectedRequestId] = useState<number | undefined>(undefined);

  // Utilisation du Hook useEffect pour effectuer l'appel à l'API lors du montage du composant
  useEffect(() => {
    // Appel de la fonction callApiToGetAllProjects qui retourne un Observable
    const subscription = callApiToGetAllProjects().subscribe({
      // Callback exécuté lorsque des données sont reçues
      next: (projects) => {
        // Mise à jour de l'état des projets
        setProjects(projects);
        // Si des projets ont été reçus, on sélectionne le premier projet et on met à jour la liste des requêtes associées
        if (projects && projects.length > 0) {
          const firstProject: ProjectResponse = projects[0];
          setSelectedProjectId(firstProject.id);
          if (firstProject.requests && firstProject.requests.length > 0) {
            const firstRequestId: number = firstProject.requests[0].id;
            setSelectedRequestId(firstRequestId); // set the selected request id here
            props.onSelectedRequestIdChange(firstRequestId);
            setRequests(firstProject.requests);
          }
        }
      },
      // Callback exécuté en cas d'erreur
      error: (err) => {
        console.error(err);
      },
    });

    // Retour d'une fonction de nettoyage pour annuler la souscription à l'Observable
    return () => subscription.unsubscribe();
  }, []);



  const deleteRequest = (deletedRequestId: number) => {
    projects.forEach(project => project.requests.filter(request => request.id !== deletedRequestId));
    setProjects(projects);
    setRequests(requests.filter(request => request.id !== deletedRequestId));
    setSelectedRequestId(requests[0].id)
  }

  useEffect(() => {
    if (props.deletedRequestId !== undefined)
      deleteRequest(props.deletedRequestId)
  }, [props.deletedRequestId]);

  // Fonction exécutée lorsque la sélection du projet change
  const handleProjectChange = (projectId: number) => {
    // Récupération de l'ID du projet sélectionné

    // Mise à jour de l'ID du projet sélectionné
    setSelectedProjectId(projectId);

    // Récupération du projet sélectionné à partir de la liste des projets
    const selectedProject: ProjectResponse | undefined = projects.find(project => project.id === projectId);


    if (selectedProject?.requests && selectedProject.requests.length > 0) {
      // Vérifie si `selectedProject.requests` existe et a une longueur supérieure à 0
      // Utilisation de l'opérateur optionnel "?." pour éviter les erreurs si `selectedProject` est `undefined`

      // Si un projet est sélectionné, met à jour la liste des requêtes associées avec `setRequests`
      setRequests(selectedProject.requests);

      // Récupère l'ID de la première requête dans la liste des requêtes associées et le stocke dans `requestId`
      const requestId: number = selectedProject.requests[0].id;

      // Met à jour l'ID de la requête sélectionnée avec `setSelectedRequestId`
      setSelectedRequestId(requestId);

      // Déclenche une fonction callback pour informer que l'ID de la requête sélectionnée a changé avec `props.onSelectedRequestIdChange`
      props.onSelectedRequestIdChange(requestId);
    } else {
      // Si aucun projet n'est sélectionné, vide la liste des requêtes avec `setRequests`
      setRequests([]);

      // Met à jour l'ID de la requête sélectionnée avec `setSelectedRequestId`
      setSelectedRequestId(undefined);

      // Déclenche une fonction callback pour informer que l'ID de la requête sélectionnée a changé avec `props.onSelectedRequestIdChange`
      props.onSelectedRequestIdChange(undefined);
    }
  };




  // Fonction exécutée lorsque la sélection de la requête change
  const handleRequestChange = (idRequest: number) => {
    props.onSelectedRequestIdChange(idRequest);
    // Mise à jour de l'ID de la requête sélectionnée
    setSelectedRequestId(idRequest);
  };


  const handleDeleteFilter = (idRequest: number) => {
    const updatedRequests = requests.filter((request) => request.id !== idRequest);
    setRequests(updatedRequests);

    // Si la requête supprimée était sélectionnée, sélectionner la première requête du tableau
    if (selectedRequestId === idRequest) {
      handleRequestChange(updatedRequests[0].id);
    }
  }


  return (

    <div className='filter-input'>
      <div className="project-filter">
        <label htmlFor="project">Projet :</label>
        <select id="project" name="project" value={selectedProjectId} onChange={(event) => handleProjectChange(Number(event.target.value))}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))
          ) : (
            <option value="">Chargement des projets...</option>
          )}
        </select>
      </div>

      <br />
      <div className="request-filter">
        <label htmlFor="requests">Requête :</label>
        <select id="requests" name="requests" value={selectedRequestId} onChange={(event) => handleRequestChange(Number(event.target.value))}>
          {requests.length > 0 ? (
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
    </div>
  );
}

export default DashboardFilter;


