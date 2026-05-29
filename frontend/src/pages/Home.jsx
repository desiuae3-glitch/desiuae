import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ScanFace, KeyRound, Battery, Zap, Smartphone, Users, ShieldCheck, Sparkles, Check, Clock, DoorOpen, Play, Star, Wrench, Globe as Globe2, Award } from "lucide-react";
import HeroBanner from "../components/HeroBanner";
import ProductCard from "../components/ProductCard";
import SEOHead from "../components/SEOHead";
import { useLang } from "../contexts/LangContext";
import { Button } from "../components/ui/button";
import { structuredData } from "../lib/seo";
import * as LucideIcons from "lucide-react";
import { apiUrl } from "../lib/api";

const iconMap = {
  Fingerprint: LucideIcons.Fingerprint,
  ScanFace: LucideIcons.ScanFace,
  KeyRound: LucideIcons.KeyRound,
  Wifi: LucideIcons.Wifi,
  Battery: LucideIcons.Battery,
  Volume2: LucideIcons.Volume2,
  Clock: LucideIcons.Clock,
  Smartphone: LucideIcons.Smartphone,
  Lock: LucideIcons.Lock,
  ShieldCheck: LucideIcons.ShieldCheck,
  Users: LucideIcons.Users,
  BellRing: LucideIcons.BellRing,
  Zap: LucideIcons.Zap,
  MoveRight: LucideIcons.MoveRight,
};

const TESTIMONIALS = [
  {
    name: "Ahmed Al Mansouri",
    city: { en: "Dubai Marina", ar: "دبي مارينا" },
    rating: 5,
    text: {
      en: "Installed in under 3 minutes! Works perfectly with my existing door handle. Face recognition is shockingly fast even at night.",
      ar: "تم التركيب في أقل من 3 دقائق! يعمل بشكل مثالي مع مقبض بابي الحالي. التعرّف على الوجه سريع جداً حتى ليلاً.",
    },
  },
  {
    name: "Fatima Khan",
    city: { en: "Abu Dhabi", ar: "أبوظبي" },
    rating: 5,
    text: {
      en: "We kept our original lock cylinder — just added the smart module. My kids forget keys daily. Now they just walk up. Best upgrade!",
      ar: "احتفظنا بقفلنا الأصلي — فقط أضفنا الوحدة الذكية. أطفالي ينسون المفاتيح يومياً. الآن يدخلون بسهولة. أفضل ترقية!",
    },
  },
  {
    name: "James O'Brien",
    city: { en: "Sharjah", ar: "الشارقة" },
    rating: 5,
    text: {
      en: "Airbnb host here — 3-minute install, kept my traditional handle. E-key sharing changed my workflow completely. No more lockboxes.",
      ar: "كمضيف Airbnb — تركيب 3 دقائق، احتفظت بمقبضي التقليدي. مشاركة المفاتيح الإلكترونية غيّرت عملي تماماً.",
    },
  },
  {
    name: "Maryam Saleh",
    city: { en: "Al Ain", ar: "العين" },
    rating: 5,
    text: {
      en: "No drilling needed. Slides right over my existing deadbolt. The 3M adhesive option saved my brand new fire door.",
      ar: "لا حاجة للحفر. ينزلق مباشرة على قفلي الحالي. الخيار اللاصق 3M أنقذ باب الحريق الجديد.",
    },
  },
];

const Home = () => {
  const { t } = useLang();
  const [products, setProducts] = useState([]);
  const testimonials = TESTIMONIALS;

  useEffect(() => {
    fetch(apiUrl("/api/products"))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const smartLocks = products
    .filter((p) => p.category === "smart-locks")
    .slice(0, 4);
  const accessories = products
    .filter(
      (p) => p.category === "accessories" || p.category === "alarm-security",
    )
    .slice(0, 4);

  const featureHighlights =
    smartLocks.length > 0 && smartLocks[0].featureHighlights
      ? smartLocks[0].featureHighlights
      : [];

  return (
    <>
      <SEOHead
        title="DESi Smart Locks UAE | Turn Your Door Smart in 3 Minutes"
        description="Transform any door in 3 minutes. DESi smart locks work with your existing handle and lock. No drilling, no locksmith. Made in Turkey. Face recognition, fingerprint, PIN access."
        keywords="smart locks UAE, 3 minute install, traditional door lock compatible, face recognition locks, Turkey smart locks, no drilling"
        type="website"
        structuredDataContent={structuredData.organization}
      />
      <main>
        <HeroBanner />

        {/* Value props strip - Reordered with Traditional Lock Compatible */}
        <section className="bg-white text-neutral-900 relative overflow-hidden">
          <div className="relative w-full mx-auto px-4 py-6 md:py-8 lg:py-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-4 lg:gap-6">
            {[
              {
                icon: Clock,
                t: { en: "3 Min Install", ar: "تركيب 3 دقائق" },
                s: { en: "No drilling, no locksmith", ar: "بدون حفر أو فنان" },
              },
              {
                icon: DoorOpen,
                t: { en: "Works With Your Lock", ar: "يعمل مع قفلك" },
                s: { en: "Traditional handles compatible", ar: "متوافق مع المقابض التقليدية" },
              },
              {
                icon: null,
                emoji: "🇹🇷",
                t: { en: "Made in Turkey", ar: "صناعة تركية" },
                s: { en: "Premium quality", ar: "جودة عالية" },
                isEmoji: true,
              },
              {
                icon: ShieldCheck,
                t: { en: "AES-256 Secure", ar: "أمان AES-256" },
                s: { en: "Bank-grade encryption", ar: "تشفير بنكي" },
              },
              {
                icon: ScanFace,
                t: { en: "Face Recognition", ar: "تعرّف الوجه" },
                s: { en: "Hands-free entry", ar: "دخول بدون لمس" },
              },
              {
                icon: LucideIcons.Fingerprint,
                t: { en: "Fingerprint", ar: "بصمة الإصبع" },
                s: { en: "Secure access", ar: "وصول آمن" },
              },
              {
                icon: Battery,
                t: { en: "6-Month Battery", ar: "بطارية 6 أشهر" },
                s: { en: "Type-C rechargeable", ar: "شحن Type-C" },
              },
              {
                icon: LucideIcons.ShieldCheck,
                t: { en: "2 Year Warranty", ar: "ضمان سنتين" },
                s: { en: "Full coverage", ar: "تغطية كاملة" },
              },
            ].map((v, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 md:gap-3 group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-red-50 to-white flex items-center justify-center flex-shrink-0 border-2 border-[#E60012]/30 transition-all group-hover:scale-110 group-hover:border-[#E60012] group-hover:shadow-lg duration-300">
                  {v.isEmoji ? (
                    <span className="text-lg md:text-xl">{v.emoji}</span>
                  ) : (
                    <v.icon className="w-4 h-4 md:w-5 md:h-5 text-[#E60012]" />
                  )}
                </div>
                <div className="text-center">
                  <p className="font-bold text-xs sm:text-[13px] tracking-wide leading-tight text-[#E60012]">
                    {t(v.t)}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-neutral-600 font-medium mt-0.5">
                    {t(v.s)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3-Step Installation Section */}
        <section id="install" className="bg-gradient-to-b from-neutral-50 to-white py-12 md:py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E60012]/10 border border-[#E60012]/20 mb-6">
                <Clock className="w-4 h-4 text-[#E60012]" />
                <span className="text-sm font-bold text-[#E60012] uppercase tracking-wider">
                  {t({ en: "3-Minute Installation", ar: "تركيب 3 دقائق" })}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                {t({ en: "Install in 3 Steps.", ar: "ركّب في 3 خطوات." })}
                <br />
                <span className="text-[#E60012]">{t({ en: "No Drilling Required", ar: "لا حفر مطلوب" })}</span>
              </h2>
              <p className="mt-6 text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                {t({
                  en: "Your existing door handle and lock stay in place. Simply slide over the DESi module and connect to the app.",
                  ar: "مقبض بابك وقفلك الحالي يبقى مكانه. ببساطة انزلق وحدة DESi واتصل بالتطبيق.",
                })}
              </p>
            </div>

            {/* 3 Steps */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 mb-12">
              {[
                {
                  num: "1",
                  title: { en: "Remove Thumbturn", ar: "أزل المقبض الداخلي" },
                  desc: { en: "Unscrew your existing interior thumbturn (30 seconds)", ar: "فكّ المقبض الداخلي الحالي (30 ثانية)" },
                  time: "30s",
                },
                {
                  num: "2",
                  title: { en: "Clip On Module", ar: "ركّب الوحدة" },
                  desc: { en: "Slide the DESi smart module over your lock (1.5 minutes)", ar: "انزلق وحدة DESi الذكية فوق قفلك (1.5 دقيقة)" },
                  time: "1.5m",
                },
                {
                  num: "3",
                  title: { en: "Set Up in App", ar: "الإعداد بالتطبيق" },
                  desc: { en: "Download app, add users, and unlock with face, fingerprint, or PIN (1 minute)", ar: "حمّل التطبيق، أضف المستخدمين، وافتح بالوجه أو البصمة أو PIN (1 دقيقة)" },
                  time: "1m",
                },
              ].map((step, i) => (
                <div key={i} className="relative">
                  <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-neutral-100 hover:border-[#E60012]/30 hover:shadow-xl transition-all duration-300 group">
                    {/* Step number */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#E60012] text-white flex items-center justify-center font-black text-2xl md:text-3xl">
                        {step.num}
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-600 text-xs font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        {step.time}
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black mb-3">
                      {t(step.title)}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {t(step.desc)}
                    </p>
                    {/* Arrow to next */}
                    {i < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 transform -translate-y-1/2 z-10">
                        <ArrowRight className="w-6 h-6 lg:w-8 lg:h-8 text-[#E60012]" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Video CTA */}
            <div className="text-center">
              <a
                href="https://www.youtube.com/shorts/YQHzRB7QaMQ"
                target="_blank"
                rel="noreferrer"
              >
                <Button className="h-14 px-8 bg-neutral-900 hover:bg-neutral-800 text-white font-bold uppercase tracking-wider text-base rounded-full shadow-xl transition-all hover:-translate-y-0.5">
                  <Play className="w-5 h-5 me-2" />
                  {t({ en: "Watch 3-Min Install Video", ar: "شاهد فيديو التركيب" })}
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Compatibility Section */}
        <section className="bg-neutral-950 text-white py-12 md:py-20 lg:py-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-6">
                  <DoorOpen className="w-4 h-4 text-[#E60012]" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    {t({ en: "Works With Your Existing Door", ar: "يعمل مع بابك الحالي" })}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
                  {t({ en: "No Need to Replace", ar: "لا حاجة لتبديل" })}
                  <br />
                  <span className="text-[#E60012]">{t({ en: "Your Door Hardware", ar: "عتاد بابك" })}</span>
                </h2>
                <p className="text-neutral-400 text-lg mb-8 max-w-xl">
                  {t({
                    en: "DESi smart modules slide over your existing mechanical lock. Keep your exterior handle, lock cylinder, and deadbolt — just add intelligence.",
                    ar: "وحدات DESi تنزلق فوق قفلك الميكانيكي الحالي. احتفظ بالمقبض الخارجي، اسطوانة القفل، والترس — فقط أضف الذكاء.",
                  })}
                </p>

                {/* Compatible items */}
                <div className="space-y-4 mb-8">
                  {[
                    { en: "Single-cylinder deadbolts", ar: "أقفال الموتولة أحادية الاسطوانة" },
                    { en: "Euro profile cylinders", ar: "اسطوانات ملف يورو" },
                    { en: "Lever handles (indoor)", ar: "مقابض الرافعة (داخلية)" },
                    { en: "Knob handles", ar: "مقابض القرص" },
                    { en: "Fire-rated doors (3M adhesive option)", ar: "أبواب مقاومة الحريق (خيار لاصق 3M)" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#E60012]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-[#E60012]" />
                      </div>
                      <span className="text-neutral-300 font-medium">{t(item)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact">
                    <Button className="h-12 px-6 bg-[#E60012] hover:bg-[#c4000f] text-white font-bold uppercase tracking-wider rounded-full">
                      {t({ en: "Check My Door Type", ar: "فحص نوع بابي" })}
                    </Button>
                  </Link>
                  <Link to="/faq">
                    <Button variant="outline" className="h-12 px-6 bg-transparent hover:bg-white/10 text-white border-white/30 font-bold uppercase tracking-wider rounded-full">
                      {t({ en: "See All FAQs", ar: "جميع الأسئلة الشائعة" })}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Visual */}
              <div className="relative">
                <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-3xl p-8 md:p-12">
                  {/* Traditional lock visual */}
                  <div className="flex items-center justify-center gap-8 lg:gap-12">
                    <div className="text-center">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-neutral-700 flex items-center justify-center mb-4 mx-auto">
                        <Lock className="w-12 h-12 md:w-16 md:h-16 text-neutral-400" />
                      </div>
                      <p className="text-sm font-bold text-neutral-400">
                        {t({ en: "Your Existing Lock", ar: "قفلك الحالي" })}
                      </p>
                    </div>
                    <div className="text-4xl md:text-5xl text-[#E60012] font-black">+</div>
                    <div className="text-center">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-[#E60012] flex items-center justify-center mb-4 mx-auto">
                        <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-white" />
                      </div>
                      <p className="text-sm font-bold text-white">
                        {t({ en: "DESi Module", ar: "وحدة DESi" })}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-neutral-700 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E60012]/20">
                      <Check className="w-4 h-4 text-[#E60012]" />
                      <span className="text-sm font-bold">
                        {t({ en: "Physical Key Backup Kept", ar: "نسخة المفتاح الأصلي محفوظة" })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Made in Turkey Section */}
        <section className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center flex-shrink-0 border border-white/20">
                  <span className="text-5xl md:text-6xl">🇹🇷</span>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black mb-2">
                    {t({ en: "Made in Turkey", ar: "صناعة تركية" })}
                  </h3>
                  <p className="text-neutral-400 text-sm md:text-base">
                    {t({ en: "Premium quality, trusted in 40+ countries", ar: "جودة عالية، موثوق في +40 دولة" })}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 md:gap-6">
                {[
                  { icon: Award, text: { en: "ISO Certified", ar: "معتمد ISO" } },
                  { icon: Wrench, text: { en: "Zinc Alloy Body", ar: "جسم سبائك الزنك" } },
                  { icon: Globe2, text: { en: "40+ Countries", ar: "+40 دولة" } },
                  { icon: ShieldCheck, text: { en: "2-Year Warranty", ar: "ضمان سنتين" } },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                    <item.icon className="w-5 h-5 text-[#E60012]" />
                    <span className="text-sm font-bold">{t(item.text)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Big feature — face recognition */}
        <section className="bg-neutral-950 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E60012]/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-14 lg:py-32 grid lg:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 md:mb-6">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#E60012]" />
                <p className="text-white/80 text-[11px] font-bold uppercase tracking-[0.2em]">
                  {t({ en: "Hands-Free Entry", ar: "دخول بدون لمس" })}
                </p>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                {t({ en: "Just push the door.", ar: "فقط ادفع الباب." })}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E60012] to-[#ff4d5a]">
                  {t({ en: "Your face is your key.", ar: "وجهك هو مفتاحك." })}
                </span>
              </h2>
              <p className="mt-8 text-neutral-400 leading-relaxed text-sm sm:text-base md:text-lg max-w-lg">
                {t({
                  en: "AI face recognition unlocks your door before you even touch it — fast, secure, and protected with AES-256 GCM encryption.",
                  ar: "الذكاء الاصطناعي للتعرّف على الوجه يفتح بابك قبل أن تلمسه — بسرعة وأمان، مع حماية بتشفير AES-256 GCM.",
                })}
              </p>
              <ul className="mt-6 md:mt-10 space-y-3 md:space-y-5">
                {[
                  {
                    en: "Recognizes up to 37 faces with millisecond accuracy",
                    ar: "يتعرّف على 37 وجهاً بدقة في الملي ثانية",
                  },
                  {
                    en: "Anti-spoofing — photos and videos won't fool it",
                    ar: "حماية من الخداع — لا تخدعه الصور أو الفيديو",
                  },
                  {
                    en: "Falls back to PIN, fingerprint, app or physical key",
                    ar: "خيارات بديلة: PIN ، بصمة ، تطبيق أو مفتاح",
                  },
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 md:gap-4">
                    <span className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#E60012]/20 text-[#E60012] mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    </span>
                    <span className="text-neutral-300 font-medium text-sm sm:text-base">
                      {t(f)}
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/product/desi-utopic-rx-face-recognition">
                <Button className="mt-8 md:mt-12 h-12 md:h-14 px-7 md:px-8 bg-[#E60012] hover:bg-[#c4000f] text-white font-bold uppercase tracking-wider text-sm rounded-full shadow-lg shadow-red-900/20 transition-transform hover:-translate-y-1">
                  {t({ en: "Shop Utopic RX", ar: "تسوّق يوتوبيك RX" })}
                  <ArrowRight className="w-5 h-5 ms-2 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
            <div className="relative group block">
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10"></div>
              <img
                src="/VideoProject-ezgif.com-crop.gif"
                alt="Face recognition"
                className="w-[80%] h-[250px] sm:h-[350px] md:h-[500px] rounded-2xl shadow-2xl relative z-0 transform transition-transform duration-700 group-hover:scale-105 border border-white/10"
              />
            </div>
          </div>
        </section>

        {/* Featured products - Smart Locks */}
        <section className="bg-neutral-50/50">
          <div className="max-w-7xl mx-auto px-4 py-14 md:py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
              <div className="max-w-2xl">
                <p className="text-[#E60012] text-xs font-bold uppercase tracking-[0.2em]">
                  {t({ en: "Utopic RX Series", ar: "سلسلة Utopic RX" })}
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
                  {t({ en: "Smart Locks", ar: "الأقفال الذكية" })}
                </h2>
                <p className="mt-4 text-neutral-500 text-sm sm:text-base md:text-lg leading-relaxed">
                  {t({
                    en: "The world's smallest smart lock series — 3-minute install, works with traditional handles, made for UAE homes.",
                    ar: "أصغر سلسلة أقفال ذكية — تركيب 3 دقائق، متوافقة مع المقابض التقليدية، لمنازل الإمارات.",
                  })}
                </p>
              </div>
              <Link
                to="/smart-locks"
                className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 border-b-2 border-neutral-900 pb-1 hover:text-[#E60012] hover:border-[#E60012] transition-colors uppercase tracking-[0.1em] self-start md:self-auto"
              >
                {t({ en: "Explore All", ar: "استكشف الكل" })}{" "}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
            {smartLocks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {smartLocks.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            ) : (
              <p className="text-neutral-500">
                {t({
                  en: "No products found.",
                  ar: "لم يتم العثور على منتجات.",
                })}
              </p>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-white py-12 md:py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E60012]/10 border border-[#E60012]/20 mb-6">
                <Star className="w-4 h-4 text-[#E60012]" />
                <span className="text-sm font-bold text-[#E60012] uppercase tracking-wider">
                  {t({ en: "Customer Stories", ar: "قصص العملاء" })}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                {t({ en: "Real Installations.", ar: "تركيبات حقيقية." })}
                <br />
                <span className="text-[#E60012]">{t({ en: "Real UAE Homes.", ar: "منازل إماراتية حقيقية." })}</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 hover:border-[#E60012]/30 hover:shadow-lg transition-all duration-300">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[#E60012] text-[#E60012]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-neutral-700 leading-relaxed mb-6 text-sm">
                    "{t(t.text)}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E60012] flex items-center justify-center text-white font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{t.name}</p>
                      <p className="text-xs text-neutral-500">{t(t.city)}</p>
                    </div>
                  </div>

                  {/* Verified badge */}
                  <div className="mt-4 pt-4 border-t border-neutral-200">
                    <div className="flex items-center gap-1.5 text-[#E60012] text-xs font-bold">
                      <Check className="w-3.5 h-3.5" />
                      {t({ en: "Verified UAE Customer", ar: "عميل إماراتي موثق" })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products - Accessories */}
        {accessories.length > 0 && (
          <section className="bg-neutral-50/50">
            <div className="max-w-7xl mx-auto px-4 pb-14 pt-8 md:pb-24 md:pt-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
                <div className="max-w-2xl">
                  <p className="text-[#E60012] text-xs font-bold uppercase tracking-[0.2em]">
                    {t({ en: "Expand & Enhance", ar: "توسيع وتحسين" })}
                  </p>
                  <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
                    {t({ en: "Accessories", ar: "الملحقات" })}
                  </h2>
                  <p className="mt-4 text-neutral-500 text-sm sm:text-base md:text-lg leading-relaxed">
                    {t({
                      en: "Take your smart lock experience to the next level with our premium accessories.",
                      ar: "ارتقِ بتجربة القفل الذكي الخاص بك إلى المستوى التالي مع ملحقاتنا المتميزة.",
                    })}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {accessories.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Feature grid */}
        <section className="max-w-7xl mx-auto px-4 py-8 md:py-14 lg:py-24">
          <div className="text-center max-w-2xl mx-auto mb-6 md:mb-10 lg:mb-16">
            <p className="text-[#E60012] text-xs font-bold uppercase tracking-[0.2em]">
              {t({ en: "Why DESi", ar: "لماذا ديسي" })}
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
              {t({
                en: "Everything your door has been missing",
                ar: "كل ما ينقص بابك",
              })}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-8">
            {featureHighlights.map((f, i) => {
              const Icon = iconMap[f.icon];
              return (
                <div
                  key={i}
                  className="group p-4 md:p-6 lg:p-8 bg-white border border-neutral-100 rounded-2xl hover:border-[#E60012]/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl bg-red-50 group-hover:bg-gradient-to-br group-hover:from-[#E60012] group-hover:to-[#ff4d5a] flex items-center justify-center transition-colors shadow-sm">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#E60012] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="mt-4 md:mt-6 text-sm sm:text-base md:text-xl font-bold tracking-tight">
                    {t(f.title)}
                  </h3>
                  <p className="mt-2 md:mt-3 text-neutral-500 leading-relaxed font-medium text-xs sm:text-sm md:text-base">
                    {t(f.desc)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Live in action */}
        <section className="bg-neutral-100 py-8 md:py-14 lg:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 items-start">
              {/* Left sidebar */}
              <div className="lg:w-56 flex-shrink-0 flex flex-col gap-3 md:gap-4 lg:gap-6">
                <div>
                  <p className="text-[#E60012] text-xs font-bold uppercase tracking-[0.2em]">
                    {t({ en: "Live in Action", ar: "لحظات حقيقية" })}
                  </p>
                  <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                    {t({ en: "Smart Moments", ar: "لحظات ذكية" })}
                  </h2>
                  <p className="mt-4 text-neutral-500 text-xs sm:text-sm leading-relaxed">
                    {t({
                      en: "Real installations and quick guides in short clips.",
                      ar: "تركيبات حقيقية وأدلة سريعة في مقاطع قصيرة.",
                    })}
                  </p>
                </div>
                {/* YouTube channel card */}
                <a
                  href="https://www.youtube.com/playlist?list=PLzetQrmBzdo2Ooqat5YV_GjlIhr2QDBuX"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900 leading-tight">
                      {t({ en: "Official Channel", ar: "القناة الرسمية" })}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {t({
                        en: "Watch more on YouTube",
                        ar: "شاهد المزيد على يوتيوب",
                      })}
                    </p>
                  </div>
                </a>
              </div>

              {/* Featured large video */}
              <a
                href="https://www.youtube.com/shorts/YQHzRB7QaMQ"
                target="_blank"
                rel="noreferrer"
                className="lg:flex-1 rounded-3xl overflow-hidden bg-black shadow-xl group relative block aspect-[3/4] lg:aspect-auto lg:min-h-[500px]"
                style={{ border: "3px solid #00d4ff" }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#00d4ff] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <svg
                      className="w-8 h-8 text-black"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <polygon points="5 3 19 12 5 21" />
                    </svg>
                  </div>
                </div>
                <img
                  src="https://img.youtube.com/vi/YQHzRB7QaMQ/maxresdefault.jpg"
                  alt="Featured video"
                  className="w-full h-full object-cover"
                />
              </a>

              {/* 2x2 grid of smaller videos */}
              <div className="lg:w-72 grid grid-cols-2 gap-3">
                {[
                  { id: "xLdQ4QNAkYY" },
                  { id: "h-IgvXpOTYQ" },
                  { id: "ODF_nTb3kXI" },
                  { id: "TrsAPDOvvDQ" },
                ].map((v, i) => (
                  <a
                    key={i}
                    href={`https://www.youtube.com/shorts/${v.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl overflow-hidden bg-black shadow-md group relative block aspect-[9/16]"
                    style={{ border: "2px solid transparent" }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg
                          className="w-4 h-4 text-neutral-900"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <polygon points="5 3 19 12 5 21" />
                        </svg>
                      </div>
                    </div>
                    <img
                      src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`}
                      alt="YouTube Short"
                      className="w-full h-full object-cover"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#E60012] text-white">
          <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 lg:py-14 grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-center">
            <div className="md:col-span-2">
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black">
                {t({
                  en: "Ready to upgrade your door?",
                  ar: "مستعد لتحديث بابك؟",
                })}
              </h2>
              <p className="mt-2 text-white/90 text-sm sm:text-base">
                {t({
                  en: "3-minute install • Works with your existing lock • Free delivery UAE • 2-year warranty",
                  ar: "تركيب 3 دقائق • متوافق مع قفلك الحالي • توصيل مجاني الإمارات • ضمان سنتين",
                })}
              </p>
            </div>
            <Link to="/smart-locks">
              <Button className="h-12 px-8 bg-white text-[#E60012] hover:bg-neutral-100 font-bold uppercase tracking-wider w-full md:w-auto">
                {t({ en: "Shop Now", ar: "تسوّق الآن" })}
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
