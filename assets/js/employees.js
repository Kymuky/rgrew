
async function loadEmployees(){
  async function fetchOrFallback(){
    try{
      const res = await fetch('data/employees.json');
      if(!res.ok) throw new Error('HTTP '+res.status);
      return await res.json();
    }catch(e){
      const inline = document.getElementById('employees-data');
      if(inline){ try{return JSON.parse(inline.textContent);}catch(_){} }
      return [];
    }
  }
  try{
    const employees = await fetchOrFallback();
    const grid = document.getElementById('emp-grid');
    const modals = document.getElementById('emp-modals');
    if(!Array.isArray(employees) || employees.length===0){
      const p = document.createElement('p');
      p.className='small';
      p.textContent = 'Список сотрудников временно недоступен.';
      grid.parentNode.insertBefore(p, grid.nextSibling);
      return;
    }
    employees.forEach((e, idx)=>{
      const card = document.createElement('div');
      card.className='card emp-card';
      card.innerHTML = `
        <img src="${e.photo}" alt="Фото: ${e.full_name}">
        <div class="name">${e.full_name}</div>
        <div class="role">${e.position}</div>
        <div class="dept">${e.department}</div>
        <a class="btn" href="javascript:void(0)" onclick="openModal('m${idx}')">Подробнее</a>`;
      grid.appendChild(card);
      const modal = document.createElement('div');
      modal.className='modal-backdrop'; modal.id=`m${idx}`;
      modal.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true" aria-label="Карточка сотрудника">
          <header>
            <strong>${e.full_name}</strong>
            <button class="btn secondary" onclick="closeModal('m${idx}')">Закрыть</button>
          </header>
          <div class="body">
            <div class="kv">
              <div class="key">Должность:</div><div>${e.position}</div>
              <div class="key">Подразделение:</div><div>${e.department}</div>
              <div class="key">Email:</div><div><a href="mailto:${e.email}">${e.email}</a></div>
              <div class="key">Телефон:</div><div><a href="tel:${e.phone}">${e.phone}</a></div>
              <div class="key">Дата рождения:</div><div>${e.birthdate}</div>
              <div class="key">№ удостоверения:</div><div>${e.id_number}</div>
              <div class="key">Обязанности:</div><div>${e.duties}</div>
            </div>
            <img class="id-card" src="${e.id_card_img}" alt="Удостоверение">
          </div>
        </div>`;
      modals.appendChild(modal);
    });
  }catch(err){
    console.error('employees render error', err);
  }
}
document.addEventListener('DOMContentLoaded', loadEmployees);
