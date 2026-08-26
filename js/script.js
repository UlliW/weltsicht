document.addEventListener("DOMContentLoaded",()=>{
const completed=JSON.parse(localStorage.getItem("wsdwDone")||"[]");
const pt=document.querySelector("#pt"),pf=document.querySelector("#pf");
if(pt){pt.textContent=`${completed.length} / 8 Kapitel`;pf.style.width=`${completed.length/8*100}%`}

document.querySelectorAll('.experiment[data-exp="attention"] .choice').forEach(b=>b.onclick=()=>{b.closest(".step").classList.remove("on");b.closest(".experiment").querySelector(".reveal").classList.add("on")});

const ae=document.querySelector('[data-exp="anchor"]');
if(ae){
 ae.querySelectorAll(".anchor-q .choice").forEach(b=>b.onclick=()=>{ae.querySelector(".anchor-q").classList.remove("on");ae.querySelector(".anchor-est").classList.add("on")});
 ae.querySelector(".anchor-go").onclick=()=>{let i=ae.querySelector("input");if(!i.value)return i.focus();ae.querySelector(".anchor-est").classList.remove("on");ae.querySelector(".anchor-reveal").classList.add("on")}
}
["frame","conformity"].forEach(name=>document.querySelectorAll(`[data-exp="${name}"] .choice`).forEach(b=>b.onclick=()=>{b.closest(".step").classList.remove("on");b.closest(".experiment").querySelector(".reveal").classList.add("on")}));

const ce=document.querySelector('[data-exp="confidence"]');
if(ce){
 ce.querySelector(".start-confidence").onclick=()=>{ce.querySelector(".confidence-intro").style.display="none";ce.querySelector(".confidence-quiz").classList.add("on")};
 ce.querySelectorAll(".q").forEach(q=>{
   q.querySelectorAll("button").forEach(b=>b.onclick=()=>{q.querySelectorAll("button").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");q.dataset.answer=b.textContent.trim().charAt(0)});
   const range=q.querySelector("input"),out=q.querySelector("output");range.oninput=()=>out.textContent=range.value+" %";
 });
 ce.querySelector(".confidence-go").onclick=()=>{
   const qs=[...ce.querySelectorAll(".q")]; if(qs.some(q=>!q.dataset.answer)) return alert("Bitte beantworte zuerst alle drei Fragen.");
   const correct=qs.filter(q=>q.dataset.answer===q.dataset.correct).length;
   const certainty=Math.round(qs.reduce((s,q)=>s+Number(q.querySelector("input").value),0)/qs.length);
   ce.querySelector("#score").textContent=`${correct} von 3`;
   ce.querySelector("#certainty").textContent=`${certainty} %`;
   ce.querySelector(".confidence-quiz").classList.remove("on");ce.querySelector(".confidence-reveal").classList.add("on");
 };
}
const done=document.querySelector("#done");
if(done){if(completed.includes(1))done.textContent="Kapitel 1 ist bearbeitet ✓";done.onclick=()=>{let s=new Set(JSON.parse(localStorage.getItem("wsdwDone")||"[]"));s.add(1);localStorage.setItem("wsdwDone",JSON.stringify([...s]));done.textContent="Kapitel 1 ist bearbeitet ✓"}}
});