import React, { useState } from 'react';

const AgregarContacto = ({ onAgregarContacto, cargando }) => {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    apellido: '',
    telefono: ''
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario(estadoAnterior => ({
      ...estadoAnterior,
      [name]: value
    }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    
    if (!datosFormulario.nombre.trim() || !datosFormulario.apellido.trim() || !datosFormulario.telefono.trim()) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (!/^\d+$/.test(datosFormulario.telefono)) {
      alert('El teléfono debe contener solo números');
      return;
    }

    onAgregarContacto(datosFormulario);
    
    setDatosFormulario({
      nombre: '',
      apellido: '',
      telefono: ''
    });
  };

  return (
    <div className="seccion-agregar-contacto">
      <h2>Agregar Nuevo Contacto</h2>
      <form onSubmit={manejarEnvio} className="formulario-contacto">
        <div className="grupo-formulario">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={datosFormulario.nombre}
            onChange={manejarCambio}
            required
            disabled={cargando}
          />
        </div>
        
        <div className="grupo-formulario">
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={datosFormulario.apellido}
            onChange={manejarCambio}
            required
            disabled={cargando}
          />
        </div>
        
        <div className="grupo-formulario">
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={datosFormulario.telefono}
            onChange={manejarCambio}
            required
            disabled={cargando}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={cargando}
          className="boton-enviar"
        >
          {cargando ? 'Agregando...' : 'Agregar Contacto'}
        </button>
      </form>
    </div>
  );
};

export default AgregarContacto;