document.addEventListener("DOMContentLoaded",()=>{
const completed=JSON.parse(localStorage.getItem("wsdwDone")||"[]");
const pt=document.querySelector("#pt"),pf=document.querySelector("#pf");
if(pt){pt.textContent=`${completed.length} / 8 Kapitel`;pf.style.width=`${completed.length/8*100}%`}

function setupChoiceReveal(name){
 const e=document.querySelector(`[data-exp="${name}"]`); if(!e)return;
 const step=e.querySelector(".step"), btn=e.querySelector(".reveal-btn"), reveal=e.querySelector(".reveal");
 step.querySelectorAll(".choice").forEach(choice=>{
   choice.addEventListener("click",()=>{
     step.querySelectorAll(".choice").forEach(x=>x.classList.remove("selected"));
     choice.classList.add("selected"); btn.disabled=false;
   });
 });
 btn.addEventListener("click",()=>{step.classList.remove("on");reveal.classList.add("on");});
}
setupChoiceReveal("attention"); setupChoiceReveal("frame"); setupChoiceReveal("conformity");

const ae=document.querySelector('[data-exp="anchor"]');
if(ae){
 ae.querySelectorAll(".anchor-q .choice").forEach(b=>b.addEventListener("click",()=>{
   ae.querySelector(".anchor-q").classList.remove("on"); ae.querySelector(".anchor-est").classList.add("on");
 }));
 ae.querySelector(".anchor-go").addEventListener("click",()=>{
   const i=ae.querySelector("input"); if(!i.value){i.focus();return;}
   ae.querySelector(".anchor-est").classList.remove("on"); ae.querySelector(".anchor-reveal").classList.add("on");
 });
}

const ce=document.querySelector('[data-exp="confidence"]');
if(ce){
 ce.querySelector(".start-confidence").addEventListener("click",()=>{
   ce.querySelector(".confidence-intro").style.display="none";ce.querySelector(".confidence-quiz").classList.add("on");
 });
 ce.querySelectorAll(".q").forEach(q=>{
   q.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{
     q.querySelectorAll("button").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");
     q.dataset.answer=b.textContent.trim().charAt(0);
   }));
   const range=q.querySelector('input[type="range"]'), out=q.querySelector("output");
   const sync=()=>{out.value=range.value+" %";out.textContent=range.value+" %";};
   range.addEventListener("input",sync); range.addEventListener("change",sync); sync();
 });
 ce.querySelector(".confidence-go").addEventListener("click",()=>{
   const qs=[...ce.querySelectorAll(".q")];
   if(qs.some(q=>!q.dataset.answer)){alert("Bitte beantworte zuerst alle drei Fragen.");return;}
   const correct=qs.filter(q=>q.dataset.answer===q.dataset.correct).length;
   const certainty=Math.round(qs.reduce((s,q)=>s+Number(q.querySelector('input[type="range"]').value),0)/qs.length);
   ce.querySelector("#score").textContent=`${correct} von 3`;
   ce.querySelector("#certainty").textContent=`${certainty} %`;
   ce.querySelector(".confidence-quiz").classList.remove("on");ce.querySelector(".confidence-reveal").classList.add("on");
 });
}
const done=document.querySelector("#done");
if(done){
 if(completed.includes(1))done.textContent="Kapitel 1 ist bearbeitet ✓";
 done.addEventListener("click",()=>{let s=new Set(JSON.parse(localStorage.getItem("wsdwDone")||"[]"));s.add(1);localStorage.setItem("wsdwDone",JSON.stringify([...s]));done.textContent="Kapitel 1 ist bearbeitet ✓";});
}
});