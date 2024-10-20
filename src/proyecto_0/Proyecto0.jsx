import React from 'react';
import { useNavigate } from 'react-router-dom';


const Proyecto0  = () => {
    const navigate = useNavigate();

    return(
        <div className='m-5'>
            <div className='text-center'><h1>Proyecto Investigación de Operaciones</h1></div>
            <div className='text-center'><h3>Creado por: Brayton Solano, Julián Madrigal, Deylan Sandoval, Álex Brenes</h3></div>
            <div className='text-center m-5'><p>Por favor ingrese a un algorimo para continuar</p></div>
            <div className='d-flex'>
                <div className='container text-center card-deck'>
                    <div className="card bg-light border border-danger" style={{height: 448.850}}>
                        <img src="/floyd.gif" className="card-img-top" alt="" style={{height: 235.262}}/>
                        <div className="card-body" style={{height: 181.600}}>
                            <h5 className="card-title" style={{height: 48}} >Rutas Óptimas (Algoritmo de Floyd)</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <button onClick={() => navigate('/proyecto_1')} className="btn btn-outline-dark">Ir al algoritmo</button>
                        </div>
                    </div>
                </div>
                <div className='container text-center'>
                    <div className="card bg-light border border-danger" style={{height: 448.850}}>
                        <img src="/knapsack.png" className="card-img-top" alt="..." style={{height: 235.262}}/>
                        <div className="card-body" style={{height: 181.600}}>
                            <h5 className="card-title" style={{height: 48}}>Problema de la mochila</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <button onClick={() => navigate('/proyecto_2')} className="btn btn-outline-dark">Ir al algoritmo</button>
                        </div>
                    </div>
                </div>
                <div className='container text-center'>
                    <div className="card bg-light border border-danger" style={{height: 448.850}}>
                        <img src="/sports.jpg" className="card-img-top" alt="..." style={{height: 235.262}}/>
                        <div className="card-body" style={{height: 181.600}}>
                            <h5 className="card-title" style={{height: 48}}>Series deportivas</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <button onClick={() => navigate('/proyecto_3')} className="btn btn-outline-dark">Ir al algoritmo</button>
                        </div>
                    </div>
                </div>
                <div className='container text-center'>
                    <div className="card bg-light border border-danger" style={{height: 448.850}}>
                        <img src="/tree.jpg" className="card-img-top" alt="" style={{height: 235.262}}/>
                        <div className="card-body" style={{height: 181.600}}>
                            <h5 className="card-title" style={{height: 48}}>Árboles binarios de búsqueda óptimos</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <button onClick={() => navigate('/proyecto_4')} className="btn btn-outline-dark">Ir al algoritmo</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proyecto0;