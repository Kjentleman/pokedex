document.addEventListener("DOMContentLoaded", () => {
  const REGION_IDS = [
    'P002', // Ivysaur
    'P006', // Charizard
    'P025', // Pikachu
    'P103', // Exeggutor
    'P134', // Vaporeon
    'P182', // Bellosom
    'T226', // Lt. Surge
    'T034', // Team Aqua
    'T104', // Team Rocket
    'T132', // Misty
  ];
  const collection = localStorage.getItem('collection')
  const collection_ids = collection ? collection.split(',') : [];
  const url = new URL(window.location.href);

  // CATCH & RELEASE
  const mon_id = url.searchParams.get('catch');
  if (mon_id) {
    if (mon_id === 'release') {
      localStorage.clear('collection');
      collection_ids.length = 0;
    }
    else if (REGION_IDS.includes(mon_id) && !collection_ids.includes(mon_id)) {
      collection_ids.push(mon_id);
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
});
