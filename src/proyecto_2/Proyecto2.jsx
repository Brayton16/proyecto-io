import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify'

const Proyecto2 = () => {
    const [size, setSize] = useState(4); 
    const [id, setId] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const [coordspaso, setCoordspaso] = useState([2,1]);
    const [mayor, setMayor] = useState(0);
    const [mayorStr, setMayorStr] = useState();
    const [textfomurlainicial,setTextfomurlainicial] = useState();
    const [textRestricciones,setTextRestricciones] = useState();
    const [textRespuesta,setTextRespuesta] = useState();
    //const [iteracion, setIteracion] = useState(0); 
   
    const [initialMatrix, setInitialMatrix] = useState(
      Array(size).fill(null).map((_, rowIndex) => 
          Array(4).fill(0).map((cell, colIndex) => 
              3 === colIndex ? 1 : cell
          )
      )
  );
    const [matrix, setMatrix] = useState([]);
    //const [currentMatrix, setCurrentMatrix] = useState(initialMatrix)


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [storedList, setStoredList] = useState([{"idMatriz":0,"size":7,"initialMatrix":[["A","7","3","1"],["B","9","4",1],["C","5","2",1],["D","12","6",1],["E","14","7","1"],["F","6","3",1],["G","12","5",1]]},{"idMatriz":0,"size":4,"initialMatrix":[["Candelero","10","5",1],["Radio","9","3",1],["Poster","5","4",1],["Anillo","15","1","1"]]},{"idMatriz":0,"size":3,"initialMatrix":[["Galletas","11","4","0"],["Calcetines","7","3",0],["Botella","12","5",0]]}]
    );


     useEffect(() => {
      const storedMatrices = localStorage.getItem('matrices');
      //console.log(storedMatrices)
      if (storedMatrices) {
        setStoredList(JSON.parse(storedMatrices));
        
        setCantidad(storedMatrices.length);
      }
    }, []);
    

    
    
    

    const loadExercise = (exercise) => {
      setSize(exercise.size);
      setId(exercise.id)
      setInitialMatrix(exercise.initialMatrix);
      
      //setCurrentMatrix(exercise.initialMatrix);


      setLoading(false)
      setError(false)


      setMatrix([])
      //setIteracion(0)
      toast.success('Ejercicio cargado');
  };

    const clearMatrices = () => {
      setStoredList([]); // Limpiamos el state
      localStorage.removeItem('matrices'); // Borramos del localStorage
    };

    const saveMatrixToLocalStorage = (idNueva) => {
      const newExercise = {
          idMatriz: idNueva, 
          size: size,
          initialMatrix: initialMatrix,
      };
      //console.log(storedList)
      const updatedStoredList = [...storedList, newExercise];
      setStoredList(updatedStoredList);
      //console.log(storedList)
      localStorage.setItem('matrices', JSON.stringify(updatedStoredList));
      toast.success('Ejercicio guardado en el historial');
  };

    const handleInputChange = (rowIndex, colIndex, event) => {
        const newMatrix = [...initialMatrix];
        newMatrix[rowIndex][colIndex] = event.target.value; 
        setInitialMatrix(newMatrix);

        //setCurrentMatrix(newMatrix);

        setMatrix([])

        setId(0)
    };

    const handleInputChangeMayor = (event) => {
      //console.log("------------------------")
      setMayor(parseInt(event.target.value,10))
      setMayorStr(event.target.value);
  };




    //TODO: Sistema de guardado de ejercicios (maybe usar json o localStorage)

    const addFill = () => {
        const newSize = size + 1;
        const newMatrix = initialMatrix
          /*Array(newSize).fill(null).map((fill, rowIndex) => 
              Array(4).fill(0).map((cell, colIndex) => 
                3 === colIndex ? 1 : cell
              )
          );*/
        var newFIla= Array(4).fill(0).map((cell, colIndex) => 
          3 === colIndex ? 1 : cell
        )
        newMatrix.push(newFIla)
        setInitialMatrix(newMatrix);

        setSize(newSize); 
    };

    const removeFill = () => {
        const newSize = size - 1;
        if (newSize > 1) {
          /*const newMatrix = 
          Array(newSize).fill(null).map((_, rowIndex) => 
              Array(4).fill(0).map((cell, colIndex) => 
                  3 === colIndex ? 1 : cell
              )
          );*/
          var newMatrix = initialMatrix
          console.log(newMatrix)
          newMatrix.pop()
          setInitialMatrix(newMatrix);

          setSize(newSize); 
        }
    };

    const matrizInicalAlgoritmo = () => {
      var textinicial = "Z = "
      var textresinicial = ""
      
      for (let i = 1; i < initialMatrix.length; i++) {
        textinicial += ""+ initialMatrix[i][1]+"x"+initialMatrix[i][0]+"+"
        textresinicial += ""+ initialMatrix[i][2]+"x"+initialMatrix[i][0]+"+"
      }
      textresinicial = textresinicial.slice(0, -1)
      textresinicial += "<="
      
      textresinicial += String( mayorStr)
      setTextfomurlainicial(textinicial.slice(0, -1))
      setTextRestricciones(textresinicial)
      var newSize = size+1
      const newMatrix = 
          Array(mayor+3).fill(null).map((_, rowIndex) => 
              Array(newSize).fill("0/x=(0)").map((cell, colIndex) => 
                  rowIndex === colIndex ? "0/x=(0)" : cell
              )
          );
    
      
      for (let i = 1; i < initialMatrix.length+1; i++) {
        newMatrix[1][i] = initialMatrix[i-1][0];  // Cambia cada valor al índice + 1 (1, 2, 3, etc.)
      }
      for (let i = 1; i < initialMatrix.length+1; i++) {
        newMatrix[0][i] = 0;  // Cambia cada valor al índice + 1 (1, 2, 3, etc.)
      }
      for (let j = 2; j < newMatrix.length; j++) {
        newMatrix[j][0] = (j-2);  // Cambia cada valor al índice + 1 (1, 2, 3, etc.)
      }

      console.log(newMatrix)
      setMatrix(newMatrix)
      setCoordspaso([2,1])

      //setCurrentMatrix(newMatrix)
    } 

    useEffect(() => {
      if (matrix.length > 0) {
        //console.log("Nueva matriz:", matrix);
        setLoading(true)
        // Aquí puedes agregar la lógica para dibujar la matriz
        // Por ejemplo, llamar a una función que maneje el dibujo
        //drawMatrix(matrix);
      }
      
    }, [matrix]);

 
    const cacularRespuesta =(fila,columna,Respuesta) => {
      if (columna <= 0){
        //console.log(matrix[matrix.length-1][matrix[0].length-1])
        
        
        setTextRespuesta(Respuesta)
      }else{
        console.log(fila,columna)
        console.log("aaaaaaaaaaaa")
        console.log(matrix[fila][columna])
        var valor = matrix[fila][columna].split("(")[1].split(")")[0]
        
        console.log(valor)
        if (valor != "0"){
          Respuesta += initialMatrix[columna-1][0]+" = "+ valor + " | "
          cacularRespuesta(fila - initialMatrix[columna-1][2],columna-1,Respuesta)
        }else{
          Respuesta += initialMatrix[columna-1][0]+" = "+ "0" + " | "
          cacularRespuesta(fila,columna-1,Respuesta)
        }
      
        
        
      }
      

    }
   
    const pasoAlgoritmo = (tipo) => {
      
      console.log(coordspaso)
      console.log([matrix.length-1,matrix[0].length-1])
      console.log(coordspaso[0] == matrix.length-1)
      console.log(coordspaso[1] == matrix[0].length-1)
      //if (coordspaso[0] == matrix.length-1 && coordspaso[1] == matrix[0].length-1){}
      if (coordspaso[1] >= matrix[0].length){
        toast.success('Algoritmo terminado');
        console.log("-------------")
        cacularRespuesta (matrix.length-1,matrix[0].length-1, "Z = "+matrix[matrix.length-1][matrix[0].length-1].split("/")[0] +" | ")
      }else{      
      var cuantos = 1
      if (tipo === "Columna"){
        cuantos = mayor+3-(coordspaso[0])
      }
      if(tipo === "Algoritmo"){
        

        cuantos = mayor+3 + (mayor+3* ((size+1)-coordspaso[1]))
        
      }
      var newMatrix = matrix
      var coordspasoAux = coordspaso
      for (let i = 1; i <= cuantos; i++) {
          //console.log(i)
          //console.log(coordspasoAux)

      
          var valoraatual = parseInt(initialMatrix[coordspasoAux[1]-1][1], 10)
          var pesoatual = parseInt(initialMatrix[coordspasoAux[1]-1][2], 10)
          var cantidadatual = parseInt(initialMatrix[coordspasoAux[1]-1][3], 10)
          var filasanterior = coordspasoAux[0]- 1 >= 3 ? coordspasoAux[0] - 1 : 2;
          
          var columnaanteior = coordspasoAux[1] == 1 ? 0:coordspasoAux[1] - 1 ;
          var valorFilaanterior = parseInt((matrix[filasanterior][coordspasoAux[1]]).split("/")[0], 10)
          
          var valorcolumnaanteior = columnaanteior == 0 ? 0: parseInt((matrix[coordspasoAux[0]][columnaanteior]).split("/")[0], 10)
          
          
          var mayorCiclo = 0
          var vueltas = cantidadatual == 0 ? mayor:cantidadatual
          for (let i = 1; i <= vueltas; i++) {
            if(pesoatual*i<= parseInt(matrix[coordspasoAux[0]][0], 10)){
              var filasinpeso = coordspasoAux[0]- parseInt(initialMatrix[coordspasoAux[1]-1][2], 10)*i >= 3 ? coordspasoAux[0] - parseInt(initialMatrix[coordspasoAux[1]-1][2], 10)*i : 2;
              var valorfilacolumnaanterio = columnaanteior == 0 ? 0: (parseInt((matrix[filasinpeso][columnaanteior]).split("/")[0], 10))
              //console.log("entra "+ i + "analizo quien es mayor la columna anterior o la coluna anterior con la fila restada el peso")
              if (valorfilacolumnaanterio+(valoraatual*i) > valorcolumnaanteior){
                if ((valorfilacolumnaanterio+(valoraatual*i)) > mayorCiclo){
                  newMatrix[coordspasoAux[0]][coordspasoAux[1]] = ""+ (valorfilacolumnaanterio+(valoraatual*i))+"/x"+newMatrix[1][coordspasoAux[1]]+" =("+i+")"
                  newMatrix[0][coordspasoAux[1]] = newMatrix[0][coordspasoAux[1]] +1
                  mayorCiclo = (valorfilacolumnaanterio+(valoraatual*i))
                }
                
                
              }else{
                if (mayorCiclo == 0){
                  //console.log("es meyor sin agregar")
                  newMatrix[coordspasoAux[0]][coordspasoAux[1]] = ""+valorcolumnaanteior+"/x"+newMatrix[1][coordspasoAux[1]]+" =("+0+")"
                }
                
              }
            }else{
              if (mayorCiclo == 0){
                //console.log("no entra "+ i +"analizo quien es mayor la filaterior o la columna anterior,"+valorFilaanterior+","+valorcolumnaanteior)
                newMatrix[coordspasoAux[0]][coordspasoAux[1]] = Math.max(valorFilaanterior, valorcolumnaanteior)+"/x"+newMatrix[1][coordspasoAux[1]]+" =("+0+")";
          }
          
        }
      }
      
      
      if(mayor+3 > coordspasoAux[0]+1){
        console.log("Pasando fila")
        coordspasoAux=[coordspasoAux[0]+1,coordspasoAux[1]]
        }
      else{
        coordspasoAux = [2,coordspasoAux[1]+1]
        console.log("pasando columna")}
        
      }
      setCoordspaso(coordspasoAux)}
      
    } 


    const iniciar = () =>{
      try{
        const count = cantidad
        if(id === 0){
          saveMatrixToLocalStorage(count + 1)
        }
        setTextRespuesta()
        setTextRestricciones()
        setTextfomurlainicial()
        //const D = [...currentMatrix]
        //setMatrix([...matrix, D])
        matrizInicalAlgoritmo()

        
        
        
          
        
      }
      catch(error){
        console.log(error)
        toast.error("Error al ingresar los datos, por favor intente de nuevo.")   
      }
    }

    return(
        <div className="container mt-5">
          <ToastContainer />
          <h2 className="text-center">Matriz para el Algoritmo de Floyd</h2>
          <div className="row">
            <div className="col-9">
              <table className="table table-bordered text-center">
                <thead className="table-dark">
                  <tr>
                    
                    
                    <th key={1}>Objeto</th>
                    <th key={2}>Valor</th>
                    <th key={3}>Peso</th>
                    <th key={4}>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {initialMatrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                     
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
                      Ejercicio {index + 1} (Size: {exercise.size})
                    </button>
                  ))
                ) : (
                  <p>No hay ejercicios guardados</p>
                )}
                <button className="btn btn-danger mt-3" onClick={clearMatrices}>Limpiar Historial</button>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <button className="btn btn-success" onClick={addFill}>Agregar Fila</button>
            <button className="btn btn-danger ms-2" onClick={removeFill}>Quitar Fila</button>
            <button type="submit" className="btn btn-primary ms-3" onClick={iniciar}>Iniciar Algoritmo</button>
            <button onClick={() => window.location.reload()} className="btn btn-warning ms-3">Reiniciar</button>
            <input
                            type="text" 
                            className="form-control"
                            value={mayorStr}
                            onChange={handleInputChangeMayor}
                            placeholder="Ingresa el tamaño de la mochila"
                            required
                          />
          </div>
          <div >
            { textfomurlainicial ? (
              
              <div className="row">
                <div className="col">
                  <h3>Maximizar:</h3> 
                  <h5>{textfomurlainicial}</h5>
                  <h3>Sujeto a: </h3> 
                  <h5>{textRestricciones}</h5>
                  <h3>Respuesta:</h3> 
                  <h5>{textRespuesta}</h5>
                </div>
                
                
              </div>
            ) : (<div></div>)}
            
          </div>
          <div >
            { loading ? (
              
              <div className="row">
                <div className="col">
                  {loading ? (
                    //matrix.map((matriz, matrixIndex) => (
                      //<div key={matrixIndex} className="mb-4">
                        //<h2>{matriz}</h2>
                        <div>
                        <button className="btn btn-primary ms-3" onClick={() => pasoAlgoritmo("paso")}>Siguiente paso</button>
                        <button className="btn btn-primary ms-3" onClick={() => pasoAlgoritmo("Columna")}>Completar columna</button>
                        <button className="btn btn-primary ms-3" onClick={() => pasoAlgoritmo("Algoritmo")}>Completar algoritmo</button>
                      </div>
                    //))
                  ) : (
                    <p>Cargando matrices D...</p>
                  )}
                </div>
                
                
              </div>
            ) : (<div></div>)}
            
          </div>
          <div >
            { loading ? (
              
              <div className="row">
                <div className="col">
                  {loading ? (
                    //matrix.map((matriz, matrixIndex) => (
                      //<div key={matrixIndex} className="mb-4">
                        //<h2>{matriz}</h2>
                        <table className="table table-striped table-bordered text-center">
                          <thead>
                            <tr>
                              <th></th> 
                              {matrix[0] && matrix[0].map((value, colIndex) => (
                                colIndex !== 0 && (<th key={colIndex}>{value}</th>)
                                
                              ))}
                            </tr>
                            <tr>
                            <th></th> 
                            
                              {matrix[1] && matrix[1].map((value, colIndex) => (
                                colIndex !== 0 && (<th key={colIndex}>{value}</th>)
                                
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                          {matrix.map((row, rowIndex) => (
                            rowIndex !== 0 && rowIndex !== 1 && (  // Verifica que no sea la primera fila
                              <tr key={rowIndex}>
                                 {/* O utiliza rowIndex - 1 si necesitas un índice de fila diferente */}
                                {row.map((cell, colIndex) => (
                                  colIndex !== 0 ? 
                                    
                                  (cell =="0/x=(0)" ? ( <td key={colIndex}>{cell}</td>):(cell.split("(")[1].split(")")[0] == "0" ? ( <td style={{ backgroundColor: "red", color: "white" }} key={colIndex}>{cell}</td>): (<th  style={{ backgroundColor: "green", color: "white" }}>{cell}</th>))):
                                    (<th className="table-dark">{cell}</th>)
                                )
                                )
                                }
                                  
                                  
                                
                              </tr>
                            )
                          ))}
                            
                            
                          </tbody>
                        </table>
                      //</div>
                    //))
                  ) : (
                    <p>Cargando matrices D...</p>
                  )}
                </div>
                
                
              </div>
            ) : (<div></div>)}
            
          </div>
        </div>
    )
}

export default Proyecto2;