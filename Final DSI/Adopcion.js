// Obtén el formulario de adopción
const formularioAdopcion = document.getElementById('formularioAdopcion');

// Agregar el evento de envío al formulario
formularioAdopcion.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtén los valores del formulario
    const nombre = formularioAdopcion.nombre.value;
    const apellido = formularioAdopcion.apellido.value;
    const edad = formularioAdopcion.Edad.value;
    const email = formularioAdopcion.email.value;
    const telefono = formularioAdopcion.Teléfono.value;
    const vivienda = formularioAdopcion.vivenda.value;
    const ninos = formularioAdopcion.niños.value;
    const perros = formularioAdopcion.perros.value;
    console.log("Valores seleccionados:", nombre, apellido, edad, email, telefono, vivienda, ninos, perros);
    // Guardar los datos en la base de datos
    guardarDatosAdopcion(nombre, apellido, edad, email, telefono, vivienda, ninos, perros);
});

function guardarDatosAdopcion(nombre, apellido, edad, email, telefono, vivienda, ninos, perros) {
    db.collection('Interesados').add({
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        email: email,
        telefono: telefono,
        vivienda: vivienda,
        ninos: ninos,
        perros: perros
    })
        .then(() => {
            console.log('Datos de adopción guardados en la base de datos.');
            formularioAdopcion.reset();
        })
        .catch((error) => {
            console.error('Error al guardar los datos de adopción:', error);
        });
}