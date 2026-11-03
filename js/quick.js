const S=SITE,{store,PALS}=SH,r=document.documentElement,pb=document.getElementById('pal'),tb=document.getElementById('theme');
let p=store.get('pal','violet');if(!PALS.some(x=>x[0]===p))p='violet';r.dataset.palette=p;
r.dataset.theme=store.get('theme',matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
document.getElementById('q').innerHTML=`<h1>${S.name}</h1>
<section class="qcard"><img src="${S.photo}" alt="${S.name}"><p>${S.tagline}</p></section>
${S.stickers.filter(s=>!s.hidden).map(s=>`<div class="qs" id="${s.id}"><button class="qb" aria-expanded="false"><span class="qi" aria-hidden="true">${s.icon}</span>${s.label}<span class="qp">+</span></button><div class="qc" hidden>${SH.body(s)}</div></div>`).join('')}
<a class="qdesk" href="index.html?desk=1">Open the desk version</a>`;
const tog=(el,on)=>{el.querySelector('.qc').hidden=!on;el.querySelector('.qb').setAttribute('aria-expanded',on);el.querySelector('.qp').textContent=on?'−':'+'};
document.querySelectorAll('.qs').forEach(el=>el.querySelector('.qb').onclick=()=>{const open=el.querySelector('.qc').hidden;document.querySelectorAll('.qs').forEach(x=>tog(x,false));tog(el,open);if(open)el.scrollIntoView({behavior:'smooth',block:'nearest'})});
if(location.hash){const el=document.getElementById(location.hash.slice(1));if(el&&el.classList.contains('qs'))tog(el,true)}
const lab=()=>{pb.textContent=PALS.find(x=>x[0]===r.dataset.palette)[1];tb.textContent=r.dataset.theme==='dark'?'Light':'Dark'};
pb.onclick=()=>{const i=PALS.findIndex(x=>x[0]===r.dataset.palette);r.dataset.palette=PALS[(i+1)%PALS.length][0];store.set('pal',r.dataset.palette);lab()};
tb.onclick=()=>{r.dataset.theme=r.dataset.theme==='dark'?'light':'dark';store.set('theme',r.dataset.theme);lab()};lab();
