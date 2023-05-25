"use client"; // this is a client component 👈🏽
import NavBar from "@/app/component/NavBar/NavBar.component";
import { callApiToCreateRequest } from "@/app/service/request.service";
import { CreateRequestDto } from "@/app/types/createdRequest.response";
import { useState } from 'react';
import './editpage.css';

const EditPage = () => {
  const [requestToCreate, setRequestToCreate] = useState<CreateRequestDto>({

    name: '',
    resolution: '',
    frenchAnswer: '',
    englishAnswer: '',
    projectName: '',
  });

  const handleInputChange = (e: { target: { id: any; value: any; }; }) => {
    setRequestToCreate({
      ...requestToCreate,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await callApiToCreateRequest(requestToCreate);
      setRequestToCreate({
        name: '',
        resolution: '',
        frenchAnswer: '',
        englishAnswer: '',
        projectName: '',

      });
    } catch (error) {
      console.error(error);
    }
  };

  /* const callApiToCreateRequest = async (RequestEntity: createRequestDto) => {
    try {
      const response = await axios.post('/api/requests', RequestEntity);
      return response.data;

    } catch (error) {
      throw new Error('Une erreur s\'est produite lors de la création de la requête');
    }
  };
 */
  return (
    <>
      <NavBar />
      <div className="formulaire">
        <h1>Formulaire de Création de Requête</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nom_projet">Nom du projet de la requête:</label>
          <input
            type="text"
            id="projectName"
            className="input-field"
            value={requestToCreate.projectName}
            onChange={(e) => handleInputChange(e)}
          />

          <label htmlFor="nom_requete">Nom de la requête:</label>
          <input
            type="text"
            id="name"
            className="input-field"
            value={requestToCreate.name}
            onChange={(e) => handleInputChange(e)} />

          <label htmlFor="resolution">Résolution:</label>
          <input
            type="text"
            id="resolution"
            className="input-field"
            value={requestToCreate.resolution}
            onChange={(e) => handleInputChange(e)} />

          <label htmlFor="reponse_francais">Réponse en français:</label>
          <input
            type="text"
            id="frenchAnswer"
            className="input-field"
            value={requestToCreate.frenchAnswer}
            onChange={(e) => handleInputChange(e)} />

          <label htmlFor="reponse_anglais">Réponse en anglais:</label>
          <input
            type="text"
            id="englishAnswer"
            className="input-field"
            value={requestToCreate.englishAnswer}
            onChange={(e) => handleInputChange(e)} />

          <button type="submit" className="submit-button">Soumettre</button>
        </form>
      </div>
    </>
  );
}

export default EditPage;
