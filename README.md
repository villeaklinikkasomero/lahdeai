# Lähde – verkkosivut

Staattinen yhden sivun sivusto (HTML + CSS + vähän JavaScriptiä). Ei build-vaihetta eikä riippuvuuksia.

```
index.html            etusivu
tietosuoja.html       tietosuojaselosteen pohja (luonnos)
assets/css/styles.css tyylit
assets/js/main.js     mobiilivalikko ja demolomake
assets/img/           logot, favicon, jakokuva (og-image.png)
assets/fonts/         DM Sans ja Space Grotesk (itse hostattu, SIL OFL 1.1)
render.yaml           Renderin asetukset (Blueprint)
```

## Esikatselu omalla koneella

```bash
python3 -m http.server 8000
# avaa http://localhost:8000
```

## Julkaisu: Git → Render

1. Luo GitHub-repo ja vie tiedostot sinne:
   ```bash
   git init
   git add .
   git commit -m "Lähde-verkkosivut"
   git branch -M main
   git remote add origin git@github.com:<organisaatio>/lahde-site.git
   git push -u origin main
   ```
2. Renderissä: **New → Blueprint** ja valitse repo. Render lukee `render.yaml`:n ja luo staattisen sivun.
   Vaihtoehto ilman Blueprintia: **New → Static Site**, Build Command tyhjä (tai `echo ok`), Publish Directory `.`.
3. Jokainen `git push` mainiin julkaisee uuden version automaattisesti.
4. Oma verkkotunnus: Renderin sivun **Settings → Custom Domains**. HTTPS-varmenne tulee automaattisesti.

## Ennen julkaisua

- **Demolomake:** Renderin staattinen sivu ei vastaanota lomakkeita. Luo lomake esim. Formspreessä ja vaihda
  `index.html`:ssä `action="https://formspree.io/f/YOUR_FORM_ID"` omaan osoitteeseesi. Formspree on yhdysvaltalainen
  palvelu – jos tiedot halutaan pitää EU:ssa, valitse EU-alueella toimiva lomakepalvelu ja päivitä tietosuojaseloste.
  Kunnes lomake on kytketty, lähetys näyttää käyttäjälle sähköpostiosoitteen.
- **Hakasulkeet:** täydennä kaikki `[...]`-kohdat (tuntimäärä, hinnat, yhtiön nimi, Y-tunnus, yhteystiedot).
  Hae: `grep -n "\[" index.html tietosuoja.html assets/js/main.js`
- **Tietosuojaseloste** on pohja; tarkistuta se ennen julkaisua.
- **Jakokuva:** kun verkkotunnus on tiedossa, vaihda `og:image` täydeksi osoitteeksi
  (esim. `https://lahde.fi/assets/img/og-image.png`) – some-palvelut eivät lue suhteellista polkua.
- **Nimi:** "Lähde" on työnimi – tarkista tavaramerkki ja verkkotunnus.

## Värit ja fontit

| Token | Arvo |
| --- | --- |
| Tumma (ink) | `#0F1B26` |
| Vaalea (paper) | `#F3F5F0` |
| Minttu (korostus) | `#2FC7A1` |
| Tumma teal (linkit vaalealla) | `#0E7C66` |
| Otsikot | Space Grotesk |
| Leipäteksti | DM Sans |

Fontit: DM Sans ja Space Grotesk, SIL Open Font License 1.1 (Fontsource-paketit), ks. `assets/fonts/LICENSE-OFL.txt`.
