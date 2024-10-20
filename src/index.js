import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Proyecto1 from './proyecto_1/Proyecto1';
import Proyecto2 from './proyecto_2/Proyecto2';
import Proyecto3 from './proyecto_3/Proyecto3';
import Proyecto4 from './proyecto_4/Proyecto4';
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/proyecto_1" element={<Proyecto1/>} />
      <Route path="/proyecto_2" element={<Proyecto2/>} />
      <Route path="/proyecto_3" element={<Proyecto3/>} />
      <Route path="/proyecto_4" element={<Proyecto4/>} />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
