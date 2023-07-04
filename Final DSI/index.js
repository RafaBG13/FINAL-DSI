// Función que se ejecuta cuando se carga el contenido del documento
document.addEventListener('DOMContentLoaded', function () {
    // Obtener todos los elementos con la clase "slide"
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    // Función para mostrar un slide específico
    function mostrarSlide(slideIndex) {
        // Ocultar todos los slides
        slides.forEach(function (slide) {
            slide.style.display = 'none';
        });

        // Mostrar el slide deseado
        slides[slideIndex].style.display = 'flex';
    }

    // Función para mostrar el siguiente slide
    function sigSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        mostrarSlide(currentSlide);
    }

    // Función para mostrar el slide anterior
    function atrasSlide() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        mostrarSlide(currentSlide);
    }

    // Mostrar el primer slide al cargar la página
    mostrarSlide(currentSlide);

    // Cambiar de slide automáticamente cada 5 segundos
    setInterval(sigSlide, 5000);

    // Obtener referencias a los botones de anterior y siguiente
    const atrasBoton = document.getElementById('atrasBoton');
    const sigBoton = document.getElementById('sigBoton');

    // Agregar listeners de eventos a los botones
    atrasBoton.addEventListener('click', atrasSlide);
    sigBoton.addEventListener('click', sigSlide);
});



// Obtener referencia al formulario de registro
const formularioRegistro = document.getElementById('formularioRegistro');

// Agregar listener de evento al formulario para capturar el envío
formularioRegistro.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener los valores ingresados en el formulario
    const nombre = formularioRegistro.nombre.value;
    const ubicacion = formularioRegistro.Ubicación.value;
    const tamaño = formularioRegistro.Tamaño.value;
    const edad = formularioRegistro.Edad.value;
    const sexo = formularioRegistro.Sexo.value;
    const raza = formularioRegistro.Raza.value;

    // Llamar a la función para guardar el registro del perro
    guardarRegistroPerro(nombre, ubicacion, tamaño, edad, sexo, raza);
});

// Función para guardar el registro de un perro en Firestore
function guardarRegistroPerro(nombre, ubicacion, tamaño, edad, sexo, raza) {
    db.collection('Perros').add({
        nombre: nombre,
        ubicacion: ubicacion,
        tamaño: tamaño,
        edad: edad,
        sexo: sexo,
        raza: raza
    })
        .then(() => {
            console.log('Registro de perro guardado en la base de datos.');
            formularioRegistro.reset();
        })
        .catch((error) => {
            console.error('Error al guardar el registro de perro:', error);
        });
}

// Función para buscar perros en Firestore según los criterios seleccionados
function buscarPerros() {
    // Obtener los valores seleccionados en los campos de búsqueda
    const ubicacion = document.querySelector('#estados select').value;
    const tamaño = document.querySelector('#Tamaños select:nth-child(1)').value;
    const edad = document.querySelector('#Tamaños select:nth-child(2)').value;
    const sexo = document.querySelector('#Sexo select').value;

    console.log("Valores seleccionados:", ubicacion, tamaño, edad, sexo);

    // Realizar la consulta en Firestore
    let query = db.collection('Perros');

    if (ubicacion !== '') {
        query = query.where('ubicacion', '==', ubicacion);
    }

    if (tamaño !== '') {
        query = query.where('tamaño', '==', tamaño);
    }

    if (edad !== '') {
        query = query.where('edad', '==', edad);
    }

    if (sexo !== '') {
        query = query.where('sexo', '==', sexo);
    }

    query.get()
        .then((querySnapshot) => {
            // Limpiar los resultados anteriores
            document.getElementById('resultados').innerHTML = '';

            // Iterar sobre los resultados y mostrar la información de cada perro
            querySnapshot.forEach((doc) => {
                const perro = doc.data();
                console.log("Datos del perro:", perro);

                // Crear un div para contener la información del perro
                const divPerro = document.createElement('div');
                divPerro.classList.add('perro');

                // Agregar la imagen del perro según la raza
                const imgPerro = document.createElement('img');
                if (perro.raza === 'Labrador') {
                    imgPerro.src = './Recursos/Labrador.jpg';
                    imgPerro.alt = 'Labrador Retriever';
                } else if (perro.raza === 'Pugs') {
                    imgPerro.src = './Recursos/Pug.jpg';
                    imgPerro.alt = 'Pugs';
                } else if (perro.raza === 'Schnauzer') {
                    imgPerro.src = './Recursos/Schnauzer.jpg';
                    imgPerro.alt = 'Schnauzer';
                } else if (perro.raza === 'Husky') {
                    imgPerro.src = './Recursos/Husky.jpg';
                    imgPerro.alt = 'Husky Siberiano';
                } else if (perro.raza === 'Pastor Alemán') {
                    imgPerro.src = './Recursos/pastor-aleman.jpg';
                    imgPerro.alt = 'Pastor Alemán';
                } else if (perro.raza === 'Chihuahua') {
                    imgPerro.src = './Recursos/chihuahua.jpg';
                    imgPerro.alt = 'Chihuahua';
                } else if (perro.raza === 'Pitbull') {
                    imgPerro.src = './Recursos/pitbull.jpg';
                    imgPerro.alt = 'Pitbull';
                } else if (perro.raza === 'Golden Retriever') {
                    imgPerro.src = './Recursos/golden-retriever.jpg';
                    imgPerro.alt = 'Golden Retriever';
                } else if (perro.raza === 'Beagle') {
                    imgPerro.src = './Recursos/beagle.jpg';
                    imgPerro.alt = 'Beagle';
                } else if (perro.raza === 'Border Collie') {
                    imgPerro.src = './Recursos/Border-Collie.jpg';
                    imgPerro.alt = 'Border Collie';
                } else if (perro.raza === 'Callejero') {
                    imgPerro.src = './Recursos/callejero.jpg';
                    imgPerro.alt = 'Perro Callejero';
                } else {
                    imgPerro.src = './Recursos/Otro.jpg';
                    imgPerro.alt = 'Imagen no disponible';
                }
                divPerro.appendChild(imgPerro);

                // Agregar la información del perro
                const infoPerro = document.createElement('div');
                infoPerro.innerHTML = `
                    <p>${perro.nombre}</p>
                    <p>${perro.edad}</p>
                    <p>${perro.ubicacion}</p>
                    <p>${perro.raza}</p>
                    `;
                divPerro.appendChild(infoPerro);

                // Agregar el botón de "Adoptar"
                const botonAdoptar = document.createElement('button');
                botonAdoptar.classList.add('boton');
                botonAdoptar.textContent = 'Adóptame';

                // Envolver el botón con un enlace
                const enlaceAdopcion = document.createElement('a');
                enlaceAdopcion.href = './Adopcion.html';
                enlaceAdopcion.appendChild(botonAdoptar);

                // Agregar el enlace al contenedor de información del perro
                divPerro.appendChild(enlaceAdopcion);

                // Agregar el div del perro al contenedor de resultados
                document.getElementById('resultados').appendChild(divPerro);
            });
        })
        .catch((error) => {
            console.error('Error al buscar perros:', error);
        });
}

// Obtén las referencias a los elementos buscar y resultados
const buscarDiv = document.getElementById('buscar');
const resultadosDiv = document.getElementById('resultados');

// Inserta el contenedor de resultados debajo del div de búsqueda
buscarDiv.insertAdjacentElement('afterend', resultadosDiv);