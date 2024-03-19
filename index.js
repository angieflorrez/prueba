function cargarDatos() {
    fetch('prueba.php')
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        const tablaDatos = document.getElementById('tablaDatos');
        tablaDatos.innerHTML = "";
        data.forEach(row => {
            console.log(row); 
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>${row.id}</td>
              <td>${row.nombre}</td>
              <td>${row.descripcion}</td>
              <td>
              <button class="btn btn-primary" onclick="consultarXid(${row.id})">Actualizar</button>
            </td>
              `;
            tablaDatos.appendChild(tr);
        });   
    })
    .catch(error => console.error('Error al cargar datos:', error)); 
}


function consultarXid(id) {
    fetch(`controlador/traerProductoXidController.php?id=${id}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('id').value = data.id; 
        document.getElementById('nombre').value = data.nombre; 
        document.getElementById('Textarea').value = data.descripcion; 
    });
}

function actualizarProducto(formData) {
    fetch('controlador/actualizarProductoController.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        
        alert(data);
       
        cargarDatos();
    });
}
function agregarDatos(formData) {
    fetch('controlador/agregarProductoController.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        cargarDatos();
        alert(data);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    cargarDatos();
    var form = document.getElementById("formulario");
    form.addEventListener("submit", function(event){
        event.preventDefault();
        var formData = new FormData(form);
        agregarDatos(formData);
    });
});