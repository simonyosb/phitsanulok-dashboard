// Phitsanulok Province Business Intelligence Dashboard
// Data: Google Maps via Apify (2026-03-06) + supplementary data
// Total: 29 places across 5 categories

export interface Review {
  text: string;
  rating: number;
  date: string;
  language: "th" | "en";
}

export interface Place {
  id: string;
  name: string;
  category: "hotel" | "cafe" | "restaurant" | "clinic" | "coworking";
  subcategory: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  openTime: string;
  closeTime: string;
  hasWebsite: boolean;
  hasSocialMedia: boolean;
  priceLevel: 1 | 2 | 3;
  photos: number;
  topReviewKeywords: string[];
  reviews: Review[];
  area: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const places: Place[] = [
  {
    "id": "place-1",
    "name": "Little Jasmine by the River",
    "category": "hotel",
    "subcategory": "โรงแรม",
    "lat": 16.8050835,
    "lng": 100.2460907,
    "rating": 4.7,
    "reviewCount": 57,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": false,
    "hasSocialMedia": true,
    "priceLevel": 2,
    "photos": 150,
    "topReviewKeywords": [
      "clean",
      "far",
      "there",
      "you",
      "with",
      "his",
      "place",
      "excellent"
    ],
    "reviews": [
      {
        "text": "We were there before NY 2025 and won’t go back there again.",
        "rating": 1,
        "date": "2026-01-28T14:32:16.627Z",
        "language": "en"
      },
      {
        "text": "บริการดีมากเลยค่ะเป็นกันเอง\nห้องพักสะอาด มีตลาดถนนคนเดินตอนเย็นถึง4ทุ่ม ของกินอร่อยของใช้ก็เยอะคนเดินก็เยอะมากกก😁😁",
        "rating": 5,
        "date": "2026-01-24T23:17:26.620Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 4,
        "date": "2026-01-07T05:53:23.951Z",
        "language": "en"
      },
      {
        "text": "Small, very clean and welcoming hotel. From the minute you arrive, Pon at the front desk takes care of you in every way. From check-in to preparing breakfast, he gets the job done quickly and helpfully, with a big smile on his face. The hotel is welcoming and very clean. The whole place smells wonderful. The rooms are clean and comfortable. The location is excellent, right on the riverfront. But the added bonus is definitely Pon, who accommodated every request with kindness and professionalism. His dedication to his work made me think he was the owner, but I discovered that he actually works as an employee.",
        "rating": 5,
        "date": "2026-01-05T14:04:26.700Z",
        "language": "en"
      },
      {
        "text": "L’hôtel est situé légèrement en retrait du centre-ville dans un quartier calme, proche d’un magnifique temple doré et de la rivière Nan. L’hôte est super accueillant, de bons conseils, aux petits soins et prépare un savoureux petit-déjeuner ! Une étape de repos incontournable de passage à Phitsanulok !",
        "rating": 5,
        "date": "2025-12-30T03:21:39.164Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2025-12-12T09:58:33.994Z",
        "language": "en"
      },
      {
        "text": "Wow!! This small guesthouse is amazing and the personal service provided on-site by Pond is simply superb!\n\nThe hospitality is by far the best we've had in Thailand, and far exceeds that provided by other expensive high-class hotels. The coffee is excellent...great beans and well brewed...and the accompanying breakfast ideal. The on-site host is SO friendly, supportive and generous, and we felt so relaxed staying here.\n\nThe rooms are large and extremely clean, and the entire place has a relaxed funky vibe. We've thoroughly enjoyed the balcony looking over the river, particularly at night time, with a great view of the bridge and temple.\n\nThe location is excellent, especially on market night, and offers quick access to one of the best and authentic markets in Thailand - far better than those in Chaing Mai and Bangkok. So convenient and just around the corner so there is no noise. Also, its a quick stroll along the river to all the major attractions, or you can grab a taxi/grab.\n\nWe will definitely stay here again when we come back to Phitsanulok. This place is a gem and it deserves far more than five stars for the superb level of hospitality provided on-site by Pond.  Thankyou 🙏✨️",
        "rating": 5,
        "date": "2025-12-10T01:11:06.786Z",
        "language": "en"
      },
      {
        "text": "Très belle chambre juste en face du wat chantawantok ❤️ et a côté du walking street ❤️ parfait!!!!!",
        "rating": 5,
        "date": "2025-11-23T00:12:35.393Z",
        "language": "en"
      },
      {
        "text": "Little Jasmine by the river...\nเกสเฮ้าส์เล็กๆ ริมแม่น้ำน่านในตัวเมืองพิษณุโลก ไม่ได้จองล่วงหน้าหาข้อมูลที่พักไม่ถึงครึ่งชั่วโมงระหว่างเดินทางมาจากสุโขทัย เพื่อหาที่พักแบบด่วนเพราะเริ่มมืดแล้ว จองที่นี่เพราะเห็นรีวิวให้คะแนนสูงเลยกดจองผ่าน Booking.com ด้วยความรีบเลยไม่ได้ดูว่าห้องที่จองเป็นแชร์ห้องน้ำกับอีกห้องนึง โทรสอบถามที่พัก น้องผู้ดูแลช่วยเหลือแก้ปัญหาให้ดีมากๆ เปลี่ยนห้องให้แบบห้องน้ำส่วนตัว มีWelcome drink เป็นชาเสาวรส สดชื่นอร่อยมากค่ะ ห้องพักสะอาด กว้างขวาง สะดวก สบาย ตอนเช้ามีข้าวต้ม ผลไม้ ขนมหวาน น้ำส้ม กาแฟสด เป็น set มื้อเช้าที่อิ่มและอร่อยมาก น้องดูแลดีมากๆทั้งที่เพิ่งเคยเจอกันครั้งแรก แต่การให้บริการเสมือนเป็นญาติกัน น้องล้างรถให้อีกด้วย ขอบคุณมากๆสำหรับการใส่ใจลูกค้า บริการดีแบบนี้ครั้งหน้ามาหาอีกแน่นอนค่ะ ❤",
        "rating": 5,
        "date": "2025-11-11T09:33:15.868Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 4,
        "date": "2025-11-03T07:52:34.117Z",
        "language": "en"
      }
    ],
    "area": "City Center"
  },
  {
    "id": "place-2",
    "name": "โฮลาเทลริมน่าน",
    "category": "hotel",
    "subcategory": "โรงแรม",
    "lat": 16.8218332,
    "lng": 100.2626319,
    "rating": 4.1,
    "reviewCount": 352,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": true,
    "hasSocialMedia": true,
    "priceLevel": 2,
    "photos": 379,
    "topReviewKeywords": [
      "good",
      "wat",
      "phra",
      "great",
      "this",
      "hotel",
      "nang",
      "phaya"
    ],
    "reviews": [
      {
        "text": "",
        "rating": 5,
        "date": "2026-03-02T12:55:03.938Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2026-02-12T06:57:46.298Z",
        "language": "en"
      },
      {
        "text": "เป็นอีกหนึ่งโรงแรมที่ดีสำหรับพิษณุโลก ห้องพักสะอาด ทันสมัย ห้องพักกว้าง ตรงปก พนักงานอัธยาศัยดี เช็คอินเช็คเอาท์รวดเร็ว มีที่จอดรถรองรับหลายคัน สะดวกสบายโลเคชั่นใกล้กับวัดนางพญาและวัดใหญ่สามารถเดินเท้าไปได้ 200 เมตร และยังใกล้กับห้างท็อปแลนด์ของพิษณุโลก เดินทางไปไหนมาไหนสะดวกสบาย ข้อเสียสำหรับห้องพักที่ติดกับฝั่งถนนหรือวิวเมืองค่อนข้างเสียงดังได้ยินเสียงรถสัญจรไปมา ห้องไม่เก็บเสียง โดยรวมถือว่าดีครับ",
        "rating": 4,
        "date": "2026-02-10T16:52:34.328Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 3,
        "date": "2026-01-28T06:33:13.038Z",
        "language": "en"
      },
      {
        "text": "Great location, great breakfast, good front desk staff",
        "rating": 4,
        "date": "2026-01-20T00:41:57.732Z",
        "language": "en"
      },
      {
        "text": "ทุกอย่างโอเค ชอบสุดๆที่อยู่ข้างหลังหรือข้างๆวัดนางพญา ให้ 10\nแต่หักคะแนนที่วางฝักบัวหัก วางไม่ได้ เตียงนอนแล้วปวดหลัง",
        "rating": 4,
        "date": "2026-01-08T09:45:16.517Z",
        "language": "th"
      },
      {
        "text": "ดีมาก เตียงนอนหลับสบายไม่ปวดหลังเลย ไม่ปวดคอ. แต่อาหารน้อยไปหน่อย",
        "rating": 5,
        "date": "2026-01-01T03:15:49.602Z",
        "language": "th"
      },
      {
        "text": "ที่พักนี้ อยู่ใกล้ วัดนางพญา และ วัดพระศรีรัตนมหาธาตุ\nเดินได้สบายๆ\nที่พักมีที่จอดรถสะดวก\nห้องพัก /อาหารเช้า ใช้ได้ค่ะ\nห้องน้ำ  ไม่ลื่น น้ำแรงดี",
        "rating": 4,
        "date": "2025-12-15T08:55:35.540Z",
        "language": "th"
      },
      {
        "text": "ห้องพักสะอาดและเป็นระเบียบเรียบร้อย และนอกจากจะมีน้ำดื่มฟรีแล้ว ยังมีน้ำผลไม้และของว่างให้ด้วย 😊 ห้องน้ำมีน้ำอุ่นและแรงดันน้ำดี 🥰👌 เตียงนุ่มสบาย ☺️ มีร้านอาหารอยู่ใกล้ๆ และมีวัดที่มีชื่อเสียงอยู่ข้างๆ 🥰💕💕💕 สาธุ 🙏 ฉันแนะนำเลย 😊👍👍👍",
        "rating": 5,
        "date": "2025-12-13T22:50:14.612Z",
        "language": "th"
      },
      {
        "text": "This is a good value hotel, close to Wat Phra Si Rattana Mahathat, locally known as Wat Yai, and also Wat Nang Phaya.\nThe former is home to a venerated Buddha image called Phra Phuttha Chinnarat, and the latter a huge Buddha image called Phra Nang Phaya. If you like temples then, this hotel is a good first choice.\nThe rooms are clean, but some don't have daylight despite having window. These rooms are cheaper though.",
        "rating": 5,
        "date": "2025-12-09T19:29:50.051Z",
        "language": "en"
      }
    ],
    "area": "Nan River"
  },
  {
    "id": "place-3",
    "name": "จอมมาลัย บูติก โฮเทล",
    "category": "hotel",
    "subcategory": "โรงแรม",
    "lat": 16.8178451,
    "lng": 100.2807298,
    "rating": 4,
    "reviewCount": 135,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": false,
    "hasSocialMedia": false,
    "priceLevel": 2,
    "photos": 33,
    "topReviewKeywords": [
      "check​",
      "ที่จอดรถเยอะ",
      "out",
      "ราคา",
      "450",
      "โทรมาจองไว้ล่วงหน้า",
      "เพราะมาถึมืด",
      "กลัวไม่มีที่พัก"
    ],
    "reviews": [
      {
        "text": "โทรมาจองไว้ล่วงหน้า เพราะมาถึมืด กลัวไม่มีที่พัก ลุงบอกได้จองไว้เรียบร้อย ละมาถึงตี 2 บอกให้ห้องพักคนอื่นไปแล้ว บริการโคตรแย่",
        "rating": 1,
        "date": "2026-02-23T20:22:07.881Z",
        "language": "th"
      },
      {
        "text": "ห้องพักราคาไม่แพง ห้องใหญ่พอสมควร ห้องพักสะอาด เตียงนุ่มนอนสบาย แอร์เย็น น้ำแรง อินเตอร์เนตไว มีตู้เย็นขนาดใหญ่ ที่จอดรถเยอะ",
        "rating": 5,
        "date": "2026-02-23T15:46:22.602Z",
        "language": "th"
      },
      {
        "text": "มาจาก กทม. เข้ามา Check​ in กับคุณลุง วันที่ 29 ม.ค. 69 ถามรายละเอียด​การ Check​ out บอกว่าเป็น 30 ม.ค. 69 ก่อนเที่ยง\n\nสรุปตอน 10.00 น. มี ผู้หญิง​อีกคนมานั่ง บอกให้ Check​ out วันนี้​เลย ก่อน 12.00 น.",
        "rating": 1,
        "date": "2026-01-29T03:04:50.897Z",
        "language": "th"
      },
      {
        "text": "ดูรูปลักษณ์น่าจะบริการดี",
        "rating": 5,
        "date": "2026-01-27T01:26:18.732Z",
        "language": "th"
      },
      {
        "text": "ตาแก่ ผช หน้าเค้าเตอร์ พูดจา หมาไม่แดกมาพักที่นี้หลายครั้งละ กี่ครั้งก็ไปเป็นแบบเดิม ไม่มีใจที่จะบริการ หรือง่วงนอน ก็ควรพักผ่อนอยู่บ้านนะ",
        "rating": 1,
        "date": "2026-01-05T15:18:38.259Z",
        "language": "th"
      },
      {
        "text": "ผู้ชายหน้าเคาร์เตอร์ พูดจาไม่ดี ตะคอกใส่ลูกค้า ไม่ทราบว่าอารมณ์เสียจากไหนมา ก็ไม่ควรมาพูดจาเสียมารยาทแบบนี้ครับ",
        "rating": 1,
        "date": "2025-12-17T05:31:06.433Z",
        "language": "th"
      },
      {
        "text": "ที่จอดรถเยอะครับ ห้องกว้างพอสมควร ราคา 450 ผ้าปูเปลี่ยน ใหม่ตลอดโอเคครับ จริงๆอยากจะให้ประมาณ 3.5 แต่มันไม่มีให้เลือก โดยรวมแล้วก็คือโอเคราคานี้กับคุณภาพประมาณนี้",
        "rating": 3,
        "date": "2025-12-01T06:58:49.795Z",
        "language": "th"
      },
      {
        "text": "กว้าง ที่จอดรถเยอะ",
        "rating": 5,
        "date": "2025-11-27T10:35:35.371Z",
        "language": "th"
      },
      {
        "text": "ห้องพัก : ความสะอาดโอเค ผ้าห่มหนากำลังดี ผ้าขนหนูไม่มีกลิ่นอับ มีโต๊ะเขียนหนังสือ ตู้เย็น น้ำดื่ม ที่แขวนเสื้อ แต่ระเบียงห้องอาจจะฝุ่นจับไปสักนิด\n\nบริการ : ช่วงเช้ามีน้ำอุ่น กาแฟ หิวยามดึกมีมาม่ากระป๋องและตู้เครื่องดื่ม ลานจอดรถมีทั้งใต้หลังคาและลานโล่งสามารถรองรับรถได้พอสมควร\n\nบรรยากาศ : ใกล้เมือง เข้าออกได้สะดวกหลายทาง ไม่เสียงดังรบกวน\n\nราคา : เหมาะสมครับ",
        "rating": 4,
        "date": "2025-11-17T11:04:24.766Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2025-07-30T23:50:21.507Z",
        "language": "en"
      }
    ],
    "area": "Train Station"
  },
  {
    "id": "place-4",
    "name": "Petit Paramata",
    "category": "restaurant",
    "subcategory": "เบด แอนด์ เบรกฟาสต์",
    "lat": 16.8161962,
    "lng": 100.2572811,
    "rating": 4.8,
    "reviewCount": 32,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": false,
    "hasSocialMedia": false,
    "priceLevel": 2,
    "photos": 88,
    "topReviewKeywords": [
      "und",
      "est",
      "die",
      "des",
      "sehr",
      "war",
      "dans",
      "wir"
    ],
    "reviews": [
      {
        "text": "",
        "rating": 5,
        "date": "2026-01-03T00:35:34.303Z",
        "language": "en"
      },
      {
        "text": "Magnifique maison d'hôtes dans la ville à  proximité des temples et des marchés.|Îlot de verdure. Beaucoup de plantes tropicales dans le jardin.|La chambre est spacieuse décorée avec soin. Le bâtiment est en bois de teck. Dans une pièce à  part est mis à disposition gratuitement des boissons et des fruits.|Le petit déjeuner est copieux et variés avec de petits mets thai exquis.|La propriétaire est très sympathique et riche d'un grand vécu. Elle a vécu en France. Elle parle donc français. Génial |Sa sœur nous a joué d'un instrument traditionnel|Un accueil chaleureux",
        "rating": 3,
        "date": "2025-12-04T23:59:59.999Z",
        "language": "en"
      },
      {
        "text": "Wir haben uns sehr wohl gefühlt. Die Vermieterin war sehr freundlich und hat sich viel Zeit genommen ohne aufdringlich zu sein. Das Zimmer war sauber und zweckmäßig eingerichtet, ausgestattet mit Klimaanlage. Am schönsten aber war es auf dem bequemen Sofa auf der Terrasse mit Blick in den Garten. Das Frühstück war sensationell in Geschmack und Vielfalt. Man konnte gar nicht alles essen, aber sie haben es für uns eingepackt und im Kühlschrank der Gäste-Küche, die wir benutzen durften, deponiert. Auch die kostenlosen Fahrräder, Getränke, Kaffee, Snacks und Obst für die Gäste sind nicht selbstverständlich. Wir haben uns, sehr wohl gefühlt und können die Unterkunft sehr empfehlen.",
        "rating": 5,
        "date": "2025-11-24T07:43:33.465Z",
        "language": "en"
      },
      {
        "text": "Prachtige homestay in Phitsanulok,  centraal gelegen en toch rustig. Veel privacy en een prachtige tuin om in te verblijven.",
        "rating": 5,
        "date": "2025-11-18T13:44:12.072Z",
        "language": "en"
      },
      {
        "text": "Wonderful homestay, very friendly hosts, an amazing breakfast  - altogether a clear recommendation.  I'd love to come back 👍🙂",
        "rating": 5,
        "date": "2025-10-01T14:14:23.686Z",
        "language": "en"
      },
      {
        "text": "Geweldige ervaring om hier te mogen zijn. Genoten van de gastvrijheid, het ontbijt en de stad. Met de prachtige tuin is het oase van rust.",
        "rating": 5,
        "date": "2025-02-19T14:37:59.171Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2025-01-21T09:22:40.494Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2024-09-07T11:45:34.389Z",
        "language": "en"
      },
      {
        "text": "This place is as good as it gets. A beautiful property owned and run by kind, super interesting people with great facilities and the most delicious breakfast (the leftovers of which were packed up for my lunch on the train later in the day). The room was very comfortable and I was given loads of ideas how to use my time in Pithsanulok. If you get the chance: STAY HERE!",
        "rating": 5,
        "date": "2024-08-08T12:37:45.255Z",
        "language": "en"
      },
      {
        "text": "Krásné místo, milí lidé, top zážitek",
        "rating": 5,
        "date": "2023-12-14T02:11:31.131Z",
        "language": "en"
      }
    ],
    "area": "Topland Plaza"
  },
  {
    "id": "place-5",
    "name": "การบูร เวลเนส สปา",
    "category": "restaurant",
    "subcategory": "สปา",
    "lat": 16.7861544,
    "lng": 100.2641544,
    "rating": 4.3,
    "reviewCount": 97,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": true,
    "hasSocialMedia": true,
    "priceLevel": 2,
    "photos": 303,
    "topReviewKeywords": [
      "pet",
      "friendly",
      "ราคาไม่แพง",
      "คุ้มค่าราคา",
      "เป็นที่พัก",
      "เอาน้องหมาไป",
      "ตัว",
      "น้องๆ"
    ],
    "reviews": [
      {
        "text": "ราคาไม่แพง คุ้มค่าราคา เป็นที่พัก pet friendly เอาน้องหมาไป 2 ตัว น้องๆ Happy มาก ภายในรีสอร์ทมีที่กว้างให้น้องวิ่งปล่อยพลังสบายและร่มรื่นมากๆ และแนะนำอย่างยิ่งกับบริการ \"นวดน้ำมัน Image\" กับหมอเก๋ หมอนวดที่เก่งมากๆ",
        "rating": 5,
        "date": "2025-10-26T02:12:32.125Z",
        "language": "th"
      },
      {
        "text": "บ้านสายน้ำติดแม่น้ำโขง สวยงาม บรรยากาศชิว ชอบค่ะ",
        "rating": 4,
        "date": "2025-07-19T10:13:26.640Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 4,
        "date": "2025-07-01T10:19:32.785Z",
        "language": "en"
      },
      {
        "text": "ที่พักราคาไม่แพง pet friendly แต่มีค่าบริการ ค่อนข้างเงียบ ไม่มีอาหารเช้า ห้องกว้างสะอาดราคาดี มีไก่โอ้คให้น้องหมาน้องชอบมากเล่นทั้งคืน",
        "rating": 4,
        "date": "2025-05-24T14:21:47.899Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2025-04-29T07:09:47.907Z",
        "language": "en"
      },
      {
        "text": "ประทับใจกับ Karaboon wellnes spa ทีพิดโลกมากกก แถมปลาให้น้องแมวมาเล่นอีก มาพักรอบสองแล้ว ทีีพักทีีเปน pet friendly แล้วราคาไม่แรง ในพิษณุโลกหายากมากกก ถ้ามาอีกแล้วมีหมาแมวมาด้วยจะปีกหมุดที่นีชัวร์",
        "rating": 5,
        "date": "2025-02-10T17:46:11.920Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2025-01-24T13:16:11.186Z",
        "language": "en"
      },
      {
        "text": "นอนบ้านสีขาว กว้างขวางมากครับ มีห้องนั่งเล่นแยกกับห้องนอน คุ้มค่ากับราคาครับ",
        "rating": 5,
        "date": "2025-01-02T14:37:05.847Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2024-10-12T02:18:41.511Z",
        "language": "en"
      },
      {
        "text": "บริการดี",
        "rating": 5,
        "date": "2024-09-29T05:01:27.326Z",
        "language": "th"
      }
    ],
    "area": "City Center"
  },
  {
    "id": "place-6",
    "name": "Dragon River Avenue (ดราก้อนริเวอร์อเวนิว)",
    "category": "hotel",
    "subcategory": "โรงแรม",
    "lat": 16.8288361,
    "lng": 100.2643371,
    "rating": 4.2,
    "reviewCount": 770,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": true,
    "hasSocialMedia": true,
    "priceLevel": 2,
    "photos": 2014,
    "topReviewKeywords": [
      "ห้องพักสะอาดดี",
      "แต่เสียงแอร์ดังมาก",
      "ประตูออกแล้วคีย์การ์ดเข้าไม่ได้",
      "แก้ไข",
      "ถึง",
      "ครั้ง",
      "ทั้งช่วงดึก",
      "และช่วงเช้า"
    ],
    "reviews": [
      {
        "text": "ห้องพักสะอาดดี แต่เสียงแอร์ดังมาก ประตูออกแล้วคีย์การ์ดเข้าไม่ได้ แก้ไข ถึง 2 ครั้ง ทั้งช่วงดึก และช่วงเช้า พนักงานบริการดี ที่จอดรถข้างถนน มีอาหารเช้า",
        "rating": 2,
        "date": "2026-02-28T02:52:55.252Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 3,
        "date": "2026-02-26T08:39:23.646Z",
        "language": "en"
      },
      {
        "text": "พนักงานบริการดีมากสุภาพ มีรถรับส่งไปวัดและสถานที่ใก้ลๆ อาหารที่ร้านอาหาร โดยรวมก็อร่อย แต่ออกเค็มไปหน่อยกินเล่นไม่ค่อยได้ต้องกินกับข้าว",
        "rating": 4,
        "date": "2026-02-25T11:28:10.780Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2026-02-13T14:48:47.116Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2026-02-08T12:01:21.179Z",
        "language": "en"
      },
      {
        "text": "มาทานอาหาร8โมงเช้า รอเป็นครึ่งชั่วโมงแล้วยังไม่ได้ทานเพราะเป็นเมนูที่ต้องสั่งทำจานต่อจาน พนักงานแจ้งว่ามีลูกค้ามาทานเป็นกรุ๊ป  ประเด็นคือมาทานแค่2 คน ใครจะมาก็คิดให้ดี รอได้ก็รอ ระบบจัดการหลังบ้านแย่มาก ส่วนตัวไม่ขอมาพักอีก",
        "rating": 1,
        "date": "2026-02-02T01:30:10.340Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2026-01-24T10:52:22.858Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2026-01-21T11:58:38.390Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2026-01-17T10:34:01.735Z",
        "language": "en"
      },
      {
        "text": "ติดรินน้ำน่าน วิวกลางคืนสวย",
        "rating": 4,
        "date": "2026-01-10T12:41:23.736Z",
        "language": "th"
      }
    ],
    "area": "Naresuan University"
  },
  {
    "id": "place-7",
    "name": "วังจันทน์ ริเวอร์วิว",
    "category": "hotel",
    "subcategory": "โรงแรม",
    "lat": 16.8170792,
    "lng": 100.2583696,
    "rating": 4.2,
    "reviewCount": 1039,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": true,
    "hasSocialMedia": true,
    "priceLevel": 2,
    "photos": 1808,
    "topReviewKeywords": [
      "parking",
      "went",
      "employee",
      "car",
      "room",
      "breakfast",
      "ใจกลางเมือง",
      "สะดวกมาก"
    ],
    "reviews": [
      {
        "text": "",
        "rating": 5,
        "date": "2026-03-02T15:06:18.753Z",
        "language": "en"
      },
      {
        "text": "ใจกลางเมือง สะดวกมาก ห้องสะอาดค่ะ ได้ห้องฝั่งวิวแม่น้ำสวยดีค่ะ",
        "rating": 5,
        "date": "2026-03-01T16:01:53.617Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2026-03-01T10:52:42.879Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 4,
        "date": "2026-02-26T04:46:29.963Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2026-02-23T01:26:01.158Z",
        "language": "en"
      },
      {
        "text": "After returning from dinner there was no parking. I went to the front desk and an English speaking employee helped me.  We went to the parking garage and a second employee moved a car to make room for my car. Because of this service I will stay here again. The room, shower, hotel, Wi-Fi, breakfast were all acceptable.",
        "rating": 4,
        "date": "2026-02-15T01:41:17.874Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2026-02-14T04:14:52.525Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2026-02-09T12:41:09.920Z",
        "language": "en"
      },
      {
        "text": "Very central. Nice rooms and good breakfast.",
        "rating": 5,
        "date": "2026-02-08T17:28:35.451Z",
        "language": "en"
      },
      {
        "text": "โรงแรมสวยมาก ห้องกว้างขวาง น้องๆพนักงานน่ารักมาก ให้บริการดี คุ้มค่ากับราคา มีอาหารเช้า ถ้าได้ไปพิษณุโลกจะแวะพักที่นี่อีกแน่นอน",
        "rating": 5,
        "date": "2026-02-08T10:38:18.191Z",
        "language": "th"
      }
    ],
    "area": "City Center"
  },
  {
    "id": "place-8",
    "name": "Hom Ka Tun - coffee and tea",
    "category": "cafe",
    "subcategory": "ร้านกาแฟ",
    "lat": 17.2763486,
    "lng": 100.6027682,
    "rating": 4.7,
    "reviewCount": 3,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": true,
    "hasSocialMedia": false,
    "priceLevel": 2,
    "photos": 6,
    "topReviewKeywords": [
      "good",
      "coffee",
      "around",
      "here"
    ],
    "reviews": [
      {
        "text": "Good coffee around here",
        "rating": 4,
        "date": "2022-05-01T04:04:11.155Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2021-11-01T11:26:17.839Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2021-11-01T03:01:46.914Z",
        "language": "en"
      }
    ],
    "area": "Train Station"
  },
  {
    "id": "place-9",
    "name": "Baan Lhang Wangh บ้านหลังวัง",
    "category": "cafe",
    "subcategory": "ร้านกาแฟ",
    "lat": 16.8305173,
    "lng": 100.2601705,
    "rating": 4.7,
    "reviewCount": 252,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": true,
    "hasSocialMedia": true,
    "priceLevel": 2,
    "photos": 1069,
    "topReviewKeywords": [
      "coffee",
      "this",
      "today",
      "again",
      "with",
      "nice",
      "amazing",
      "been"
    ],
    "reviews": [
      {
        "text": "",
        "rating": 5,
        "date": "2026-02-18T06:58:57.550Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2026-02-18T06:58:17.482Z",
        "language": "en"
      },
      {
        "text": "พอดีไม่ได้มาพักค่ะ มาใช้บริการด้านอาหารและเครื่องดื่ม\nบอกเลยชอบมากค่ะ เมนูของว่างและเครื่องดื่มทั้งสมัยก่อนและปัจจุบัน",
        "rating": 4,
        "date": "2026-02-17T04:01:00.649Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2026-02-14T06:32:28.278Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2026-02-01T03:29:22.688Z",
        "language": "en"
      },
      {
        "text": "Update 21.01.2026\nWe came here today again after 4 years, with the plan to have a nice Coffee. Unfortunately today the Coffee Machine doesnt working... bad luck.\n\nWonderful Bistro, beautiful surroundings and retro style design, history about Palace around. Delicious Coffee and Smoothies, Cakes and Food. Upstairs are 4 nice Rooms available for affordable Prices including Breakfast.",
        "rating": 5,
        "date": "2026-01-21T07:38:50.628Z",
        "language": "en"
      },
      {
        "text": "Extremely happy with the service, what make this place amazing is the reception boy, amazing host 😊",
        "rating": 5,
        "date": "2026-01-11T04:01:29.733Z",
        "language": "en"
      },
      {
        "text": "I've been traveling for a week in Thailand and so far this has been the best hotel experience! Probably top 10 within my life! If I'm in the area again I will select this hotel above all others!",
        "rating": 5,
        "date": "2026-01-11T04:00:12.555Z",
        "language": "en"
      },
      {
        "text": "ร้านอยู่หลังค่ายพระนเรศวรหาราช อยู่ติดริมน้ำบรรยากาศดีมาก ร้านตกแต่งสไตล์ไทยมีบอกเล่าเรื่องราวของสุโขทัยเป็นที่น่าสนใจยิ่ง  เครื่องดื่มรสชาติเข้มข้นดีมาก/ราคาไม่แพง เป็นทั้งที่พักและคาเฟ่ ที่จอดรถสะดวก",
        "rating": 5,
        "date": "2026-01-03T15:47:21.089Z",
        "language": "th"
      },
      {
        "text": "ที่พักร่มรื่น สะอาด สวยมาก บรรยากาศที่ได้รับอบอุ่น น้องที่ต้อนรับดูแลดีมาก อาหารเช้ามีให้เลือกหลากหลาย ทั้งกาแฟเลือกได้หลายเมนูโกโก้ น้ำผลไม้ ก็มี ห้องพักสะอาดมาก โดยรวมประทับใจที่สุด กลับมาใหม่แน่นอนคะ",
        "rating": 3,
        "date": "2026-01-01T23:59:59.999Z",
        "language": "th"
      }
    ],
    "area": "City Center"
  },
  {
    "id": "place-10",
    "name": "ร้านลานหิน คอฟฟี่",
    "category": "cafe",
    "subcategory": "ร้านกาแฟ",
    "lat": 17.2578542,
    "lng": 100.5604167,
    "rating": 4,
    "reviewCount": 6,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": false,
    "hasSocialMedia": false,
    "priceLevel": 2,
    "photos": 9,
    "topReviewKeywords": [
      "this",
      "cafe",
      "has",
      "closed",
      "อร่อยมากกกก"
    ],
    "reviews": [
      {
        "text": "",
        "rating": 3,
        "date": "2019-08-20T11:39:50.987Z",
        "language": "en"
      },
      {
        "text": "This cafe has closed",
        "rating": 1,
        "date": "2019-08-03T04:30:48.204Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2019-05-05T18:52:48.769Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2018-09-26T08:07:57.297Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2017-10-08T01:00:35.781Z",
        "language": "en"
      },
      {
        "text": "อร่อยมากกกก 💕",
        "rating": 5,
        "date": "2017-03-10T08:16:24.293Z",
        "language": "th"
      }
    ],
    "area": "City Center"
  },
  {
    "id": "place-11",
    "name": "The Zense Boutique Hotel",
    "category": "hotel",
    "subcategory": "โรงแรม",
    "lat": 16.809341,
    "lng": 100.226373,
    "rating": 4.3,
    "reviewCount": 548,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": true,
    "hasSocialMedia": true,
    "priceLevel": 2,
    "photos": 493,
    "topReviewKeywords": [
      "boutique",
      "pool",
      "view",
      "das",
      "zense",
      "hotel",
      "signature",
      "bed"
    ],
    "reviews": [
      {
        "text": "มาเช็คอินที่ The Zense Boutique Hotel Phitsanulok ครั้งแรก ประทับใจตั้งแต่เดินเข้าล็อบบี้เลยครับ โรงแรมดีไซน์โมเดิร์น ดูสะอาด โปร่ง โลเคชันอยู่ไม่ไกลจากตัวเมือง เดินทางสะดวกมาก\n\nห้องที่พักเป็นแบบ Signature Pool View Twin Bed ห้องกว้าง เตียงนอนสบาย สิ่งอำนวยความสะดวกครบครับ\n\nช่วงเย็นลงไปเดินเล่นริมสระ เปิดไฟแล้วบรรยากาศดี นั่งชิลได้เลย อาหารเช้าก็มีให้เลือกทั้งแบบไทยและอเมริกัน รสชาติโอเค\n\nโดยรวมถือว่าเป็นอีกที่พักในพิษณุโลกที่คุ้มค่า เหมาะทั้งมาพักผ่อนและมาทำงาน ถ้ามีโอกาสมาพิษณุโลกอีก ก็จะกลับมาพักที่นี่อีกแน่นอนครับ",
        "rating": 5,
        "date": "2026-03-03T02:18:33.687Z",
        "language": "th"
      },
      {
        "text": "ทริปพิษณุโลกครั้งนี้🏨\nเราพักโรงแรมที่ “ครบและคุ้ม” กับ\nThe Zense Boutique Hotel\nเป็นโรงแรม 4 ดาวดีไซน์ Modern Boutique เรียบหรู สงบ พักสบาย ใจกลางเมืองพิษณุโลก✨\n\nสิ่งที่ชอบมาก\n✨ ห้อง Signature Pool View King Bed เห็นวิวสระทุกห้อง\n✨ มีให้เลือก 3 Room Type\n✨ เช็คอินได้ 24 ชม. เหมาะกับคนเดินทางดึก\n✨ สระว่ายน้ำระบบเกลือ + Pool Bar “INFINITY”\n✨ ห้องอาหาร / ห้องประชุม\n✨ มี EV Charger สำหรับรถไฟฟ้า\n✨ พนักงานบริการดี\n\nเป็นโรงแรมที่เหมาะทั้งสายเที่ยว สายทำงาน หรือมาพักชาร์จพลังเฉย ๆ ราคาหลักพัน ใจกลางเมือง🤍",
        "rating": 5,
        "date": "2026-03-01T05:53:28.755Z",
        "language": "th"
      },
      {
        "text": "พักที่นี้ทุกครั้ง ที่มาพิษณุโลก ห้องเงียบ รวมๆประทับใจค่ะ",
        "rating": 5,
        "date": "2026-02-21T03:34:42.424Z",
        "language": "th"
      },
      {
        "text": "น้องๆพนักงานน่ารักทุกคน เข้าโรงแรมสิ่งแรกที่ประทับใจคือความหอมของโรงแรม หอมมากกกกกกก เตียงนุ่มนอนสบาย",
        "rating": 5,
        "date": "2026-02-09T07:00:45.009Z",
        "language": "th"
      },
      {
        "text": "ที่พักสะดวกสบาย สะอาด พนักงานบริการดีมากๆ",
        "rating": 5,
        "date": "2026-02-07T02:43:05.569Z",
        "language": "th"
      },
      {
        "text": "มี่จอดรถกว้าง ห้องสะอาด บริการดี",
        "rating": 5,
        "date": "2026-02-01T04:45:47.151Z",
        "language": "th"
      },
      {
        "text": "เราเข้าพัก3คืนค่ะ,ห้องพักใหญ่และสะอาด,สระว่ายน้ำใหญ่และผ่อนคลาย,อาหารอร่อยค่ะ,พนักบริการดียิ้มแย้ม,ประทับใจมากค่ะมีโอกาสจะแวะมาอีกค่ะ⭐️⭐️⭐️⭐️⭐️",
        "rating": 5,
        "date": "2026-01-21T02:55:10.012Z",
        "language": "th"
      },
      {
        "text": "ห้องพักสวย สะอาด ห้องพักกว้างขวาง แบ่งแยกโซนชัดเจน ระหว่าง ห้องนอน ห้องนั่งเล่น",
        "rating": 5,
        "date": "2026-01-19T16:26:09.069Z",
        "language": "th"
      },
      {
        "text": "Das Hotelzimmer ist für den Preis sehr gut. Leider war das Frühstück nicht das Beste, muss aber sagen für den Preis geht es in Ordnung. Personal sehr freundlich.",
        "rating": 4,
        "date": "2026-01-19T14:36:27.006Z",
        "language": "en"
      },
      {
        "text": "ห้องพักสะอาดคุ้มค่ากับราคา ได้ห้อง Garden View วิวสวนสวย เดินไปสระสะดวก ห้องพักหลับสบาย ประทับใจมาก พนักงานบริการดีมากๆ ห้องพักเหมือนโรงแรมในกรุงเทพ แอร์ฝัง ห้องกว้าง เรียบหรู มีอาหารเช้า มีที่ชาจไฟรถไฟฟ้า",
        "rating": 5,
        "date": "2026-01-19T05:24:06.167Z",
        "language": "th"
      }
    ],
    "area": "Nan River"
  },
  {
    "id": "place-12",
    "name": "Dek-cha พ่นไฟ สาขานครไทย",
    "category": "cafe",
    "subcategory": "ร้านกาแฟ",
    "lat": 17.1051252,
    "lng": 100.8320407,
    "rating": 4.9,
    "reviewCount": 9,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": true,
    "hasSocialMedia": false,
    "priceLevel": 2,
    "photos": 6,
    "topReviewKeywords": [
      "ร้านนี้อร่อย",
      "อร่อยมากๆๆค่ะ",
      "อร่อยมากค่ะ",
      "เครื่องดื่มอร่อยมากๆ",
      "วัตถุดิบคุณภาพดีไม่ใช้คอฟฟี่เมต👍👍👍👍👍👍👍👍👍👍👍",
      "ชาอร่อยดีครับ"
    ],
    "reviews": [
      {
        "text": "",
        "rating": 5,
        "date": "2022-01-09T08:10:57.525Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2021-12-19T12:55:13.773Z",
        "language": "en"
      },
      {
        "text": "ร้านนี้อร่อย",
        "rating": 5,
        "date": "2021-12-19T04:07:46.653Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2021-11-20T02:44:00.798Z",
        "language": "en"
      },
      {
        "text": "อร่อยมากๆๆค่ะ",
        "rating": 5,
        "date": "2021-08-14T03:56:58.081Z",
        "language": "th"
      },
      {
        "text": "อร่อยมากค่ะ",
        "rating": 5,
        "date": "2021-03-18T04:08:00.340Z",
        "language": "th"
      },
      {
        "text": "เครื่องดื่มอร่อยมากๆ วัตถุดิบคุณภาพดีไม่ใช้คอฟฟี่เมต👍👍👍👍👍👍👍👍👍👍👍",
        "rating": 5,
        "date": "2021-02-21T08:45:49.706Z",
        "language": "th"
      },
      {
        "text": "ชาอร่อยดีครับ",
        "rating": 4,
        "date": "2021-01-16T08:00:13.277Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2020-12-14T08:20:22.024Z",
        "language": "en"
      }
    ],
    "area": "Topland Plaza"
  },
  {
    "id": "place-13",
    "name": "ร้านครัวระเบียงครัว",
    "category": "restaurant",
    "subcategory": "ร้านอาหาร",
    "lat": 17.1065552,
    "lng": 100.8438283,
    "rating": 4.5,
    "reviewCount": 6,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": false,
    "hasSocialMedia": false,
    "priceLevel": 2,
    "photos": 21,
    "topReviewKeywords": [
      "เป็นร้านอาหารตั้งอยู่ในทำเลที่ดีใกล้อู่ซ่อมเบนซ์ถนนสรงประภาเวลามาเข็ครถทีไรก็แวะมาทานทุกที",
      "รสชาติอาหารใช้ได้",
      "บริการรวดเร็วทันใจราคาไม่แพงมาก",
      "โอเค",
      "เป็นวัด",
      "แต่มีตลาดนัดสินค้าทุกประเภท",
      "ของกิน",
      "เสื้อผ้า"
    ],
    "reviews": [
      {
        "text": "เป็นร้านอาหารตั้งอยู่ในทำเลที่ดีใกล้อู่ซ่อมเบนซ์ถนนสรงประภาเวลามาเข็ครถทีไรก็แวะมาทานทุกที รสชาติอาหารใช้ได้ บริการรวดเร็วทันใจราคาไม่แพงมาก",
        "rating": 5,
        "date": "2024-05-03T14:51:15.584Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 4,
        "date": "2022-12-26T09:09:52.198Z",
        "language": "en"
      },
      {
        "text": "โอเค",
        "rating": 4,
        "date": "2022-10-27T07:01:55.306Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2022-07-10T19:02:32.971Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 4,
        "date": "2021-02-10T06:07:12.234Z",
        "language": "en"
      },
      {
        "text": "เป็นวัด แต่มีตลาดนัดสินค้าทุกประเภท ของกิน เสื้อผ้า แว่นตาเครื่องประดับ",
        "rating": 5,
        "date": "2018-01-05T05:03:24.844Z",
        "language": "th"
      }
    ],
    "area": "City Center"
  },
  {
    "id": "place-14",
    "name": "The Imperial Hotel and Convention Centre Phitsanulok",
    "category": "hotel",
    "subcategory": "โรงแรม",
    "lat": 16.8243323,
    "lng": 100.287661,
    "rating": 4,
    "reviewCount": 1542,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": true,
    "hasSocialMedia": true,
    "priceLevel": 2,
    "photos": 2382,
    "topReviewKeywords": [
      "der",
      "war",
      "das",
      "hotel",
      "die",
      "mit",
      "abstand",
      "bei"
    ],
    "reviews": [
      {
        "text": "",
        "rating": 5,
        "date": "2026-02-28T10:33:17.750Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2026-02-27T10:16:52.972Z",
        "language": "en"
      },
      {
        "text": "Dieses Hotel war mit Abstand das schlechteste bei der Rundreise! Das Hotel ist schon ziemlich alt und die Zimmer total abgewohnt , das Badezimmer war wirklich furchtbar , der Lack in der Badewanne, die auch gleichzeitig Dusche ist , war total abgebröckelt, alles etwas modrig und schimmelig, die Geckos laufen im Zimmer herum etc… der Pool war grauenhaft , hatte eine grünlich gelbe Farbe ! Keine Ahnung ob es jemals gereinigt wird … also wirklich nichts empfehlenswertes hier ! Das einzige was noch erträglich war, war der Cocktail an der Bar.",
        "rating": 2,
        "date": "2026-02-26T12:27:22.515Z",
        "language": "en"
      },
      {
        "text": "Hermoso Hotel",
        "rating": 5,
        "date": "2026-02-25T13:49:36.317Z",
        "language": "en"
      },
      {
        "text": "Mit Abstand das das müsste Hotel auf der Rundreise in Thailand (sehr in die Jahre gekommen). Auch im Vergleich Frühstücksangebot schlechter als bei anderen",
        "rating": 2,
        "date": "2026-02-24T23:51:43.274Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 4,
        "date": "2026-02-22T04:29:44.069Z",
        "language": "en"
      },
      {
        "text": "ดี",
        "rating": 5,
        "date": "2026-02-16T02:44:28.739Z",
        "language": "th"
      },
      {
        "text": "มีโอกาสได้เข้าไปใช้บริการบ่อย ในเรื่องการอบรมสัมมนา ก็โอเคครับ ในทุกๆด้าน",
        "rating": 5,
        "date": "2026-02-14T13:15:35.774Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2026-02-14T05:18:25.849Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 4,
        "date": "2026-02-11T08:14:39.021Z",
        "language": "en"
      }
    ],
    "area": "Nan River"
  },
  {
    "id": "place-15",
    "name": "ร้านพุงกาง ลาบขม ต้มแซบ",
    "category": "restaurant",
    "subcategory": "ร้านอาหาร",
    "lat": 17.1132885,
    "lng": 100.8608246,
    "rating": 4.3,
    "reviewCount": 4,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": false,
    "hasSocialMedia": false,
    "priceLevel": 2,
    "photos": 0,
    "topReviewKeywords": [
      "รสชาติไทบ้านสูตรสกลนครถึงเครื่องครับ",
      "เมนูไม่เยอะแต่อร่อยครับ",
      "พอใช้ได้นะ"
    ],
    "reviews": [
      {
        "text": "รสชาติไทบ้านสูตรสกลนครถึงเครื่องครับ\nเมนูไม่เยอะแต่อร่อยครับ",
        "rating": 4,
        "date": "2025-04-04T13:54:36.522Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2025-02-26T13:43:45.134Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 4,
        "date": "2023-08-24T23:23:14.649Z",
        "language": "en"
      },
      {
        "text": "พอใช้ได้นะ",
        "rating": 4,
        "date": "2023-08-11T07:28:35.311Z",
        "language": "th"
      }
    ],
    "area": "City Center"
  },
  {
    "id": "place-16",
    "name": "ร้านอาหาร The Pool Cafe Bar",
    "category": "cafe",
    "subcategory": "ร้านอาหาร",
    "lat": 17.1111105,
    "lng": 100.8383433,
    "rating": 4.4,
    "reviewCount": 18,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": false,
    "hasSocialMedia": false,
    "priceLevel": 2,
    "photos": 48,
    "topReviewKeywords": [
      "food",
      "staff",
      "lovley",
      "owner",
      "are",
      "great",
      "ร้านอาหารบรรยากาศดี",
      "อาหารอร่อยบริการดี"
    ],
    "reviews": [
      {
        "text": "",
        "rating": 5,
        "date": "2025-09-18T17:51:47.885Z",
        "language": "en"
      },
      {
        "text": "ร้านอาหารบรรยากาศดี อาหารอร่อยบริการดี",
        "rating": 5,
        "date": "2025-05-27T13:30:22.311Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 4,
        "date": "2025-04-07T00:41:46.324Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2025-02-05T10:25:13.657Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 4,
        "date": "2024-12-03T02:03:24.366Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2024-11-10T01:39:46.527Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2024-11-09T05:46:32.894Z",
        "language": "en"
      },
      {
        "text": "Very enjoyable good food pleasant staff lovley owner a lovley setting\nOn arriving today 16.5.24 i found the place closed disappointed but hope the owner and the staff are ok unfortunately a sighn of the times so many places disapearing",
        "rating": 5,
        "date": "2024-05-16T12:04:23.360Z",
        "language": "en"
      },
      {
        "text": "สั่งอาหารไปนานมาก รอราวครึ่งชั่วโมง แต่ลูกค้าที่มาทีหลัง ได้รับอาหารก่อน หากไม่มีอาหารที่สั่ง ก็แค่มาแจ้ง แต่นี่เราต้องตามอาหารเอง ช่วยทำตามคิวด้วยค่ะ",
        "rating": 1,
        "date": "2024-04-10T13:20:50.291Z",
        "language": "th"
      },
      {
        "text": "Great food. Great atmosphere. Children can swim. Prices are cheap. Whats not to like.",
        "rating": 5,
        "date": "2023-12-10T03:26:54.541Z",
        "language": "en"
      }
    ],
    "area": "Train Station"
  },
  {
    "id": "place-17",
    "name": "ร้าน ภ สำเภา",
    "category": "restaurant",
    "subcategory": "ร้านอาหาร",
    "lat": 17.1100583,
    "lng": 100.8464797,
    "rating": 3.5,
    "reviewCount": 2,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": false,
    "hasSocialMedia": false,
    "priceLevel": 2,
    "photos": 1,
    "topReviewKeywords": [
      "เปลี่ยนเป็น",
      "ครัวท่านขุน",
      "แล้วครับ",
      "บรรยากาศดี",
      "อาหารอร่อย",
      "ราคามิตรภาพชวนให้กลับไปอีก",
      "และสำคัญที่สุด",
      "ลูกสาวสวยมากๆ"
    ],
    "reviews": [
      {
        "text": "เปลี่ยนเป็น ครัวท่านขุน แล้วครับ",
        "rating": 3,
        "date": "2022-07-01T06:37:17.482Z",
        "language": "th"
      },
      {
        "text": "บรรยากาศดี อาหารอร่อย ราคามิตรภาพชวนให้กลับไปอีก และสำคัญที่สุด ลูกสาวสวยมากๆ จั๊กจั่น AF 11",
        "rating": 4,
        "date": "2017-02-05T21:35:59.823Z",
        "language": "th"
      }
    ],
    "area": "City Center"
  },
  {
    "id": "place-18",
    "name": "โรงแรม โยเดีย เฮอริเทจ - Yodia Heritage Boutique Hotel",
    "category": "hotel",
    "subcategory": "โรงแรม",
    "lat": 16.8261052,
    "lng": 100.2634045,
    "rating": 4.5,
    "reviewCount": 283,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": true,
    "hasSocialMedia": true,
    "priceLevel": 2,
    "photos": 614,
    "topReviewKeywords": [
      "service",
      "room",
      "breakfast",
      "from",
      "place",
      "this",
      "favourite",
      "staff"
    ],
    "reviews": [
      {
        "text": "",
        "rating": 3,
        "date": "2026-02-22T10:17:01.996Z",
        "language": "en"
      },
      {
        "text": "I have stayed at a few places in phitsanuluk . This is my favourite. The staff really are amazing. Check in was seamless with smiles and we felt welcomed. The room is lovely with a nice balcony. My wife wanted to change room during the night and the staff were lovely and it was no problem. Great location. Breakfast is a set menu but they allow you to eat a lot of options. The two ladies serving the breakfast were kind and again make you feel welcome. I will stay here again.",
        "rating": 5,
        "date": "2026-02-05T02:11:06.228Z",
        "language": "en"
      },
      {
        "text": "man kann vor allem ruhigen und angenehmen Schlaf genießen da die Betten sehr ok sind,\n\nder Service ist erstklassig und Frühstück ist sowohl als Buffet oder á la Carte schön.\n\nDer Pool zu kalt zum Genießen.\n\ninsgesamt sehr relaxed 👍🏻❤️🇹🇭",
        "rating": 5,
        "date": "2026-02-03T02:18:44.159Z",
        "language": "en"
      },
      {
        "text": "ล่าสุดเพิ่งไปพักมา วันที่ 22/01/26 ประทับใจมาก ทุกอย่างทั้งห้องพัก น้องพนักงานทุกคน โดยเฉพาะ \"ข้าวกล่องอาหารเช้า\" 🤤 เพราะไม่คาดว่าจะมีบริการตัวนี้ สำหรับแขกที่ไม่สามารถทานอาหารเช้าของโรงแรมได้ อร่อย และ luxury มากๆ",
        "rating": 5,
        "date": "2026-01-30T11:06:49.578Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2026-01-24T01:19:58.143Z",
        "language": "en"
      },
      {
        "text": "On the way home from driving trip from Chiangrai back to Pathumthani.  We choose to return to our favourite place in Phitsanulok for stop over.  This place never make us disappointing.  ||Since the swift and fast service during reservation, and warm welcome from the Reception Team.  And the F&B Service at the breakfast room.  They still keep the service as compare to 5 stars hotel.",
        "rating": 3,
        "date": "2026-01-13T23:59:59.999Z",
        "language": "en"
      },
      {
        "text": "Endroit bien place proche de la rivière et de Temples...assez à l'écart pour éviter les bruits,du moins les chambres sur l'arrière...grandes chambres, avec tout le nécessaire,propre,et balcon...|Piscine si envie !! Petit déjeuner buffet...",
        "rating": 3,
        "date": "2026-01-12T23:59:59.999Z",
        "language": "en"
      },
      {
        "text": "ในห้องที่ผมพัก ฝุ่นเยอะมากครับ ภรรยาผมจามตลอด ไม่แน่ใจในระบบแอร์ เพราะะป็นระบบเก่า",
        "rating": 4,
        "date": "2026-01-04T02:31:37.059Z",
        "language": "th"
      },
      {
        "text": "เข้าพักคืนเคาท์ดาวน์ ห้องพักสวยสะอาดมาก ของใช้ภายในห้องครบครันมีเวลคัวดริ้งค์เวลคัมฟรุตให้ พนักงานดูแลเอาใจใส่ดีมาก อยู่ใกล้วัดพระศรีมากจนปั่นจักรยานของโรงแรมไปไหว้พระทั้งเย็นและเช้าปีใหม่เลย อาหารเช้าคุณภาพดีครบห้าหมู่",
        "rating": 5,
        "date": "2026-01-01T13:31:52.922Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2025-12-29T09:46:34.525Z",
        "language": "en"
      }
    ],
    "area": "City Center"
  },
  {
    "id": "place-19",
    "name": "ส้มตำเจ๊เขียวหนองทอง",
    "category": "restaurant",
    "subcategory": "ร้านอาหาร",
    "lat": 17.1020238,
    "lng": 100.8194827,
    "rating": 4.6,
    "reviewCount": 24,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": false,
    "hasSocialMedia": false,
    "priceLevel": 2,
    "photos": 34,
    "topReviewKeywords": [
      "สะอาด",
      "300",
      "อาหารอร่อยมากกกก",
      "ราคาถูก",
      "รสชาติดี",
      "เเนะนำๆๆ",
      "ถูกและอร่อยมีอยู่จริง",
      "บรรยากาศดี"
    ],
    "reviews": [
      {
        "text": "อาหารอร่อยมากกกก ราคาถูก สะอาด รสชาติดี  เเนะนำๆๆ",
        "rating": 5,
        "date": "2026-01-04T06:01:27.918Z",
        "language": "th"
      },
      {
        "text": "ถูกและอร่อยมีอยู่จริง",
        "rating": 5,
        "date": "2026-01-04T05:59:24.383Z",
        "language": "th"
      },
      {
        "text": "บรรยากาศดี  มีที่จอดรถ  ส้มตำรสเด็ด  ของทอดสด  สะอาด",
        "rating": 5,
        "date": "2025-07-11T04:12:45.649Z",
        "language": "th"
      },
      {
        "text": "ส้มตำอร่อยมาก ไม่เเพง ราคาคือปกติ เเต่รสชาติจัดเต็มมากขอบอก มากัน 3-5 คน จ่าย 300 คืออิ่ม",
        "rating": 5,
        "date": "2025-07-11T04:02:33.777Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 4,
        "date": "2025-02-08T06:18:47.903Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 4,
        "date": "2024-12-02T08:38:17.610Z",
        "language": "en"
      },
      {
        "text": "แหล่งกินส้มตำที่อร่อยในนครไทยเลยคะ",
        "rating": 5,
        "date": "2024-01-30T02:39:39.588Z",
        "language": "th"
      },
      {
        "text": "ส้มตำและจองทอดอร่อยทุกอย่าง ราคากันเองมาก",
        "rating": 5,
        "date": "2024-01-27T09:55:38.503Z",
        "language": "th"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2024-01-11T05:54:43.252Z",
        "language": "en"
      },
      {
        "text": "",
        "rating": 5,
        "date": "2024-01-02T08:23:43.147Z",
        "language": "en"
      }
    ],
    "area": "Nan River"
  },
  {
    "id": "place-20",
    "name": "HUB Phitsanulok Co-working",
    "category": "coworking",
    "subcategory": "co-working space",
    "lat": 16.8258,
    "lng": 100.26,
    "rating": 4.3,
    "reviewCount": 156,
    "openTime": "08:00",
    "closeTime": "22:00",
    "hasWebsite": true,
    "hasSocialMedia": true,
    "priceLevel": 2,
    "photos": 89,
    "topReviewKeywords": [
      "wifi แรง",
      "ห้องประชุม",
      "meeting room",
      "นั่งทำงานดี",
      "ปลั๊กเยอะ"
    ],
    "reviews": [
      {
        "text": "co-working ที่ดีที่สุดในพิษณุโลก! wifi แรง ปลั๊กไฟเยอะ มีห้องประชุมให้ใช้ กาแฟฟรี",
        "rating": 5,
        "date": "2025-12-09",
        "language": "th"
      },
      {
        "text": "Best coworking space in Phitsanulok. Fast wifi, lots of power outlets, free coffee.",
        "rating": 5,
        "date": "2025-11-25",
        "language": "en"
      },
      {
        "text": "ดีมากสำหรับทำงานระยะไกล แต่ช่วงบ่ายคนเยอะ เสียงดังบ้าง",
        "rating": 4,
        "date": "2025-10-15",
        "language": "th"
      }
    ],
    "area": "City Center"
  },
  {
    "id": "place-21",
    "name": "JEAB Space",
    "category": "coworking",
    "subcategory": "co-working space",
    "lat": 16.7438,
    "lng": 100.1935,
    "rating": 4.5,
    "reviewCount": 198,
    "openTime": "07:00",
    "closeTime": "23:00",
    "hasWebsite": true,
    "hasSocialMedia": true,
    "priceLevel": 1,
    "photos": 123,
    "topReviewKeywords": [
      "ราคานักศึกษา",
      "เปิดดึก",
      "wifi ดี",
      "student friendly",
      "นั่งสบาย"
    ],
    "reviews": [
      {
        "text": "co-working ราคาถูก เปิดถึง 5 ทุ่ม! wifi ดี มีโซนเงียบ เหมาะนักศึกษามาก",
        "rating": 5,
        "date": "2025-12-06",
        "language": "th"
      },
      {
        "text": "Great student-friendly coworking near NU. Open late, cheap prices.",
        "rating": 5,
        "date": "2025-11-18",
        "language": "en"
      }
    ],
    "area": "Naresuan University"
  },
  {
    "id": "place-22",
    "name": "The Desk PLK",
    "category": "coworking",
    "subcategory": "co-working space",
    "lat": 16.822,
    "lng": 100.265,
    "rating": 4,
    "reviewCount": 87,
    "openTime": "09:00",
    "closeTime": "20:00",
    "hasWebsite": false,
    "hasSocialMedia": true,
    "priceLevel": 2,
    "photos": 56,
    "topReviewKeywords": [
      "วิวน้ำ",
      "สงบ",
      "quiet zone",
      "ริมน้ำ",
      "กาแฟดี"
    ],
    "reviews": [
      {
        "text": "co-working ริมแม่น้ำน่าน วิวสวย บรรยากาศสงบ เหมาะทำงานที่ต้องการสมาธิ",
        "rating": 4,
        "date": "2025-11-30",
        "language": "th"
      },
      {
        "text": "Riverside coworking with a great view. Quiet atmosphere.",
        "rating": 4,
        "date": "2025-10-22",
        "language": "en"
      }
    ],
    "area": "Nan River"
  },
  {
    "id": "place-23",
    "name": "WorkCafe Connect",
    "category": "coworking",
    "subcategory": "co-working cafe",
    "lat": 16.8172,
    "lng": 100.2718,
    "rating": 4.2,
    "reviewCount": 134,
    "openTime": "07:30",
    "closeTime": "21:00",
    "hasWebsite": true,
    "hasSocialMedia": true,
    "priceLevel": 2,
    "photos": 78,
    "topReviewKeywords": [
      "cafe+coworking",
      "กาแฟอร่อย",
      "นั่งทำงาน",
      "power outlets",
      "ใกล้สถานี"
    ],
    "reviews": [
      {
        "text": "ร้านกาแฟ + co-working ใกล้สถานีรถไฟ กาแฟอร่อย wifi แรง ปลั๊กเยอะ",
        "rating": 4,
        "date": "2025-12-04",
        "language": "th"
      },
      {
        "text": "Cafe-coworking hybrid near the train station. Good coffee and reliable wifi.",
        "rating": 4,
        "date": "2025-11-12",
        "language": "en"
      }
    ],
    "area": "Train Station"
  },
  {
    "id": "place-24",
    "name": "Digital Nomad PLK",
    "category": "coworking",
    "subcategory": "co-working space",
    "lat": 16.8245,
    "lng": 100.2588,
    "rating": 3.4,
    "reviewCount": 56,
    "openTime": "09:00",
    "closeTime": "19:00",
    "hasWebsite": false,
    "hasSocialMedia": true,
    "priceLevel": 1,
    "photos": 23,
    "topReviewKeywords": [
      "wifi ช้า",
      "ถูก",
      "เก้าอี้แข็ง",
      "basic",
      "พอใช้ได้"
    ],
    "reviews": [
      {
        "text": "ราคาถูกมาก แต่ wifi ช้ามาก ไม่เหมาะทำงานที่ต้อง video call เก้าอี้แข็ง",
        "rating": 3,
        "date": "2025-11-22",
        "language": "th"
      },
      {
        "text": "Very basic coworking. Cheap but wifi is unreliable.",
        "rating": 2,
        "date": "2025-10-15",
        "language": "en"
      }
    ],
    "area": "City Center"
  },
  {
    "id": "place-25",
    "name": "Phitsanulok Skin Clinic",
    "category": "clinic",
    "subcategory": "aesthetic clinic",
    "lat": 16.826,
    "lng": 100.2595,
    "rating": 4.4,
    "reviewCount": 234,
    "openTime": "10:00",
    "closeTime": "20:00",
    "hasWebsite": true,
    "hasSocialMedia": true,
    "priceLevel": 3,
    "photos": 98,
    "topReviewKeywords": [
      "หมอเก่ง",
      "ผิวสวย",
      "laser",
      "botox",
      "ราคาแพง"
    ],
    "reviews": [
      {
        "text": "หมอเก่ง ทำเลเซอร์หน้าใส ผิวดีขึ้นเห็นชัด แต่ราคาค่อนข้างแพง",
        "rating": 5,
        "date": "2025-12-07",
        "language": "th"
      },
      {
        "text": "Professional aesthetic clinic. Results are visible after just one session.",
        "rating": 5,
        "date": "2025-11-20",
        "language": "en"
      }
    ],
    "area": "City Center"
  },
  {
    "id": "place-26",
    "name": "Dr. Smile Dental Clinic",
    "category": "clinic",
    "subcategory": "dental clinic",
    "lat": 16.827,
    "lng": 100.2585,
    "rating": 4.6,
    "reviewCount": 267,
    "openTime": "09:00",
    "closeTime": "18:00",
    "hasWebsite": true,
    "hasSocialMedia": true,
    "priceLevel": 2,
    "photos": 45,
    "topReviewKeywords": [
      "หมอฟัน",
      "ไม่เจ็บ",
      "painless",
      "สะอาด",
      "ราคาเป็นธรรม"
    ],
    "reviews": [
      {
        "text": "หมอฟันเก่งมาก ทำฟันไม่เจ็บเลย อุปกรณ์ทันสมัย สะอาดมาก",
        "rating": 5,
        "date": "2025-12-05",
        "language": "th"
      },
      {
        "text": "Best dentist in Phitsanulok. Modern equipment. Painless treatment.",
        "rating": 5,
        "date": "2025-11-22",
        "language": "en"
      }
    ],
    "area": "City Center"
  },
  {
    "id": "place-27",
    "name": "The Face Clinic Phitsanulok",
    "category": "clinic",
    "subcategory": "aesthetic clinic",
    "lat": 16.8248,
    "lng": 100.262,
    "rating": 3.2,
    "reviewCount": 89,
    "openTime": "10:00",
    "closeTime": "19:00",
    "hasWebsite": false,
    "hasSocialMedia": true,
    "priceLevel": 2,
    "photos": 23,
    "topReviewKeywords": [
      "ผิดหวัง",
      "hard sell",
      "กดดัน",
      "ผลลัพธ์ไม่ดี",
      "ไม่แนะนำ"
    ],
    "reviews": [
      {
        "text": "ผิดหวังมาก พนักงาน hard sell มาก กดดันให้ซื้อคอร์ส ผลลัพธ์ไม่เห็นผล",
        "rating": 2,
        "date": "2025-12-01",
        "language": "th"
      },
      {
        "text": "Very pushy sales. Results were mediocre.",
        "rating": 2,
        "date": "2025-11-15",
        "language": "en"
      }
    ],
    "area": "City Center"
  },
  {
    "id": "place-28",
    "name": "Nara Beauty Clinic",
    "category": "clinic",
    "subcategory": "aesthetic clinic",
    "lat": 16.8285,
    "lng": 100.255,
    "rating": 4.1,
    "reviewCount": 178,
    "openTime": "10:00",
    "closeTime": "19:00",
    "hasWebsite": false,
    "hasSocialMedia": true,
    "priceLevel": 2,
    "photos": 67,
    "topReviewKeywords": [
      "ฟิลเลอร์",
      "filler",
      "ราคาดี",
      "ปรึกษาฟรี",
      "พนักงานดี"
    ],
    "reviews": [
      {
        "text": "ทำฟิลเลอร์ที่นี่ ราคาดี พนักงานบริการดี หมอให้คำปรึกษาฟรี",
        "rating": 4,
        "date": "2025-12-03",
        "language": "th"
      },
      {
        "text": "Good value for filler treatments. Free consultation.",
        "rating": 4,
        "date": "2025-11-10",
        "language": "en"
      }
    ],
    "area": "Topland Plaza"
  },
  {
    "id": "place-29",
    "name": "Slim & Shape Center",
    "category": "clinic",
    "subcategory": "aesthetic clinic",
    "lat": 16.8278,
    "lng": 100.2545,
    "rating": 3.5,
    "reviewCount": 112,
    "openTime": "10:00",
    "closeTime": "20:00",
    "hasWebsite": false,
    "hasSocialMedia": true,
    "priceLevel": 3,
    "photos": 28,
    "topReviewKeywords": [
      "ลดน้ำหนัก",
      "slimming",
      "แพงมาก",
      "ผลลัพธ์ช้า",
      "coolsculpting"
    ],
    "reviews": [
      {
        "text": "ทำ coolsculpting แพงมาก ผลลัพธ์ต้องรอ 2-3 เดือน",
        "rating": 3,
        "date": "2025-11-28",
        "language": "th"
      },
      {
        "text": "Expensive slimming treatments. Results take months to show.",
        "rating": 3,
        "date": "2025-10-20",
        "language": "en"
      }
    ],
    "area": "Topland Plaza"
  }
] as any;

export default places;
