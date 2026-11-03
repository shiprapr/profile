window.SH={
  store:{get(k,d){try{return localStorage.getItem(k)??d}catch{return d}},set(k,v){try{localStorage.setItem(k,v)}catch{}}},
  PALS:[['violet','Violet Dusk'],['crimson','Crimson Noir'],['navy','Midnight Gold'],['amber','Amber Night']],
  body(s){const S=window.SITE;let h=s.html||(s.text||'').split('\n\n').map(t=>`<p>${t}</p>`).join('');const L=[...(s.links||[])];
    if(s.extra==='socials'){Object.entries(S.socials).forEach(([n,u])=>{if(u&&u!=='#')L.push([n,u])});if(S.email)L.push(['Email','mailto:'+S.email])}
    if(L.length)h+=`<div class="links">${L.map(([n,u])=>`<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join('')}</div>`;return h}
};
