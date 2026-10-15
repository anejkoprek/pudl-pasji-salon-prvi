# Pasji salon Pudl, demo (Devera Studio)

Odpri `index.html` v brskalniku ali v VS Code z razširitvijo **Live Server**.

## Kaj še manjka (rumeno označeno na strani)
- **Video** → shrani ga kot `slike/video.mp4` (kratek, brez zvoka, idealno do 10 MB). Dokler ga ni, krog kaže fotografijo pudlja.
- **Telefon** (041 313 011, s Facebooka) → v `script.js`, objekt `TELEFON`
- **Cene** → `index.html`, sekcija `#cenik`
- **Delovni čas** → `index.html`, sekcija `#kontakt`
- **Slike v galeriji** → dve vrsti, ki se sami pomikata (zgornja levo, spodnja desno). Novo sliko daš v `slike/` (.jpg in .webp) in v `index.html` kopiraš en `<figure class="g-item">` ter zamenjaš ime datoteke in napise. Za enakomeren trak naj ima vsaka vrsta približno enako slik.
- **Besedilo "O meni"** → preveri z gospo
- **Ocene strank** → v sekciji `#ocene` so IZMIŠLJENI primeri; pred objavo zamenjaj s pravimi (z dovoljenjem strank)
- **Logotip** → pravi logotip je v `slike/logo.svg`, ikona v zavihku brskalnika pa v `slike/favicon.svg` (pes in črka P)
- **Besedilo, ki ga mora potrditi gospa** (rumeno): "O meni", opis čiščenja ušes
- **Zasebnost** → `zasebnost.html` je OSNUTEK; preberi ga z gospo in dopolni gostitelja strani

Vsa mesta za urejanje so v kodi označena s komentarjem `UREDI`.

## Stanje
- Demo trak in oznake so odstranjeni, stran je pripravljena za objavo.
- Ocene strank so SKRITE (`hidden` v sekciji `#ocene`), dokler ne dobimo pravih.
- Podatki o podjetju (matična, davčna, e-pošta) so na `podatki.html`, ki je v nogi povezava in je Google ne prikazuje. E-pošta je v `js/podatki.js`.
- Ko bo domena: v `index.html` vpiši polne naslove za `og:image` in `"image"`, dodaj `"url"` ter `sitemap.xml`.

## Barve in pisave
Vse v `style.css`, blok `:root`. Ko dobimo logotip, uskladimo barve tam.

## Animacije
- `js/animacije.js` – vse animacije na enem mestu
- Knjižnice so shranjene lokalno v `js/` (delujejo brez interneta):
  - **GSAP 3.15** + ScrollTrigger + SplitText (brezplačen tudi za komercialno rabo)
  - **Lenis 1.3** – gladko drsenje
- Efekti po vzoru React Bits (SplitText, ScrollReveal, CircularText, Magnet), prepisani v navaden JS
- Če ima obiskovalec v sistemu vklopljeno "zmanjšaj gibanje", se animacije ne izvajajo

## Oblikovanje (po veščinah redesign / taste / high-end)
- Pisavi: **Bricolage Grotesque** (naslovi) in **Figtree** (besedilo), vgrajeni v `pisave.css`, zato delujeta tudi z dvoklikom na `index.html` in ne kličeta Googla.
- Ikone: **Phosphor Icons Light** (MIT), vstavljene na dnu `index.html`.
- Barve: rdeča je edini poudarek (gumbi, ikone), rumena je ploskev znamke, sive so hladne kot v logotipu. Za drobno rdeče besedilo se uporablja `--red-dark` zaradi kontrasta.
- Zaobljenost: gumbi pilula, slike in kartice 16 px, plošče 28 px.
- Zemljevid se naloži šele po kliku (GDPR), dotlej je povezava "Odpri v Google Maps".
- Brez pomišljajev (–) v besedilu, en napis za vsako dejanje ("Pokliči za termin", "Pošlji SMS").
- Temni način ni narejen namerno: logotip ima črno besedilo; za temni način bi potrebovali svetlo različico logotipa.

## Dodatne strani in slike
- `zasebnost.html`: obvestilo o zasebnosti (povezava v nogi)
- `404.html`: stran za napačne naslove; Netlify jo prikaže samodejno
- Fotografije so v dveh oblikah: `.webp` (manjše, za sodobne brskalnike) in `.jpg` (rezerva). Ko dodaš novo sliko, naredi obe ali pa uporabi samo `.jpg` z navadnim `<img>`.
- `og:image` in `image` v podatkih za Google morata imeti ob objavi polni naslov (npr. `https://pudl-ptuj.si/slike/pudelj-marelicni.jpg`).

## Pred objavo
1. Odstrani demo trak in razred `demo-mode`.
2. Odstrani `<meta name="robots" content="noindex, nofollow">` iz `index.html` in `zasebnost.html`.
3. Zamenjaj izmišljene ocene s pravimi.
4. (neuporabljeni sliki sta že odstranjeni)

## Devera Studio v nogi
- Logotip: `slike/devera-logo.svg` (spodaj desno v nogi, tudi na `zasebnost.html`).
- Ko bo stran Devera Studio na spletu, vpiši naslov v `js/devera.js` v vrstico `const DEVERA_URL = "";` in logotip postane povezava.

## Varnost (Vercel)
- `vercel.json`: varnostne glave, ki jih Vercel pošlje z vsako stranjo (prepoved vgrajevanja v tuje strani, samo lastne skripte ipd.).
- `_headers` je ista nastavitev za Netlify; na Vercelu se ne uporablja (lahko jo zbrišeš).
- Če dodaš zunanjo storitev (Google Analytics, Instagram, spletno naročanje), jo dodaj tudi v `Content-Security-Policy` v `vercel.json`, sicer je brskalnik ne naloži.
- V HTML ne piši skript neposredno (`<script>...</script>`), ampak jih daj v datoteko v `js/`.
