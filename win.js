(() => {
  function fireConfetti(durationMs){
    const end = Date.now() + durationMs;
    const colors = ["#ff4d6d","#ffd6e0","#ffffff","#ff8fab","#cdb4db"];
    const timer = setInterval(()=>{
      if(Date.now() > end){ clearInterval(timer); return; }
      for(let i=0;i<10;i++) spawnConfetti(colors);
    }, 120);
  }

  function spawnConfetti(colors){
    const c = document.createElement("div");
    c.className = "confetti";
    const x = Math.random()*100;
    const dx = ((Math.random()*2)-1)*160 + "px";
    const dur = 2.6 + Math.random()*1.6;

    c.style.left = x + "vw";
    c.style.background = colors[Math.floor(Math.random()*colors.length)];
    c.style.setProperty("--dx", dx);
    c.style.animationDuration = dur + "s";

    document.body.appendChild(c);
    setTimeout(()=>c.remove(), dur*1000 + 200);
  }

  document.addEventListener("DOMContentLoaded", ()=> fireConfetti(1800));
})();
