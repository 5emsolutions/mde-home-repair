/* MDE Home Repair & Paint — menu + quote form */
(function(){
  var t = document.querySelector(".nav-toggle"), n = document.querySelector(".nav");
  if (t && n) t.addEventListener("click", function(){
    var open = n.getAttribute("data-open") === "true";
    n.setAttribute("data-open", open ? "false" : "true");
    t.setAttribute("aria-expanded", open ? "false" : "true");
  });
  function phoneOk(v){
    var d = (v||"").replace(/\D/g,"");
    if (d.length === 11 && d.charAt(0) === "1") d = d.slice(1);
    return d.length === 10;
  }
  function fieldErr(input, msg){
    var wrap = input.closest(".field"), box = wrap ? wrap.querySelector(".err") : null;
    if (msg){ input.setAttribute("aria-invalid","true"); if (box){ box.textContent = msg; box.setAttribute("data-show","true"); } }
    else { input.removeAttribute("aria-invalid"); if (box){ box.removeAttribute("data-show"); box.textContent = ""; } }
  }
  document.querySelectorAll("form").forEach(function(form){
    var succ = document.querySelector(".form__success");
    var btn  = form.querySelector("[data-submit]");
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var bad = null, nm = form.elements["name"], ph = form.elements["phone"], em = form.elements["email"];
      if (!nm.value.trim()){ fieldErr(nm,"Please tell us your name."); bad = bad || nm; } else fieldErr(nm,"");
      if (!ph.value.trim()){ fieldErr(ph,"We need a phone number to call you back."); bad = bad || ph; }
      else if (!phoneOk(ph.value)){ fieldErr(ph,"That does not look like a 10-digit phone number."); bad = bad || ph; }
      else fieldErr(ph,"");
      if (em && em.value.trim() && em.value.indexOf("@") < 1){ fieldErr(em,"Check the email address, or leave it blank."); bad = bad || em; }
      else if (em) fieldErr(em,"");
      if (bad){ var d = bad.closest("details"); if (d) d.open = true; bad.focus(); return; }
      if (btn){ btn.disabled = true; btn.textContent = "Sending\u2026"; }
      form.hidden = true;
      if (succ){ succ.hidden = false; succ.setAttribute("tabindex","-1"); succ.focus(); succ.scrollIntoView({block:"center"}); }
    });
  });
})();
