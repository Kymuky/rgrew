
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
  if(backdrop){ backdrop.style.display='flex'; document.body.classList.add('modal-open'); }
}
function closeModal(id){
  const backdrop = document.getElementById(id);
  if(backdrop){ backdrop.style.display='none'; }
  const anyOpen = Array.from(document.querySelectorAll('.modal-backdrop')).some(b=>b.style.display==='flex');
  if(!anyOpen){ document.body.classList.remove('modal-open'); }
}
document.addEventListener('keydown', (e)=>{
  if(e.key==='Escape'){ 
    document.querySelectorAll('.modal-backdrop').forEach(b=>b.style.display='none'); 
    document.body.classList.remove('modal-open');
  }
});
document.addEventListener('click', (e)=>{
  const backdrop = e.target.closest('.modal-backdrop');
  if(backdrop && !e.target.closest('.modal')){
    backdrop.style.display='none';
    const anyOpen = Array.from(document.querySelectorAll('.modal-backdrop')).some(b=>b.style.display==='flex');
    if(!anyOpen){ document.body.classList.remove('modal-open'); }
  }
});
function toggleNav(){
  const nav = document.getElementById('mainnav');
  const btn = document.querySelector('.nav-toggle');
  const open = nav.classList.toggle('is-open');
  if(btn){ btn.setAttribute('aria-expanded', open ? 'true' : 'false'); }
}
window.addEventListener('resize', ()=>{
  const nav = document.getElementById('mainnav');
  const btn = document.querySelector('.nav-toggle');
  if(window.innerWidth>820 && nav.classList.contains('is-open')){
    nav.classList.remove('is-open');
    if(btn){ btn.setAttribute('aria-expanded','false'); }
  }
});
document.addEventListener('DOMContentLoaded', ()=>{ setActiveNav(); setLastUpdated(); });
