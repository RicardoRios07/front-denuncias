import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ComplaintForm() {
  const [type, setType] = useState(1);
  const [detail, setDetail] = useState('');
  const [description, setDescription] = useState('');
  const [denouncedName, setDenouncedName] = useState('');
  const [denouncedProfession, setDenouncedProfession] = useState('');
  const [email, setEmail] = useState('');
  const [levelCorruption, setLevelCorruption] = useState(0);
  const [date, setDate] = useState('');
  const [idInstitution, setIdInstitution] = useState('');
  const [idTypeCorruption, setIdTypeCorruption] = useState('');
  const [complainantName, setComplainantName] = useState('');
  const [complainantIdentification, setComplainantIdentification] = useState('');
  const [complainantAge, setComplainantAge] = useState(0);
  const [complainantGender, setComplainantGender] = useState(3);
  const [complainantProfession, setComplainantProfession] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      type,
      detail,
      description,
      denouncedName,
      denouncedProfession,
      email,
      levelCorruption,
      date,
      idInstitution,
      idTypeCorruption,
      complainantName,
      complainantIdentification,
      complainantAge,
      complainantGender,
      complainantProfession,
    };

    try {
      const response = await fetch('http://169.62.234.124:3009/api/corruptometro/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Denuncia creada exitosamente');
        console.log('Denuncia creada exitosamente');
      } else {
        alert('Error al crear la denuncia');
        console.error('Error al crear la denuncia');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleRangeChange = (e) => {
    setLevelCorruption(Number(e.target.value));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="type" className="form-label">
              Tipo de denuncia:
            </label>
            <select
              className="form-select"
              id="type"
              required
              value={type}
              onChange={(e) => setType(Number(e.target.value))}
            >
              <option value={1}>Anónima</option>
              <option value={2}>Con nombre</option>
            </select>
          </div>
          <div className="col-sm-6">
            <label htmlFor="detail" className="form-label">
              Detalle de lugar:
            </label>
            <input
              type="text"
              className="form-control"
              id="detail"
              required
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="description" className="form-label">
              Descripción:
            </label>
            <textarea
              className="form-control"
              id="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="denouncedName" className="form-label">
              Nombre de Persona denunciada:
            </label>
            <input
              type="text"
              className="form-control"
              id="denouncedName"
              required
              value={denouncedName}
              onChange={(e) => setDenouncedName(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="denouncedProfession" className="form-label">
              Profesión de Persona denunciada:
            </label>
            <input
              type="text"
              className="form-control"
              id="denouncedProfession"
              required
              value={denouncedProfession}
              onChange={(e) => setDenouncedProfession(e.target.value)}
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="email" className="form-label">
              Correo electrónico:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="levelCorruption" className="form-label">
              Nivel de corrupción:
            </label>
            <input
              type="range"
              className="form-range"
              id="levelCorruption"
              required
              min={1}
              max={10}
              value={levelCorruption}
              onChange={handleRangeChange}
            />
            <span>Nivel: {levelCorruption}</span>
          </div>
          <div className="col-sm-6">
            <label htmlFor="date" className="form-label">
              Fecha:
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="idInstitution" className="form-label">
              ID de institución:
            </label>
            <input
              type="text"
              className="form-control"
              id="idInstitution"
              required
              value={idInstitution}
              onChange={(e) => setIdInstitution(e.target.value)}
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="idTypeCorruption" className="form-label">
              ID de tipo de corrupción:
            </label>
            <input
              type="text"
              className="form-control"
              id="idTypeCorruption"
              required
              value={idTypeCorruption}
              onChange={(e) => setIdTypeCorruption(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="complainantName" className="form-label">
              Nombre del denunciante:
            </label>
            <input
              type="text"
              className="form-control"
              id="complainantName"
              required
              value={complainantName}
              onChange={(e) => setComplainantName(e.target.value)}
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="complainantIdentification" className="form-label">
              Identificación del denunciante:
            </label>
            <input
              type="text"
              className="form-control"
              id="complainantIdentification"
              required
              value={complainantIdentification}
              onChange={(e) => setComplainantIdentification(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="complainantAge" className="form-label">
              Edad del denunciante:
            </label>
            <input
              type="number"
              className="form-control"
              id="complainantAge"
              required
              value={complainantAge}
              onChange={(e) => setComplainantAge(Number(e.target.value))}
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="complainantGender" className="form-label">
              Género del denunciante:
            </label>
            <select
              className="form-select"
              id="complainantGender"
              required
              value={complainantGender}
              onChange={(e) => setComplainantGender(Number(e.target.value))}
            >
              <option value={1}>Hombre</option>
              <option value={2}>Mujer</option>
              <option value={3}>Otro</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="complainantProfession" className="form-label">
              Profesión del denunciante:
            </label>
            <input
              type="text"
              className="form-control"
              id="complainantProfession"
              required
              value={complainantProfession}
              onChange={(e) => setComplainantProfession(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12">
            <button type="submit" className="btn btn-primary">
              Enviar Denuncia
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ComplaintForm;
