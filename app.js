const plans={MINIMAL:{price:1500},PROFI:{price:2000},ULTRA:{price:3000}};
const $=s=>document.querySelector(s);
function toast(t){$('#toast').textContent=t;$('#toast').classList.remove('hidden');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>$('#toast').classList.add('hidden'),3200)}
function hasAccount(){return !!localStorage.getItem('nexmineEmail')}
function refresh(){const email=localStorage.getItem('nexmineEmail')||'';$('#login').textContent=email?'Мой аккаунт':'Регистрация';$('#logout').classList.toggle('hidden',!email);$('#email').value=email;document.querySelectorAll('.requires-login').forEach(s=>s.classList.toggle('account-locked',!email));$('#balance').textContent='$0.00';$('#activePlan').textContent='Нет';$('#accrual').textContent='$0.00';}
function requireAccount(e){if(!hasAccount()){e.preventDefault();$('#modal').classList.remove('hidden');toast('Сначала зарегистрируй электронную почту.')}}
document.querySelectorAll('a[href="#account"],a[href="#subs"],a[href="#history"],a[href="#settings"]').forEach(a=>a.addEventListener('click',requireAccount));
$('#login').onclick=()=>{if(hasAccount())location.hash='#account';else $('#modal').classList.remove('hidden')};
$('#close').onclick=()=>$('#modal').classList.add('hidden');$('#modal').onclick=e=>{if(e.target.id==='modal')$('#modal').classList.add('hidden')};
function register(input){const email=input.value.trim().toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){toast('Введи корректный адрес электронной почты.');return false}localStorage.setItem('nexmineEmail',email);$('#modal').classList.add('hidden');refresh();toast('Профиль создан в этом браузере.');location.hash='#account';return true}
$('#continue').onclick=()=>register($('#loginEmail'));$('#logout').onclick=()=>{localStorage.removeItem('nexmineEmail');refresh();location.hash='#home';toast('Ты вышел из аккаунта')};
document.querySelectorAll('.buy').forEach(b=>b.onclick=()=>toast('Выбор тарифа пока недоступен.'));
$('#save').onclick=()=>{const email=$('#email').value.trim().toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){toast('Введи корректный адрес электронной почты.');return}localStorage.setItem('nexmineEmail',email);refresh();toast('Адрес сохранён в этом браузере.')};
refresh();
