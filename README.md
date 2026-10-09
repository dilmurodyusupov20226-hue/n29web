# Daniel Gallego — Grafik Dizayner & AI Twin Portfolio

Award-winning darajadagi zamonaviy, interaktiv shaxsiy portfolio va **AI Twin (Sun'iy intellekt egizagi)** veb-ilovasi. Ushbu loyiha rezyumedagi haqiqiy ma'lumotlar bazasi asosida birinchi shaxs nomidan gapiruvchi DeepSeek AI modeliga ulangan.

---

## 🚀 Texnologik Stek & Arxitektura (Dual-Target)

Loyiha ikkala muhitda ham to'liq ishlashga moslashtirilgan:
1. **Lokal muhit:** Node.js Express server (`server.js`)
2. **Serverless (Cloud):** Netlify Functions (`netlify/functions/chat.js` + `netlify.toml`)

- **Backend:** Node.js, Express, `dotenv`, `openai` SDK (`baseURL: https://api.deepseek.com`, model: `deepseek-v4-pro`).
- **Frontend:** Vanilla HTML5 / CSS3 / ES6+ JavaScript (`/public` papkasi).
  - Dark-theme estetikasi, Glassmorphism kartochkalari, Neon aksentlar (Indigo `#6366F1`, Emerald `#10B981`).
  - Google Fonts: `Outfit` (sarlavhalar) va `Inter` (matn).
  - Mikro-animatsiyalar, suzuvchi nishonlar (floating badges), to'liq responsiv moslashuvchanlik.
- **Sun'iy Intellekt (AI Twin):**
  - Foydalanuvchining kashf qilingan CV faylidan (`CV Daniel Gallego (o'zbekcha).docx`) olingan ma'lumotlar bazasi asosida ishlaydi.
  - Birinchi shaxs nomidan javob beradi (*"men"*, *"mening"*, *"tajribam"*).
  - **Qat'iy Fallback Qoidasi:** Agar savol CV'da bo'lmasa, aynan quyidagi jumla qaytariladi:
    > *"Kiritilgan savol bo'yicha CV'da ma'lumot mavjud emas"*

---

## 📁 Fayllar Strukturasi

```
N29 ai web/
├── public/
│   ├── index.html        # Premium dark glassmorphism dashboard & AI chatbox
│   └── cv-image.jpg      # Portret rasmi (statik resurs)
├── netlify/
│   └── functions/
│       └── chat.js       # Netlify Serverless Lambda funksiyasi
├── .env                  # API kalitlar va port konfiguratsiyasi
├── .gitignore            # Himoya uchun node_modules va .env
├── cv-image.jpg          # Ildiz papkadagi kashf etilgan portret tasviri
├── CV Daniel Gallego...  # Asl Word (.docx) rezyume fayli
├── netlify.toml          # Netlify sozlamalari va /api/chat qayta yo'naltirishlari
├── package.json          # Node.js qaramliklari (express, dotenv, openai)
├── README.md             # Qo'llanma va hujjatlar
└── server.js             # Express backend serveri
```

---

## ⚙️ O'rnatish & Ishga Tushirish

### 1. Bog'liqliklarni o'rnatish
```bash
npm install
```

### 2. Muhit o'zgaruvchilarini sozlash
`.env` faylida o'z DeepSeek API kalitingiz mavjudligiga ishonch hosil qiling:
```env
DEEPSEEK_API_KEY=sk-your-deepseek-api-key-here
PORT=3000
```

### 3. Serverni ishga tushirish
```bash
npm start
```
Browserda oching: **`http://localhost:3000`**

---

## 🌐 Netlify-ga Deploy Qilish

1. Kodni GitHub repozitoriysiga yuklang.
2. Netlify-ga kiring va yangi sayt yarating (`Import from Git`).
3. Build sozlamalari `netlify.toml` orqali avtomatik aniqlanadi:
   - **Publish directory:** `public`
   - **Functions directory:** `netlify/functions`
4. Netlify boshqaruv panelida `Site configuration -> Environment variables` bo'limiga o'tib, quyidagi kalitni qo'shing:
   - `DEEPSEEK_API_KEY` = `sizning_deepseek_api_kalitingiz`
5. Sayt avtomatik tarzda serverless rejimda ishga tushadi!

---

## 🛡️ Diagnostika & Xatoliklarni Tutish
- Server ishga tushganda konsolda API kalitining birinchi 6 belgisi (masalan: `sk-...`) diagnostika maqsadida xavfsiz ko'rsatiladi.
- Agar API limitida yoki tarmoqda xatolik yuz bersa, frontend chat oynasida to'liq tafsilot (`details`) ko'rsatiladi, bu esa nosozliklarni tezda aniqlash imkonini beradi.
