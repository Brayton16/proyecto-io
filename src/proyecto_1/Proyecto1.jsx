import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify'


const Proyecto1 = () => {
    const [size, setSize] = useState(4); 
    const [iteracion, setIteracion] = useState(0); 
    const [initialMatrix, setInitialMatrix] = useState(
        Array(size).fill(null).map(() => Array(size).fill(''))
      );
    const [matrix, setMatrix] = useState([])
    const [currentMatrix, setCurrentMatrix] = useState(initialMatrix)

    const [initialMatrixP, setInitialMatrixP] = useState(
        Array(size).fill(null).map(() => Array(size).fill(0))
    );
    const [matrixP, setMatrixP] = useState([])
    const [currentMatrixP, setCurrentMatrixP] = useState(initialMatrixP)

    const [loading, setLoading] = useState(false)

    const handleInputChange = (rowIndex, colIndex, event) => {
        const newMatrix = [...initialMatrix];
        const newMatrixP = [...initialMatrixP];
        newMatrix[rowIndex][colIndex] = event.target.value; 
        setInitialMatrix(newMatrix);
        setInitialMatrixP(newMatrixP);
        setCurrentMatrix(newMatrix);
        setCurrentMatrixP(newMatrixP);
    };

    //TODO: Algoritmo para encontrar ruta específica | sistema de guardado de ejercicios (maybe usar json o localStorage)

    const addColumn = () => {
        const newSize = size + 1;
        const newMatrix = Array(newSize).fill(null).map(() => Array(newSize).fill('')); 
        const newMatrixP = Array(newSize).fill(null).map(() => Array(newSize).fill(0)); 
        setInitialMatrix(newMatrix);
        setInitialMatrixP(newMatrixP)
        setSize(newSize); 
    };

    const removeColumn = () => {
        const newSize = size - 1;
        if (newSize > 1) {
            const newMatrix = Array(newSize).fill(null).map(() => Array(newSize).fill(''));
            setInitialMatrix(newMatrix);
            setSize(newSize); 
        }
    };
    
    const floyd = () => {
      let k = iteracion
      console.log(k)
      const newMatrix = Array.from(currentMatrix, row => Array.from(row));
      const newMatrixP = Array.from(currentMatrixP, row => Array.from(row));
      for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
          if(newMatrix[i][j] !== ""){
            if(newMatrix[i][j] === "INF" || newMatrix[i][j] === "∞"){
              if(newMatrix[i][k] !== "INF" && newMatrix[i][k] !== "∞" && newMatrix[k][j] !== "INF" && newMatrix[k][j] !== "∞"){
                newMatrix[i][j] = parseInt(newMatrix[i][k]) + parseInt(newMatrix[k][j])
                newMatrixP[i][j] = k + 1
              }
            }else if(newMatrix[i][j] >= 0){
              if(parseInt(newMatrix[i][j]) > parseInt(newMatrix[i][k]) + parseInt(newMatrix[k][j])){
                newMatrix[i][j] = parseInt(newMatrix[i][k]) + parseInt(newMatrix[k][j])
                newMatrixP[i][j] = k + 1
              }
            }else{
              i = size
              j = size
            }  
          }
        }
      setMatrix([...matrix, newMatrix])
      setCurrentMatrix(newMatrix)
      setMatrixP([...matrixP, newMatrixP])
      setCurrentMatrixP(newMatrixP)
      }
    } 
    const iniciar = () =>{
      try{
        if(iteracion < size){
          const D = [...currentMatrix]
          setMatrix([...matrix, D])
          const P = [...currentMatrixP]
          setMatrix([...matrixP, P])
          setLoading(true)
          floyd()
          setIteracion(iteracion + 1)
        }else{
          toast.success("Terminó el algoritmo")
        }
      }
      catch{
        toast.error("Error al ingresar los datos, por favor intente de nuevo.")   
      }
    }

    return(
        <div className="container mt-5">
          <ToastContainer />
          <h2 className="text-center">Matriz para el Algoritmo de Floyd</h2>
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
                        type="text" 
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
          <div className="mb-3">
            <button className="btn btn-success" onClick={addColumn}>Agregar Columna</button>
            <button className="btn btn-danger ms-2" onClick={removeColumn}>Quitar Columna</button>
            <button type="submit" className="btn btn-primary ms-3" onClick={iniciar}>Iniciar Algoritmo</button>
            <button onClick={() => window.location.reload()} className="btn btn-warning ms-3">Reiniciar</button>
          </div>
          <div className="row">
            <div className="col">
              {loading ? (
                matrix.map((matriz, matrixIndex) => (
                  <div key={matrixIndex} className="mb-4">
                    <h2>D({matrixIndex + 1})</h2>
                    <table className="table table-striped table-bordered text-center">
                      <thead>
                        <tr>
                          <th></th> 
                          {matriz[0] && matriz[0].map((_, colIndex) => (
                            <th key={colIndex}>N{colIndex + 1}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {matriz.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            <th className="table-dark">N{rowIndex + 1}</th>
                            {row.map((cell, colIndex) => (
                              <td key={colIndex}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))
              ) : (
                <p>Cargando matrices D...</p>
              )}
            </div>
            <div className="col">
              {loading ? (
                matrixP.map((matriz, matrixIndex) => (
                  <div key={matrixIndex} className="mb-4">
                    <h2>P({matrixIndex + 1})</h2>
                    <table className="table table-striped table-bordered text-center">
                      <thead>
                        <tr>
                          <th></th> 
                          {matriz[0] && matriz[0].map((_, colIndex) => (
                            <th key={colIndex}>N{colIndex + 1}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {matriz.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            <th className="table-dark">N{rowIndex + 1}</th>
                            {row.map((cell, colIndex) => (
                              <td key={colIndex}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                  </div>
                ))
              ) : (
                <p>Cargando matrices P...</p>
              )}
            </div>
            <button type="submit" className="btn btn-dark ms-3 mb-5" onClick={iniciar}>Siguiente paso</button>
          </div>
        </div>
    )
}


export default Proyecto1;