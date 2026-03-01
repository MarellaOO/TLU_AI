# Jupiter esilehe sisuosa

Angular 18 rakendus Jupiteri (jupiter.err.ee) esilehe sisuvaate jaoks: vertikaalsete piltidega horisontaalselt scrollitavad ribad. Andmed tulevad ERR API-st.

## Nõuded

- Node.js 18+
- npm

## Paigaldus ja käivitamine

```bash
cd jupiter-frontpage
npm install
npm start
```

Rakendus avaneb tavaliselt aadressil http://localhost:4200

## Ehitus

```bash
npm run build
```

Tulemus on kaustas `dist/jupiter-frontpage`.

## API

Ribade andmed laetakse päringust:

`https://services.err.ee/api/v2/category/getByUrl?url=video&domain=jupiter.err.ee`

Näidatakse ainult ribasid, kus `highTimeline === true`; esiletoodud bänner ja horisontaalsed pildiribad (`highTimeline === false`) jäetakse vahele. Pildid võetakse iga sisu `verticalPhotos` objektist (eelistatakse tüüp 60 või 80).

## Kui CORS blokeerib kohalikult

Kohaliku arenduse ajal võib brauser blokeerida otsepäringud `services.err.ee`-le. Siis võid:

1. Teenuses `src/app/services/jupiter-api.service.ts` asenda `API_URL` väärtusega `'/api/v2/category/getByUrl?url=video&domain=jupiter.err.ee'`.
2. Käivita dev-server koos proxyga: `ng serve --proxy-config proxy.conf.json`.

Proxy suunab `/api` päringud `https://services.err.ee` poole.
