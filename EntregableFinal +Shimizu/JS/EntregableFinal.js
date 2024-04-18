
function cargarArticulosDesdeJSON() {
    return fetch('articulos.json') 
      .then(response => response.json())
      .then(data => {
          return data.map(item => ({
              titulo: item.titulo,
              fechaPublicacion: item.fechaPublicacion,
              disponible: item.disponible
      }));
      })
      .catch(error => {
        console.error('Error al cargar los artículos desde el archivo JSON:', error);
  });
  
  }
   
     
  function searchAlgorithm(searchTerm, listaArticulos) {
    
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(searchTerm);
    localStorage.setItem('searches', JSON.stringify(searches));

    const resultados = listaArticulos.filter(articulo => articulo.titulo.toLowerCase().includes(searchTerm));
    const contenedor = document.getElementById('resultados-articulos');

   
    const mensajeExistente = contenedor.querySelector('.mensaje-no-resultados');

    if (resultados.length > 0) {
       
        contenedor.innerHTML = '';

        const listaResultados = document.createElement('ul');

        resultados.forEach(articulo => {
            const infoElement = document.createElement("li");
            infoElement.textContent = `Título: ${articulo.titulo}, Fecha de Publicación: ${articulo.fechaPublicacion}, Disponible: ${articulo.disponible ? 'Sí' : 'No'}`;
            infoElement.classList.add('resultados-articulos');
            listaResultados.appendChild(infoElement);
        });

        
        contenedor.appendChild(listaResultados);
    } else if (!mensajeExistente) {
        
        const mensajeNoResultados = document.createElement('li');
        mensajeNoResultados.textContent = "No se encontraron resultados nuevos para la búsqueda.";
        mensajeNoResultados.classList.add('mensaje-no-resultados');
        contenedor.appendChild(mensajeNoResultados);
    }
}

  
  function searchFile() {
    
    const welcomeDiv = document.createElement('div');
    welcomeDiv.textContent = "Bienvenidos al Archivo de la Revista Asia - Pacífico";
    document.body.appendChild(welcomeDiv);
    welcomeDiv.classList.add('welcome-message')

 
    const inputElement = document.createElement('input');
    inputElement.type = "text";
    inputElement.placeholder = "Introduzca el nombre del Documento";
    document.body.appendChild(inputElement);
  
   
    const searchButton = document.createElement('button');
    searchButton.textContent = "Buscar";
    document.body.appendChild(searchButton);

    const clearButton = document.createElement('button'); 
    clearButton.textContent = "Limpiar Resultados";
    document.body.appendChild(clearButton);


    const errorElement = document.createElement('div');
    errorElement.textContent = "No ingresaste ningún dato ";
    errorElement.classList.add('error-message');
    document.body.appendChild(errorElement);
    errorElement.style.display = 'none';

    searchButton.addEventListener('click', function () {
      const searchTerm = inputElement.value.toLowerCase().trim ();
      if (searchTerm === '') {
        errorElement.textContent = "Por favor, ingresa un término de búsqueda.";
        errorElement.style.display = 'block';
      } else {
        errorElement.style.display = 'none';
        cargarArticulosDesdeJSON()
        .then(listaArticulos => {
          errorElement.style.display = 'none';
          
          
        searchAlgorithm(searchTerm, listaArticulos);
      })
      .catch(error => {
        errorElement.textContent = "Ocurrió un error al cargar los artículos.";
        errorElement.style.display = 'block';
        console.error('Error al cargar los artículos:', error);
      
    });
      }
    }); 
    clearButton.addEventListener('click', function () {
        const contenedor = document.getElementById('resultados-articulos');
        contenedor.innerHTML = '';
       
    });
    
   
 
  }
  
  searchFile();
  