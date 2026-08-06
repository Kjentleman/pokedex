const REGION = {
    'P5N972': '#002 Ivysaur',
    'P79XL5': '#006 Charizard',
    'P66IJ2': '#025 Pikachu',
    'P5Y42Q': '#067 Machoke',
    'P7HYNK': '#103 Exeggutor (Alolan)',
    'P1B7YP': '#134 Vaporeon',
    'T48HQ3': 'Misty',
    'T895GO': 'Lt. Surge',
    'TCSTRP': 'Team Rocket',
    'T2JRD4': 'Ash Ketchum',
    'P10A3L': '#182 Bellosom',
    'T942HN': 'Team Aqua',
  };
const REGION_IDS = Object.keys(REGION);

document.addEventListener("DOMContentLoaded", () => {
  const url = new URL(window.location.href);
  const collection = localStorage.getItem('collection');
  let collection_ids = collection ? collection.split(',') : [];
  let debug = false;

  // CATCH & RELEASE
  const catch_id = url.searchParams.get('catch');
  if (catch_id) {
    if (catch_id === 'release') {
      debug = false;
      localStorage.clear('collection');
      collection_ids.length = 0;
    }
    else if (catch_id === 'emall') {
      debug = true;
      collection_ids = REGION_IDS;
      openModal('missingno');
    }
    else if (REGION_IDS.includes(catch_id)) {
      openModal(catch_id);

      if (!collection_ids.includes(catch_id)) {
        collection_ids.push(catch_id);
        localStorage.setItem('collection', collection_ids);
      }
    }

    url.searchParams.delete('catch');
    window.history.replaceState({}, '', url.toString());
  }
  
  // REVEAL
  if (collection_ids.length > 0) {
    const selectors = collection_ids.reduce(
      (str, item) => str.concat(`#${item}, `),
      '',
    ).slice(0, -2);
    const elements = document.querySelectorAll(selectors);
    elements.forEach(element => {
      
      element.classList.remove("uncaught");
      element.addEventListener('click', () => {
        openModal(element.id);
      });
    });
  }

  // COUNT
  const count = document.getElementById('count');
  count.textContent = debug ? 'DEBUG' : `${collection_ids.length}/${REGION_IDS.length}`;
});

// MODAL
function toggleModal(isOpen) {
  const modal = document.getElementById('mdModal');
  modal.style.display = isOpen ? 'flex' : 'none';
}

function openModal(id) {
  const modal_image = document.getElementById('mdModalImage');
  const modal_title = document.getElementById('mdModalTitle');

  modal_title.innerHTML = REGION[id] || 'MissingNo.';
  modal_image.src = `assests/images/${id}.png`;
  toggleModal(true);
}
