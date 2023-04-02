import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useState, useEffect } from 'react';
import md5 from 'md5';
import './Dashboard.css';

function Dashboard() {
  const [characters, setCharacters] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const [mostComics, setMostComics] = useState(null);
  const [mostSeries, setMostSeries] = useState(null);
  const [mostStories, setMostStories] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [url, setURL] = useState();
  const chartData = characters.map(character => {
    return {
      name: character.name,
      comics: character.comics.available,
      series: character.series.available,
      stories: character.stories.available,
    };
  });

  useEffect(() => {
    const publicKey = '7d3fa950f8a194731d92a69b9331f79e';
    const privateKey = '227efec3a6238e2797397bc492ef2ac4eee11880';
    const ts = Date.now().toString();
    const hash = md5(ts + privateKey + publicKey);
    
    const fetchCharacters = async () => {
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&orderBy=-modified&limit=100`
      );
      const responseData = await response.json();
      const allCharacters = responseData.data.results;
      setAllCharacters(allCharacters);
      

      // Find the character with the most comics
      const mostComicsCharacter = allCharacters.reduce((prev, current) => {
        if (prev.comics.available > current.comics.available) {
          return prev;
        } else {
          return current;
        }
      });
      setMostComics(mostComicsCharacter);

      // Find the character with the most series
      const mostSeriesCharacter = allCharacters.reduce((prev, current) => {
        if (prev.series.available > current.series.available) {
          return prev;
        } else {
          return current;
        }
      });
      setMostSeries(mostSeriesCharacter);

      // Find the character with the most stories
      const mostStoriesCharacter = allCharacters.reduce((prev, current) => {
        if (prev.stories.available > current.stories.available) {
          return prev;
        } else {
          return current;
        }
      });
      setMostStories(mostStoriesCharacter);

      setCharacters(allCharacters);
    };
    fetchCharacters();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
  
    const filteredCharacters = allCharacters.filter((character) => {
      return character.name.toLowerCase().includes(query);
    });
  
    setCharacters(filteredCharacters);
  };
  const changeURLtoAscending = () => {
      setURL(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&orderBy=name&limit=100`);
  }
  

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Marvel Characters</h1>
      <div className="dashboard-summary-container">
        <div className="dashboard-summary-box">
          <h2>Most Comics</h2>
          <div className="dashboard-summary-info">
            {mostComics ? (
              <>
                <img
                  src={`${mostComics.thumbnail.path}/portrait_uncanny.${mostComics.thumbnail.extension}`}
                  alt={mostComics.name}
                />
                <div>
                  <h3>{mostComics.name}</h3>
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="dashboard-summary-box">
          <h2>Most Series</h2>
          <div className="dashboard-summary-info">
            {mostSeries ? (
              <>
                <img
                  src={`${mostSeries.thumbnail.path}/portrait_uncanny.${mostSeries.thumbnail.extension}`}
                  alt={mostSeries.name}
                />
                <div>
                  <h3>{mostSeries.name}</h3>
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="dashboard-summary-box">
          <h2>Most Stories</h2>
          <div className="dashboard-summary-info">
            {mostStories ? (
              <>
                <img
                  src={`${mostStories.thumbnail.path}/portrait_uncanny.${mostStories.thumbnail.extension}`}
                  alt={mostStories.name}
                />
                <div>
                  <h3>{mostStories.name}</h3>
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
      <div className="dashboard-search-container">
        <input type="text" placeholder="Search characters..." onChange={handleSearch} />
      </div>
      <button
        onClick={changeURLtoAscending}
      >
        Ascending Order
      </button>
      <button
        onClick={changeURLtoAscending}
      >
        Descending Order
      </button>
      <div className="dashboard-characters-container">
        {characters.map(character => (
          <div className="dashboard-character-box" key={character.id}>
            <h3>{character.name}</h3>
            {character.description ? (
            <p>{character.description}</p>
            ) : (
            <p>No description available.</p>
            )}
            <div>
              <p>
                <strong>Comics:</strong> {character.comics.available}
              </p>
              <p>
                <strong>Series:</strong> {character.series.available}
              </p>
              <p>
                <strong>Stories:</strong> {character.stories.available}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="dashboard-chart-container">
        <h2>Number of Comics, Series, and Stories Available for Each Character</h2>
        <BarChart width={800} height={400} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="comics" fill="#8884d8" />
          <Bar dataKey="series" fill="#82ca9d" />
          <Bar dataKey="stories" fill="#ffc658" />
        </BarChart>
      </div>
    </div>
  );
  }
export default Dashboard;
