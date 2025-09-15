
async function loadNews(){
  async function fetchOrFallback(){
    try{
      const res = await fetch('data/news.json');
      if(!res.ok) throw new Error('HTTP '+res.status);
      return await res.json();
    }catch(e){
      // Fallback for file://
      console.warn('fetch(data/news.json) failed, using inline NEWS_DATA. Reason:', e);
      try{
        const inline = document.getElementById('news-data');
        if(inline){ return JSON.parse(inline.textContent); }
      }catch(parseErr){
        console.error('Inline news-data parse error', parseErr);
      }
      return [];
    }
  }

  try{
    const items = await fetchOrFallback();
    const grid = document.getElementById('news-grid');
    const modals = document.getElementById('news-modals');
    if(!Array.isArray(items) || items.length===0){
      const p = document.createElement('p');
      p.className='small';
      p.textContent = 'Пока нет публикаций.';
      grid.parentNode.insertBefore(p, grid.nextSibling);
      return;
    }
    items.forEach((n, idx)=>{
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <img src="${n.image}" alt="" style="width:100%;height:160px;object-fit:cover;border-radius:12px">
        <div style="margin-top:10px">
          <div class="small" style="color:var(--muted)">${new Date(n.date).toLocaleDateString('ru-RU')}</div>
          <h3 style="margin:6px 0 6px 0">${n.title}</h3>
          <p class="small" style="margin:0 0 8px 0">${n.summary}</p>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">${(n.tags||[]).map(t=>`<span class="badge">${t}</span>`).join('')}</div>
          <a class="btn" href="javascript:void(0)" onclick="openModal('news${idx}')">Подробнее</a>
        </div>`;
      grid.appendChild(card);

      const modal = document.createElement('div');
      modal.className = 'modal-backdrop'; modal.id = `news${idx}`;
      modal.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true" aria-label="Новость: ${n.title}">
          <header>
            <strong>${n.title}</strong>
            <button class="btn secondary" onclick="closeModal('news${idx}')">Закрыть</button>
          </header>
          <div class="body">
            <div class="kv">
              <div class="key">Дата публикации:</div><div>${new Date(n.date).toLocaleDateString('ru-RU')}</div>
              <div class="key">Теги:</div><div>${(n.tags||[]).join(', ')}</div>
            </div>
            <img src="${n.image}" alt="" style="width:100%;margin:14px 0;border-radius:12px">
            ${n.body_html||''}
          </div>
        </div>`;
      modals.appendChild(modal);
    });
  }catch(e){
    console.error('Cannot render news', e);
  }
}
document.addEventListener('DOMContentLoaded', loadNews);
