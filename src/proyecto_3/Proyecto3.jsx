import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//Funcion del proyecto 3 sobre el algoritmo de Series deportivas 
function Proyecto3() {
  const [numGames, setNumGames] = useState(4);
  const [pHomeA, setPHomeA] = useState(0.80);  // Probabilidad de que A gane en casa
  const [pHomeB, setPHomeB] = useState(0.20);  // Probabilidad de que B gane en casa
  const [pAwayA, setPAwayA] = useState(0.75);  // Probabilidad de que A gane de visita
  const [pAwayB, setPAwayB] = useState(0.25);  // Probabilidad de que B gane de visita
  const [probabilities, setProbabilities] = useState([]);

  const handleNumGamesChange = (e) => {
    const value = Math.min(Math.max(parseInt(e.target.value), 1), 11);
    setNumGames(value);
  };

  const calculateProbabilities = () => {
    const gamesNeededToWin = Math.ceil(numGames / 2);

    // Crear tabla de probabilidades
    const tabla = Array.from({ length: gamesNeededToWin + 1 }, () => Array(gamesNeededToWin + 1).fill(0));

    // Inicializar la tabla
    for (let j = 0; j <= gamesNeededToWin; j++) {
      tabla[0][j] = 1;
    }
    for (let i = 1; i <= gamesNeededToWin; i++) {
      tabla[i][0] = 0;
    }

    // Rellenar la tabla usando la fórmula recursiva que se usa en clase
    for (let i = 1; i <= gamesNeededToWin; i++) {
      for (let j = 1; j <= gamesNeededToWin; j++) {
        const p = i + j <= numGames / 2 ? pHomeA : pAwayA;
        const q = i + j <= numGames / 2 ? pHomeB : pAwayB;
        tabla[i][j] = (i > 0 ? p * tabla[i - 1][j] : 0) + (j > 0 ? q * tabla[i][j - 1] : 0);
      }
    }

    setProbabilities(tabla);
  };
  //Parte del BOOTSTRAP
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Series Deportivas</h1>

      <div className="mb-4">
        <label htmlFor="numGames" className="form-label"><strong>Número máximo de juegos (n):</strong></label>
        <input 
          type="number" 
          id="numGames"
          className="form-control mb-3" 
          value={numGames} 
          min="1" 
          max="11" 
          onChange={handleNumGamesChange} 
        />
      </div>

      <div className="row mb-3">
        <h4>Probabilidades de Victoria en Casa y Visita</h4>
        <div className="col-md-6">
          <label htmlFor="pHomeA" className="form-label">Equipo A (en casa):</label>
          <input 
            type="number" 
            id="pHomeA"
            className="form-control" 
            step="0.01" 
            min="0" 
            max="1" 
            value={pHomeA} 
            onChange={(e) => setPHomeA(parseFloat(e.target.value))} 
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="pHomeB" className="form-label">Equipo B (en casa):</label>
          <input 
            type="number" 
            id="pHomeB"
            className="form-control" 
            step="0.01" 
            min="0" 
            max="1" 
            value={pHomeB} 
            onChange={(e) => setPHomeB(parseFloat(e.target.value))} 
          />
        </div>

        <div className="col-md-6 mt-3">
          <label htmlFor="pAwayA" className="form-label">Equipo A (de visita):</label>
          <input 
            type="number" 
            id="pAwayA"
            className="form-control" 
            step="0.01" 
            min="0" 
            max="1" 
            value={pAwayA} 
            onChange={(e) => setPAwayA(parseFloat(e.target.value))} 
          />
        </div>
        <div className="col-md-6 mt-3">
          <label htmlFor="pAwayB" className="form-label">Equipo B (de visita):</label>
          <input 
            type="number" 
            id="pAwayB"
            className="form-control" 
            step="0.01" 
            min="0" 
            max="1" 
            value={pAwayB} 
            onChange={(e) => setPAwayB(parseFloat(e.target.value))} 
          />
        </div>
      </div>

      <button 
        className="btn btn-success mb-4"
        onClick={calculateProbabilities}
      >
        Iniciar Cálculo
      </button>

      {probabilities.length > 0 && (
        <div>
          <h3>Probabilidades de que A gane el campeonato:</h3>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Juegos Ganados por B</th>
                {Array.from({ length: probabilities.length }, (_, index) => (
                  <th key={index}>Gana A = {index} </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {probabilities.map((row, i) => (
                <tr key={i}>
                  <td><strong>Gana B = {i} </strong></td>
                  {row.map((prob, j) => (
                    <td key={j}>{prob.toFixed(4)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Proyecto3;
