// submit form to Google Apps Script
document.getElementById('subscribeForm').addEventListener('submit', async function(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('form-msg');
  const rgpd = document.getElementById('rgpdConsent');

  if (!rgpd.checked) {
    msg.textContent = "Vous devez accepter la politique de confidentialité.";
    msg.style.color = "#ffb3b3";
    rgpd.focus();
    return;
  }
  
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyXATQQwmfBDQ0wqjIFfJHNhwf9JtHXLu6cdKJOKmaQmxUGh7lVBKDuzwu34sKNLtNb0w/exec';

  // validation
  if(!name || !email){
    msg.textContent = 'Merci de compléter tous les champs.';
    msg.style.color = '#ffb3b3';
    return;
  }
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!re.test(email)){
    msg.textContent = 'Adresse email invalide.';
    msg.style.color = '#ffb3b3';
    return;
  }

  // send (no-cors fallback handled by Apps Script)
  try{
    await fetch(scriptURL, {method:'POST', mode:'no-cors', body: new URLSearchParams({name:name,email:email})});
    msg.textContent = '✅ Inscription enregistrée — redirection...';
    msg.style.color = '#b7ffb7';
    setTimeout(()=> window.location.href = 'https://docs.google.com/spreadsheets/d/1jdNHHfwt9xcQX8ieAnfXIOFeX9q6s9unamM_Pbi-FPY/edit?usp=drivesdk', 900);
  }catch(err){
    msg.textContent = 'Erreur réseau.';
    msg.style.color = '#ffb3b3';
  }
});

// collapsible blocks and FAQ
document.querySelectorAll('.collapse-toggle').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const panel = btn.nextElementSibling;
    const isOpen = panel.style.display==='block';
    panel.style.display = isOpen ? 'none' : 'block';
    btn.textContent = (isOpen ? '+ ' : '− ') + btn.textContent.slice(2);
  });
});

document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click', ()=>{
    const open = q.getAttribute('aria-expanded') === 'true';
    // close others
    document.querySelectorAll('.faq-q').forEach(x=>{ x.setAttribute('aria-expanded','false'); if(x.nextElementSibling) x.nextElementSibling.style.display='none'; });
    q.setAttribute('aria-expanded', !open);
    const a = q.nextElementSibling;
    if(a) a.style.display = open ? 'none' : 'block';
  });
});
