window.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll(".back-to-top-link").forEach((e=>{e.addEventListener("click",(()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches,o=window.scrollTo({top:0,behavior:e?"auto":"smooth"}),t=()=>{const e=document.querySelector(".skip-link");e&&(e.focus(),e.blur())};o&&o.then?o.then(t):setTimeout(t,e?0:800)}))}))}));