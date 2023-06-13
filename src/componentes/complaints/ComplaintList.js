import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ComplaintsList() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState('');
  const [typeSearch, setTypeSearch] = useState('');
  const [page, setPage] = useState('1');
  const [limit, setLimit] = useState('50');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDesc, setSortDesc] = useState('true');
  const [type, setType] = useState('0');
  const [isReal, setIsReal] = useState('0');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = `http://169.62.234.124:3009/api/corruptometro/complaints?search=${search}&typeSearch=${typeSearch}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortDesc=${sortDesc}&type=${type}&isReal=${isReal}`;

    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setComplaints(data.docs);
      } else {
        console.error('Error al obtener las denuncias');
        alert('Error al obtener las denuncias');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="search">Búsqueda:</label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="typeSearch">Tipo de búsqueda:</label>
          <input
            type="text"
            id="typeSearch"
            value={typeSearch}
            onChange={(e) => setTypeSearch(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="page">Página:</label>
          <input
            type="text"
            id="page"
            value={page}
            onChange={(e) => setPage(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="limit">Límite:</label>
          <input
            type="text"
            id="limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="sortBy">Ordenar por:</label>
          <input
            type="text"
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="sortDesc">Orden ascendente:</label>
          <select
            id="sortDesc"
            value={sortDesc}
            onChange={(e) => setSortDesc(e.target.value)}
            className="form-control"
          >
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="type">Tipo:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-control"
          >
            <option value="0">Todas</option>
            <option value="1">Anónima</option>
            <option value="2">Con nombre</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="isReal">Es real la denuncia:</label>
          <select
            id="isReal"
            value={isReal}
            onChange={(e) => setIsReal(e.target.value)}
            className="form-control"
          >
            <option value="0">No</option>
            <option value="1">Si</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Buscar denuncias</button>
        </form>

      {loading ? (
        <p>Cargando denuncias...</p>
      ) : (
        <div>
          {complaints.length > 0 ? (
            <ul className="list-group">
              {complaints.map((complaint) => (
                <li key={complaint._id} className="list-group-item">
                  <h3>{complaint.detail}</h3>
                  {complaint.image && (
                    <img src={`http://169.62.234.124:3009${complaint.image}`} alt="Denuncia" className="img-fluid" />
                  )}
                  <p>{complaint.description}</p>
                  <p>Nivel de corrupción: {complaint.levelCorruption}</p>
                  <p>Fecha: {complaint.date}</p>
                  <p>Provincia: {complaint.province.name}</p>
                  <p>Ciudad: {complaint.city.name}</p>
                  <p>Institución: {complaint.institution.name}</p>
                  <p>Tipo de corrupción: {complaint.typeCorruption.name}</p>
                  <p>Creado en: {complaint.createdAt}</p>
                  <p>Actualizado en: {complaint.updatedAt}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron denuncias</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ComplaintsList;