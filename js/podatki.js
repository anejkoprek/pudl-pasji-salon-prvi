// E-poštni naslov salona. V HTML ni zapisan v celoti, da ga roboti za pošiljanje
// neželene pošte ne poberejo; brskalnik ga sestavi šele ob prikazu strani.
// UREDI: če se naslov spremeni, popravi spodnja dva dela (pred in za @).
(function () {
  const ime = "mkoprek19";
  const domena = "gmail.com";
  const naslov = ime + "@" + domena;
  document.querySelectorAll(".js-eposta").forEach(el => {
    const a = document.createElement("a");
    a.href = "mailto:" + naslov;
    a.textContent = naslov;
    el.replaceChildren(a);
  });
})();
