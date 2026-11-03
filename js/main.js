const S=window.SITE,$=s=>document.querySelector(s),root=document.documentElement;
const {store,PALS}=SH;
const mobile=()=>matchMedia('(max-width:900px)').matches;
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(store.get('motion','')==='on')root.classList.add('motion-ok');
const calm=()=>RM&&!root.classList.contains('motion-ok');
if(RM){
  const b=document.createElement('button');
  b.textContent=root.classList.contains('motion-ok')?'Motion: on':'Enable motion';
  b.onclick=()=>{store.set('motion',root.classList.contains('motion-ok')?'':'on');location.reload()};
  $('#ctl').prepend(b);
}
let liq=0,liqNow=0,ac,master,muted=store.get('muted','0')==='1',timer,cur=null,closing=null;

/* ---------- palettes + light/dark ---------- */
let pal=store.get('pal','violet');
if(!PALS.some(p=>p[0]===pal))pal='violet';
root.dataset.palette=pal;
root.dataset.theme=store.get('theme',matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');

const label=()=>{
  const curPal=PALS.find(p=>p[0]===root.dataset.palette);
  const palName=curPal?curPal[1]:'Palette';
  const palBtn=$('#pal');
  if(palBtn){
    palBtn.setAttribute('title',`Palette: ${palName} (Click to switch)`);
    palBtn.setAttribute('aria-label',`Switch color palette, current: ${palName}`);
  }
  const themeBtn=$('#theme');
  if(themeBtn){
    const isDark=root.dataset.theme==='dark';
    themeBtn.textContent=isDark?'☀️':'🌙';
    themeBtn.setAttribute('title',isDark?'Switch to Light mode':'Switch to Dark mode');
    themeBtn.setAttribute('aria-label',isDark?'Switch to Light mode':'Switch to Dark mode');
  }
  const sndBtn=$('#snd');
  if(sndBtn){
    sndBtn.textContent=muted?'🔇':'🔊';
    sndBtn.setAttribute('title',muted?'Turn sound on':'Turn sound off');
    sndBtn.setAttribute('aria-label',muted?'Turn sound on':'Turn sound off');
  }
};

$('#pal').onclick=()=>{
  const i=PALS.findIndex(p=>p[0]===root.dataset.palette);
  root.dataset.palette=PALS[(i+1)%PALS.length][0];
  store.set('pal',root.dataset.palette);
  label();
};
$('#theme').onclick=()=>{
  root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
  store.set('theme',root.dataset.theme);
  label();
};

/* ---------- scene & intro card ---------- */
const scene=$('#scene'),panel=$('#panel');
const sparks=Array.from({length:18},()=>`<i style="--l:${(22+Math.random()*56).toFixed(0)}%;--z:${(2+Math.random()*3).toFixed(1)}px;--d:${(3+Math.random()*3).toFixed(1)}s;--w:-${(Math.random()*6).toFixed(1)}s"></i>`).join('');

scene.insertAdjacentHTML('beforeend',`
  <div class="stage">
    <div class="intro-card">
      <div class="glass">
        <div class="ph"><img src="${S.photo}" alt="${S.name}"></div>
        <h2>${S.name.split(' ').join('<br>')}</h2>
        <p>${S.tagline}</p>
        <div class="spk">${sparks}</div>
      </div>
    </div>
  </div>
`);

const setK=()=>root.style.setProperty('--k',Math.max(.5,Math.min(1.2,innerWidth/1400,innerHeight/820)).toFixed(3));
setK();

S.stickers.filter(s=>!s.hidden).forEach((s,i)=>{
  const b=document.createElement('button');
  b.className='st';
  b.dataset.id=s.id;
  b.style.cssText=`--x:${s.x};--y:${s.y};--s:${s.s}px;--r:${s.r}deg;--i:${i}`;
  b.innerHTML=`<span class="face" aria-hidden="true">${s.img?`<img src="${s.img}" alt="">`:s.icon}</span><i>${s.label}</i>`;
  b.onpointerenter=b.onfocus=()=>liq=26;
  b.onpointerleave=b.onblur=()=>liq=0;
  b.onclick=()=>openSection(s);
  scene.append(b);
});

const K=()=>parseFloat(getComputedStyle(root).getPropertyValue('--k'))||1;
const zf=s=>Math.min(3.2,Math.max(2.3,210/(s.s*K())));
const fromShape=s=>{
  const W=innerWidth,H=innerHeight,z=s.s*K()*zf(s),P=panel.getBoundingClientRect(),x0=W*.27-z/2,y0=H*.5-z/2;
  return `inset(${y0-P.top}px ${P.right-x0-z}px ${P.bottom-y0-z}px ${x0-P.left}px round ${z*.3}px)`;
};

function hidePanel(){
  panel.style.transition='none';
  panel.classList.remove('show');
  panel.style.filter='';
  if(closing){closing.cancel();closing=null}
  requestAnimationFrame(()=>panel.style.transition='');
}

function openSection(s){
  if(cur===s){closeSection();return}
  if(closing){closing.cancel();closing=null;panel.style.transition='';panel.style.filter=''}
  cur=s;
  if(!mobile()){
    const W=innerWidth,H=innerHeight,k=zf(s);
    scene.style.transform=`translate(${W*.27-s.x/100*W*k}px,${H*.5-s.y/100*H*k}px) scale(${k})`;
  }
  scene.classList.add('zoomed');
  document.querySelectorAll('.st').forEach(e=>e.classList.toggle('on',e.dataset.id===s.id));
  panel.innerHTML=`<button class="x" aria-label="Close">×</button><h2>${s.title}</h2>${SH.body(s)}`;
  if(!calm()&&window.fxSplash){
    const W=innerWidth,H=innerHeight;
    fxSplash(s.x/100*W,s.y/100*H);
    setTimeout(()=>fxSplash(W*.27,H*.5),380);
    setTimeout(()=>fxSplash(W*.27,H*.5),700);
  }
  setTimeout(()=>{
    if(cur!==s)return;
    panel.classList.add('show');
    if(!mobile()&&!calm()){
      try{
        panel.animate([{clipPath:fromShape(s)},{clipPath:'inset(-60px round 26px)'}],{duration:850,easing:'cubic-bezier(.65,0,.25,1)'});
      }catch(e){}
      panel.style.filter='url(#liquid)';
      liq=34;
      setTimeout(()=>liq=0,550);
      setTimeout(()=>{if(!closing)panel.style.filter=''},1700);
    }
  },mobile()||calm()?0:350);
  history.replaceState(null,'','#'+s.id);
}

function closeSection(){
  const s=cur;
  if(!s){if(!closing&&panel.classList.contains('show'))hidePanel();return}
  cur=null;
  scene.style.transform='';
  scene.classList.remove('zoomed');
  document.querySelectorAll('.st.on').forEach(e=>e.classList.remove('on'));
  history.replaceState(null,'',location.pathname);
  if(mobile()||calm()||!panel.classList.contains('show')){
    panel.classList.remove('show');
    panel.style.filter='';
    return;
  }
  try{
    closing=panel.animate([{clipPath:'inset(-60px round 26px)'},{clipPath:fromShape(s)}],{duration:450,easing:'cubic-bezier(.65,0,.25,1)',fill:'forwards'});
    closing.onfinish=hidePanel;
  }catch(e){
    hidePanel();
    return;
  }
  panel.style.filter='url(#liquid)';
  liq=26;
  setTimeout(()=>liq=0,250);
  setTimeout(()=>{if(!cur)hidePanel()},560);
}

panel.addEventListener('click',e=>{if(e.target.closest('.x'))closeSection()});
addEventListener('resize',()=>{setK();if(cur)closeSection()});
matchMedia('(max-width:700px)').addEventListener('change',e=>{if(e.matches&&!/[?&]desk=1/.test(location.search))location.replace('quick.html')});
addEventListener('keydown',e=>{if(e.key==='Escape')closeSection()});
document.addEventListener('pointerdown',e=>{if(cur&&!e.target.closest('#panel,#ctl,#pal-ctl,.st'))closeSection()});

/* ---------- handpan sound (synthesized) ---------- */
const scale=[146.83,220,233.08,261.63,293.66,329.63,349.23,440];
function note(f,v=.08,d=3.2){
  const t=ac.currentTime;
  [[1,1],[2,.3],[3,.1]].forEach(([m,g])=>{
    const o=ac.createOscillator(),a=ac.createGain();
    o.frequency.value=f*m;
    a.gain.setValueAtTime(0,t);
    a.gain.linearRampToValueAtTime(v*g,t+.012);
    a.gain.exponentialRampToValueAtTime(.0001,t+d);
    o.connect(a).connect(master);
    o.start(t);
    o.stop(t+d);
  });
}
function startAudio(){
  ac=ac||new(window.AudioContext||window.webkitAudioContext)();
  ac.resume();
  if(!master){
    master=ac.createGain();
    const d=ac.createDelay(),fb=ac.createGain();
    d.delayTime.value=.4;
    fb.gain.value=.4;
    d.connect(fb);
    fb.connect(d);
    master.connect(ac.destination);
    master.connect(d);
    d.connect(ac.destination);
  }
  master.gain.value=muted?0:1;
  clearTimeout(timer);
  (function next(){
    if(!muted){
      note(scale[Math.random()*scale.length|0]);
      if(Math.random()<.35)setTimeout(()=>!muted&&note(scale[Math.random()*scale.length|0],.06),380);
    }
    timer=setTimeout(next,1600+Math.random()*2800);
  })();
}

$('#snd').onclick=()=>{
  muted=!muted;
  store.set('muted',muted?'1':'0');
  if(!ac)startAudio();
  else master.gain.value=muted?0:1;
  label();
};
addEventListener('pointerdown',e=>{
  if(ac&&!muted&&e.target.closest('button,a'))note(scale[3+(Math.random()*5|0)],.12,1.3);
});

function introSfx(){
  if(!ac||muted)return;
  const t=ac.currentTime;
  [880,1320,1760].forEach((f,i)=>{
    const q=ac.createOscillator(),h=ac.createGain(),b=t+0.6+i*.14;
    q.frequency.value=f;
    h.gain.setValueAtTime(0,b);
    h.gain.linearRampToValueAtTime(.06,b+.03);
    h.gain.exponentialRampToValueAtTime(.0001,b+1.4);
    q.connect(h).connect(master);
    q.start(b);
    q.stop(b+1.5);
  });
}

/* ---------- entry gate ---------- */
document.querySelectorAll('#gate [data-sound]').forEach(b=>b.onclick=()=>{
  muted=b.dataset.sound==='0';
  store.set('muted',muted?'1':'0');
  if(!muted)startAudio();
  $('#gate').classList.add('gone');
  label();
  if(!calm()){
    scene.classList.add('play','lock');
    liq=34;
    setTimeout(()=>liq=0,750);
    setTimeout(()=>scene.classList.remove('lock'),2000);
    introSfx();
  }
  const h=S.stickers.find(s=>!s.hidden&&'#'+s.id===location.hash);
  if(h)setTimeout(()=>openSection(h),calm()?400:2200);
});
label();

/* ---------- liquid wobble value ---------- */
const dm=document.getElementById('dm');
(function wobble(){
  liqNow+=(liq-liqNow)*.1;
  dm.setAttribute('scale',liqNow.toFixed(2));
  requestAnimationFrame(wobble);
})();

const fxOn=!!(window.startFX&&startFX());
const fxMsg=fxOn?'on':calm()?'paused: system reduce-motion is on':window.startFX?'fallback':'fx.js NOT loaded';
console.info('[shipraent] loaded. Water FX:',fxMsg);
