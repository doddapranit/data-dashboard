import React from 'react';
import CharacterDetails from './CharacterDetails';
import { useParams } from "react-router-dom";

function CharacterPage() {
  const id = useParams();
  console.log(id.id)

  return (
    <div>
      <h1>Character Page</h1>
      {id ? <CharacterDetails characterId={id.id} /> : <p>waiting</p>}
    </div>
  );
}

export default CharacterPage;
