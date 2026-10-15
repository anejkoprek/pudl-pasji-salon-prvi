// Naloži se v <head>, preden se stran izriše: vklopi animacije,
// razen če ima obiskovalec v sistemu vklopljeno "zmanjšaj gibanje".
// (Ločena datoteka namesto vrstice v HTML, ker varnostna pravila v _headers ne dovolijo skript, zapisanih v HTML.)
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) document.documentElement.classList.add("anim");
