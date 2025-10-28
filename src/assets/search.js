fetch('/search_index.json')
  .then(r => r.json())
  .then(data => {
    const idx = elasticlunr.Index.load(data);
    const docs = idx.documentStore.docs;
    const searchInput = document.getElementById('search');
    const out = document.getElementById('searchResults');
    const filterSelect = document.getElementById('searchMode');

    function runSearch(q, tags = 'all') {
      let result = idx.search(q, { expand: true }).map(r => docs[r.ref] )
      if (tags === 'all') {
        return result;
      }
      
      result = result.filter(d => tags === 'all' || d.tags.includes(tags));

      return result;
    }

    function render(doc) {
      console.log(doc.imageq)
      let tagsHTML = "";
      console.log(doc.tags)

      doc.tags.forEach(tag => {
        tagsHTML += `<div class="tag-${tag}">${tag}</div>`
      });

      return `<div class="searchItem">
        <p>${doc.image ? `<img float=left class="searchItemImage" src="${doc.image}">` : ''} <a class="searchItemTitle" href="${doc.url}">${doc.title}</a>${doc.author ? ` by <a href="/authors/${doc.author}">${doc.author}</a>` : ''}</p>
        <p class="searchItemDescription">${doc.subtitle}</p>
        <div class="searchItemTagHolder">
          ${tagsHTML}
        </div>
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