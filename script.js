"use strict";
document.body.classList.add("js");
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

/* ---- Data (dynamic content) ---- */
const EVENTS=[
 {title:"Winter Food Collection Drive",cat:"Collection",date:"2026-06-10",text:"Drop off non-perishable food at our centre or partner supermarkets to support families in need."},
 {title:"Volunteer Orientation Day",cat:"Volunteer",date:"2026-07-04",text:"New volunteers learn how parcels are packed and distributed. All welcome."},
 {title:"Community Awareness Walk",cat:"Community",date:"2026-08-15",text:"Join us to raise awareness about food insecurity in our community."},
 {title:"Business Partner Breakfast",cat:"Community",date:"2026-09-12",text:"Local businesses learn how to support the food bank through donations and partnerships."},
 {title:"Spring Food Parcel Packing",cat:"Volunteer",date:"2026-10-09",text:"Help pack parcels for distribution. Gloves and refreshments provided."},
 {title:"Supermarket Collection Weekend",cat:"Collection",date:"2026-11-14",text:"Volunteers stationed at partner stores collect donations from shoppers."}
];
const IMAGES=[["Food parcels packed and ready","#1f7a3d"],["Volunteers sorting donations","#c85a00"],["Distribution day queue","#14532a"],["Community collection drive","#e8730c"]];
const svg=(t,c)=>"data:image/svg+xml;utf8,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'><rect width='800' height='500' fill='${c}'/><text x='400' y='260' font-family='Arial' font-size='38' fill='white' text-anchor='middle'>${t}</text></svg>`);
const fmt=d=>new Date(d+"T00:00:00").toLocaleDateString("en-ZA",{day:"numeric",month:"long",year:"numeric"});

/* ---- Safe DOM helper (prevents XSS: textContent only) ---- */
function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e}
function eventCard(ev){const c=el("article","card reveal");c.append(el("span","tag",ev.cat),el("h3","",ev.title),el("p","",fmt(ev.date)),el("p","",ev.text));return c}


/* ---- Scroll reveal animation ---- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.1});
const observe=()=>$$(".reveal:not(.in)").forEach(n=>io.observe(n));

/* ---- Home: animated counters + latest news ---- */
$$("[data-count]").forEach(n=>{const t=+n.dataset.count;let v=0;const step=Math.max(1,Math.ceil(t/40));const id=setInterval(()=>{v=Math.min(t,v+step);n.textContent=v;if(v>=t)clearInterval(id)},30)});
const latest=$("#latest");
if(latest){[...EVENTS].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3).forEach(e=>latest.append(eventCard(e)))}

/* ---- News: search, filter, sort ---- */
const evBox=$("#events");
if(evBox){
 const q=$("#q"),cat=$("#cat"),sort=$("#sort"),count=$("#count");
 const render=()=>{
  const term=q.value.trim().toLowerCase();
  let list=EVENTS.filter(e=>(cat.value==="all"||e.cat===cat.value)&&(e.title+" "+e.text).toLowerCase().includes(term));
  list.sort(sort.value==="az"?(a,b)=>a.title.localeCompare(b.title):sort.value==="old"?(a,b)=>a.date.localeCompare(b.date):(a,b)=>b.date.localeCompare(a.date));
  evBox.replaceChildren(...list.map(eventCard));
  count.textContent=list.length?`${list.length} result(s) found`:"No matching news or events found.";
  observe();
 };
 [q,cat,sort].forEach(c=>c.addEventListener("input",render));render();
}

/* ---- About: tabs ---- */
const tabs=$$("#aboutTabs [role=tab]");
tabs.forEach((t,i)=>{
 t.addEventListener("click",()=>pick(t));
 t.addEventListener("keydown",e=>{const k={ArrowRight:1,ArrowLeft:-1}[e.key];if(k){const n=tabs[(i+k+tabs.length)%tabs.length];n.focus();pick(n)}});
});
function pick(t){tabs.forEach(x=>{const on=x===t;x.setAttribute("aria-selected",on);x.tabIndex=on?0:-1;$("#"+x.getAttribute("aria-controls")).hidden=!on})}

/* ---- FAQ: accordion ---- */
$$(".acc-btn").forEach(b=>b.addEventListener("click",()=>{
 const open=b.getAttribute("aria-expanded")==="true";
 $$(".acc-btn").forEach(x=>{x.setAttribute("aria-expanded","false");$("#"+x.getAttribute("aria-controls")).hidden=true});
 if(!open){b.setAttribute("aria-expanded","true");$("#"+b.getAttribute("aria-controls")).hidden=false}
}));

/* ---- Gallery + lightbox ---- */
const gal=$("#gallery");
if(gal){
 const lb=$("#lightbox"),img=$("#lbImg"),cap=$("#lbCap");let cur=0,opener=null;
 IMAGES.forEach(([t,c],i)=>{const b=el("button");b.setAttribute("aria-label","View larger: "+t);const im=el("img");im.src=svg(t,c);im.alt=t;im.loading="lazy";b.append(im);b.addEventListener("click",()=>show(i,b));gal.append(b)});
 function show(i,b){cur=(i+IMAGES.length)%IMAGES.length;img.src=svg(IMAGES[cur][0],IMAGES[cur][1]);img.alt=IMAGES[cur][0];cap.textContent=IMAGES[cur][0];if(b)opener=b;lb.hidden=false;$(".close",lb).focus()}
 const hide=()=>{lb.hidden=true;opener&&opener.focus()};
 $(".close",lb).onclick=hide;$(".prev",lb).onclick=()=>show(cur-1);$(".next",lb).onclick=()=>show(cur+1);
 lb.addEventListener("click",e=>{if(e.target===lb)hide()});
 document.addEventListener("keydown",e=>{if(lb.hidden)return;if(e.key==="Escape")hide();if(e.key==="ArrowRight")show(cur+1);if(e.key==="ArrowLeft")show(cur-1)});
}

/* ---- Donate modal ---- */
const dm=$("#donateModal");
if(dm){
 $$(".amt").forEach(b=>b.addEventListener("click",()=>{$("#dmText").textContent=`You selected R${(+b.dataset.amt).toLocaleString("en-ZA")}. Online payments are coming soon; please contact us to arrange your donation.`;dm.hidden=false;$(".close-modal",dm).focus()}));
 const close=()=>dm.hidden=true;$(".close-modal",dm).onclick=close;
 dm.addEventListener("click",e=>{if(e.target===dm)close()});
 document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
}

/* ---- Form validation (client side) ---- */
const MSG={valueMissing:"This field is required.",typeMismatch:"Please enter a valid value (e.g. name@example.com).",patternMismatch:"Please enter a valid South African phone number, e.g. 082 123 4567.",tooShort:"That is too short.",rangeUnderflow:"Date cannot be in the past."};
function validate(f){
 let ok=true;
 $$("input,select,textarea",f).forEach(i=>{
  if(i.classList.contains("hp"))return;
  const err=i.parentElement.querySelector(".err");i.setCustomValidity("");
  if(i.type==="date"&&i.value&&new Date(i.value)<new Date(new Date().toDateString()))i.setCustomValidity(MSG.rangeUnderflow);
  const bad=!i.checkValidity();i.setAttribute("aria-invalid",bad);
  if(err)err.textContent=bad?(i.validity.patternMismatch&&i.dataset.msg?i.dataset.msg:i.validity.customError?i.validationMessage:MSG[Object.keys(MSG).find(k=>i.validity[k])]||i.validationMessage):"";
  if(bad)ok=false;
 });
 if(!ok)$("[aria-invalid=true]",f).focus();
 return ok;
}
const dt=$("#eDate");if(dt)dt.min=new Date().toISOString().slice(0,10);
const cm=$("#cMsg");if(cm)cm.addEventListener("input",()=>cm.parentElement.querySelector(".err").textContent=`${cm.value.length}/1000 characters`);

/* ---- AJAX submission ---- */
async function ajax(f){
 const st=$(".status",f);st.className="status";st.textContent="Sending...";
 const btn=$("button[type=submit]",f);btn.disabled=true;
 try{
  const r=await fetch(f.dataset.endpoint,{method:"POST",body:new FormData(f),headers:{Accept:"application/json"}});
  if(!r.ok)throw new Error(r.status);
  st.className="status ok";st.textContent=f.dataset.success||"Thank you! Your message has been sent.";f.reset();return true;
 }catch(e){st.className="status bad";st.textContent="Sorry, something went wrong. Please try again.";return false}
 finally{btn.disabled=false}
}
$$("form[data-endpoint]:not(#donForm)").forEach(f=>f.addEventListener("submit",async e=>{
 e.preventDefault();
 if(!validate(f))return;
 if($(".hp",f).value)return; // honeypot: bots only
 const data=Object.fromEntries(new FormData(f));
 if(f.id==="enqForm"){
  const R={recipient:"Thank you. Food packages are handed out Mon, Wed and Fri 09:00-12:00. Please bring your ID.",volunteer:"Thank you. Our volunteer team will contact you to arrange an orientation.",donor:"Thank you. We will contact you with drop-off and payment options.",sponsor:"Thank you. Our partnerships coordinator will contact you to discuss sponsorship."};
  const box=$("#response");box.replaceChildren(el("h2","","Hello "+data.name),el("p","",R[data.type]),el("p","","We will respond around "+fmt(data.date)+". Reference: HCFB-"+Date.now().toString(36).toUpperCase()));box.hidden=false;
 }
 const sent=await ajax(f);
 if(f.id==="conForm"&&!sent){
  const to=f.dataset.recipient;
  $("#mailLink").href=`mailto:${to}?subject=${encodeURIComponent(data.type+" from "+data.name)}&body=${encodeURIComponent(data.message+"\n\nFrom: "+data.name+" ("+data.email+")")}`;
  $("#mailFallback").hidden=false;
 }
}));

/* ---- Donation form: amount + field validation ---- */
const don=$("#donForm");
if(don){
 const other=$("#otherAmt"),radios=$$("input[name=amount]",don),aerr=$("#amtErr");
 const showModal=t=>{$("#dmText").textContent=t;dm.hidden=false;$(".close-modal",dm).focus()};
 radios.forEach(r=>r.addEventListener("change",()=>{other.value="";other.removeAttribute("aria-invalid");aerr.textContent=""}));
 other.addEventListener("input",()=>{other.value=other.value.replace(/[^\d]/g,"");if(other.value)radios.forEach(r=>r.checked=false);aerr.textContent="";other.removeAttribute("aria-invalid")});
 function amountCheck(){
  const chosen=radios.find(r=>r.checked),raw=other.value.trim();
  if(chosen)return{amount:+chosen.value,msg:""};
  if(!raw)return{msg:"Please choose an amount or enter your own."};
  const n=+raw;
  if(n<10)return{msg:"The minimum donation is R10."};
  if(n>100000)return{msg:"For donations above R100 000 please contact us directly."};
  return{amount:n,msg:""};
 }
 don.addEventListener("submit",async e=>{
  e.preventDefault();
  const a=amountCheck();
  aerr.textContent=a.msg;other.setAttribute("aria-invalid",!!a.msg&&!!other.value);
  const fieldsOk=validate(don);
  if(a.msg||!fieldsOk){if(a.msg&&fieldsOk)(other.value?other:radios[0]).focus();return}
  if($(".hp",don).value)return;
  $("#finalAmount").value=a.amount;
  const name=$("#dName").value.trim(),freq=$("#dFreq").value.toLowerCase();
  const sent=await ajax(don);
  if(sent){radios.forEach(r=>r.checked=false);showModal(`Thank you ${name}! Your ${freq} pledge of R${a.amount.toLocaleString("en-ZA")} has been received. Our team will contact you with payment details.`)}
 });
}

/* ---- Leaflet map (location-based feature) ---- */
if($("#map")&&window.L){
 const POS=[-26.2041,28.0473]; // TODO: replace with the food bank's real coordinates
 const m=L.map("map").setView(POS,14);
 L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}).addTo(m);
 L.marker(POS).addTo(m).bindPopup("Hope Community Food Bank").openPopup();
}
observe();
