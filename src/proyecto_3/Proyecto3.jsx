import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Proyecto3() {
  const [numGames, setNumGames] = useState(5);
  const [pHomeA, setPHomeA] = useState(0.80);  // Probabilidad de que A gane en casa
  const [pAwayA, setPAwayA] = useState(0.75);  // Probabilidad de que A gane de visita
  const [probabilities, setProbabilities] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [winner, setWinner] = useState(''); // Estado para almacenar el equipo ganador

  //Funcion para el rango de jugadas
  const handleNumGamesChange = (e) => {
    let value = parseInt(e.target.value);
    value = Math.min(Math.max(value, 1), 101);  //Tiene limite hasta 101, solo por si acaso
    setNumGames(value);
  };

  //Funcion que actualiza la probabilidad que el equipo gane en casa 
  const handlePHomeAChange = (e) => {
    const value = parseFloat(e.target.value);
    setPHomeA(value);
  };

  //Funcion que actualiza la probabilidad que el equipo gane en visita
  const handlePAwayAChange = (e) => {
    const value = parseFloat(e.target.value);
    setPAwayA(value);
  };

  //Funcion para bloquear que solo se juegue con juegos impar
  const calculateProbabilities = () => {
    if (numGames % 2 === 0) {
      setAlertMessage('Por favor, selecciona un número impar de juegos.');
      return;
    }

    setAlertMessage(''); //Se limpia el mensaje si el número es impar
    setWinner('');      //Se reiniciar el ganador antes de calcular

    const gamesNeededToWin = Math.ceil(numGames / 2);
    const pHomeB = 1 - pHomeA;  //Probabilidad de que B gane en casa
    const pAwayB = 1 - pAwayA;  //Probabilidad de que B gane de visita

    //Se crea tabla de probabilidades
    const tabla = Array.from({ length: gamesNeededToWin + 1 }, () => Array(gamesNeededToWin + 1).fill(0));

    //Se va iniciar la tabla
    for (let j = 1; j <= gamesNeededToWin; j++) {  
      tabla[0][j] = 1;
    }
    for (let i = 1; i <= gamesNeededToWin; i++) {
      tabla[i][0] = 0;
    }

    //Se rellena la tabla usando la fórmula recursiva
    for (let i = 1; i <= gamesNeededToWin; i++) {
      for (let j = 1; j <= gamesNeededToWin; j++) {
        const p = i + j <= numGames / 2 ? pHomeA : pAwayA;
        const q = i + j <= numGames / 2 ? pHomeB : pAwayB;
        tabla[i][j] = (i > 0 ? p * tabla[i - 1][j] : 0) + (j > 0 ? q * tabla[i][j - 1] : 0);
      }
    }

    setProbabilities(tabla);

    //Calcular la probabilidad de que A o B gane
    const winProbabilityA = tabla[gamesNeededToWin][gamesNeededToWin - 1];
    const winProbabilityB = 1 - winProbabilityA; 

    //Actualizar el equipo ganador basado en las probabilidades
    setWinner(winProbabilityA > winProbabilityB ? 'A' : 'B');
  };
  //Inicio del BOOTSTRAP
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

      {alertMessage && <div className="alert alert-warning">{alertMessage}</div>}

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
            onChange={handlePHomeAChange} 
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
            value={1 - pHomeA} 
            disabled 
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
            onChange={handlePAwayAChange} 
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
            value={1 - pAwayA} 
            disabled 
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
                    <td key={j}>{i === 0 && j === 0 ? '' : prob.toFixed(4)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {winner && (
        <div className="alert alert-info">
          El equipo ganador probable es el equipo {winner}.
        </div>
      )}
    </div>
  );
}

export default Proyecto3;
