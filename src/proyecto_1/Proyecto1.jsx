import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify'


const Proyecto1 = () => {
    //Constante utilizada para mantener la matriz cuadrada y los ciclos
    const [size, setSize] = useState(4); 
    //Constante utilizada para guardar matrices en el localStorage si no está guardada perviamente
    const [id, setId] = useState(0);
    //Constante utilizada para setear el nuevo id de la matriz
    const [cantidad, setCantidad] = useState(0);
    //Constante utilizada para iterar la cantidad necesaria de veces que ocupe el algoritmo
    const [iteracion, setIteracion] = useState(0); 
    //Constante utilizada para el primer nodo de las rutas óptimas
    const [primerNodo, setPrimerNodo] = useState(''); 
    //Constante utilizada para el nodo de destino de las rutas óptimas
    const [destinoNodo, setDestinoNodo] = useState(''); 
    //Constante utilizada para setear la matriz inicial con las diagonales en 0 y valor por defecto ∞ o INF
    const [initialMatrix, setInitialMatrix] = useState(
      Array(size).fill(null).map((_, rowIndex) => 
          Array(size).fill('∞').map((cell, colIndex) => 
              rowIndex === colIndex ? 0 : cell
          )
        )
    );
    //Constante utilizada para guardar cada tabla D(n)
    const [matrix, setMatrix] = useState([]);
    //Constante utilizada para guardar la matriz actual y hacerle cambios
    const [currentMatrix, setCurrentMatrix] = useState(initialMatrix);
    //Constante utilizada para inicializar la matriz P
    const [initialMatrixP, setInitialMatrixP] = useState(
        Array(size).fill(null).map(() => Array(size).fill(0))
    );
    //Constante utilizada para guardar cada tabla P(n)
    const [matrixP, setMatrixP] = useState([]);
    //Constante utilizada para guardar la matriz P actual y hacerle cambios
    const [currentMatrixP, setCurrentMatrixP] = useState(initialMatrixP);
    //Constante utilizada para dar el resultado al final del algoritmo
    const [resultado, setResultado] = useState('');
    //Constante utilizada para mostrar el resultado
    const [terminado, setTerminado] = useState(false)
    //Constante utilizada para mostrar las tablas del algoritmo
    const [loading, setLoading] = useState(false);
    //Constante utilizada para capturar errores
    const [error, setError] = useState(false);
    //Constante utilizada para guardar el historial de ejercicios
    const [storedList, setStoredList] = useState([]);

    //Actualización del historial de ejercicios
    useEffect(() => {
      const storedMatrices = localStorage.getItem('matrices');
      if (storedMatrices) {
        setStoredList(JSON.parse(storedMatrices));
        setCantidad(storedList.length)
      }
    }, [storedList.length]);

    //Función para cargar el ejercicio seleccionado, se reinician las constantes
    const loadExercise = (exercise) => {
      setSize(exercise.size);
      setId(exercise.id)
      setInitialMatrix(exercise.initialMatrix);
      setInitialMatrixP(Array(exercise.size).fill(null).map(() => Array(exercise.size).fill(0)));
      setCurrentMatrix(exercise.initialMatrix);
      setCurrentMatrixP(Array(exercise.size).fill(null).map(() => Array(exercise.size).fill(0)));
      setResultado(false)
      setLoading(false)
      setError(false)
      setTerminado(false)
      setMatrixP([])
      setMatrix([])
      setIteracion(0)
      toast.success('Ejercicio cargado');
    };

    //Función para borrar el historial de matrices 
    const clearMatrices = () => {
      setStoredList([]); // Limpiamos el state
      localStorage.removeItem('matrices'); // Borramos del localStorage
    };
    //Función para guardar un nuevo ejercicio
    const saveMatrixToLocalStorage = (idNueva) => {
      const newExercise = {
          idMatriz: idNueva, 
          size: size,
          initialMatrix: initialMatrix,
      };
      const updatedStoredList = [...storedList, newExercise];
      setStoredList(updatedStoredList);
      localStorage.setItem('matrices', JSON.stringify(updatedStoredList));
      toast.success('Ejercicio guardado en el historial');
    };
    //Función para cambiar la matriz inicial cuando se le hagan cambios a la tabla principal de la interfaz
    const handleInputChange = (rowIndex, colIndex, event) => {
        const newMatrix = [...initialMatrix];
        const newMatrixP = [...initialMatrixP];
        newMatrix[rowIndex][colIndex] = event.target.value; 
        setInitialMatrix(newMatrix);
        setInitialMatrixP(newMatrixP);
        setCurrentMatrix(newMatrix);
        setCurrentMatrixP(newMatrixP);
        setMatrix([])
        setMatrixP([])
        setId(0)
        setResultado(false)
        setLoading(false)
        setError(false)
        setTerminado(false)
        setMatrixP([])
        setMatrix([])
        setIteracion(0)
    };
    //Función para encontrar la ruta más óptima
    const rutasOptimas = (nodo1, nodo2, listaAux) =>{
      const matriz = Array.from(currentMatrixP, row => Array.from(row));
      const largo = Array.from(listaAux).length
      if(matriz[nodo1][nodo2] === 0){
        if(currentMatrix[nodo1][nodo2] !== "INF" && currentMatrix[nodo1][nodo2] !== "∞" && currentMatrix[nodo1][nodo2] !== ""){
          if(listaAux[largo - 1] !== nodo1 + 1){
            listaAux.push(nodo1 + 1)
          }
          listaAux.push(nodo2 + 1)
        }else{
          setError(true)
        }
      }else{
        const nodoAux = matriz[nodo1][nodo2] - 1
        rutasOptimas(nodo1, nodoAux, listaAux)
        rutasOptimas(nodoAux, nodo2, listaAux)
      }
    }
    //Función auxiliar que se activa al darle el botón de calcular rutas
    const handleSubmit = () => {
      try{
        const nodo1 = primerNodo.match(/\d+/)[0] - 1
        const nodo2 = destinoNodo.match(/\d+/)[0] - 1
        const listaAux = []
        let sol = ""
        listaAux.push(nodo1 + 1)
        rutasOptimas(nodo1, nodo2, listaAux)
        for(let i = 0; i < listaAux.length; i++){
          if(i + 1 === listaAux.length){
            sol += "v"+listaAux[i]  
          }else{
            sol += "v"+listaAux[i] + " -> " 
          }
        }
        setResultado(sol)
        toast.success("Se ha encontrado la solución óptima")
      }catch{
        toast.error("Por favor ingrese correctamente ambos nodos que desea encontrar la ruta óptima")
      }
    }
    //Función para mostrar el resultado
    const mostrarRes = () =>{
      if(!error){
        setTerminado(true)
      }else{
        setTerminado(false)
        setResultado("")
      }
    }
    //Función para añadir celdas a la tabla de la interfaz
    const addColumn = () => {
        const newSize = size + 1;
        const newMatrix = 
          Array(newSize).fill(null).map((_, rowIndex) => 
              Array(newSize).fill('∞').map((cell, colIndex) => 
                  rowIndex === colIndex ? 0 : cell
              )
          );
        const newMatrixP = Array(newSize).fill(null).map(() => Array(newSize).fill(0)); 
        setInitialMatrix(newMatrix);
        setInitialMatrixP(newMatrixP)
        setCurrentMatrix(newMatrix);
        setCurrentMatrixP(newMatrixP);
        setSize(newSize); 
        setMatrix([])
        setMatrixP([])
        setId(0)
        setResultado(false)
        setLoading(false)
        setError(false)
        setTerminado(false)
        setMatrixP([])
        setMatrix([])
        setIteracion(0)
    };
    //Función para quitar celdas a la tabla de la interfaz 
    const removeColumn = () => {
        const newSize = size - 1;
        if (newSize > 1) {
          const newMatrix = 
          Array(newSize).fill(null).map((_, rowIndex) => 
              Array(newSize).fill('∞').map((cell, colIndex) => 
                  rowIndex === colIndex ? 0 : cell
              )
          );
          const newMatrixP = Array(newSize).fill(null).map(() => Array(newSize).fill(0)); 
          setInitialMatrix(newMatrix);
          setInitialMatrixP(newMatrixP);
          setCurrentMatrix(newMatrix);
          setCurrentMatrixP(newMatrixP);
          setSize(newSize); 
          setMatrix([])
          setMatrixP([])
          setId(0)
          setResultado(false)
          setLoading(false)
          setError(false)
          setTerminado(false)
          setMatrixP([])
          setMatrix([])
          setIteracion(0)
        }
    };
    //Función para ejecutar el algoritmo de Floyd
    const floyd = () => {
      let k = iteracion
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
    //Función para realizar una iteración del algoritmo
    const step = () =>{
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
    //Función para iniciar el algoritmo
    const iniciar = () =>{
      try{
        if(id === 0){
          saveMatrixToLocalStorage(cantidad + 1)
        }
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
          <div className="row">
            <div className="col-9">
              {/* Matriz principal */}
              <table className="table table-bordered text-center">
                <thead className="table-dark">
                  <tr>
                    <th></th>
                    {Array.from({ length: size }).map((_, colIndex) => (
                      <th key={colIndex}>V{colIndex + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {initialMatrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <th className="table-dark">V{rowIndex + 1}</th>
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
            </div>
            {/* Lista de ejercicios guardados */}
            <div className="col">
              <h3>Historial de Ejercicios</h3>
              <div className="list-group">
                {storedList.length > 0 ? (
                  storedList.map((exercise, index) => (
                    <button
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => loadExercise(exercise)}
                    >
                      Ejercicio {index + 1} (Size: {exercise.size}, Id: {exercise.idMatriz})
                    </button>
                  ))
                ) : (
                  <p>No hay ejercicios guardados</p>
                )}
                <button className="btn btn-danger mt-3" onClick={clearMatrices}>Limpiar Historial</button>
              </div>
            </div>
          </div>
          {/* Botones de interacción */}
          <div className="mb-3">
            <button className="btn btn-success" onClick={addColumn}>Agregar Columna</button>
            <button className="btn btn-danger ms-2" onClick={removeColumn}>Quitar Columna</button>
            <button type="submit" className="btn btn-primary ms-3" onClick={iniciar}>Iniciar Algoritmo</button>
            <button onClick={() => window.location.reload()} className="btn btn-warning ms-3">Reiniciar</button>
          </div>
          {/* Tablas del algoritmo P y D */}
          <div>
            { loading ? (
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
                                <th key={colIndex}>V{colIndex + 1}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {matriz.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                <th className="table-dark">V{rowIndex + 1}</th>
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
                                <th key={colIndex}>V{colIndex + 1}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {matriz.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                <th className="table-dark">V{rowIndex + 1}</th>
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
                <button type="submit" className="btn btn-dark ms-3 mb-5" onClick={step}>Siguiente paso</button>
              </div>
            ) : (<div></div>)}
            {/* Form para encontrar la ruta óptima */}
            { iteracion === size ? (
              <div className="container mb-5">
              <h3>Encuentra la ruta más óptima</h3>
                <div className="mb-3">
                  <label className="me-2 form-label" htmlFor="startNode">Nodo de inicio: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="startNode"
                    placeholder="Digite el nodo 1, ejemplo: v1"
                    onChange={(e) => setPrimerNodo(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="me-2 form-label" htmlFor="endNode">Nodo de destino: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="endNode"
                    placeholder="Digite el nodo 2, ejemplo: v5"
                    onChange={(e) => setDestinoNodo(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <button onClick={handleSubmit} className="btn btn-success me-2">Calcular Ruta</button>
                  { !error ? <button onClick={mostrarRes} className="btn btn-success">Mostrar Ruta</button> : toast.error("No existe solución óptima para el par de nodos que seleccionó") && setError(false)}
                </div>
                {terminado ? (
                  <div className="mt-3">
                    <h4>La solción óptima es: {resultado}</h4>
                  </div>
                ) : ( 
                  <div>
                    Calculando solución óptima
                  </div>
                )}
            </div>
            ):(
              <div>No ha finializado el algorimo</div>
            )}
          </div>
        </div>
    )
}


export default Proyecto1;