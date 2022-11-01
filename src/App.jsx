import { useState, useEffect } from "react";
import { store } from "./firebaseConfig";

function App() {
  const [idUsuario, setIdUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [usuario, setUsuario] = useState([]);
  const [modoEdicion, setModoEdificion] = useState(false);

  useEffect(() => {
    const getUsarios = async () => {
      const { docs } = await store.collection("agenda").get();
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setUsuario(nuevoArray);
    };
    getUsarios();
  }, []);

  const PulsarActualizar = async (id) => {
    try {
      const data = await store.collection("agenda").doc(id).get();
      const { nombre, telefono } = data.data();
      setNombre(nombre);
      setIdUsuario(id);
      setPhone(telefono);
      setModoEdificion(true);
    } catch (e) {
      console.log(e);
    }
  };

  const BorrarUsuario = async (id) => {
    try {
      await store.collection("agenda").doc(id).delete();
      const { docs } = await store.collection("agenda").get();
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setUsuario(nuevoArray);
    } catch (e) {}
  };

  const setUsuarios = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setError("El campo nombre es obligatorio");
    }
    if (!phone.trim()) {
      setError("El campo phone es obligatorio");
    }
    const usuario = {
      nombre: nombre,
      telefono: phone,
    };
  };
  const setUpdate = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setError("El campo nombre es obligatorio");
    }
    if (!phone.trim()) {
      setError("El campo telefono es obligatorio");
    }
    const userUpdate = {
      nombre: nombre,
      telefono: phone,
    };

    try {
      await store.collection("agenda").doc(idUsuario).set(userUpdate);
      const { docs } = await store.collection("agenda").get();
      const nuevoArray = docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setUsuario(nuevoArray);
      alert("Datos actualizados");
    } catch (e) {
      console.log(e);
    }
    setNombre("");
    setPhone("");
    setModoEdificion(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Formulario de Contactos</h2>
          <form
            onSubmit={modoEdicion ? setUpdate : setUsuarios}
            className="form-group"
          >
            <input
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
              }}
              placeholder="ingrese su nombre"
              className="form-control"
            ></input>
            <input
              value={phone}
              type="number"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              placeholder="numero de telefono"
              className="form-control mt-3"
            ></input>
            {modoEdicion ? (
              <input
                className="btn btn-dark btn-block mt-3"
                value="Editar"
                type="submit"
              ></input>
            ) : (
              <input
                className="btn btn-dark btn-block mt-3"
                value="Registar"
                type="submit"
              ></input>
            )}
          </form>
          {error ? (
            <div>
              <p>{error}</p>
            </div>
          ) : (
            <span></span>
          )}
        </div>
        <div className="col">
          <h2>Lista de tu agenda</h2>
          <ul className="list-group">
            {usuario.length !== 0 ? (
              usuario.map((item) => (
                <li key={item.id} className="list-group-item">
                  {item.nombre} -- {item.telefono}
                  <button
                    onClick={() => BorrarUsuario(item.id)}
                    className="btn btn-danger float-end m-2"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => PulsarActualizar(item.id)}
                    className="btn btn-warning float-end m-2"
                  >
                    Editar
                  </button>
                </li>
              ))
            ) : (
              <span>No hay usuarios</span>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
