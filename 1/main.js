function createModal() {
  var element = document.createElement('div');
  element.classList.add('modal');
  element.innerHTML = `
  <div class="body">
    <div class="controls">
      <button>close</button>
     </div>
    <div class="content"></div>
  </div>
    <div class="underlay"></div>
  `;
  return element;
}

function showModal(contentElement) {
  // ...
}

function hideModal() {
  // ...
}


var modalElement = createModal();
var modalContentElement = modalElement.querySelector('.content');
var modalCloseButton = modalElement.querySelector('.controls button');
modalCloseButton.addEventListener('click', hideModal);
document.body.appendChild(modalElement);


var mainElement = document.querySelector('main');

function loadData(wanted, done) {
    var xhr = new XMLHttpRequest();
  xhr.open('GET', wanted);
  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = xhr.responseText;
      var reasponseObj = JSON.parse(response);
      done(reasponseObj);

      //console.log(reasponseObj);
      //console.log(reasponseObj["results"]);

    }
  }
  xhr.send();
}

/*
  fill here
  ---------
  - make a GET request to: 'https://swapi.co/api/people/'
  - call the function "done" and pass it the result of the request
*/

function loadPeople(done) {
  loadData('https://swapi.co/api/people', done);
}

function loadPlanet(url, done) {
  loadData(url, done);
}

function renderPeople(people) {
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
        <span class="gender" tilte="Gender: ${person.gender}">${genderSymbol}</span>
      </h1>
    </header>
    <div>
    <button>Homeworld details</button>
      <ul>
        <li>
          <span class="lable">Birth Year :</span>
         <span class="value">${person.birth_year}</span>
        </li>
        <li>
          <span class="lable">Eye Color :</span>
          <span class="value">${person.eye_color}</span>
        </li>
        <li>
          <span class="lable">Skin Color :</span>
          <span class="value">${person.skin_color}</span>
        </li>
        <li>
          <span class="lable">Hair Color :</span>
          <span class="value">${person.hair_color}</span>
        </li>
        <li>
          <span class="lable">Height :</span>
          <span class="value">${(person.height/100).toFixed(2)}m</span>
        </li>
        <li>
          <span class="lable">'Mass :</span>
          <span class="value">${person.mass}</span>
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

function renderPlanet(planet) {
    planet.forEach(function(homeworld) {
    var sectionElement2 = document.createElement('section');
    sectionElement2.classList.add('homeworld');
    sectionElement2.innerHTML = `
    <header>
      <h1>
        ${homeworld.name}
      </h1>
    </header>
    <div>
      <ul>
        <li>
          <span class="lable">Rotation period :</span>
         <span class="value">${homeworld.rotation_period}</span>
        </li>
        <li>
          <span class="lable">Orbital period :</span>
          <span class="value">${homeworld.orbital_period}</span>
        </li>
        <li>
          <span class="lable">Diameter :</span>
          <span class="value">${homeworld.diameter}</span>
        </li>
        <li>
          <span class="lable">climate :</span>
          <span class="value">${homeworld.climate}</span>
        </li>
        <li>
          <span class="lable">gravity :</span>
          <span class="value">${homeworld.gravity}m</span>
        </li>
        <li>
          <span class="lable">Terrain :</span>
          <span class="value">${homeworld.terrain}</span>
        </li>
        <li>
          <span class="lable">Surface Water :</span>
          <span class="value">${homeworld.surface_water}</span>
        </li>
        <li>
          <span class="lable">Population :</span>
          <span class="value">${homeworld.population}</span>
        </li>
      </ul>
    </div>
    `;


    mainElement.appendChild(sectionElement2);
  });
}

//
//function renderPeople(people) {
//   console.log(people);
//   for (var i = 0; i < people.length; i++) {

//     var sectionObj = document.createElement('section');
//     mainElement.appendChild(sectionObj);

//     sectionObj.innerHTML = '<header><h1>' + people[i].name + '</h1></header>';

//     var divObj = document.createElement('div');
//     sectionObj.appendChild(divObj);

//     divObj.innerHTML = '<ul>' +
//                         '<li>'  + 'Birth Year : ' + people[i].birth_year + '</li>' +
//                         '<li>'  + 'Eye Color : ' + people[i].eye_color + '</li>' +
//                         '<li>'  + 'Skin Color : ' + people[i].skin_color + '</li>' +
//                         '<li>'  + 'Hair Color : ' + people[i].hair_color + '</li>' +
//                         '<li>'  + 'Height : ' + people[i].height + '</li>' +
//                         '<li>'  + 'Mass : ' + people[i].mass + '</li>' +
//                         '</ul>' ;
// }




/*
  fill here
  ---------
  For each given people (use a loop or Array.forEach())
  - create a section element (with the document.createElement())
  - fill the innerHTML (maybe have a look at template literals) of the section with:
    - A header tag which has
      - A h1 tag containing the name of the person
    - A div tag which has a list of the following information:
      - Birth Year
      - Eye Color
      - Skin Color
      - Hair Color
      - Height
      - Mass
    - Add the section element to the main element of the index.html
*/

// call the loadPeople with the renderPeople function as parameter
loadPeople(renderPeople);
loadPlanet(renderPlanet);