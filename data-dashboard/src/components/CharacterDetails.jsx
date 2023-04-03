import React, { useState, useEffect } from "react";
import md5 from 'md5';

const CharacterDetails = ({ characterId }) => {
  const [character, setCharacter] = useState(null);
  console.log(characterId)
  useEffect(() => {
    const publicKey = '7d3fa950f8a194731d92a69b9331f79e';
    const privateKey = '227efec3a6238e2797397bc492ef2ac4eee11880';
    const ts = Date.now().toString();
    const hash = md5(ts + privateKey + publicKey);
    const fetchCharacter = async () => {
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
      );
      const data = await response.json();
      setCharacter(data.data.results[0]);
    };

    fetchCharacter();
  }, [characterId]);

  if (!character) {
    return <div>Loading character...</div>;
  }

  const { name, description, thumbnail } = character;
  const imageUrl = `${thumbnail.path}.${thumbnail.extension}`;

  return (
    <div>
      <h2>{name}</h2>
      <img src={imageUrl} alt={name} />
      <p>{description ? (
            <p>{description}</p>
            ) : (
            <p>No description available.</p>
            )}</p>
    </div>
  );
};

export default CharacterDetails;
