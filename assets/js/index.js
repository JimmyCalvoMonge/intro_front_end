window.addEventListener('DOMContentLoaded', function() {


  const photoButton = document.querySelector("#create-photo-btn")
  const nameInput = document.querySelector("#name-input")
  const descriptionInput = document.querySelector("#description-input")
  const allInputs = document.querySelectorAll('input')
  const albumContainer = document.querySelector('#album')

  // Esto sirve para descargar una imagen aleatoria de la API de imagenes.
  function getRandomNumber() {
    return (Math.floor(Math.random()*100000));
  }

  allInputs.forEach(input => {
    input.addEventListener('change', function(event) {
      if (event.target.value !== "") {
        input.classList.remove('is-invalid')
      }
    })
  })


  // Cambiar el like count de todos los botones //

  /*Cada boton tiene un id de like-button-xxxxx (un numero aleatorio)
  Dentro de cada boton hay un div con el id like-counter-xxxxxx (usando el mismo numero aleatorio que identifica
  al respectivo boton)
  Usamos esta identificación para diferenciar cada botón y su count de likes.
  Puesto que es puro javascript y manipulación de DOM esta fue una de las maneras más sencillas 
  que se nos ocurrieron para hacer esto */

  const allButtons = document.querySelectorAll(`[id^="like-button-"]`);
  allButtons.forEach(button => {
    button.addEventListener('click', function(event) {

      let id_button = button.id;
      id_button = id_button.replace('like-button-','');
      let this_button_counter = document.querySelector(`#like-counter-${id_button}`);
      this_button_counter.innerHTML=`${parseInt(this_button_counter.innerHTML)+1}`;
    })
  })


  //Agregamos el comportamiento para añadir una nueva foto al álbum de fotos //
  photoButton.addEventListener('click', function(event) {
    
    event.preventDefault()

    const name = nameInput.value
    const description = descriptionInput.value

    if (name === "") {
      nameInput.classList.add('is-invalid')
    }

    if (description === "") {
      descriptionInput.classList.add('is-invalid')
    }

    if (name !== "" && description !== "") {
      nameInput.classList.remove('is-invalid')
      descriptionInput.classList.remove('is-invalid')
      
      //Imagen actual para agregar//
      let image_add_container=document.querySelector("#image-to-add")
      let image_add=image_add_container.innerHTML;

      // Contenidos actuales del album: //
      let current_album = albumContainer.innerHTML;

      // Sumamos la nueva tarjeta a los contenidos del album //
      let random_number=getRandomNumber();


      // Obtenemos la fecha actual //
      var d = new Date();
      var month = d.getMonth()+1;
      var day = d.getDate();
      var time= d.getHours() + ":" + (d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes()) ;

      var output = (day<10 ? '0' : '') + day + '/' +
          (month<10 ? '0' : '') + month + '/' +
          d.getFullYear() + ' ' + time;

      albumContainer.innerHTML= `
      <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12" style="margin: auto;">
        
      <div class="card mb-3">`+ image_add +`

        <div class="card-body">
          <div class="d-flex justify-content-between">
            <p class="card-text text-muted">${output}</p>
            <button type="button" class="btn btm-sm" id="like-button-${random_number}" style="background-color: #4E0652; color:white;">
            <i class="bi bi-heart-fill"></i>
            <div id="like-counter-${random_number}">0</div>
          </button>
          </div>

          <p class="card-text fw-bold">${name}</p>
          <p class="card-text">${description}</p>
          <a class="text-muted text-decoration-none">
            <i class="bi bi-chat-right"></i>
            Comments (15)
          </a>
        </div>

      </div>
  
    </div>`+ current_album 

      

      nameInput.value = ""
      descriptionInput.value = ""

      // Poner otra imagen ahora //
      image_add_container.innerHTML=`<img src="https://source.unsplash.com/random?sig={`+getRandomNumber()+`}/800x800" class="card-img-top">`


      // Cambiar el like count de todos los botones luego de agregar una imagen nueva //
      /* Requiere una nueva escritura para modificar los likes en el album una vez que hayamos subido una nueva foto */

      const allButtons_new = document.querySelectorAll(`[id^="like-button-"]`);
      allButtons_new.forEach(button => {
        button.addEventListener('click', function(event) {
          let id_button = button.id;
          id_button = id_button.replace('like-button-','');
          let this_button_counter = document.querySelector(`#like-counter-${id_button}`);
          this_button_counter.innerHTML=`${parseInt(this_button_counter.innerHTML)+1}`;
        })
      })

    }
  })
})
