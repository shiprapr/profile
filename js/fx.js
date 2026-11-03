/* Wavy layered background + cursor distortion (bends the waves and the stickers). Raw WebGL2, no 3D library.
   Inspired by CodePens by VoXelo (background) and ksenia-k (liquid distortion). */
window.startFX=function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches&&!root.classList.contains('motion-ok')){console.warn('Water FX paused: your system has reduce-motion turned on.');return false}
  const made=[],D=Math.min(devicePixelRatio||1,2),cs=()=>getComputedStyle(root);
  const cvs=z=>{const c=document.createElement('canvas');c.style.cssText=`position:fixed;inset:0;width:100%;height:100%;z-index:${z};pointer-events:none`;document.body.prepend(c);made.push(c);return c};
  const col=n=>{const h=cs().getPropertyValue(n).trim();return[1,3,5].map(i=>parseInt(h.substr(i,2),16)/255)};
  const VS='#version 300 es\nlayout(location=0)in vec2 p;void main(){gl_Position=vec4(p,0,1);}';
  const prog=(g,fs)=>{const p=g.createProgram();[[g.VERTEX_SHADER,VS],[g.FRAGMENT_SHADER,fs]].forEach(([t,s])=>{const o=g.createShader(t);g.shaderSource(o,s);g.compileShader(o);if(!g.getShaderParameter(o,g.COMPILE_STATUS))throw g.getShaderInfoLog(o);g.attachShader(p,o)});g.linkProgram(p);if(!g.getProgramParameter(p,g.LINK_STATUS))throw g.getProgramInfoLog(p);return{p,u:n=>g.getUniformLocation(p,n)}};
  const quad=g=>{g.bindBuffer(g.ARRAY_BUFFER,g.createBuffer());g.bufferData(g.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),g.STATIC_DRAW);g.enableVertexAttribArray(0);g.vertexAttribPointer(0,2,g.FLOAT,false,0,0)};
  /* five diagonal wavy paper layers, dark at the bottom to light at the top, each casting a soft shadow on the layer above */
  const BG=`#version 300 es
precision highp float;uniform float uT,pz;uniform vec2 r,m;uniform vec3 g0,g1,g2;out vec4 o;
vec3 ramp(float t){return t<.5?mix(g2,g1,t*2.):mix(g1,g0,(t-.5)*2.);}
void main(){float asp=r.x/r.y;vec2 h=vec2(.5*asp,.5),p=gl_FragCoord.xy/r.y-h,mo=m/r.y-h;
vec2 dv=p-mo;p-=normalize(dv+1e-4)*smoothstep(.3,0.,length(dv))*(.08+.06*pz);
float a=dot(p,vec2(.875,.484)),b=dot(p,vec2(-.484,.875)),bm=.242*asp+.4375;vec3 c=g2;
for(int i=0;i<5;i++){float f=float(i);
  float e=bm*(.72-f*.36)+.12*bm*sin(a*(5.+f*.45)/bm*.5+f*1.7+uT*.25*(mod(f,2.)*2.-1.))+.03*bm*sin(a*11.+f*3.+uT*.3);
  float d=b-e;c*=1.-.36*smoothstep(.1,0.,d)*smoothstep(-.0015,.0015,d);
  c=mix(c,ramp((f+1.)/5.),smoothstep(.0015,-.0015,d));}
o=vec4(c,1);}`;
  /* cursor lens: gently twirls and bulges the stickers around the pointer */
  const DSP=`#version 300 es
precision highp float;uniform sampler2D C;uniform vec2 r,m;uniform float pz;out vec4 o;
void main(){vec2 u=gl_FragCoord.xy/r,as=vec2(r.x/r.y,1.),dv=(u-m)*as;float k=smoothstep(.2,0.,length(dv))*(1.+.8*pz),an=k*.55;
mat2 R=mat2(cos(an),sin(an),-sin(an),cos(an));vec2 q=R*dv*(1.-.22*k);
vec4 x=texture(C,m+q*(1.+.03*k)/as),y=texture(C,m+q/as),z=texture(C,m+q*(1.-.03*k)/as);
o=vec4(min(vec3(x.r,y.g,z.b),vec3(y.a)),y.a);}`;
  try{
    const bc=cvs(0),fc=cvs(5),cc=document.createElement('canvas'),c2=cc.getContext('2d');
    const bg=bc.getContext('webgl2'),fg=fc.getContext('webgl2',{alpha:true,premultipliedAlpha:true});
    if(!bg||!fg)throw'webgl2 unavailable';
    const bp=prog(bg,BG),dp=prog(fg,DSP);quad(bg);quad(fg);
    const ct=fg.createTexture();fg.bindTexture(fg.TEXTURE_2D,ct);[[fg.TEXTURE_MIN_FILTER,fg.LINEAR],[fg.TEXTURE_MAG_FILTER,fg.LINEAR],[fg.TEXTURE_WRAP_S,fg.CLAMP_TO_EDGE],[fg.TEXTURE_WRAP_T,fg.CLAMP_TO_EDGE]].forEach(([a,b])=>fg.texParameteri(fg.TEXTURE_2D,a,b));
    let W,H;const rs=()=>{W=innerWidth;H=innerHeight;bc.width=fc.width=cc.width=W*D;bc.height=fc.height=cc.height=H*D};rs();addEventListener('resize',rs);
    const map={},imgs={};SITE.stickers.forEach(s=>{map[s.id]=s;if(s.img){const i=new Image();i.src=s.img;imgs[s.id]=i}});
    let px=-999,py=-999,sx=-999,sy=-999,pulse=0;
    addEventListener('pointermove',e=>{if(sx<-900){sx=e.clientX;sy=e.clientY}px=e.clientX;py=e.clientY});
    addEventListener('pointerdown',e=>{px=e.clientX;py=e.clientY;pulse=.7});
    window.fxSplash=(x,y)=>{px=x;py=y;pulse=1};
    root.classList.add('glbg','glfx');
    const paint=()=>{
      c2.setTransform(1,0,0,1,0,0);c2.clearRect(0,0,cc.width,cc.height);
      const sm=new DOMMatrix(getComputedStyle(scene).transform),Ss=Math.hypot(sm.a,sm.b),paper=cs().getPropertyValue('--paper').trim();
      document.querySelectorAll('.st').forEach(el=>{   /* draw each sticker exactly where the page shows it (works during the pop-out and zoom) */
        const s=map[el.dataset.id],st=getComputedStyle(el),m=new DOMMatrix(st.transform),r=el.getBoundingClientRect(),z=el.offsetWidth,sc=Math.hypot(m.a,m.b)*Ss;
        c2.setTransform(D,0,0,D,0,0);c2.translate(r.left+r.width/2,r.top+r.height/2);c2.rotate(Math.atan2(m.b,m.a));c2.scale(sc,sc);c2.translate(-z/2,-z/2);c2.globalAlpha=+st.opacity;
        c2.shadowColor='rgba(0,0,0,.32)';c2.shadowBlur=24;c2.shadowOffsetY=10;c2.fillStyle=paper;c2.beginPath();c2.roundRect(0,0,z,z,z*.3);c2.fill();c2.shadowColor='transparent';
        const im=imgs[s.id];if(im&&im.complete&&im.naturalWidth)c2.drawImage(im,0,0,z,z);
        else{c2.fillStyle='#000';c2.font=`${z*.5}px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif`;c2.textAlign='center';c2.textBaseline='middle';c2.fillText(s.icon,z/2,z/2+z*.03)}
      });
    };
    (function frame(now){
      sx+=(px-sx)*.08;sy+=(py-sy)*.08;pulse*=.94;
      bg.useProgram(bp.p);bg.viewport(0,0,bc.width,bc.height);bg.uniform1f(bp.u('uT'),now/1000);bg.uniform1f(bp.u('pz'),pulse);bg.uniform2f(bp.u('r'),bc.width,bc.height);bg.uniform2f(bp.u('m'),sx*D,(H-sy)*D);
      [['g0','--g0'],['g1','--g1'],['g2','--g2']].forEach(([u,v])=>bg.uniform3fv(bp.u(u),col(v)));bg.drawArrays(bg.TRIANGLE_STRIP,0,4);
      paint();
      fg.activeTexture(fg.TEXTURE0);fg.bindTexture(fg.TEXTURE_2D,ct);fg.pixelStorei(fg.UNPACK_FLIP_Y_WEBGL,true);fg.pixelStorei(fg.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);fg.texImage2D(fg.TEXTURE_2D,0,fg.RGBA,fg.RGBA,fg.UNSIGNED_BYTE,cc);
      fg.viewport(0,0,fc.width,fc.height);fg.clearColor(0,0,0,0);fg.clear(fg.COLOR_BUFFER_BIT);fg.useProgram(dp.p);
      fg.uniform1i(dp.u('C'),0);fg.uniform2f(dp.u('r'),fc.width,fc.height);fg.uniform2f(dp.u('m'),sx/W,1-sy/H);fg.uniform1f(dp.u('pz'),pulse);fg.drawArrays(fg.TRIANGLE_STRIP,0,4);
      requestAnimationFrame(frame)})(performance.now());
    return true;
  }catch(e){console.warn('Water FX off, using CSS fallback:',e);made.forEach(c=>c.remove());root.classList.remove('glbg','glfx');return false}
};
