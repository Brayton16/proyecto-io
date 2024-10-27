
//const Proyecto3  = ( ) => {
//    return(
//        <div>
//            Hola Mundo!
//        </div>
//    )
//}


import React, { useState } from 'react';

function Proyecto3() {
  const [numGames, setNumGames] = useState(7); // Número máximo de juegos, por defecto 7
  const [ph, setPh] = useState(0.5); // Probabilidad del equipo A ganando en casa
  const [pr, setPr] = useState(0.5); // Probabilidad del equipo A ganando de visita
  const [seriesFormat, setSeriesFormat] = useState(new Array(7).fill('A')); // Por defecto, el equipo A es local en todos los juegos

  const handleNumGamesChange = (e) => {
    const value = Math.min(Math.max(parseInt(e.target.value), 1), 11);
    setNumGames(value);
    setSeriesFormat(new Array(value).fill('A'));
  };

  const handleSeriesFormatChange = (index) => {
    const newFormat = [...seriesFormat];
    newFormat[index] = newFormat[index] === 'A' ? 'B' : 'A';
    setSeriesFormat(newFormat);
  };

  const calculateProbabilities = () => {
    const probabilities = [];
    for (let i = 0; i < numGames; i++) {
      const isHome = seriesFormat[i] === 'A';
      const winProbability = isHome ? ph : pr;
      probabilities.push({
        game: i + 1,
        homeTeam: seriesFormat[i],
        winProbability: winProbability.toFixed(2),
        loseProbability: (1 - winProbability).toFixed(2),
      });
    }
    return probabilities;
  };

  const probabilities = calculateProbabilities();

  return (
    <div className="app-container">
      <h1>Series Deportivas</h1>
      
      {/* Inputs para el usuario */}
      <div className="input-section">
        <label>Número máximo de juegos (n):</label>
        <input 
          type="number" 
          value={numGames} 
          min="1" 
          max="11" 
          onChange={handleNumGamesChange} 
        />
      </div>

      <div className="input-section">
        <label>Probabilidad de ganar en casa (Equipo A):</label>
        <input 
          type="number" 
          step="0.01" 
          min="0" 
          max="1" 
          value={ph} 
          onChange={(e) => setPh(parseFloat(e.target.value))} 
        />
      </div>

      <div className="input-section">
        <label>Probabilidad de ganar de visita (Equipo A):</label>
        <input 
          type="number" 
          step="0.01" 
          min="0" 
          max="1" 
          value={pr} 
          onChange={(e) => setPr(parseFloat(e.target.value))} 
        />
      </div>

      {/* Botones para el formato de la serie */}
      <div className="format-section">
        <h3>Formato de la serie:</h3>
        {seriesFormat.map((team, index) => (
          <button 
            key={index} 
            onClick={() => handleSeriesFormatChange(index)}
            className={`format-button ${team === 'A' ? 'team-a' : 'team-b'}`}
          >
            {team}
          </button>
        ))}
      </div>

      {/* Tabla de Probabilidades */}
      <div>
        <h3>Tabla de Probabilidades</h3>
        <table className="probability-table">
          <thead>
            <tr>
              <th>Juego</th>
              <th>Equipo Local</th>
              <th>Probabilidad de Ganar (A)</th>
              <th>Probabilidad de Perder (A)</th>
            </tr>
          </thead>
          <tbody>
            {probabilities.map((prob, index) => (
              <tr key={index}>
                <td>{prob.game}</td>
                <td>{prob.homeTeam}</td>
                <td>{prob.winProbability}</td>
                <td>{prob.loseProbability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default Proyecto3;