import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OverlayTrigger, Button, Tooltip } from 'react-bootstrap'


const Proyecto0  = () => {
    const navigate = useNavigate();

    const FloydTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          El algoritmo de Floyd es un algoritmo
          que se encarga de encontrar la mejor ruta
          entre cualquier par de nodos en un grafo
        </Tooltip>
      );
    const mochilaTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          El algoritmo de la mochila consiste en maximizar
          el valor de los objetos que se pueden llevar 
          en una mochila sin exceder su peso
        </Tooltip>
      );
    const seriesTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Se encarga de resolver problemas relacionados con
          el desarrollo y análisis de torneos deportivos 
          para determinar ganadres, clasificaciones o estadísticas
        </Tooltip>
      );
    const arbolesTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Consiste en la construcción de un árbol binario de
          búsqueda el cuál minimice el costo promedio de búsqueda
          de claves
        </Tooltip>
      );

    return(
        <div className='m-5'>
            <div className='text-center'><h1>Proyecto Investigación de Operaciones</h1></div>
            <div className='text-center'><h3>Creado por: Brayton Solano, Julián Madrigal, Deylan Sandoval, Álex Brenes</h3></div>
            <div className='text-center m-5'><p>Por favor ingrese a un algorimo para continuar</p></div>
            <div className='d-flex'>
                <div className='container text-center card-deck'>
                    <div className="card bg-light border border-danger" style={{height: 448.850}}>
                        <img src="/floyd.gif" className="card-img-top" alt="" style={{height: 235.262}}/>
                        <div className="card-body">
                            <h5 className="card-title">Rutas Óptimas (Algoritmo de Floyd)</h5>
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={FloydTooltip}
                            >
                                <Button onClick={() => navigate('/proyecto_1')} variant="outline-dark">Ir al algoritmo</Button>
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>
                <div className='container text-center'>
                    <div className="card bg-light border border-danger" style={{height: 448.850}}>
                        <img src="/knapsack.png" className="card-img-top" alt="..." style={{height: 235.262}}/>
                        <div className="card-body">
                            <h5 className="card-title">Problema de la mochila</h5>
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={mochilaTooltip}
                            >
                                <Button onClick={() => navigate('/proyecto_2')} variant="outline-dark">Ir al algoritmo</Button>
                            </OverlayTrigger>    
                        </div>
                    </div>
                </div>
                <div className='container text-center'>
                    <div className="card bg-light border border-danger" style={{height: 448.850}}>
                        <img src="/sports.jpg" className="card-img-top" alt="..." style={{height: 235.262}}/>
                        <div className="card-body">
                            <h5 className="card-title">Series deportivas</h5>
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={seriesTooltip}
                            >
                                <Button onClick={() => navigate('/proyecto_3')} variant="outline-dark">Ir al algoritmo</Button>
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>
                <div className='container text-center'>
                    <div className="card bg-light border border-danger" style={{height: 448.850}}>
                        <img src="/tree.jpg" className="card-img-top" alt="" style={{height: 235.262}}/>
                        <div className="card-body" >
                            <h5 className="card-title">Árboles binarios de búsqueda óptimos</h5>
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={arbolesTooltip}
                            >
                                <Button onClick={() => navigate('/proyecto_4')} variant="outline-dark">Ir al algoritmo</Button>
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proyecto0;