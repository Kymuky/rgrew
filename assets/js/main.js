
function setActiveNav(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navline a').forEach(a=>{
    if(a.getAttribute('href')===path){ a.classList.add('active'); }
  });
}
function setLastUpdated(){
  const el = document.querySelector('[data-last-updated]');
  if(el){
    el.textContent = new Date(document.lastModified).toLocaleString('ru-RU');
  }
}
function openModal(id){
  const backdrop = document.getElementById(id);
  if(backdrop){ backdrop.style.display='flex'; }
}
function closeModal(id){
  const backdrop = document.getElementById(id);
  if(backdrop){ backdrop.style.display='none'; }
}
document.addEventListener('keydown', (e)=>{
  if(e.key==='Escape'){ document.querySelectorAll('.modal-backdrop').forEach(b=>b.style.display='none'); }
});
document.addEventListener('DOMContentLoaded', ()=>{ setActiveNav(); setLastUpdated(); });

// Enhance modal behavior: lock body scroll, close on backdrop click (outside modal)
function openModal(id){
  const backdrop = document.getElementById(id);
  if(backdrop){ 
    backdrop.style.display='flex'; 
    document.body.classList.add('modal-open');
  }
}
function closeModal(id){
  const backdrop = document.getElementById(id);
  if(backdrop){ backdrop.style.display='none'; }
  // If no visible modals remain, unlock body
  const anyOpen = Array.from(document.querySelectorAll('.modal-backdrop')).some(b=>b.style.display==='flex');
  if(!anyOpen){ document.body.classList.remove('modal-open'); }
}
// close on backdrop click
document.addEventListener('click', (e)=>{
  const backdrop = e.target.closest('.modal-backdrop');
  if(backdrop && !e.target.closest('.modal')){
    backdrop.style.display='none';
    const anyOpen = Array.from(document.querySelectorAll('.modal-backdrop')).some(b=>b.style.display==='flex');
    if(!anyOpen){ document.body.classList.remove('modal-open'); }
  }
});
