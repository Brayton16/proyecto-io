import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify'

const Proyecto1 = () => {
    const [size, setSize] = useState(4); // Tamaño inicial de la matriz
    const [initialMatrix, setInitialMatrix] = useState(
        Array(size).fill(null).map(() => Array(size).fill(''))
    );
    const [initialMatrixP, setInitialMatrixP] = useState(
        Array(size).fill(null).map(() => Array(size).fill(0))
    );
    const [matrixP, setMatrixP] = useState(initialMatrix)
    const [error, setError] = useState(false)
    // Manejar cambios en los inputs de la matriz inicial
    const handleInputChange = (rowIndex, colIndex, event) => {
        const newMatrix = [...initialMatrix];
        newMatrix[rowIndex][colIndex] = event.target.value; // Actualiza el valor en la matriz
        setInitialMatrix(newMatrix);
    };

    // Agregar una columna
    const addColumn = () => {
        const newSize = size + 1;
        const newMatrix = Array(newSize).fill(null).map(() => Array(newSize).fill('')); // Agrega una nueva columna
        setInitialMatrix(newMatrix);
        setSize(newSize); // Incrementa el tamaño
    };

    // Quitar la última columna
    const removeColumn = () => {
        const newSize = size - 1;
        if (newSize > 1) {
            const newMatrix = Array(newSize).fill(null).map(() => Array(newSize).fill('')); // Agrega una nueva columna
            setInitialMatrix(newMatrix);
            setSize(newSize); // Incrementa el tamaño
        }
    };

    const Floyd = (k) => {
        for(let i = 0; i < size; i++){
          for(let j = 0; j < size; j++){
            if(error === false){
              console.log(initialMatrix[i][j])
              if(initialMatrix[i][j] !== ""){
                if(initialMatrix[i][j] === "INF" || initialMatrix[i][j] === "∞"){
                  if(initialMatrix[i][k] !== "INF" && initialMatrix[i][k] !== "∞" && initialMatrix[k][j] !== "INF" && initialMatrix[k][j] !== "∞"){
                    initialMatrix[i][j] = parseInt(initialMatrix[i][k]) + parseInt(initialMatrix[k][j])
                  }
                }else if(initialMatrix[i][j] >= 0){
                  if(initialMatrix[i][j] > initialMatrix[i][k] + initialMatrix[k][j]){
                    initialMatrix[i][j] = parseInt(initialMatrix[i][k]) + parseInt(initialMatrix[k][j])
                  }
                }else{
                  setError(true)
                  i = size
                  j = size
                }  
              }else{
                setError(true)
                i = size
                j = size
              }
            }
          }
        }
    }
    const comenzarAlgoritmo = () => {
        for(let i = 0; i < size; i++){
          if(error === false){
            Floyd(i)
          }else{
            i = size
            toast.error("Error al ingresar los datos, por favor intente de nuevo.")
          }  
        }
    }
    const verDatos = () => {
        setError(false)
        comenzarAlgoritmo();
    }

    return(
        <div className="container mt-5">
          <ToastContainer />
          <h2 className="text-center">Matriz para el Algoritmo de Floyd-Warshall</h2>

          {/* Tabla de distancias iniciales */}
          <table className="table table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th></th>
                {Array.from({ length: size }).map((_, colIndex) => (
                  <th key={colIndex}>N{colIndex + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {initialMatrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <th className="table-dark">N{rowIndex + 1}</th>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>
                      <input
                        type="text" // Cambiado a 'text' para aceptar texto
                        className="form-control"
                        value={cell}
                        onChange={(event) => handleInputChange(rowIndex, colIndex, event)}
                        placeholder="Ingresa un número, 'INF' o '∞'"
                        required
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Botones para agregar y quitar columnas */}
          <div className="mb-3">
            <button className="btn btn-success" onClick={addColumn}>Agregar Columna</button>
            <button className="btn btn-danger ms-2" onClick={removeColumn}>Quitar Columna</button>
          </div>

          {/* Botón para iniciar el algoritmo (sin lógica aún) */}
          <button type="submit" className="btn btn-primary my-3" onClick={verDatos}>Iniciar Algoritmo</button>
        </div>
    )
}

export default Proyecto1;