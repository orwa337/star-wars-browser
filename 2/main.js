var renderers = {};
var mainElement = document.querySelector('main');

function createModal() {
  var element = document.createElement('div');
  element.classList.add('modal');
  element.innerHTML = `<div class="body">
  <div class="controls">
    <button>close</button>
  </div>
  <div class="content"></div>
</div>
<div class="underlay"></div>`;
  return element;
}

function showModal(contentElement) {
  modalContentElement.innerHTML = '';
  modalContentElement.appendChild(contentElement);
  modalElement.classList.add('open');
}

function hideModal() {
  modalElement.classList.remove('open');
}

// you can copy that safely, just pay attention to where it has to be paste
var modalElement = createModal();
var modalContentElement = modalElement.querySelector('.content');
var modalCloseButton = modalElement.querySelector('.controls button');
modalCloseButton.addEventListener('click', hideModal);
document.body.appendChild(modalElement);

function loadData(url, done) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var response = JSON.parse(xhr.responseText);
    done(response);
  };
  xhr.open('get', url);
  xhr.send();
}

function loadPeople(done) {
  loadData('https://swapi.co/api/people', done);
}

function loadPlanet(url, done) {
  loadData(url, done);
}



function renderPeople(people) {
  mainElement.textContent = '';
  var navObj = document.createElement('nav');

    if(people.previous) {
      var previousObj = document.createElement('button');
      previousObj.classList.add('previous');
      previousObj.textContent = 'Previous';
      previousObj.addEventListener('click', function() {
        loadData(people.previous, renderPeople);
        
      });
            navObj.appendChild(previousObj);
      }

      if (people.next) {
        var nextObj = document.createElement('button');
        nextObj.classList.add('next');
        nextObj.textContent = 'Next';

        nextObj.addEventListener('click', function() {
        
        loadData(people.next, renderPeople);
        
        });
                navObj.appendChild(nextObj);
      }
    



  

  mainElement.appendChild(navObj);
        


  people.results.forEach(function(person) {
    var sectionElement = document.createElement('section');
    sectionElement.classList.add('person');

    var genderSymbol;
    switch (person.gender) {
      case 'male':
        genderSymbol = '♂';
        break;
      case 'female':
        genderSymbol = '♀';
        break;
      default:
        genderSymbol = '?';
    }

    sectionElement.innerHTML = `
    <header>
      <h1>
        ${person.name}
        <span class="gender" title="Gender: ${person.gender}">${genderSymbol}</span>
      </h1>
    </header>
    <div>
      <button>GIMME THE HOMEWORLD DIGGA</button>
      <ul>
        <li>
          <span class="label">Birth Year:</span>
          <span class="value">${person.birth_year}</span>
        </li>
        <li>
          <span class="label">Eye Color:</span>
          <span class="value">${person.eye_color}</span>
        </li>
        <li>
          <span class="label">Skin Color:</span>
          <span class="value">${person.skin_color}</span>
        </li>
        <li>
          <span class="label">Hair Color:</span>
          <span class="value">${person.hair_color}</span>
        </li>
        <li>
          <span class="label">Height:</span>
          <span class="value">${(person.height / 100).toFixed(2)}m</span>
        </li>
        <li>
          <span class="label">Mass:</span>
          <span class="value">${person.mass}kg</span>
        </li>
      </ul>
    </div>
    `;


    sectionElement
      .querySelector('button')
      .addEventListener('click', function() {
        loadPlanet(person.homeworld, renderPlanet);
      });

    mainElement.appendChild(sectionElement);

  });
}

renderers.people = renderPeople;


function renderPlanet(planet) {
  var sectionElement = document.createElement('section');
  sectionElement.classList.add('planet');
  sectionElement.innerHTML = `<header>
    <h1>${planet.name}</h1>
  </header>
  <div>
    <ul>
      <li>
        <span class="label">Climate:</span>
        <span class="value">${planet.climate}</span>
      </li>
      <li>
        <span class="label">Diameter:</span>
        <span class="value">${planet.diameter}</span>
      </li>
      <li>
        <span class="label">Gravity:</span>
        <span class="value">${planet.gravity}</span>
      </li>
      <li>
        <span class="label">Orbital Period:</span>
        <span class="value">${planet.orbital_period}</span>
      </li>
    </ul>
    <ul>
      <li>
        <span class="label">Population:</span>
        <span class="value">${planet.population}</span>
      </li>
      <li>
        <span class="label">Rotation Period:</span>
        <span class="value">${planet.rotation_period}</span>
      </li>
      <li>
        <span class="label">Surface Water:</span>
        <span class="value">${planet.surface_water}</span>
      </li>
      <li>
        <span class="label">Terrain:</span>
        <span class="value">${planet.terrain}</span>
      </li>
    </ul>
  </div>`;
  showModal(sectionElement);
}

loadPeople(renderPeople);

function renderfilms(films) {
  mainElement.textContent = '';
  var navObj = document.createElement('nav');

    if(films.previous) {
      var previousObj = document.createElement('button');
      previousObj.classList.add('previous');
      previousObj.textContent = 'Previous';
      previousObj.addEventListener('click', function() {
        loadData(films.previous, renderfilms);
        
      });
            navObj.appendChild(previousObj);
      }

      if (films.next) {
        var nextObj = document.createElement('button');
        nextObj.classList.add('next');
        nextObj.textContent = 'Next';

        nextObj.addEventListener('click', function() {
        
        loadData(films.next, renderfilms);
        
        });
                navObj.appendChild(nextObj);
      }
    
  mainElement.appendChild(navObj);
        


  films.results.forEach(function(film) {
    var sectionElement = document.createElement('section');
    sectionElement.classList.add('film');

    sectionElement.innerHTML = `
    <header>
      <h1>
        ${film.title}
        
      </h1>
    </header>
    <div>
      <ul>
        <li>
          <span class="label">episode_id:</span>
          <span class="value">${film.episode_id}</span>
        </li>
        <li>
          <span class="label">opening_crawl:</span>
          <span class="value">${film.opening_crawl}</span>
        </li>
        <li>
          <span class="label">director:</span>
          <span class="value">${film.director}</span>
        </li>
        <li>
          <span class="label">producer:</span>
          <span class="value">${film.producer}</span>
        </li>
        <li>
          <span class="label">release_date:</span>
          <span class="value">${film.release_date}kg</span>
        </li>
      </ul>
    </div>
    `;
    mainElement.appendChild(sectionElement);

  });
}

renderers.films = renderfilms;

function rendervehicles(vehicles) {
  mainElement.textContent = '';
  var navObj = document.createElement('nav');

    if(vehicles.previous) {
      var previousObj = document.createElement('button');
      previousObj.classList.add('previous');
      previousObj.textContent = 'Previous';
      previousObj.addEventListener('click', function() {
        loadData(vehicles.previous, rendervehicles);
        
      });
            navObj.appendChild(previousObj);
      }

      if (vehicles.next) {
        var nextObj = document.createElement('button');
        nextObj.classList.add('next');
        nextObj.textContent = 'Next';

        nextObj.addEventListener('click', function() {
        
        loadData(vehicles.next, rendervehicles);
        
        });
                navObj.appendChild(nextObj);
      }
    
  mainElement.appendChild(navObj);
        


  vehicles.results.forEach(function(vehicle) {
    var sectionElement = document.createElement('section');
    sectionElement.classList.add('vehicle');

    sectionElement.innerHTML = `
    <header>
      <h1>
        ${vehicle.name}
        
      </h1>
    </header>
    <div>
      <ul>
        <li>
          <span class="label">model:</span>
          <span class="value">${vehicle.model}</span>
        </li>
        <li>
          <span class="label">manufacturer:</span>
          <span class="value">${vehicle.manufacturer}</span>
        </li>
        <li>
          <span class="label">cost_in_credits:</span>
          <span class="value">${vehicle.cost_in_credits}</span>
        </li>
        <li>
          <span class="label">length:</span>
          <span class="value">${vehicle.length}</span>
        </li>
        <li>
          <span class="label">max_atmosphering_speed:</span>
          <span class="value">${vehicle.max_atmosphering_speed}kg</span>
        </li>
        <li>
          <span class="label">crew:</span>
          <span class="value">${vehicle.crew}kg</span>
        </li>
        <li>
          <span class="label">passengers:</span>
          <span class="value">${vehicle.passengers}kg</span>
        </li>
        <li>
          <span class="label">cargo_capacity:</span>
          <span class="value">${vehicle.cargo_capacity}kg</span>
        </li>
        <li>
          <span class="label">consumables:</span>
          <span class="value">${vehicle.consumables}kg</span>
        </li>
        <li>
          <span class="label">vehicle_class:</span>
          <span class="value">${vehicle.vehicle_class}kg</span>
        </li>
      </ul>
    </div>
    `;
    mainElement.appendChild(sectionElement);

  });
}

renderers.vehicles = rendervehicles;

function renderspecies(species) {
  mainElement.textContent = '';
  var navObj = document.createElement('nav');

    if(species.previous) {
      var previousObj = document.createElement('button');
      previousObj.classList.add('previous');
      previousObj.textContent = 'Previous';
      previousObj.addEventListener('click', function() {
        loadData(species.previous, renderspecies);
        
      });
            navObj.appendChild(previousObj);
      }

      if (species.next) {
        var nextObj = document.createElement('button');
        nextObj.classList.add('next');
        nextObj.textContent = 'Next';

        nextObj.addEventListener('click', function() {
        
        loadData(species.next, renderspecies);
        
        });
                navObj.appendChild(nextObj);
      }
    
  mainElement.appendChild(navObj);
        
  species.results.forEach(function(space) {
    var sectionElement = document.createElement('section');
    sectionElement.classList.add('space');

    sectionElement.innerHTML = `
    <header>
      <h1>
        ${space.name}
      </h1>
    </header>
    <div>
      <ul>
        <li>
          <span class="label">classification:</span>
          <span class="value">${space.classification}</span>
        </li>
        <li>
          <span class="label">designation:</span>
          <span class="value">${space.designation}</span>
        </li>
        <li>
          <span class="label">average_height:</span>
          <span class="value">${space.average_height}</span>
        </li>
        <li>
          <span class="label">skin_colors:</span>
          <span class="value">${space.skin_colors}</span>
        </li>
        <li>
          <span class="label">hair_colors:</span>
          <span class="value">${space.hair_colors}kg</span>
        </li>
       <li>
          <span class="label">eye_colors:</span>
          <span class="value">${space.eye_colors}</span>
        </li>
       <li>
          <span class="label">average_lifespan:</span>
          <span class="value">${space.average_lifespan}</span>
        </li>
       <li>
          <span class="label">language:</span>
          <span class="value">${space.language}</span>
        </li>
      </ul>
    </div>
    `;
    mainElement.appendChild(sectionElement);

  });
}

renderers.species = renderspecies;


function renderUnimplemented(){

  mainElement.textContent = 'Sorry, this is not implemented yet.';
}

function renderMenu(data) {
  var menuListElement = document.querySelector('body > header ul');

  var keys = Object.keys(data);
  keys.forEach(function(key) {
    var liElement = document.createElement('li');
    var aElement = document.createElement('a');
    aElement.textContent = key;
    aElement.addEventListener('click',function(){
      if (!renderers[key]) return renderUnimplemented();
      loadData(data[key], renderers[key]);
    });
    liElement.appendChild(aElement);
    menuListElement.appendChild(liElement);
  });
}

loadData('https://swapi.co/api/' , renderMenu);


