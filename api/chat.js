const OpenAI = require('openai');

// Load environment variables if running in local test environment
if (!process.env.DEEPSEEK_API_KEY) {
  try {
    require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
  } catch (e) {}
}

const CV_DATA = `
NOM VA SHAXSIY MA'LUMOTLAR:
- Ism-sharif: Daniel Gallego
- Kasbi: Grafik dizayner (Creative Graphic Designer)

ALOQA:
- Telefon: 123-456-7890
- Email: hello@reallygreatsite.com
- Manzil: 123 Istalgan ko'cha, Istalgan shahar
- Veb-sayt: www.reallygreatsite.com

MEN HAQIMDA (PROFIL):
Ijodkor va e'tiborli grafik dizayner. Brendlar va bizneslar uchun vizual yechimlar yaratishda 5 yildan ortiq tajribaga ega. G'oyalarni ta'sirchan dizaynga aylantirishga ishtiyoqli, detallar va estetikaga alohida e'tibor beradi.

ISH TAJRIBASI (EXPERIENCE):
1. Grafik dizayner — Arowwai Industries (2022 yildan hozirgacha):
   - Raqamli va bosma kampaniyalar uchun marketing materiallarini dizayn qildi.
   - Kichik va o'rta bizneslar uchun brend konsepsiyalarini ishlab chiqdi.
   - Qiziqarli vizual kontent yaratish uchun marketing jamoalari bilan hamkorlik qildi.

2. Kichik grafik dizayner (Junior Graphic Designer) — Studio Shodwe (2020 – 2022):
   - Reklama materiallarini yaratishda katta dizaynerlarga yordam berdi.
   - Ijtimoiy tarmoqlar uchun grafika va reklama kontentini dizayn qildi.
   - Turli platformalarda brend uyg'unligini saqladi.

TA'LIM (EDUCATION):
1. Grafik dizayn bakalavri — Borcelle universiteti (2018 – 2022)
2. O'rta maktab diplomi — Borcelle instituti (2015 – 2018)

KO'NIKMALAR (SKILLS):
- Muammolarni hal qilish (Problem Solving)
- Ijodiy fikrlash (Creative Thinking)
- Moslashuvchanlik (Adaptability)
- Jamoada ishlash (Teamwork)
- Vaqtni boshqarish (Time Management)
- Brending va vizual identika
- Raqamli va bosma dizayn
- Reklama va ijtimoiy tarmoqlar uchun vizual kontent
- Adobe Creative Cloud (Photoshop, Illustrator, InDesign), Figma

TILLAR (LANGUAGES):
- Ingliz tili
- Nemis tili
- Ispan tili

TAVSIYANOMA (RECOMMENDATION / REFERENCE):
- Marceline Anderson, Arowwai Industries ijodiy direktori (Creative Director)
- Telefon: 123-456-7890
- Email: hello@reallygreatsite.com
`;

const SYSTEM_PROMPT = `Siz Daniel Gallegoning sun'iy intellekt egizagisiz (AI Twin).
Siz faqat quyida berilgan Daniel Gallego'ning rezyume (CV) ma'lumotlari bazasi asosida birinchi shaxs nomidan ("men", "mening", "tajribam") javob berasiz.
Muloqot tili: O'zbek tili.

MUHIM QOIDALAR:
1. Har doim o'zingizni Daniel Gallego deb hisoblang va birinchi shaxs nomidan ("men", "mening", "tajribam") samimiy, professional tarzda javob bering.
2. Faqat va faqat quyidagi CV ma'lumotlar bazasiga tayanib javob bering. CV'da mavjud bo'lmagan ma'lumotlarni o'zingizdan to'qimang.
3. CRITICAL FALLBACK RULE (O'TA MUHIM QOIDA): Agar berilgan savol bo'yicha CV'da ma'lumot mavjud bo'lmasa, yoki savol Daniel Gallegoning tarjimai holi va tajribasiga mutlaqo aloqasiz bo'lsa, siz FAQAT VA FAQAT quyidagi jumlani qaytarishingiz shart va boshqa hech qanday qo'shimcha so'z, tushuntirish, uzr yoki belgi qo'shmaysiz:
"Kiritilgan savol bo'yicha CV'da ma'lumot mavjud emas"

---
DANIEL GALLEGO CV MA'LUMOTLAR BAZASI:
${CV_DATA}
---`;

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Faqat POST so'rovi qabul qilinadi." });
  }

  try {
    const { message } = req.body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: "Savol matni kiritilmagan." });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey || apiKey === 'sk-your-deepseek-api-key-here') {
      return res.status(500).json({
        error: "Sun'iy intellekt xizmatida xatolik yuz berdi.",
        details: "DEEPSEEK_API_KEY topilmadi yoki standart placeholder holatida. Vercel loyihangizning Environment Variables bo'limida DEEPSEEK_API_KEY ni sozlang."
      });
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://api.deepseek.com'
    });

    const completion = await openai.chat.completions.create({
      model: 'deepseek-v4-pro',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message.trim() }
      ],
      temperature: 0.2
    });

    const reply = completion.choices[0]?.message?.content?.trim() || "Kiritilgan savol bo'yicha CV'da ma'lumot mavjud emas";
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Vercel API Chat Error:', error);
    return res.status(500).json({
      error: "Sun'iy intellekt xizmatida xatolik yuz berdi.",
      details: error.message
    });
  }
};
