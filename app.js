const openModal = document.querySelector('.button-agregar');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');

openModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('modal--show');
});

closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('modal--show');
});






with(document.noticiasForm) {
    onsubmit = function (e) {
        e.preventDefault();
        ok = true;
        if (ok && titulo.value == "") {
            Swal.fire({
                type: 'warning',
                title: 'Debe escribir un Titular',
            });
            return false;
        }


        if (ok && contenido.value == "") {
            Swal.fire({
                type: 'warning',
                title: 'Debe escribir una descripcion',
            });
            return false;

            
        } 

      
        
         else {
            Swal.fire({
                type: 'success',
                title: '¡Noticia Guardada  Exitosamente',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.value) {
                    window.location.href = "index.html";

                    if (ok) {
                        submit();



                        // Crear evento al presionar agregar noticia
                        
                        
                       

                    }
                }
            })
        }
    }
};
document.getElementById("formNoticias").addEventListener("submit", agregarNoticia);


function agregarNoticia(e) {
    e.preventDefault();
    let titulo = document.getElementById("titulo").value;
    let contenido = document.getElementById("contenido").value;
    let archivo = document.getElementById("archivo").files[0];
    let audio = document.getElementById("audio").files[0];

    let noticia = {
        titulo: titulo,
        contenido: contenido
    };

    if (archivo) {
        let reader = new FileReader();
        reader.onload = function () {
            noticia.archivo = reader.result; // Guardamos el archivo en el objeto noticia solo si se ha seleccionado un archivo
            let noticias = JSON.parse(localStorage.getItem("Noticias")) || [];
            noticias.push(noticia);
            localStorage.setItem("Noticias", JSON.stringify(noticias));
            any
            document.getElementById("formNoticias").reset();
        }
        reader.readAsDataURL(archivo); // Convertimos el archivo a base64 solo si se ha seleccionado un archivo
    } else {
        let noticias = JSON.parse(localStorage.getItem("Noticias")) || [];
        noticias.push(noticia);
        localStorage.setItem("Noticias", JSON.stringify(noticias));
    }

    if (archivo) {
        let reader = new FileReader();
        reader.onload = function () {
            noticia.audio = reader.result; // Guardamos el archivo en el objeto noticia solo si se ha seleccionado un archivo
            let noticias = JSON.parse(localStorage.getItem("Noticias")) || [];
            noticias.push(noticia);
            localStorage.setItem("Noticias", JSON.stringify(noticias));
            any
            document.getElementById("formNoticias").reset();
        }
        reader.readAsDataURL(audio); // Convertimos el archivo a base64 solo si se ha seleccionado un archivo
    } else {
        let noticias = JSON.parse(localStorage.getItem("Noticias")) || [];
        noticias.push(noticia);
        localStorage.setItem("Noticias", JSON.stringify(noticias));
    }
}

leerNoticias();

function leerNoticias() {
    let noticias = JSON.parse(localStorage.getItem("Noticias")) || [];
    let noticiasLeer = document.getElementById("container-noticias");
    noticiasLeer.innerHTML = "";

    noticias.forEach((noticia, index) => {
        let imageTag = noticia.archivo ? `<img src="${noticia.archivo}" alt="Imagen de la noticia">` : ''; // Añadir la etiqueta de imagen solo si hay un archivo
        let audioTag = noticia.audio ? `<audio src="${noticia.audio}" alt="Audio de la noticia">` : '';
        noticiasLeer.innerHTML += `

        <div class="cards-1" id="noticiasLeer">

            <div class="contenido-2">
                <h4>${noticia.titulo}</h4>
                <p>${noticia.contenido}</p>
                ${imageTag} <!-- Mostrar imagen -->
                ${audioTag}
              
                <button onclick="descargarNoticia(${index})" class="eliminar-noticia">Descargar</button> <!-- Botón de descarga -->
                <button onclick="eliminarNoticia(${index})" class="eliminar-noticia">Eliminar</button>
                <button class="button-editar" data-index="${index}">Editar</button>
                <button onclick="verMas('${index}')" class="ver-noticias">Ver Más</button>
            </div>

            </div>
        `;
    });

    // Agregar manejador de eventos para el botón "Editar"
    document.querySelectorAll('.button-editar').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            cargarNoticiaParaEditar(index);
            modal.classList.add('modal--show');
        });
    });
}

function cargarNoticiaParaEditar(index) {
    
    const noticias = JSON.parse(localStorage.getItem("Noticias")) || [];
    const noticia = noticias[index];
    document.getElementById("titulo").value = noticia.titulo;
    document.getElementById("contenido").value = noticia.contenido;

    let noticiasActualizar = document.getElementById("modalForm");
    noticiasActualizar.innerHTML = "";

    
        let imageTag = noticia.archivo ? `<img src="${noticia.archivo}" alt="Imagen de la noticia">` : ''; // Añadir la etiqueta de imagen solo si hay un archivo
        let audioTag = noticia.audio ? `<img src="${noticia.audio}" alt="Audio de la noticia">` : '';
        noticiasActualizar.innerHTML += `

    
        <form class="modal__container" id="formNoticias" name="noticiasForm">

            <h2 class="modal__title">Noticias</h2>

            <label class="lbl-nombre" for="titulo">
                <span class="text-nomb">Titulo</span>
            </label>
            <input type="text" name="titulo" id="titulo" value="${noticia.titulo}" >


            <label class="lbl-nombre" for="contenido">
                <span class="text-nomb">Contenido</span>
            </label>
            <textarea name="" cols="50" rows="10" id="contenido" name="contenido"  >${noticia.contenido}</textarea>

            <input type="file" id="archivo" accept="image/*" name="imagenes"> 
            <input type="file" id="audio" accept="audio/*" name="audios">

            </div>


            <button type="submit" class="registrar-noticia" id="actualizar"  onclick="actualizarNoticia(${index})">Actualizar</button>
            <button type="submit" class="editar-noticia" style="display: none;">Actualizar</button>

            <a href="#" class="modal__close"><i class='bx bxs-x-circle' style='color:#ff0202'></i></a>

        </form> 

        `;
    };


    // No se puede cargar el archivo para editar por razones de seguridad del navegador


function descargarNoticia(index) {
    let noticias = JSON.parse(localStorage.getItem("Noticias")) || [];
    let noticia = noticias[index];
    
    //  contenido HTML con el título, contenido e imagen de la noticia
    let contenidoHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${noticia.titulo}</title>
        </head>
        <body>


        <div class="dowload-noticia">

            <h1>${noticia.titulo}</h1>
            <p>${noticia.contenido}</p>
            
            <img src="${noticia.archivo}" alt="Imagen de la noticia">
            <audio src="${noticia.audio}" alt="Audio de la noticia">

            </div>
        </body>
        </html>

        <style>


        
body{

    font-family: "Oswald", sans-serif;
    height: 100vh;
    background:linear-gradient(to top,rgba(91, 94, 96, 0.8), rgb(75, 77, 79)), url(img/fondo.jpg);
    display:flex;
    justify-content: center;
    padding: 10px;

}
.dowload-noticia{

    width:50%;
    overflow-y: scroll;
    background-color: white;
    border-radius:20px;
    display:flex;
    align-items: center;
    flex-direction: column;
    padding: 20px;
}

.dowload-noticia img{
width:100%
}

        h1{

            font-size: 50px;
            font-weight:bold;
        }


        </style>
    `;

    // enlace temporal 
    let enlace = document.createElement('a');
    enlace.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(contenidoHTML);
    enlace.download = 'noticia.html';
    enlace.style.display = 'none';
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}



function eliminarNoticia(index) {
    const confirmed = confirm("¿Estás seguro de que deseas eliminar esta noticia?");
    if (confirmed) {
      const noticias = JSON.parse(localStorage.getItem("Noticias")) || [];
      if (noticias.length > index) {
        noticias.splice(index, 1);
        localStorage.setItem("Noticias", JSON.stringify(noticias));
        leerNoticias();
      }
    }
  }

  function verMas(index) {
    const noticias = JSON.parse(localStorage.getItem("Noticias")) || [];
    const noticia = noticias[index];
    const imageUrl = noticia.archivo;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
  
    swalWithBootstrapButtons.fire({
      title: noticia.titulo,
      html: `<p>${noticia.contenido}</p><br><img src="${imageUrl}" alt="" style="width: 300px;">`,
      showCancelButton: true,
      confirmButtonText: "Cerrar",
      cancelButtonText: "Descargar Noticia",
      reverseButtons: true,
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        descargarNoticia(index);
      }
    });
  }

  function actualizarNoticia(index) {
    const noticias = JSON.parse(localStorage.getItem("Noticias")) || [];
    const noticia = noticias[index];
  
    const updatedTitulo = document.getElementById("titulo").value;
    const updatedContenido = document.getElementById("contenido").value;
    const updatedArchivo = document.getElementById("archivo").files[0];
    const updatedAudio = document.getElementById("audio").files[0];
  
  
    noticia.titulo = updatedTitulo;
    noticia.contenido = updatedContenido;
  
    if (updatedArchivo) {
      const reader = new FileReader();
      reader.onload = (event) => {
        noticia.archivo = event.target.result;
        noticias[index] = noticia;
        localStorage.setItem("Noticias", JSON.stringify(noticias));
      };
      reader.readAsDataURL(updatedArchivo);
    } else {
      noticias[index] = noticia;
      localStorage.setItem("Noticias", JSON.stringify(noticias));
    }

    if (updatedAudio) {
        const reader = new FileReader();
        reader.onload = (event) => {
          noticia.audio = event.target.result;
          noticias[index] = noticia;
          localStorage.setItem("Noticias", JSON.stringify(noticias));
        };
        reader.readAsDataURL(updatedAudio);
      } else {
        noticias[index] = noticia;
        localStorage.setItem("Noticias", JSON.stringify(noticias));
      }
  }



leerNoticias();
