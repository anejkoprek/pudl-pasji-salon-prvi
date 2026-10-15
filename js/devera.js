// ==========================================================
// Devera Studio: povezava na logotipu v nogi (vse strani).
// Ko bo najina stran na spletu, vpiši naslov spodaj, npr. "https://devera.si",
// in logotip postane klikljiv. Dokler je prazno, logotip ni povezava.
// ==========================================================
const DEVERA_URL = "https://deverastudio.com/";

(function () {
  const link = document.getElementById("devera-link");
  if (!link || !DEVERA_URL) return;
  link.href = DEVERA_URL;
  link.target = "_blank";
  link.rel = "noopener";
})();
