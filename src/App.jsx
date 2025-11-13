import React, { useState, useEffect } from 'react';
import './App.css';
import ListaContactos from './componentes/ListaContactos';
import AgregarContacto from './componentes/AgregarContacto';

const URL_API = 'http://www.raydelto.org/agenda.php';

function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  // Función para obtener contactos
  const obtenerContactos = async () => {
    setCargando(true);
    try {
      const respuesta = await fetch(URL_API);
      if (!respuesta.ok) {
        throw new Error('Error al cargar contactos');
      }
      const datos = await respuesta.json();
      setContactos(datos);
    } catch (error) {
      mostrarMensaje(`Error: ${error.message}`, 'error');
    } finally {
      setCargando(false);
    }
  };

  // Función para agregar contacto
  const agregarContacto = async (nuevoContacto) => {
    setCargando(true);
    try {
      const respuesta = await fetch(URL_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoContacto)
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar contacto');
      }

      await respuesta.json();
      mostrarMensaje('¡Contacto agregado exitosamente!', 'exito');
      obtenerContactos();
      
    } catch (error) {
      mostrarMensaje(`Error: ${error.message}`, 'error');
    } finally {
      setCargando(false);
    }
  };

  // Función para mostrar mensajes
  const mostrarMensaje = (texto, tipo = 'info') => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(''), 3000);
  };

  // Cargar contactos al iniciar
  useEffect(() => {
    obtenerContactos();
  }, []);

  return (
    <div className="App">
      <header className="encabezado-app">
        <h1>📒 Agenda de Contactos - React</h1>
      </header>

      <main className="app-main">
        {mensaje && (
          <div className={`mensaje ${mensaje.tipo}`}>
            {mensaje.texto}
          </div>
        )}

        <AgregarContacto onAgregarContacto={agregarContacto} cargando={cargando} />
        
        <ListaContactos 
          contactos={contactos} 
          cargando={cargando}
          onActualizar={obtenerContactos}
        />
      </main>
    </div>
  );
}

export default App;