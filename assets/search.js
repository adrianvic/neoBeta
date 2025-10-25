fetch('/search_index.json')
  .then(r => r.json())
  .then(data => {
    const idx = elasticlunr.Index.load(data);
    const docs = idx.documentStore.docs;
    console.log(Object.values(docs)[0])
    const searchInput = document.getElementById('search');
    const out = document.getElementById('searchResults');
    const filterSelect = document.getElementById('searchMode');

    function runSearch(q, tags) {
      return idx.search(q, { expand: true })
        .map(r => docs[r.ref] )
        .filter(d => tags === 'all' || d.tags.includes(tags));
    }

    function render(doc) {
      return `<div>
        <img class="searchItemImage" src="${doc.image}">
        <a class="searchItemTitle" href="${doc.url}">${doc.title}</a>
        <p class="searchItemDescription">${doc.subtitle}</p>
      </div>`;
    }

    function update() {
      const q = searchInput.value.trim();
      if (!q) {
        out.innerHTML = '';
        return;
      }
      
      const results = runSearch(q, filterSelect.value);
      out.innerHTML = results.map(render).join('');
    }

    searchInput.addEventListener('input', update);
    filterSelect.addEventListener('change', update);
  });