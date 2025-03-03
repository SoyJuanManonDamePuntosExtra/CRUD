// index.js

let estudiantes = [];
let idCounter = 1;

class Estudiante {
  constructor(nombre, edad, nivel) {
    this.id = idCounter++;
    this.nombre = nombre;
    this.edad = edad;
    this.nivel = nivel;
  }
}

const crearEstudiante = (nombre, edad, nivel) => {
  const estudiante = new Estudiante(nombre, edad, nivel);
  estudiantes.push(estudiante);
  console.log("Estudiante creado:", estudiante);
};

const listarEstudiantes = () => {
  if (estudiantes.length === 0) {
    console.log("No hay estudiantes registrados.");
  } else {
    console.log("Lista de Estudiantes:");
    estudiantes.forEach(estudiante => {
      console.log(`ID: ${estudiante.id} | Nombre: ${estudiante.nombre} | Edad: ${estudiante.edad} | Nivel: ${estudiante.nivel}`);
    });
  }
};

const actualizarEstudiante = (id, nuevoNombre, nuevaEdad, nuevoNivel) => {
  const estudiante = estudiantes.find(est => est.id === id);
  if (estudiante) {
    estudiante.nombre = nuevoNombre || estudiante.nombre;
    estudiante.edad = nuevaEdad || estudiante.edad;
    estudiante.nivel = nuevoNivel || estudiante.nivel;
    console.log("Estudiante actualizado:", estudiante);
  } else {
    console.log("Estudiante no encontrado.");
  }
};

const eliminarEstudiante = (id) => {
  const index = estudiantes.findIndex(est => est.id === id);
  if (index !== -1) {
    const eliminado = estudiantes.splice(index, 1);
    console.log("Estudiante eliminado:", eliminado[0]);
  } else {
    console.log("Estudiante no encontrado.");
  }
};

const menu = () => {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(`
  Bienvenido al Sistema de Gestión de Estudiantes
  1. Crear Estudiante
  2. Listar Estudiantes
  3. Actualizar Estudiante
  4. Eliminar Estudiante
  5. Salir
  Elige una opción: `, (opcion) => {
    switch(opcion) {
      case '1':
        rl.question('Ingresa el nombre del estudiante: ', (nombre) => {
          rl.question('Ingresa la edad del estudiante: ', (edad) => {
            rl.question('Ingresa el nivel del estudiante: ', (nivel) => {
              crearEstudiante(nombre, parseInt(edad), nivel);
              menu();
            });
          });
        });
        break;
      case '2':
        listarEstudiantes();
        menu();
        break;
      case '3':
        rl.question('Ingresa el ID del estudiante a actualizar: ', (id) => {
          rl.question('Ingresa el nuevo nombre (deja vacío para no cambiar): ', (nuevoNombre) => {
            rl.question('Ingresa la nueva edad (deja vacío para no cambiar): ', (nuevaEdad) => {
              rl.question('Ingresa el nuevo nivel (deja vacío para no cambiar): ', (nuevoNivel) => {
                actualizarEstudiante(parseInt(id), nuevoNombre, nuevaEdad ? parseInt(nuevaEdad) : undefined, nuevoNivel);
                menu();
              });
            });
          });
        });
        break;
      case '4':
        rl.question('Ingresa el ID del estudiante a eliminar: ', (id) => {
          eliminarEstudiante(parseInt(id));
          menu();
        });
        break;
      case '5':
        console.log("¡Hasta luego!");
        rl.close();
        break;
      default:
        console.log("Opción no válida.");
        menu();
    }
  });
};

menu();
