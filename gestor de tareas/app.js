document.addEventListener('DOMContentLoaded', () => {
    const formularioTarea = document.getElementById('formulario-tarea');
    const entradaTarea = document.getElementById('entrada-tarea');
    const listaTareas = document.getElementById('lista-tareas');

    formularioTarea.addEventListener('submit', (evento) => {
        evento.preventDefault();
        agregarTarea(entradaTarea.value);
        entradaTarea.value = '';
    });

    function agregarTarea(tarea) {
        if (tarea === '') return;

        const elementoLista = document.createElement('li');
        elementoLista.textContent = tarea;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => {
            listaTareas.removeChild(elementoLista);
            guardarTareas();
        });

        const botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.classList.add('editar');
        botonEditar.addEventListener('click', () => {
            const nuevaTarea = prompt('Edita la tarea:', tarea);
            if (nuevaTarea !== null && nuevaTarea !== '') {
                elementoLista.firstChild.textContent = nuevaTarea;
                guardarTareas();
            }
        });

        const botonCompletar = document.createElement('button');
        botonCompletar.textContent = 'Completar';
        botonCompletar.classList.add('completar');
        botonCompletar.addEventListener('click', () => {
            elementoLista.classList.toggle('completada');
            guardarTareas();
        });

        elementoLista.appendChild(botonCompletar);
        elementoLista.appendChild(botonEditar);
        elementoLista.appendChild(botonEliminar);
        listaTareas.appendChild(elementoLista);

        guardarTareas();
    }

    function guardarTareas() {
        const tareas = [];
        listaTareas.querySelectorAll('li').forEach(tarea => {
            tareas.push({
                texto: tarea.firstChild.textContent,
                completada: tarea.classList.contains('completada')
            });
        });
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    function cargarTareas() {
        const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        tareas.forEach(tarea => {
            agregarTarea(tarea.texto);
            if (tarea.completada) {
                listaTareas.lastChild.classList.add('completada');
            }
        });
    }

    cargarTareas();
});
