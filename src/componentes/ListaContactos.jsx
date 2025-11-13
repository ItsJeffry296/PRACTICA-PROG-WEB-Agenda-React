import React from 'react';

const ListaContactos = ({ contactos, cargando, onActualizar }) => {
  if (cargando && contactos.length === 0) {
    return (
      <div className="seccion-contactos">
        <h2>Lista de Contactos</h2>
        <div className="cargando">Cargando contactos...</div>
      </div>
    );
  }

  return (
    <div className="seccion-contactos">
      <div className="encabezado-contactos">
        <h2>Lista de Contactos</h2>
        <button 
          onClick={onActualizar} 
          disabled={cargando}
          className="boton-actualizar"
        >
          {cargando ? 'Actualizando...' : '🔄 Actualizar'}
        </button>
      </div>

      {contactos.length === 0 ? (
        <div className="sin-contactos">
          No hay contactos guardados
        </div>
      ) : (
        <div className="lista-contactos">
          {contactos.map((contacto, index) => (
            <div key={index} className="item-contacto">
              <div className="info-contacto">
                <span className="nombre-contacto">
                  {contacto.nombre} {contacto.apellido}
                </span>
                <span className="telefono-contacto">📞 {contacto.telefono}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaContactos;