import Product from "../models/Product.js";
import User from "../models/User.js";
import Settings from "../models/Settings.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const heroSlides = [
  {
    image:
      "https://endesi.tsoftstatic.com/Data/BlockUploadData/slider/img1/883/whatsapp-image-2025-10-24-at-094606-en-5.jpg?1777801355",
  },
  {
    image:
      "https://endesi.tsoftstatic.com/Data/BlockUploadData/slider/img1/883/revbanner-1-en-6.jpg?1777801355",
  },
  {
    image:
      "https://endesi.tsoftstatic.com/Data/BlockUploadData/slider/img1/883/whatsapp-image-2025-10-24-at-094605-en-4.jpg?1777801355",
  },
  {
    image:
      "https://endesi.tsoftstatic.com/Data/BlockUploadData/slider/img1/883/gif-2-en-en-1.gif?1778507440",
  },
  {
    image:
      "https://endesi.tsoftstatic.com/Data/BlockUploadData/slider/img1/883/google-home-banner-en-en-7.png?1778507440",
  },
  {
    image:
      "https://endesi.tsoftstatic.com/Data/BlockUploadData/slider/img1/883/gif-1-en-3.gif?1778507440",
  },
  {
    image:
      "https://endesi.tsoftstatic.com/Data/BlockUploadData/slider/img1/883/rxbanner-en-8.png?1778507440",
  },
];

const adminUser = {
  name: "Admin User",
  email: "admin@desilocks.com",
  password: "Desi@456123",
  role: "admin",
  phone: "+971501234567",
};

const products = [
  {
    slug: "desi-utopic-rx-face-recognition",
    name: {
      en: "DESi Utopic RX — Face Recognition Smart Lock",
      ar: "قفل ديسي يوتوبيك RX الذكي بالتعرّف على الوجه",
    },
    badge: "NEW",
    priceAED: 353,
    priceAED: 1412,
    image:
      "https://endesi.tsoftstatic.com/httpsendesicomtrdesi-utopic-rx-smart-lock-europrofile-face-recognition-smart-locks-320-88-K.png",
    gallery: [
      "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-smart-locks-169-67-O.png",
      "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-smart-locks-148-67-O.png",
      "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-smart-locks-154-67-O.png",
      "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-smart-locks-224-67-O.png",
      "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-smart-locks-149-67-O.png",
    ],
    bullets: {
      en: [
        "iOS & Android compatible",
        "Wireless Face Reader + Touch Keypad",
        "Mounts on your existing key",
        "Universal — fits most doors",
      ],
      ar: [
        "متوافق مع iOS وأندرويد",
        "قارئ وجه لاسلكي + لوحة لمس",
        "يثبّت على مفتاحك الحالي",
        "تصميم شامل يناسب معظم الأبواب",
      ],
    },
    description: {
      en: "AI-powered face recognition smart lock with anti-spoofing technology.",
      ar: "قفل ذكي مع تعرّف وجه مدعوم بالذكاء الاصطناعي.",
    },
    category: "smart-locks",
    isNew: true,
    stock: 50,
    ratings: 5,
    reviewCount: 248,
    specifications: {
      compatibility: "iOS 13+, Android 8+",
      cylinderType: "Euro Profile",
      battery: "Lithium-ion, Type-C charging",
      batteryLife: "4–6 months",
      connectivity: "Bluetooth 5.0, ISM 434 MHz",
      encryption: "AES-256 GCM",
      voiceControl: "Siri, Google Home, Alexa (with Bridge)",
      operatingTemperature: "-20°C to 55°C",
    },
    inTheBox: [
      "Utopic RX Smart Lock",
      "Type-C USB Cable",
      "2 × Allen Wrenches",
      "Door Surface Adhesive",
      "Plastic Adapter for Key",
      "Plastic Adapter for Thumbturn",
    ],
  },
  {
    slug: "desi-utopic-rx-wifi",
    name: {
      en: "DESi Utopic RX — WiFi Bridge Edition",
      ar: "ديسي يوتوبيك RX — نسخة جسر WiFi",
    },
    badge: "NEW",
    priceAED: 253,
    priceAED: 1012,
    image:
      "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-wifi-door-smart-lock-smart-locks-196-71-K.png",
    gallery: [],
    bullets: {
      en: [
        "iOS & Android compatible",
        "WiFi Bridge included",
        "Google Home & Alexa",
        "Universal mounting",
      ],
      ar: [
        "متوافق مع iOS وأندرويد",
        "جسر WiFi مرفق",
        "متوافق مع Google Home و Alexa",
        "تركيب شامل",
      ],
    },
    description: {
      en: "WiFi-enabled smart lock with remote access capabilities.",
      ar: "قفل ذكي مع إمكانية الوصول عن بُعد عبر WiFi.",
    },
    category: "smart-locks",
    isNew: true,
    stock: 35,
    ratings: 5,
    reviewCount: 180,
    specifications: {
      compatibility: "iOS 13+, Android 8+",
      cylinderType: "Euro Profile",
      battery: "Lithium-ion, Type-C charging",
      batteryLife: "4–6 months",
      connectivity: "WiFi 2.4GHz, Bluetooth 5.0",
      encryption: "AES-256 GCM",
      voiceControl: "Siri, Google Home, Alexa",
      operatingTemperature: "-20°C to 55°C",
    },
    inTheBox: [
      "Utopic RX Smart Lock",
      "WiFi Bridge",
      "Type-C USB Cable",
      "2 × Allen Wrenches",
    ],
  },
  {
    slug: "desi-utopic-rx-fingerprint-wifi",
    name: {
      en: "DESi Utopic RX — Fingerprint + WiFi Set",
      ar: "ديسي يوتوبيك RX — بصمة + WiFi",
    },
    badge: "NEW",
    priceAED: 413,
    priceAED: 1652,
    image:
      "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-174929338569-smart-locks-178-69-K.png",
    gallery: [],
    bullets: {
      en: [
        "Wireless Fingerprint + Touch Keypad",
        "WiFi Bridge",
        "Google Home & Alexa",
        "Mounts on existing key",
      ],
      ar: [
        "بصمة لاسلكية + لوحة لمس",
        "جسر WiFi",
        "متوافق مع Google Home و Alexa",
        "يثبّت على المفتاح الحالي",
      ],
    },
    description: {
      en: "Complete smart lock set with fingerprint, WiFi bridge, and full smart home integration.",
      ar: "مجموعة قفل ذكي كاملة مع بصمة وجسر WiFi والتكامل الكامل مع المنزل الذكي.",
    },
    category: "smart-locks",
    isNew: true,
    stock: 25,
    ratings: 5,
    reviewCount: 95,
    specifications: {
      compatibility: "iOS 13+, Android 8+",
      cylinderType: "Euro Profile",
      battery: "Lithium-ion, Type-C charging",
      batteryLife: "4–6 months",
      connectivity: "WiFi 2.4GHz, Bluetooth 5.0",
      encryption: "AES-256 GCM",
      voiceControl: "Siri, Google Home, Alexa",
      operatingTemperature: "-20°C to 55°C",
    },
    inTheBox: [
      "Utopic RX Smart Lock",
      "Fingerprint Reader",
      "WiFi Bridge",
      "Touch Keypad",
      "Type-C USB Cable",
    ],
  },
  {
    slug: "desi-utopic-rx-base",
    name: {
      en: "DESi Utopic RX — Base Smart Lock",
      ar: "ديسي يوتوبيك RX — القفل الأساسي",
    },
    priceAED: 190,
    priceAED: 760,
    image:
      "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-smart-locks-169-67-K.png",
    gallery: [],
    bullets: {
      en: [
        "iOS & Android compatible",
        "Mounts on existing key",
        "Universal door design",
        "6-month battery (eco mode)",
      ],
      ar: [
        "متوافق مع iOS وأندرويد",
        "يثبّت على المفتاح الحالي",
        "تصميم باب شامل",
        "بطارية تدوم 6 أشهر",
      ],
    },
    description: {
      en: "Entry-level smart lock perfect for getting started with smart home security.",
      ar: "قفل ذكي مثالي لبدء رحلتك مع أمان المنزل الذكي.",
    },
    category: "smart-locks",
    isNew: false,
    stock: 100,
    ratings: 4.8,
    reviewCount: 320,
    specifications: {
      compatibility: "iOS 13+, Android 8+",
      cylinderType: "Euro Profile",
      battery: "Lithium-ion, Type-C charging",
      batteryLife: "6 months (eco mode)",
      connectivity: "Bluetooth 5.0, ISM 434 MHz",
      encryption: "AES-256 GCM",
      voiceControl: "Siri, Google Home, Alexa (with Bridge)",
      operatingTemperature: "-20°C to 55°C",
    },
    inTheBox: [
      "Utopic RX Smart Lock",
      "Type-C USB Cable",
      "2 × Allen Wrenches",
      "Door Surface Adhesive",
    ],
  },
  {
    slug: "desi-quic-v002",
    name: {
      en: "DESi QUiC V002 Door Cam + Access Control",
      ar: "كاميرا الباب ديسي QUiC V002 + التحكم بالدخول",
    },
    badge: "NEW",
    priceAED: 179,
    priceAED: 716,
    image:
      "https://endesi.tsoftstatic.com/desi-quic-v002-face-palm-access-control-smart-lock-compatible-smart-locks-399-94-K.png",
    gallery: [],
    bullets: {
      en: [
        "Facial Recognition + Palm Vein",
        "Fingerprint, Keypad, Card",
        "Live Video Call",
        "Compatible with Utopic series",
      ],
      ar: [
        "تعرّف وجه + وريد الكف",
        "بصمة، لوحة، بطاقة",
        "مكالمة فيديو مباشرة",
        "متوافق مع سلسلة يوتوبيك",
      ],
    },
    description: {
      en: "Advanced door camera with multiple biometric access control methods.",
      ar: "كاميرا باب متقدمة مع طرق تحكم بيومترية متعددة.",
    },
    category: "accessories",
    isNew: true,
    stock: 20,
    ratings: 5,
    reviewCount: 65,
    specifications: {
      compatibility: "Utopic RX/RXe/R series",
      cylinderType: "Compatible with most locks",
      battery: "AC powered",
      batteryLife: "N/A",
      connectivity: "WiFi 2.4/5GHz, Bluetooth",
      encryption: "AES-256 GCM",
      voiceControl: "Google Home, Alexa",
      operatingTemperature: "-10°C to 50°C",
    },
    inTheBox: [
      "QUiC V002 Camera",
      "Power Adapter",
      "Mounting Bracket",
      "Installation Guide",
    ],
  },
];

const seedDatabase = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/desi-uae";

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");
    // Clear existing products and users
    await Product.deleteMany({});
    await User.deleteMany({});
    await Settings.deleteMany({});
    console.log("🗑️  Cleared existing products and users");

    // Initialize settings with WhatsApp number and banner URLs
    await Settings.create({
      whatsappNumber: "+971526187729",
      bannerUrls: heroSlides.map((slide) => slide.image),
    });
    console.log("✅ Initialized Settings (WhatsApp: +971526187729)");
    console.log("✅ Added Banner URLs to Settings");
    console.log("✅ Initialized Settings (WhatsApp: +971526187729)");

    // Clear existing products and users
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log("🗑️  Cleared existing products and users");

    // Insert admin user
    await User.create(adminUser);
    console.log("✅ Created Admin User (admin@desilocks.com / Desi@456123)");

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Inserted ${insertedProducts.length} products`);

    insertedProducts.forEach((product) => {
      console.log(`   - ${product.name.en}`);
    });

    await mongoose.connection.close();
    console.log("✅ Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
