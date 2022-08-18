// TODO : ROOT ESTABLISHING

// just some presets to save my tiny ape brain some time later
const root = document.documentElement;
const frameDef = getComputedStyle(root).getPropertyValue('--frameDef');

// todo : =====================
// todo : REOCCURRING FUNCTIONS
// todo : =====================

const buttonTog = (element) => {
  element.classList.toggle('inv');
};

const buttonUpdate = (status, element) => {
  status ? element.classList.add('inv') : element.classList.remove('inv');
};

// todo : HTML button gen

const createButton = (element, text, id) => {
  const item = document.createElement(element);
  item.textContent = text;

  if (typeof id !== 'undefined') {
    item.id = id;
  }

  return item;
};

// todo : ================
// todo : CLOTHING CHANGER
// todo : ================

// Default clothing variables.
const clothingDefault = 0,
  clothingTypes = 14,
  clothingColumns = 7;

const updateClothing = () => {
  const clothing = document.querySelector('#clothing'),
    clothingDebug = document.querySelector('#clothingDebug');

  // Generate button rows
  for (let e = 0; e < Math.ceil(clothingTypes / clothingColumns); e++) {
    clothing.appendChild(createButton('div', '', '')); // creates the containing box for each row
    let divS = clothing.getElementsByTagName('div')[e]; // creates a var to address the containing box

    for (let i = 0; i < clothingColumns; i++) {
      // generates columns
      let cur = clothingColumns * e + i; // figures out which button ((row x row width) + coloumn)

      divS
        .appendChild(createButton('e', '', `clothing${cur}`)) // generates the button itself.
        .appendChild(createButton('t', cur + 1, '')); // this is to align the text in the middle
      // usually you wouldn't need this but because the box is so small, it overflows and causes issues.

      divS.children[i].onclick = function () {
        // attach event listener individually
        document
          .querySelectorAll('#clothing e')
          ?.forEach((element) => buttonUpdate(false, element));
        buttonTog(this);
        verticalUpdate(cur);
        clothingDebug.textContent = cur + 1;
      };
    }
  }

  // enables the button that is the default clothing option
  buttonUpdate(true, document.querySelector(`#clothing${clothingDefault}`));
  clothingDebug.textContent = clothingDefault + 1;
};

// todo : ==================
// todo : ANIMATION SETTINGS
// todo : ==================

// animation timing setup (this is going to get recoded)
let animationOffsets,
  bpm = 130; // this is just the standard frame time for the animation offset to prevent recalcing. (optimisation)

// a bunch of presets to save work
const scaleRes = getComputedStyle(root).getPropertyValue('--scaler'),
  verticalOffset = getComputedStyle(root).getPropertyValue('--size');

let playTog = false; // toggle bool and current loop iteration for debug purposes
let start = new Date().getTime(),
  elapsed = 0;

window.setInterval(() => {
  if (playTog) {
    let time = new Date().getTime() - start;
    elapsed = Math.floor(time / (60 / bpm) / (1000 / animationOffsets.length));
    animationPush();
  }
}, 60 / bpm);

// todo : Animation Updater

const verticalUpdate = (e) => {
  document.querySelector('#body').style.marginTop = `${
    -(verticalOffset * e) * scaleRes
  }px`; // Updates current clothing
};

const animationPush = () => {
  if (elapsed > animationOffsets.length - 1) {
    // if current frame is more than 30
    elapsed = 0;
    start = new Date().getTime(); // resets timer every 30 animation frames. [automation]
    floorTog();
  } else if (elapsed < 0) {
    elapsed = animationOffsets.length - 1; // if current frame is less than 0 [manual]
    floorTog();
  }

  document.querySelectorAll('#body, #head').forEach((id) => {
    id.style.marginLeft = `${
      -((animationOffsets[elapsed] - 1) * verticalOffset) * scaleRes
    }px`;
  });

  document.querySelector('#frame').textContent = elapsed + 1;
};

// todo : ==============================
// todo : Music Playlist / BPM automated
// todo : ==============================

const songList = [
  ['1-1 // Disco Descent'], // 115
  [
    'BOSS // Deep Blues',
    'BOSS // King Conga',
    'BOSS // Golden Lute',
    'TRAINING // Watch Your Step'
  ], // 120
  ['BOSS // Coral Riff'], // 125
  [
    'LOBBY // Rhythmortis',
    '1-2 // Crypteque',
    '2-1 // Fungal Funk',
    '4-1 // Styx and Stones'
  ], // 130
  ['3-1 // Stone Cold (cold)', ' 3-1 // Igneous Rock (hot)'], // 135
  [
    '1-3 // Mausoleum Mash',
    '2-2 // Grave Throbbing',
    'BOSS // Necrodancer Phase 1',
    'BOSS // Dead Ringer'
  ], // 140
  [
    '3-2 // Dance of the Decorous (cold)',
    '3-2 March of the Profane (hot)',
    '4-2 // Heart of the Crypt'
  ], // 145
  ['2-3 // Portabellohead'], // 150
  ['3-3 // A Cold sweat (cold)', '3-3 // A Hot Mess (hot)'], // 155
  ['4-3 // The Wight To Remain', 'BOSS // Necrodancer Phase 2'], // 160
  ['N/a'], // 165
  ['N/a'], // 170
  ['BOSS // Death Metal']
]; // 175

// todo : BPM divisional

const bpmUpdate = () => {
  bpm = document.getElementById('bpmSlider').value;
  const trackContainer = document.querySelector('#trackContainer');

  document.querySelector('#bpmDebug').innerHTML = bpm;
  document.querySelector('#bpm').innerHTML = bpm;
  trackContainer.innerHTML = '';

  const step = (bpm - 110) / 5 - 1;

  for (let i = 0; i < songList[step].length; i++) {
    const item = document.createElement('t');
    item.textContent = songList[step][i];
    const br = document.createElement('br');

    trackContainer.appendChild(item).appendChild(br);
  }
};

// todo : =========================
// todo : Floor Updating & Swapping
// todo : =========================

let danceTog = false,
  floorBool = false,
  framePushType = true;

const frameTypeToggle = () =>
  // this is to push the current frame times
  (animationOffsets = framePushType
    ? [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
    : [1, 2, 3, 4]);

const floorTog = () => {
  floorBool = !floorBool;
  document.querySelector('#DanceDebug').textContent = danceTog
    ? floorBool
      ? 2
      : 1
    : 0;
  document.querySelector('#crop').style.backgroundPositionY = `${
    -(
      (danceTog ? (floorBool ? 2 : 1) : 0) *
      (scaleRes * (verticalOffset * 2))
    ) - scaleRes * 5
  }px`;
};

const floorUpdate = () => {
  const floorTileSets = [
      ['Zone1'],
      ['zone2'],
      [true, 'zone3_1', 'zone3_2'],
      ['zone4'],
      ['Zone5'],
      [true, 'boss_1', 'boss_2']
    ],
    floorColoumns = 3,
    background = document.querySelector('#backgrounds'),
    floor = document.querySelector('#FloorDebug');

  let currentFloor = 0;

  for (let e = 0; e < floorTileSets.length / floorColoumns; e++) {
    background.appendChild(createButton('div', '', '')); // creates the containing box for each row
    const parentContainer = background.getElementsByTagName('div')[e]; // creates a var to address the containing box

    for (let i = 0; i < floorColoumns; i++) {
      const cur = floorColoumns * e + i,
        arrayTile = floorTileSets[cur][floorTileSets[cur].length > 1 ? 1 : 0];

      const buttonElem = createButton('e', '', 'floor' + cur); // generates a button
      buttonElem.appendChild(createButton('t', arrayTile, '')); // generates text data for the button
      // assigns background image for the button
      buttonElem
        .appendChild(createButton('f', '', ''))
        .setAttribute(
          'style',
          `background-image: url('UI_Libraries/${arrayTile}_Floor.png')`
        );

      parentContainer.appendChild(buttonElem);

      const setBgOnClick = () => {
        const localTileSets = floorTileSets[cur];
        let localFloor = currentFloor;

        if (localTileSets.length > 1) {
          if (this.id === `floor${localFloor}`) {
            localTileSets[0] = !localTileSets[0];
          }

          this.children[1].setAttribute(
            'style',
            `background-image: url('./UI_Libraries/${
              localTileSets[localTileSets[0] ? 1 : 2]
            }_Floor.png')`
          );
          this.children[0].textContent =
            localTileSets[localTileSets[0] ? 1 : 2];
        }

        // removes all buttons from being enabled on mouse press
        document.querySelectorAll('#backgrounds e').forEach((element) => {
          buttonUpdate(false, element);
        });
        this.classList.add('inv');

        localFloor = cur; // updates the current floor for the .FirstChild.id check on function start
        document.querySelector('#FloorDebug').textContent =
          localTileSets.length > 1
            ? localTileSets[this.getAttribute('backgroundBool')]
            : arrayTile;
        document.querySelector('#crop').style.backgroundImage =
          getComputedStyle(this.getElementsByTagName('f')[0]).backgroundImage;
      };

      parentContainer.children[i].onclick = setBgOnClick();
    }
  }

  const floorPush =
    floorTileSets[currentFloor][floorTileSets[currentFloor].length > 1 ? 1 : 0];
  document
    .querySelector('#crop')
    .setAttribute(
      'style',
      `background-image: url('UI_Libraries/${floorPush}_Floor.png')`
    );
  floor.textContent = floorPush;
};

// Wait for document ready state
document.addEventListener('DOMContentLoaded', () => {
  // TODO : DEFAULT SETTING ESTABLISHING

  document.querySelector('#ani, #frame').value = frameDef;
  document.querySelector('#bpmSlider').oninput = () => bpmUpdate();

  frameTypeToggle();
  bpmUpdate();
  updateClothing();
  floorUpdate();
});
