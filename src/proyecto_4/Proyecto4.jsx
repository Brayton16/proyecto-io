import React, { useState } from "react";
import { render } from "react-dom";

const Proyecto4  = ( ) => {
    const [nodeCount, setNodeCount] = useState(0);
    const [keys, setKeys] = useState([]);
    const [values, setValues] = useState([]);
    const [probabilities, setProbabilities] = useState([]);
    const [tableA, setTableA] = useState([]);
    const [tableR, setTableR] = useState([]);

    // Setea el número de nodos, se asume que siempre n < 10
  const NodeCountChange = (e) => {
    const count = parseInt(e.target.value);
    setNodeCount(count);
    setKeys(Array(count).fill(''));
    setValues(Array(count).fill(0));
  };

  // Setea las keys de cada nodo
  const KeyChange = (index, value) => {
    const newKeys = [...keys];
    newKeys[index] = value;
    setKeys(newKeys);
  };

  // Setea el valor asociado a cada key. Se asocia mediante el index
  const ValueChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = parseFloat(value);
    setValues(newValues);
  };

    // Calcula las probabilidades en base a: valorDeKey/valorTotal
  const calculateProbabilities = () => {
    const total = values.reduce((acc, val) => acc + val, 0);    // Calcula costo total del array de valores
    const probs = values.map(val => val / total);   // Calcula costo promedio de cada valor del array
    setProbabilities(probs);    // Aqui los valores ya son todos <1 (Se representan en probabilidades)
  };

    // Dibuja las filas para ingresar los valores de cada key (nombre y valor)
  const renderRows = () => {
    return keys.map((key, index) => (
      <div className="row mb-3" key={index}>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder={`Nombre de la llave ${index + 1}`}
            value={keys[index]}
            onChange={(e) => KeyChange(index, e.target.value)} // Apenas se cambia el nombre se actualiza el array
          />
        </div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            placeholder={`Valor ${index + 1}`}
            value={values[index]}
            onChange={(e) => ValueChange(index, e.target.value)} // Apenas se cambia el nombre se actualiza el array
          />
        </div>
      </div>
    ));
  };

    // Renderiza las probabilidades calculadas más abajo, para visualizar mejor el algoritmo
    const renderProbabilities = () => (
        <div className="mt-4">
            <h4>Probabilidades</h4>
            <ul className="list-group">
                {probabilities.map((prob, index) => (
                <li className="list-group-item" key={index}>
                    {keys[index]}: {prob.toFixed(2)}
                </li>
                ))}
            </ul>
        </div>
    );

    // Función del algoritmo para calcular el Optimal Binary Search Tree
    const calculateOptimalBST = () => {
        const n = probabilities.length;
        const A = Array.from({ length: n }, () => Array(n).fill(0));
        const R = Array.from({ length: n }, () => Array(n).fill(0));
    
        for (let i = 0; i < n; i++) {   // Carga las probabilidades en la diagonal de la matriz
          A[i][i] = probabilities[i];
        }
    
        for (let length = 2; length <= n; length++) { // Recorrre las longitudes de los árboles
          for (let i = 0; i <= n - length; i++) {
            const j = i + length - 1;
            A[i][j] = Infinity;
    
            for (let root = i; root <= j; root++) { // Recorre cada raíz
              const cost = (root > i ? A[i][root - 1] : 0) +
                        (root < j ? A[root + 1][j] : 0) +
                        probabilities.slice(i, j + 1).reduce((a, b) => a + b, 0);
              if (cost < A[i][j]) {
                A[i][j] = cost;      // Guarda el costo
                R[i][j] = root + 1;  // Guarda el índice de la raíz
              }
            }
          }
        }
    
        setTableA(A);
        setTableR(R);
    };    

    // Función para dibujar las tablas A y R
 const renderTable = (table, title) => (
    <div className="mt-4">
      <h3>{title}</h3>
      <table className="table table-bordered">
        <tbody>
          {table.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

    return(
        <div className="container mt-5">
      <h1 className="mb-4">Árbol Binario de Búsqueda Óptimo</h1>
      <div className="mb-3">
        <label htmlFor="nodeCount" className="form-label">Número de nodos</label>
        <input
          type="number"
          className="form-control"
          id="nodeCount"
          min="1"
          max="10"
          value={nodeCount}
          onChange={NodeCountChange}
        />
      </div>
      {nodeCount > 0 && (
        <>
          {renderRows()}
          <button className="btn btn-primary" onClick={calculateProbabilities}>Calcular Probabilidades</button>
          {probabilities.length > 0 && renderProbabilities()}
        </>
      )}
      {probabilities.length > 0 && (
        <div className="mt-4">
          <button className="btn btn-success" onClick={calculateOptimalBST}>Calcular OBST</button>
          {renderTable(tableA, "Tabla A (Costo)")}
          {renderTable(tableR, "Tabla R (Raíces)")}
        </div>
      )}
    </div>
    );
};

export default Proyecto4;