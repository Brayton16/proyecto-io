import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Proyecto3() {
  const [numGames, setNumGames] = useState(7);
  const [ph, setPh] = useState(0.5);
  const [pr, setPr] = useState(0.5);
  const [seriesFormat, setSeriesFormat] = useState(new Array(7).fill('A'));

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
    <div className="container mt-5">
      <h1 className="text-center mb-4">Series Deportivas</h1>
      
      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="numGames" className="form-label">Número máximo de juegos (n):</label>
          <input 
            type="number" 
            id="numGames"
            className="form-control" 
            value={numGames} 
            min="1" 
            max="11" 
            onChange={handleNumGamesChange} 
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="ph" className="form-label">Probabilidad de ganar en casa (Equipo A):</label>
          <input 
            type="number" 
            id="ph"
            className="form-control" 
            step="0.01" 
            min="0" 
            max="1" 
            value={ph} 
            onChange={(e) => setPh(parseFloat(e.target.value))} 
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="pr" className="form-label">Probabilidad de ganar de visita (Equipo A):</label>
          <input 
            type="number" 
            id="pr"
            className="form-control" 
            step="0.01" 
            min="0" 
            max="1" 
            value={pr} 
            onChange={(e) => setPr(parseFloat(e.target.value))} 
          />
        </div>
      </div>

      <div className="mb-4">
        <h3>Formato de la serie:</h3>
        <div className="btn-group" role="group" aria-label="Formato de la serie">
          {seriesFormat.map((team, index) => (
            <button 
              key={index} 
              onClick={() => handleSeriesFormatChange(index)}
              className={`btn ${team === 'A' ? 'btn-primary' : 'btn-secondary'}`}
            >
              {team}
            </button>
          ))}
        </div>
      </div>

      <h3>Tabla de Probabilidades</h3>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
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
  );
}

export default Proyecto3;
