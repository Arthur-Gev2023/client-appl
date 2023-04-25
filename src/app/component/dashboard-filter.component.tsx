"use client"; // this is a client component 👈🏽
import { callApiToGetAllProjects } from '../service/project.service';
import { useState, useEffect } from 'react';
import { ProjectResponse } from '../types/project.response';



function DashboardFilter() {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [selectedProject, setSelectedProject] = useState<number>();

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

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(event.target.value);
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
    </div>
  );
}

export default DashboardFilter;