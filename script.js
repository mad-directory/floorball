let currentView = 'all';

let lists = [];

const exercises = [
  {
    id: 1,
    title: 'Passdreieck',
    image: 'https://picsum.photos/400/250?1',
    fieldPlayers: 6,
    goalies: 0,
    competency: 'Passen',
    difficulty: 3,
    fieldSize: 'KF'
  },
  {
    id: 2,
    title: 'Torschussübung',
    image: 'https://picsum.photos/400/250?2',
    fieldPlayers: 8,
    goalies: 1,
    competency: 'Schießen',
    difficulty: 5,
    fieldSize: 'GF'
  },
  {
    id: 3,
    title: 'Spielaufbau',
    image: 'https://picsum.photos/400/250?3',
    fieldPlayers: 10,
    goalies: 1,
    competency: 'Spielaufbau',
    difficulty: 6,
    fieldSize: 'GF'
  }
];

async function login() {

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  const data = await response.json();

  if(data.success) {

    document.getElementById('loginPage')
      .classList.add('hidden');

    document.getElementById('app')
      .classList.remove('hidden');

    document.getElementById('currentUser')
      .textContent = data.username;

    await loadLists();

    renderLists();
    renderExercises();

  } else {

    document.getElementById('error')
      .textContent = 'Login fehlgeschlagen';
  }
}

async function loadLists() {

  const response = await fetch('/lists');

  lists = await response.json();
}

async function createList() {

  const name = document.getElementById('newListName').value;

  if(!name) return;

  await fetch('/create-list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  });

  await loadLists();

  renderLists();
}

function renderLists() {

  const container = document.getElementById('listsContainer');

  container.innerHTML = lists.map(list => `
    <div
      class="list-box"
      onclick="openList(${list.id})"
    >
      ${list.name}
    </div>
  `).join('');
}

function openList(id) {

  currentView = id;

  renderExercises();
}

function showAllExercises() {

  currentView = 'all';

  renderExercises();
}

function renderExercises() {

  const gallery = document.getElementById('gallery');

  let data = exercises;

  if(currentView !== 'all') {

    const list = lists.find(l => l.id === currentView);

    data = exercises.filter(exercise =>
      list.exercises.includes(exercise.id)
    );
  }

  gallery.innerHTML = data.map(exercise => {

    let action = '';

    if(currentView === 'all') {

      action = `
        <select id="list-${exercise.id}">
          ${lists.map(list => `
            <option value="${list.id}">
              ${list.name}
            </option>
          `).join('')}
        </select>

        <button onclick="saveExercise(${exercise.id})">
          Speichern
        </button>
      `;

    } else {

      action = `
        <button onclick="removeExercise(${exercise.id})">
          Entfernen
        </button>
      `;
    }

    return `
      <div class="card">

        <img src="${exercise.image}">

        <div class="card-content">

          <h2>${exercise.title}</h2>

          <div class="tags">
            <span>${exercise.fieldPlayers} Feldspieler</span>
            <span>${exercise.goalies} Goalies</span>
            <span>${exercise.competency}</span>
            <span>Schwierigkeit ${exercise.difficulty}</span>
            <span>${exercise.fieldSize}</span>
          </div>

          ${action}

        </div>

      </div>
    `;
  }).join('');
}

async function saveExercise(id) {

  const listId = document.getElementById(
    `list-${id}`
  ).value;

  await fetch('/save-exercise', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      listId,
      exerciseId: id
    })
  });

  await loadLists();
}

async function removeExercise(id) {

  await fetch('/remove-exercise', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      listId: currentView,
      exerciseId: id
    })
  });

  await loadLists();

  renderExercises();
}
