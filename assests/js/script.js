document.addEventListener("DOMContentLoaded", () => {
  const REGION_IDS = [
    'P5N972',  // 002 IVYSAUR
    'P79XL5',  // 006 CHARIZARD
    'P66IJ2',  // 025 PIKACHU
    'P5Y42Q',  // 067 MACHOKE
    'P7HYNK',  // 103 EXEGGUTOR
    'P1B7YP',  // 134 VAPOREAN
    'T48HQ3',  // MISTY
    'T895GO',  // LT. SURGE
    'TCSTRP',  // TEAM ROCKET
    'T2JRD4',  // ASH
    'P10A3L',  // BELLOSOM
    'T942HN',  // TEAM AQUA
  ];

  const collection = localStorage.getItem('collection')
  const collection_ids = collection ? collection.split(',') : [];
  const url = new URL(window.location.href);

  // CATCH & RELEASE
  const catch_id = url.searchParams.get('catch');
  if (catch_id) {
    if (catch_id === 'release') {
      localStorage.clear('collection');
      collection_ids.length = 0;
    }
    else if (REGION_IDS.includes(catch_id) && !collection_ids.includes(catch_id)) {
      collection_ids.push(catch_id);
      localStorage.setItem('collection', collection_ids);
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
    });
  }

  // COUNT
  const count = document.getElementById('count');
  count.textContent = `${collection_ids.length}/${REGION_IDS.length}`;
});
